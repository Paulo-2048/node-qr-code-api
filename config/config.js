import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const config = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,

  baseLink: process.env.VERCEL_URL,

  database: {
    dbHost: process.env.HOSTDB,
    dbUsername: process.env.USERNAMEDB,
    dbPassword: process.env.PASSWORDDB,
    dbName: process.env.DATABASEDB,
  },

  constants: {
    sql: {
      sucess: "Query Executada",
    },
    http: {
      sucess: "Request Sucessful",
      fail: "Request Fail",
      jwtFail: "Api-Key Verify Fail",
    },
  },
}

export { config }
