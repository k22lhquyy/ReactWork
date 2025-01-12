import React from 'react'
import PasswordInput from '../../components/Input/PasswordInput'

const Login = () => {
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
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
          <form className='' action="" onSubmit={() => {}}>
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>
            <input type="text" placeholder='Email' className='input-box'/>
            <PasswordInput />
            <button type='submit' className='btn-primary'>Login</button>
            <p className='text-xs text-slate-500 text-center my-4'>Or</p>
            <button type='submit' className='btn-light btn-primary' onClick={() => {
              navigator("/signup")
            }}> CREATE ACCOUNT</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

