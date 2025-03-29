import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../redux/userSlice'
import { toast } from 'react-toastify'
import axiosInstance from '../utilities/axios'
import { fillUsers } from '../redux/userSlice'

const Paginator = () => {
    const currPage = useSelector(state => state.users.currPage)
    const tot_pages = useSelector(state => state.users.tot_pages)
    const dispatch = useDispatch()

    const setUsers = async () => {
        try {
            const users = await (await axiosInstance.get(`users?page=${currPage}`)).data
            console.log(users)
            dispatch(fillUsers(users.data))
        } catch (error) {
            console.log("error while fetching data")
            console.log(error)
        }

    }

    const clickHandler = (val) => {
        if (val < 0) {
            if (currPage === 1) toast.error("no previous pages")
            else {
                dispatch(setPage(-1))
                setUsers()
            }
        } else {
            if (currPage === tot_pages) toast.error("no next pages")
            else {
                dispatch(setPage(1))
                setUsers()
            }
        }

    }

    return (
        <div className='w-[90%] flex justify-center items-center m-auto gap-3'>
            <button onClick={clickHandler} className={`h-10 w-25 bg-red-300 cursor-pointer`}>Prev</button>
            <button onClick={clickHandler} className='h-10 w-25 bg-red-300 cursor-pointer'>Next</button>
        </div>
    )
}

export default Paginator
