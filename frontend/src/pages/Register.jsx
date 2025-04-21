import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })


    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const responce = await axios.post("http://localhost:3000/auth/register", values)
            console.log(responce)
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg  px-8 py-5 border w-96'>
                <h2 className='text-lg  font-bold mb-4'>Register</h2>
                <form
                    onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label
                            htmlFor="name"
                            className='text-gray-700 block'>
                            Name
                        </label>
                        <input
                            type="text"
                            className='w-full px-3 py-2 border rounded'
                            placeholder="Enter your name"
                            name="name"
                            onChange={handleChanges}
                        />
                    </div>
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
                    <span>Already have an account? </span>
                    <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
                </div>

            </div>
        </div>
    )
}

export default Register