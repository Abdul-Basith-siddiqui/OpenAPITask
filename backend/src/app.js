
import express from 'express';
import routes from './routes/routes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
connectDB();
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
