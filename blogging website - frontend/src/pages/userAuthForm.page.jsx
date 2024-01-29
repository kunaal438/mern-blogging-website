import React, { useContext, useRef } from 'react'
import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png'
import { Link, Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import {Toaster,toast} from 'react-hot-toast'
import axios from 'axios'
import { storeInSession } from '../common/session'
import { UserContext } from '../App'
import { authWithGoogle } from '../common/firebase'


const UserAuthForm = ({type}) => {
  // const authForm = useRef();

  // const clearFormFields = () => {
  //   // Access the current property and reset the form fields
  //   authForm.current.reset();
  // };
  let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
  console.log(access_token);
    const userAuthThroughServer =(serverRoute,formData)=>{
      

      axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({data})=>{
        // clearFormFields();
        storeInSession("user",JSON.stringify(data))
        setUserAuth(data)
      })
      .catch(({response})=>{
        console.error(response);
        toast.error(response.data.error)
      })
    }


  const handleSubmit =(e)=>{
    e.preventDefault();

    let serverRoute = type == "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ // regex for password

    // formData
    
    let form = new FormData(formElement)
    let formData ={};
    for(let [key,value] of form.entries()){
      formData[key]=value
    }

  
     let{fullname,email,password}=formData;
    // validation
  
   if(fullname){
    if (fullname.length < 3) {
      //403 is for validation error
      return toast.error('fullname must be at least 3 letters long')
    }
   }
    
    if (!email.length) {
      return toast.error('Enter Email' )
    }
    if (!emailRegex.test(email)) {
      return toast.error('Invalid Email' )
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
          'password should be 6 to 20 long with a numeric, 1 lowercase and 1 Uppercase')
    }

    userAuthThroughServer(serverRoute, formData)

  }

  const handleGoogleAuth =(e)=>{
    e.preventDefault();

    authWithGoogle().then(
      (user)=>{
        let serverRoute = '/google-auth';
        let formData ={
          access_token:user.accessToken
        }
        userAuthThroughServer(serverRoute,formData)
      }
    ).catch(err=>{
      toast.error('trouble login through google');
      return console.log(err)
    })

  }

  return (
    access_token? <Navigate to="/" /> :
    <AnimationWrapper keyValue={type}>
    <section className=' h-cover flex items-center justify-center'>
    <Toaster/>
        <form action="" className='w-[80%] max-w-[400px]' id='formElement'>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>{type =='sign-in' ?'Welcome Back': 'Join Us Today'}</h1>
            {type != 'sign-in'? <InputBox
            name={'fullname'}
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
            <button className='btn-dark center mt-14' type='submit' onClick={handleSubmit}>
              {type.replace("-"," ")}  </button>
              <div className=' relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
                <hr className=' w-1/2 border-black'/> 
                <p>Or</p>
                <hr className=' w-1/2 border-black'/>
              </div>
              <button onClick={handleGoogleAuth} className='btn-dark flex items-center justify-center gap-4 w-[90%] center'>
                <img src={googleIcon} className='w-5' /> continue with google</button>
                {
                  type =='sign-in'?
                  <p className='mt-6 text-dark-grey text-xl text-center'>Don't have an account? <Link to='/signup' className='underline text-black text-xl ml-1 '>Sign up here </Link></p>:<p className='mt-6 text-dark-grey text-xl text-center'>Already a member? <Link to='/signin' className='underline text-black text-xl ml-1 '>Sign in here </Link></p>
                }
        </form>
    </section>
    </AnimationWrapper>
  )
}

export default UserAuthForm