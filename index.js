import express from 'express';
import * as dotenv from 'dotenv';
import processosRoute from './routes/processos.routes.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/processos', processosRoute);

app.listen(process.env.PORT, () => {
    console.log(
        `Server up and running on http://localhost/${process.env.PORT}`
    );
});
