import React from 'react'
import { useParams } from 'react-router-dom'

const Users = () => {
    const {username} = useParams()
  return (
    <div>Users:{username}</div>
  )
}

export default Users