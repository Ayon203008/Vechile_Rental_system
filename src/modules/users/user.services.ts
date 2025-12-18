import { pool } from "../../config/db";

const Createuser = async (name:string, email:string, password:string, phone:string, role:string) => {
  const result = await pool.query(
    `INSERT INTO users( name,
        email,
        password,
        phone,role)
            VALUES ($1,$2,$3,$4,$5)
            `,
    [name, email, password, phone, role]
  );
  return result
};



const GetUser=async()=>{
    const result = await pool.query(`SELECT * FROM users`);
    return result
}




const UpdateUser = async(name:string, email:string, password:string, phone:string,userId:string)=>{
const result = await pool.query(
      `UPDATE  users SET name=$1,email=$2,password=$3,phone=$4 WHERE id=$5 RETURNING *`,
      [name, email, password, phone,userId]
    );
    return result
}



const DeleteUser =async(userId:string)=>{

 const result = await pool.query(`DELETE FROM users WHERE id=$1 `, [
     userId
    ]);
    return result
}


export const  UserServices ={
    Createuser,
    GetUser,
    UpdateUser,
    DeleteUser
}