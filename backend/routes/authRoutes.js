import express from 'express';
import { connectToDatabase } from '../lib/db.js';  
import bcrypt from 'bcrypt';



const router = express.Router();

router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('select * from users where email=?', [ email, ])
        if(rows.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
            
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('insert into users (name, email, password) values (?, ?, ?)', [ name, email, hashedPassword ])

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

})
export default router;