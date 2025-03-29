import React, { useEffect, useState } from 'react'
import { filterUsers } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { fillUsers } from '../redux/userSlice';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(store => store.users.users)
  const filter = (term) => {
    setSearchTerm(term);
    dispatch(filterUsers({ searchTerm: searchTerm }))
  }
  const logOutHandler = () => {
    localStorage.clear();
    dispatch(fillUsers([]))
    navigate('/login');
  }
  useEffect(()=>{

  }, [users])
  return (
    <div className='sticky top-1 w-[90%] px-5 z-10 m-auto'>
      <div className='h-15 bg-blue-300 rounded flex justify-between items-center px-10'>
        <input onChange={(e) => filter(e.target.value)} type="text" name="" id="" placeholder='Search user...' value={searchTerm} className='w-80 h-10 p-5 focus:outline-0 border border-black rounded' />
        <IoIosLogOut onClick={logOutHandler} className='text-3xl hover:cursor-pointer hover:text-red-300' title='logout' />
      </div>

    </div>
  )
}

export default NavBar
