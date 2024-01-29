const storeInSession =(Key,value)=>{
return sessionStorage.setItem(Key,value)
}

const lookInSession =(Key)=>{
    return sessionStorage.getItem(Key)
    }
    const removeFromSession =(Key,value)=>{
        return sessionStorage.removeItem(Key,value)
        }

const logOutUser =()=>{
    sessionStorage.clear()
}
export {storeInSession, lookInSession,removeFromSession,logOutUser}