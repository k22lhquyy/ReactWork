import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, placeholder }) => {

  const [isShowPassword, setIsShowPassword] = useState(false);
  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <div className='flex items-center bg-cyan-600/5 px-5 rounded mb-3'>
      <input type={isShowPassword ? 'text' : 'password'} 
        value={value}
        placeholder={placeholder || "Password"}
        onChange={onChange}
        className='w-full text-sm bg-transparent py-3 rounded outline-none'/>
      {isShowPassword ?
        <FaRegEye onClick={togglePassword} className='text-primary cursor-pointer'/>
        :
        <FaRegEyeSlash onClick={togglePassword} className='text-primary cursor-pointer'/>
      }
      
    </div>
  )
}

export default PasswordInput
