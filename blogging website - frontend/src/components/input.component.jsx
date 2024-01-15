import { useState } from "react"

const InputBox =({name,type,id,value,placeholder,icon})=>{
  const [passwordVissible,setPasswordVissible]=useState(false)
    return(
      <div className=" relative w-[100%] mb-4">
        <input 
        name={name}
        type={type == 'password'? passwordVissible ? "text" :'password':type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
        />
        <i className={" fi " + icon + " input-icon"}></i>
        {
          type == 'password'? <i onClick={()=> setPasswordVissible(!passwordVissible)} className={"fi fi-rr-eye" + (passwordVissible? "":"-crossed") + " input-icon right-4 cursor-pointer left-[auto]"}></i>:''
        }
      </div>
    )
}
export default InputBox