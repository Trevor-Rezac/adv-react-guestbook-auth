import React from 'react';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signUp } = useUserContext();
  const history = useHistory();
  const location = useLocation()

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
    await login(email, password);
    const url = location.search.from ? location.search.from.pathname : '/';
    history.replace(url)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
    await signUp(email, password);
    const url = location.search.from ? location.search.from.pathname : '/';
    history.replace(url)
    } catch (error) {
      setError(error.message)
    }
  }

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
          <button onClick={handleSignIn} type='sign-in'>Sign In</button>
          <button onClick={handleSignUp} type='sign-up'>Sign Up</button>  
        </div>
      </form>
      <p>{error}</p>
    </div>
  )
}