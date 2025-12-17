import express, { Request, Response } from "express";
import { Pool } from "pg";
const app = express();
import dotenv from 'dotenv'
import path from "path"


const port = 3000;
dotenv.config({path:path.join(process.cwd(),".env")})


//middleware
app.use(express.json());

//

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15),
        role VARCHAR(15) NOT NULL DEFAULT 'customer'
        )`);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS  vechiles(
        id SERIAL PRIMARY KEY,
        vechile_name VARCHAR(100) NOT NULL,
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK(daily_rent_price>0),
        availability_status VARCHAR(50) NOT NULL DEFAULT 'available'
            CHECK (availability_status IN ('available', 'booked'))
        )
        `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS  bookings(
    id SERIAL PRIMARY KEY,
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
    total_price NUMERIC(10,2) NOT NULL CHECK(total_price>0),
    status VARCHAR(100) NOT NULL DEFAULT 'active' 
    CHECK(status IN ('active','cancelled','returned'))
    )
    `);
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vechile Rental system");
});

//POST Method
app.post("/api/v1/vehicles", (req: Request, res: Response) => {
  console.log(req);
  res.status(201).json({
    success: true,
    message: "Api is working perfectly",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
