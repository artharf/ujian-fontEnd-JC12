import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { Login } from '../Redux/Action'

const RegisterHooks = () => {

    const [formInput, setForm] = useState({
        username: '',
        email: '',
        password:'',
        confirmPass: ''
    })

    const handleOnChange = (e) => {
        setForm({
            ...formInput,
            [e.target.name] : e.target.value
        })
    }

    const logged = useSelector(({ auth }) => auth.logged)

    const dispatch = useDispatch()

    const onBtnRegister = async () => {
        let { username, email, password, confirmPass } = formInput
        let res = await Axios.get(`${API_URL}/users?username=${username}`)
        console.log(res)
        if(password === confirmPass){
            if(res.data.length > 0){
                window.alert('Username already taken')
            }else{
                let post = await Axios.post(`${API_URL}/users`, {
                    username,
                    email, 
                    password,
                    role: 'user'
                })
                dispatch(Login(post.data))
            }
        }else{
            window.alert('Invalid Password')
        }
    }
    if(logged){
        return(
            <Redirect to='/'/>
        )
    }
    return ( 
        <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
            <Form style={{width : '400px', height: '400px'}}>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input type="text" name="username" id="exampleEmail" placeholder="Username" onChange={handleOnChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Email</Label>
                    <Input type="text" name="email" id="examplePassword" placeholder="Email" onChange={handleOnChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={handleOnChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Confirm Password</Label>
                    <Input type="password" name="confirmPass" id="examplePassword" placeholder="Password" onChange={handleOnChange}/>
                </FormGroup>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button onClick={onBtnRegister}>
                        Register
                    </Button>
                    <Link to='/login'>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    )
}
 
export default RegisterHooks;