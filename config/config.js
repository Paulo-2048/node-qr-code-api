import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const config = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,

  status: process.env.API_STATUS || "on hold",
  version: process.env.API_VERSION || "in update",
  baseLink: process.env.LINK,
  rapidApiProxyKey: process.env.RAPID_API_PROXY_KEY,

  database: {
    dbHost: process.env.HOSTDB,
    dbUsername: process.env.USERNAMEDB,
    dbPassword: process.env.PASSWORDDB,
    dbName: process.env.DATABASEDB,
  },

  ipConfig: {
    mode: "allow",
    allows: JSON.parse(process.env.WHITE_LIST_IP),
    statusCode: 401,
    message: "Unauthorized, Just through Rapid API",
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
    rapidApi: {
      proxyVerifyFail:
        "This host is not allowed, just make requests through the URL provided by Rapi Api",
    },
  },
}

export { config }
