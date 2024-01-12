import React from 'react'
import InputBox from '../components/input.component'

const UserAuthForm = ({type}) => {
  return (
    <section className=' h-cover flex items-center justify-center'>
        <form action="" className='w-[80%] max-w-[400px]'>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>{type =='sign-in' ?'Welcome Back': 'Join Us Today'}</h1>
            {type != 'sign-in'? <InputBox
            name={'firstName'}
            placeholder={'Full Name'}
            type={'text'}
            icon={'fi-rr-user'}

            /> :''}
            <InputBox
            name={'email'}
            placeholder={'Email'}
            type={'email'}
            icon={'fi-rr-envelope'}

            />
             <InputBox
            name={'password'}
            placeholder={'Password'}
            type={'password'}
            icon={'fi-rr-key'}

            />
        </form>
    </section>
  )
}

export default UserAuthForm