import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { userRouter } from './routes/user';
import { roleRouter } from './routes/role';
import { movieRouter } from './routes/movies';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)
app.use(userRouter);
app.use(roleRouter);
app.use(movieRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);
export { app };