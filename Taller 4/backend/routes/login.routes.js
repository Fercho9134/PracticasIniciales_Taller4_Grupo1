import express from 'express';
import {login, signup, logout, recuperarContrasena} from '../controllers/login.controllers.js';

const loginRoutes = express.Router();

loginRoutes.post('/login', login);
loginRoutes.post('/signup', signup);
loginRoutes.post('/logout', logout)
loginRoutes.post('/recuperacion', recuperarContrasena)

loginRoutes.get('/', (req, res) => {
    if (req.session.user) {
        return res.json({ valid: true, user: req.session.user });
    } else {
        return res.json({ valid: false });
    }
});

export default loginRoutes;

