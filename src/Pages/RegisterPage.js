import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';

class LoginPage extends Component {
    state = {  }

    onBtnRegister = () => {
        let username = this.username.value;
        let email = this.email.value;
        let password = this.password.value;
        let confirmPass = this.confirmPass.value;
        checkPassword = (password) => {
            let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
            if(password.value.match(paswd) === confirmPass.value.match(paswd)){
                axios.get(`${API_URL}/users?username=${username}`)
                .then((res) => {
                    if(res.data.length > 0){
                        window.alert('Username already exists')
                    }else{
                        axios.post(`${API_URL}/users`, {
                            username,
                            email, 
                            password,
                            role : 'user'
                        })
                        .then((res) => {
                            console.log(res.data)
                            let { username , email, role, id } = res.data;
                            this.props.Login({
                                username,
                                email,
                                role,
                                id
                            })
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                window.alert('Invalid Password')
            }

        }

    }



    


    render() { 
        if(this.props.logged){
            return(
                <Redirect to='/'/>
            )
        }

        return ( 
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Email</Label>
                      <Input type="text" name="password" id="examplePassword" placeholder="Email" innerRef={(email) => this.email = email} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Confirm Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnRegister}>
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
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}
 
export default connect(mapStatetoProps, {Login} )(LoginPage);