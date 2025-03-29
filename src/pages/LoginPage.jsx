import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token) navigate('/')
    }, [])
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
            // implement toastify

        } else {
            //password verification, left for now
            const credentials = {
                "email": email,
                "password": pass
            }
            try {
                const res = await axios.post('https://reqres.in/api/login', credentials)
                // implement spinner/loader
                if (res) {
                    console.log(res)
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    navigate('/')
                    toast.success("logged in")
                }
            } catch (error) {
                toast.error("Something went wrong!")
                console.log(error)
                console.log("error while logging")
            }
        }
    }
    return (
        <div className='h-screen'>
        {/* implement show password feature */}
            <h1 className='text-2xl font-bold'>Please Login</h1>
            <form onSubmit={submitHandler} className='flex flex-col justify-center items-center' method='POST'>
                <label className='text-2xl' htmlFor="email">Email</label>
                <input className='w-80 h-10 p-5 focus:outline-0 border border-black rounded' onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="" placeholder='Enter Your Email' value={email} required />
                <label className='text-2xl' htmlFor="password">Password</label>
                <input className='w-80 h-10 p-5 focus:outline-0 border border-black rounded' placeholder='Enter password' onChange={(e) => setPass(e.target.value)} type="password" name="password" id="" value={pass} required />
                <button className='w-80 h-10 text-2xl font-bold bg-blue-400 mt-10 hover:scale-[102%]' type="submit">submit</button>
            </form>
        </div>
    )
}

export default LoginPage
