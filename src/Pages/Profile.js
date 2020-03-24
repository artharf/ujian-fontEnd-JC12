import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Link,Redirect } from 'react-router-dom';
import { Login } from '../Redux/Action'


class Profile extends Component {
    state = { 
        data: []
     }

    componentDidMount = () => {
        let token = localStorage.getItem('token')
        let user = JSON.parse(token)
        Axios.get(`${API_URL}/users?id=${user.id}`)
        .then((res) =>{
            this.setState({
                data : res.data
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    } 
    
    changePassword = () => {
        let token = localStorage.getItem('token')
        let user = JSON.parse(token)
        let password = this.password;

        
            Axios.get(`${API_URL}/users?password=${user.password}`)
            .then((res) =>{
                Axios.patch(`${API_URL}/users/${password}`)
                .then((res) => {
                    this.componentDidMount()
                })
                .catch((err) =>{
                    console.log(err)
                })
            })
            
        }
    

    



    render() { 
        return ( 
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                <div style={{textAlign : 'center'}, {padding :'0px 200px 450px 0px'}}>
                    <h5>Change your password here ! </h5>
                </div>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                      {/* <Input type="confirmPass" name="confirmPass" id="exampleConfirmPass" placeholder="confirmPass" innerRef={(confirmPass) => this.confirmPass = confirmPass}/> */}
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <td><Button color='success' onClick={this.changePassword}>Change Password</Button></td>
                    </div>
                </Form>
            </div>
         );

   
    }
}
 
const mapToStateProps = (state) =>{
    return{
        logged: state.auth.logged
    }
}

export default connect(mapToStateProps, { Login }) (Profile) ;