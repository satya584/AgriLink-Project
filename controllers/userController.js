const mongoose = require('mongoose')
const Report = require('../models/reportModel')
const AppError = require('../utilities/apperror.js')


module.exports = {
    report: async (req, res, next) => {
        try {
            const { reportId } = req.params
            const findOneReport = await Report.findById(reportId).select('-avgNumber')
            if (!findOneReport) {
                throw new AppError('Report Not Found', 404)
            }
            res.status(200).send(findOneReport)
        } catch (err) {
            next(err)
        }
    },
    addReports: async (req, res, next) => {
        try {
            const { marketID, userID, marketName, cmdtyID,
                marketType, cmdtyName, priceUnit, convFctr, price } = req.body
            const findOneReport = await Report.find({ marketID, cmdtyID })
            if (findOneReport[0]) {
                let result = false
                for (let data of findOneReport[0].users) {
                    if (data === userID) result = true
                }
                if (result) {
                    res.status(200).send({ status: "sucess", reportID: findOneReport[0]._id })
                } else {
                    const avg = (price / convFctr)
                    const prevPrice = await findOneReport[0].price * findOneReport[0].avgNumber
                    const Price = (avg + prevPrice) / (findOneReport[0].avgNumber + 1);
                    const avgNumber = findOneReport[0].avgNumber + 1
                    await Report.updateOne({ marketID, cmdtyID },
                        {
                            $push: { users: userID },
                            price: Price, avgNumber: avgNumber,
                            timestamp: Date.now(),
                        }, { upsert: true })
                    res.status(200).send({ status: "sucess", reportID: findOneReport[0]._id })
                }
            }
            else {
                const addNewReport = await new Report({
                    cmdtyName, cmdtyID, marketID, marketName,
                    timestamp: Date.now(), price: (price / convFctr), avgNumber: 1
                })
                addNewReport.users.push(userID)
                await addNewReport.save()
                res.status(200).send({ status: "sucess", reportID: addNewReport._id })
            }
        } catch (err) {
            next(err)
        }
    },
}