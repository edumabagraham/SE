import http from 'http';
import { config as configDotenv } from 'dotenv';
import connectDB from './db';

// load environment variables
configDotenv();

// import other dependencies
import bootstrapApp from './app';

(async () => {
  const app = bootstrapApp();

  const port = process.env.PORT || 4000;

  // connect to database
  await connectDB();
  console.log('Database connected');

  const server = new http.Server(app);

  server.listen(port);
  server.on('listening', () => {
    console.log(`🚀🚀 Server running on http://localhost:${port}`);
  });
})();
