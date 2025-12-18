import { pool } from "../../config/db"

const  postVehicles = async( vehicle_name:string,
        type:string,
        registration_number:string,
        daily_rent_price:string,
        availability_status:string,)=>{
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
    return result
}
export const VehicleServices = {
    postVehicles
}