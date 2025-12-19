import { pool } from "../../config/db";

const CreateBooking = async () => {
  const result = await pool.query(
    `
          SELECT * FROM vehicles WHERE id=$1 AND status= 'available'
          `,
    [vehicle_id]
  );
};
