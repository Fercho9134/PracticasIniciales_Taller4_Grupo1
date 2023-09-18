import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import loginRoutes from './routes/login.routes.js';

dotenv.config();
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use('/', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});