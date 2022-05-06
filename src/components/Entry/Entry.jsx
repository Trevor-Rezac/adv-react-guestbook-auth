import React from 'react'

export default function Entry({ entry }) {
  
  const timestamp = new Date(entry.created_at).toDateString();

  return (
    <div>
      <h4>{entry.content}</h4>
      <p>{timestamp}</p>
    </div>
  )
}
