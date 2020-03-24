import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { fetchDataById } from '../Redux/Action';


class CartPage extends Component {
    state = {
        data : [],
        grandTotal : 0,
        finishCart : false
        
    }

    


    componentDidMount = () => {
        let token = localStorage.getItem('token')
        let user = JSON.parse(token)
        this.setState({
            grandTotal: 0
        })
        Axios.get(`${API_URL}/cart?userId=${user.id}`)
        .then((res) =>{
            console.log(res.data)
            this.setState({
                data : res.data
            });
             this.countGrandTotal()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteData = (id, image, num) => {
        console.log(num)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            confirmButtonText: 'Yes, delete it!',
            imageUrl : image,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/cart/${id}`)
                .then((res) => {
                    console.log(res)
                    Axios.get(`${API_URL}/cart`)
                    .then((res) =>{
                        this.setState({
                            data: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })      
                })
                .catch((err) => {
                    console.log(err)
                })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if(!result.value && num) {
                this.handleBtn(id, (num*num))
            }
          })
    }


    handleBtn = (id, num) => {
        return(
            Axios.get(`${API_URL}/cart?userId=${this.props.userId}&id=${id}`)
            .then((res) => {
                console.log(res.data)
                Axios.patch(`${API_URL}/cart/${res.data[0].id}`,{qty: res.data[0].qty+num})
                .then((res) =>{
                    if(res.data.qty === 0){
                        this.deleteData(id, res.data.image, num)
                    }
                    this.componentDidMount()
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        )
    }

    renderTable = () => {
		return this.state.data.map(val => {
			return (
				<tr key={val.id}>
					<td>{val.id}</td>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt='gambar sepatu' height='60px' width='60px' />
					</td>
					<td>{val.size}</td>
					<td>
						<div className='text-center'>
							<Button color='warning' onClick={() => this.handleBtn(val.id, -1)}>-</Button>
							<span className='m-3'>{val.qty}</span>
							<Button color='danger' onClick={() => this.handleBtn(val.id, 1)}>+</Button>
						</div>
					</td>
					<td>Rp {(val.price*val.qty).toLocaleString()}</td>
					<td>
						<Button color='danger' onClick={() => this.deleteData(val.id, val.image)}>
							<FaTrash />
						</Button>
					</td>
				</tr>
			)
		})
    }
    
    countGrandTotal = () => {
       this.state.data.forEach((val) => {
            this.setState(prevState => {
                return{
                    grandTotal: prevState.grandTotal + (val.price * val.qty)
                }
            })
       })
    }


    toPayment = () => {
        Swal.fire({
            title: 'Continue to Transaction?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
              Axios.get(`${API_URL}/cart?userId=${this.props.userId}`)
              .then((res) => {
                let newDate = new Date()
                let longDate = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}, ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
                let obj = {
                    userId: this.props.userId,
                    grandTotal: this.state.grandTotal,
                    date: longDate,
                    product: res.data
                }
                  Axios.post(`${API_URL}/transaction`, obj)
                  .then((res) =>{
                    console.log(res)
                  })
                  .catch((err) =>{
                      console.log(err)
                  })
                  this.setState({
                      finishCart : true
                  })
                res.data.forEach((val) => {
                    Axios.delete(`${API_URL}/cart/${val.id}`)
                })
              })
            if (result.value) {
              Swal.fire(
                'Success!',
                'Continue Payment',
                'success'
              )
            }
          })
        

    }


    render(){
        if(this.state.finishCart === true){
            return(
                <Redirect to='/TransactionPage' />
            )
        }
        console.log(this.state.finishCart)
        return ( 
            <div>
                <h1 style={{'textAlign' : 'center'}}>Cart</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th width='20%' >Image</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th width='30%' >Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='5' style={{textAlign: 'right'}} >Grand Totale</td>
                            <td>Rp. {this.state.grandTotal.toLocaleString('id-ID')}</td>
                            <td><Button color='success' onClick={this.toPayment}>Payment</Button></td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

const mapToSetProps = (state) => {
    return{
        userId : state.auth.id
    }
}



export default connect(mapToSetProps, { fetchDataById })(CartPage)