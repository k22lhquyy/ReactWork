import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { useNavigate } from 'react-router-dom';
import validateEmail from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!name){
      setError('Invalid Name');
      return;
    }

    if(!validateEmail(email)){
      setError('Invalid Email');
      return;
    }

    if(!password){
      setError('Password is required');
      return;
    }

    setError(null);
    try {
      const response = await axiosInstance.post('/create-account', {fullname : name, email: email, password: password});
      if(response.data && response.data.acccesToken){
        localStorage.setItem('token', response.data.acccesToken);
        navigator('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
        return;
      }else{
        setError("errorr");
      }
    }


  }


  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box'></div>
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div className='w-2/4 h-[90vh] flex items-end bg-cover rouded-lg p-10 z-50 bg-login-bg-img'>
          <div>
            <h4 className='text-5xl font-semibold text-white leading-[58px]'>
              Capture Your <br /> Journeys
            </h4>
            <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
              Record your travel experiences and share them with your friends and family.
            </p>
          </div>
        </div>
        <div className='w-2/4 h-[70vh] bg-white rounded-r-lg p-16 shadow-lg shadow-cyan-200/20'>
          <form className='' action="" onSubmit={handleLogin}>
            <h4 className='text-2xl font-semibold mb-7'>Register</h4>
            <input type="text" placeholder='Full name' className='input-box' value={name} onChange={({target}) => {
              setName(target.value)
            }}/>
            <input type="text" placeholder='Email' className='input-box' value={email} onChange={({target}) => {
              setEmail(target.value)
            }}/>
            <PasswordInput value={password} onChange={({target}) => {
              setPassword(target.value)
            }}/>
            {error && <p className='text-xs text-red-500'>{error}</p>}
            <button type='submit' className='btn-primary'>CREATE ACCOUNT</button>
            <p className='text-xs text-slate-500 text-center my-4'>Or</p>
            <button type='submit' className='btn-light btn-primary' onClick={() => {
              navigator("/login")
            }}> LOGIN </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

