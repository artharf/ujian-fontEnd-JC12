import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Login } from '../Redux/Action'

const Review = () => {
    const [contoh, setContoh] = useState(0)
    const dispatch = useDispatch()

    const logged = useSelector((state) => {
        return {
            logged: state.auth.logged,
            role : state.auth.role
        }
    })

    const LoginHooks = () => {
        dispatch(Login({
            username : 'lianeddy',
            email : 'lianeddy@mail.com',
            role: 'admin',
            password : '123'
        }))
    }

    console.log(logged)
    // console.log(role)
    return ( 
        <div>
            <input type='button' value='-' onClick={() => setContoh(contoh-1)}/>
            {contoh}
            {logged.role}
            <input type='button' value='+' onClick={() => setContoh(contoh+1)}/>
            <input type='button' value='Login' onClick={LoginHooks}/>
        </div>
    );
}
 
export default Review;