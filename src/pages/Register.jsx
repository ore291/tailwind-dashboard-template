import React from 'react';
import { useEffect, useState, useRef } from 'react';



const USER_REGEX=/^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX=/"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$"/

function Register() {
    const userRef = useRef();
    const errREf = useRef();

    const [user, setUser] = useState('')
    const [validNmae, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)
    
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

     const [matchPwd, setMatchPwd] = useState("");
     const [validMatch, setValidMatch] = useState(false);
     const [matchFocus, setMatchFocus] = useState(false);


    const [errMsg, setErrMsg] = useState("");
    const [success, setSucces] = useState(false)



    useEffect(() => {
        userRef.current.focus()
    },[])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result,user)
        setValidName(result)
    }, [pwd])
    
     useEffect(() => {
       const result = PWD_REGEX.test(pwd);
       console.log(result, pwd);
         setValidPwd(result);
         const match = pwd === matchPwd;
         setValidMatch(match)
     }, [pwd,matchPwd]);

    useEffect(() => {
         setErrMsg('')
     },[user,pwd,matchPwd])


  return (
    <div className="bg-white shadow-md border-t-4 border-green-600 md:w-6/12 mx-auto mt-32 rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="text-3xl font-semibold text-center text-green-700">Sign Up</h1>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
        <p className="text-red text-xs italic">
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </p>
          </div>
          


      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          match password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
      
          </div>
          


          
      <div className="flex items-center justify-center">
        <button
          className=" border md:w-96 w-48 font-bold py-2 px-4 text-white rounded-full bg-green-500 hover:bg-green-600 transition duration-900"
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Register