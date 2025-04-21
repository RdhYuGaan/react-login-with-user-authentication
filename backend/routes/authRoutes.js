import express from 'express';
import { connectToDatabase } from '../lib/db.js';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('select * from users where email=?', [ email, ])
        if(rows.length === 0) {
            return res.status(404).json({ message: 'User not exists' });
            
        }
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });    
        }
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.status(201).json({ token:token });
    } catch (error) {
       
       return res.status(500).json(error);
    }

})

const verifyToken =async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    

    } catch (error) {
        return res.status(500).json({ message: 'server Error' });
    }
    
    
 
}
router.get('/home', verifyToken, async(req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('select * from users where id=?', [ req.userId, ])

        if(rows.length === 0) {
            return res.status(404).json({ message: 'User not exists' });
            
        }
         return res.status(200).json({ user: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server Error" });
    }

})
export default router;