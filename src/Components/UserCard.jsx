import React from 'react'
import OptionsBar from './OptionsBar'
import EditForm from './EditForm'
import { useSelector } from 'react-redux'

const UserCard = ({ user }) => {
    const isEdit = useSelector(store => store.users.editUser)
    const editId = useSelector(store => store.users.editUserId)
    return (
        <div className='bg-gray-600 flex flex-col justify-start items-center w-80 p-5 rounded-xl gap-3 hover:scale-[102%] duration-300 ease-in-out cursor-pointer'>
            {
                (isEdit && editId === user.id) ? (
                    <EditForm user={user}/>
                ) : (
                    <>
                        <OptionsBar id={user.id} />
                        <p className='text-3xl text-blue-400 font-bold'>{user.first_name} {user.last_name}</p>
                        <img src={user.avatar} className='w-full h-60 rounded' alt="User Avatar" />
                        <p className='text-gray-400 font-medium'>
                            <span className='text-blue-400'>Email</span>: {user.email}
                        </p>
                        {/* <p>{user.id}</p> */}
                    </>
                )
            }
        </div>
    );

}

export default UserCard
