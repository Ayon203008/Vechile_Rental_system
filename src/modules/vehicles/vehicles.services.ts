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

const getVehicles = async()=>{
    const result = await pool.query(`SELECT * FROM vechiles`);
    return result
}

const getSingleVehicle = async(vehicleId:string)=>{
    const result = await pool.query(`SELECT * FROM vechiles WHERE id=$1 `, [vehicleId ]);
    return result
}

const updateVehicle = async(vehicle_name:string,
        type:string,
        registration_number:string,
        daily_rent_price:string,
        availability_status:string,
        vehicleId:string 
    )=>{
    const result = await pool.query(
      `UPDATE  vechiles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4, 
      availability_status=$5 WHERE id=$6 RETURNING *`,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
      ]
    );
    return result
}


const deleteVehicle = async(vehicleId:string)=>{
     const result = await pool.query(`DELETE FROM vechiles WHERE id=$1 `, [
       vehicleId
      ]);
      return result
}

export const VehicleServices = {
    postVehicles,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}