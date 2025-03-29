import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { editUser, deleteUser } from '../redux/userSlice';
import axiosInstance from '../utilities/axios';
import { toast } from 'react-toastify';

const OptionsBar = ({ id }) => {
    const dispatch = useDispatch();
    const edit = useSelector(store => store.users.editUser);
    const editId = useSelector(store => store.users.editUserId);


    const delUser = () => {
        try {
            const res = axiosInstance.delete(`users/${id}`)
                .then(() => {
                    dispatch(deleteUser({ id }))
                    toast.success("User deleted")
                })
                .catch((err) => {
                    console.log("error while deleting")
                    console.log(err)
                    toast.error("Unable to delete user, try again later")
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex w-full justify-between items-center text-2xl'>
            {
                (edit && editId === id) ? (
                    <button>
                        Update
                    </button>
                ) : (
                    <>
                        <FaEdit
                            onClick={() => dispatch(editUser({ value: true, id }))}
                            className='hover:text-red-600'
                        />
                        <MdDelete onClick={delUser} className='hover:text-red-600' />
                    </>
                )
            }
        </div>
    );
}

export default OptionsBar;
