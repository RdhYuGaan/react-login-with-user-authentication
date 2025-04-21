import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const [values, setValues] = useState({
        
        email: "",
        password: ""
    })

    const navigate = useNavigate();



    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const responce = await axios.post("http://localhost:3000/auth/login", values)
            if(responce.status===201 ){
                localStorage.setItem("token", responce.data.token)
                navigate("/")

            }
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg  px-8 py-5 border w-96'>
                <h2 className='text-lg  font-bold mb-4'>Login</h2>
                <form
                    onSubmit={handleSubmit}>
                    
                    <div className='mb-4'>
                        <label
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            className='w-full px-3 py-2 border rounded'
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChanges}
                        />

                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className='w-full px-3 py-2 border rounded'
                            name="password"
                            onChange={handleChanges}

                        />
                    </div>
                    <button
                        type="submit"
                        className='bg-amber-300 text-white px-4 py-2 rounded w-full hover:bg-amber-600 transition duration-200'>
                        Submit
                    </button>
                </form>
                <div className='text-center'>
                    <span>Don't have  an account? </span>
                    <Link to="/register" className='text-blue-500 hover:underline'>Signup</Link>
                </div>

            </div>
        </div>
    )
}

export default Login