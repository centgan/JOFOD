import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

export async function query(sql: string, params?: any[]){
  const connection = await mysql.createConnection(dbConfig);
  const [results] = await connection.execute(sql, params);
  connection.end();
  return results;
}
