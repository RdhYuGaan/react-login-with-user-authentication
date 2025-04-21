import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(username);

})
export default router;