import React from 'react'
import { useUserContext } from '../../context/UserContext';

export default function Entry({ entry }) {
  const { user } = useUserContext()
  const timestamp = new Date(entry.created_at).toDateString();

  return (
    <div>
      <h4>{entry.content}</h4>
      <p>{user.email}</p>
      <p>{timestamp}</p>
    </div>
  )
}
