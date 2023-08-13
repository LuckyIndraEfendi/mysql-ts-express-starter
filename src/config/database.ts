import mysql from "mysql2";
import { NextFunction, Request, Response } from "express";

function DatabaseMiddleware(req: Request, res: Response, next: NextFunction) {
  const connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return res.status(500).json({
        status: "error",
        message: "Database connection error",
      });
    }

    console.log("Database connection established");
    // Adding the database connection to the request object
    next(); // Proceed to the next middleware or route handler
  });
}

export default DatabaseMiddleware;
