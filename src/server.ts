import "reflect-metadata";
import { AppDataSource } from './config/ormconfig';
import app from './app';
import * as dotenv from 'dotenv';

   dotenv.config();

   const PORT = process.env.PORT || 3000;

   AppDataSource.initialize()
     .then(() => {
       app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
       });
     })
     .catch((error) => {
       console.error('Error:', error);
     });