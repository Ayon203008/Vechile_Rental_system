import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import { VehicleRoutes } from "./modules/vehicles/vehicles.route";
import { UserRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";

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
// app.post("/api/v1/bookings",);

// // GET MEhod for bookings
// app.get("/api/v1/bookings", );

// app.put("/api/v1/bookings/:bookingId", (req: Request, res: Response) => {

  
// });

app.use("/api/v1/auth",authRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
