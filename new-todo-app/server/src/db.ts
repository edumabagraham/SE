import { createConnection } from 'typeorm';

export default async function connectDB() {
  await createConnection();
}
