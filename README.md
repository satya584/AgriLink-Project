
# Agrilink Project

Express JS API web-service which captures user contributed
reports and returns an aggregate report in response.


## API Reference

#### Post One Report

```http
  POST /reports
```

#### Get Report

```http
  GET /reports/${reportID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. reportID of report to fetch |



## Run Locally

Clone the project

```bash
  git clone https://github.com/satya584/AgriLink-Project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
Now open postman and test with data

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
For CONNECTION_URL I am running the mongoDB data base locally . 

`CONNECTION_URL=""`

`PORT = 3000`




## Authors

- [@satya584](https://github.com/satya584)

