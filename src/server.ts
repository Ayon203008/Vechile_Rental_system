import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import { VehicleRoutes } from "./modules/vehicles/vehicles.route";
import { UserRoutes } from "./modules/users/user.route";

const app = express();

const port = 3000;

//middleware
app.use(express.json());

app.use("/api/v1/vehicles",VehicleRoutes)
app.use("/api/v1/users",UserRoutes)

initDB();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vechile Rental system");
});



// Bookings

//POST for bookings
app.post("/api/v1/bookings", async (req: Request, res: Response) => {
  const { vehicle_id, rent_start_date, rent_end_date } = req.body;
  try {
    const result = await pool.query(
      `
      SELECT * FROM vehicles WHERE id=$1 AND status= 'available'
      `,
      [vehicle_id]
    );

    if (result.rows.length === 0) {
      return res.status(500).json({
        success: false,
        meessage: "Vechile is not available",
      });
    }

    const dailyRate = result.rows[0].daily_rate;

    // Calculate the total price

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (days < 0) {
      return res.status(500).json({
        success: false,
        message: "Invalid booking dates",
      });
    }

    const totalPrice = days * dailyRate;

    const BookingResult = await pool.query(
      `
      
      INSERT INTO bookings (vehicle_id,rent_start_date,rent_end_date,total_price) 
      VALUES ($1,$2,$3,$4)  RETURNING *`,
      [vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    await pool.query("UPDATE vehicles SET status = 'booked' WHERE id=$1", [
      vehicle_id,
    ]);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: BookingResult.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET MEhod for bookings
app.get("/api/v1/bookings", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM bookings");

    res.status(200).json({
      success: true,
      message: "Bookings get succesfully",
      bookings: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.put("/api/v1/bookings/:bookingId", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
