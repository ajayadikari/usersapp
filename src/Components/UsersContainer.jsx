import React, { useEffect, useState } from 'react'
import axiosInstance from '../utilities/axios'
import { useSelector, useDispatch } from 'react-redux'
import { fillUsers } from '../redux/userSlice'
import UserCard from './UserCard'
import EditForm from './EditForm'

const UsersContainer = () => {
  const users = useSelector(store => store.users.users)
  // for loader
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();

  const isEdit = useSelector(store => store.users.edit)
  const editUserId = useSelector(store => store.users.editUserId)
  const setUsers = async () => {
    try {
      const users = await (await axiosInstance.get('users?page=1')).data
      dispatch(fillUsers(users.data))
    } catch (error) {
      console.log("error while fetching data")
      console.log(error)
    }

  }

  useEffect(() => {
    if (users.length == 0) {
      setStatus(1);
      setUsers();
    }
  }, [users])


  return (
    <div className="flex flex-wrap gap-10 justify-start m-auto items-center p-20">
      {
        status === 1 ? (
          users.length > 0 ? (
            users.map((user) => (
              (isEdit && editUserId === user.id) ? (
                <EditForm key={user.id} />
              ) : (
                <UserCard user={user} key={user.id} />
              )
            ))
          ) : (
            <h1 className='text-3xl font-bold m-auto'>No users</h1>
          )
        ) : (
          <h1 className='text-3xl font-bold m-auto'>Loading...</h1>
        )
      }
    </div>
  );



}

export default UsersContainer
