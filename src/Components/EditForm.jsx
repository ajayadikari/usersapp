import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearEdit } from '../redux/userSlice'
import { updateUser } from '../redux/userSlice'
import axiosInstance from '../utilities/axios'
import { toast } from 'react-toastify'

const EditForm = ({ user }) => {
    const [newfname, setNewfname] = useState(user.first_name);
    const [newlname, setNewLname] = useState(user.last_name);
    const [newEmail, setNewEmail] = useState(user.email);
    const [errors, setErrors] = useState({}); // To store error messages
    const dispatch = useDispatch();



    //used chatgpt for validations
    const submitHandler = async(e) => {
        e.preventDefault();

        // Reset errors before validating
        setErrors({});

        // Validation: Ensure fields are not empty and have a minimum length of 2
        if (newfname.trim() === '' || newlname.trim() === '' || newEmail.trim() === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: 'Name fields cannot be empty',
                email: 'Email cannot be empty',
            }));
            return; // Stop form submission if there's an error
        }

        if (newfname.trim().length < 2 || newlname.trim().length < 2) {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: 'First and last name must be at least 2 characters long',
            }));
            return;
        }

        // Email validation (basic)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(newEmail.trim())) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Please enter a valid email address',
            }));
            return;
        }

        // If validation passes, dispatch the action
        
        dispatch(clearEdit());
        const data = {
            id: user.id,
            first_name: newfname, 
            last_name: newlname, 
            email: newEmail, 
            avatar: user.avatar
        }
        dispatch(updateUser(data))

        try {
            const res = await axiosInstance.put(`api/users/${user.id}`, data)
            toast.success("Profile updation successful")
        } catch (error) {
            console.log("error updating profile", error)
            toast.error("Unable to update profile")
        }
    };

    return (
        <div>
            <form method="POST" onSubmit={submitHandler} className='flex flex-col gap-5 justify-between items-center'>
                <h1 className='font-bold text-2xl'>Edit User</h1>
                <input className='w-70 h-10 p-5 focus:outline-0 border border-black rounded' onChange={(e) => setNewfname(e.target.value)} type="text" name="" id="" value={newfname} placeholder='First Name' />
                <input className='w-70 h-10 p-5 focus:outline-0 border border-black rounded' onChange={(e) => setNewLname(e.target.value)} type="text" name="" id="" value={newlname} placeholder='Last Name' />
                <input className='w-70 h-10 p-5 focus:outline-0 border border-black rounded' onChange={(e) => setNewEmail(e.target.value)} type="email" name="" id="" value={newEmail} placeholder='Email' />
                <button type="submit" value="" className='cursor-pointer w-full h-10 bg-white text-black font-bold' >Update</button>
                <button onClick={()=> dispatch(clearEdit())} value="" className='cursor-pointer w-full h-10 bg-white text-black font-bold' >Cancel</button>
            </form>
        </div>
    )
}

export default EditForm
