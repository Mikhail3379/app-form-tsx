import React, { useState } from 'react';

import './App.css';

import axios from 'axios';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!firstName || !lastName || !dob || !email || !address || !postCode || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}$/.test(postCode)) {
      setError('Invalid UK post code');
      return;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Invalid email');
      return;
    }
    axios.post('/index.php', {
      firstName,
      lastName,
      dob,
      email,
      address,
      postCode,
      password
    }).then((res) => {
      setError('');
    }).catch((err) => {
      setError('Error submitting form');
    });
  }

  return (
    <form className='form-container'    onSubmit={handleSubmit}>
      <input type="text" className='form-input'  placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <br />
      <input type="text" className='form-input'  placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <br />
      <input type="date" className='form-input'  placeholder="Date of Birth" value={dob} onChange={e => setDob(e.target.value)} />
      <br />
      <input type="email" className='form-input' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="text" className='form-input'  placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
      <br />
      <input type="text" className='form-input-postcode' placeholder="UK Post Code" value={postCode} onChange={e => setPostCode(e.target.value)} />
      <br />
      <input type="password" className='form-input-password' placeholder="Create Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
        <input type="password" className='form-input-confirm-password' placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <br />
        <button type="submit" className='form-submit'>Submit</button>
        
        {error && <p>{error}</p>}
    </form>
    );
}

export default Form;
