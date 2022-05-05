import React from 'react';
import { useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (
    <div>
      <h2>Sign In / Sign Up</h2>
      <form>
        <input 
          type='email'
          value={email}
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input 
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type='sign-in'>Sign In</button>
          <button type='sign-up'>Sign Up</button>  
        </div>
      </form>
    </div>
  )
}