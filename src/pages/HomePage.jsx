import React, { useEffect } from 'react'
import UsersContainer from '../Components/UsersContainer'
import Paginator from '../Components/Paginator'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <UsersContainer/>
      <Paginator/>
    </div>
  )
}

export default HomePage
