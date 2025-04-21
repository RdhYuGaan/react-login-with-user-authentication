import React from 'react'

const Register = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg  px-8 py-5 border w-96'>
                <h2 className='text-lg  font-bold mb-4'>Register</h2>
                <form>
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
                            className='w-full px-3 py-2 border rounded' />
                    </div>
                    <button
                        type="submit"
                        className='bg-amber-300 text-white px-4 py-2 rounded w-full hover:bg-amber-600 transition duration-200'>
                        Submit
                    </button>
                </form>
                <div className='text-center'>
                    <span>Already have an account? </span>
                    <a href="/login">Login</a>
                </div>

            </div>
        </div>
    )
}

export default Register