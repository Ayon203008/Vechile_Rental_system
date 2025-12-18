import express, {  Request, Response } from "express";
import initDB, { pool } from "./config/db";
import { UserRoutes } from "./modules/vehicles/vehicles.route";

const app = express();

const port = 3000;

//middleware
app.use(express.json());

app.use("/api/v1/vehicles",UserRoutes)

initDB();

// logger


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vechile Rental system");
});

//POST Method VECHILE
app.post("/api/v1/vehicles", async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO vechiles(vehicle_name,type ,registration_number,daily_rent_price,availability_status)
        VALUES ($1,$2,$3,$4,$5)
        `,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
      ]
    );
    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: "False",
      message: err.message,
    });
  }
});

// GET METHOD VECHILE
app.get("/api/v1/vehicles", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM vechiles`);
    res.status(200).json({
      success: true,
      message: "All vechiles get successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//GET SINGLE VECHILE by their ID
app.get("/api/v1/vehicles/:vehicleId", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM vechiles WHERE id=$1 `, [
      req.params.vehicleId,
    ]);

    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "Vechile not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vechile get successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//UPDATE VECHILES
app.put("/api/v1/vehicles/:vehicleId", async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE  vechiles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4, 
      availability_status=$5 WHERE id=$6 RETURNING *`,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        req.params.vehicleId,
      ]
    );

    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "Vechile not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vechile Updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// DELETE VECHILES
app.delete(
  "/api/v1/vehicles/:vehicleId",
  async (req: Request, res: Response) => {
    try {
      const result = await pool.query(`DELETE FROM vechiles WHERE id=$1 `, [
        req.params.vehicleId,
      ]);

      if (result.rows.length == 0) {
        res.status(404).json({
          success: false,
          message: "Vechile not fould",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Vechile DELETED successfully",
          data: null,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

// POST for the users
app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users( name,
    email,
    password,
    phone,role)
        VALUES ($1,$2,$3,$4,$5)
        `,
      [name, email, password, phone, role]
    );
    res.status(201).json({
      success: true,
      message: "User added successfully",
      vehicle: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: "False",
      message: err.message,
    });
  }
});

// GET For the users
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "All Users get successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update For the users
app.put("/api/v1/users/:userId", async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  try {
    const result = await pool.query(
      `UPDATE  users SET name=$1,email=$2,password=$3,phone=$4,  WHERE id=$5 RETURNING *`,
      [name, email, password, phone]
    );

    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "user  not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete the users
app.delete("/api/v1/users/:userId", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id=$1 `, [
      req.params.userId,
    ]);

    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "User not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User DELETED successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
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
