import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2';
import { fetchDataById } from '../Redux/Action';
import { connect } from 'react-redux';

class Transaction extends Component {
    state = {
        data: []
    }


    componentDidMount = () => {

        Axios.get(`${API_URL}/transaction?userId=${this.props.userId}`)
        .then((res) =>{
            console.log(res.data)
            this.setState({
                data : res.data
            });
        })
        .catch((err) => {
            console.log(err)
        })    }

    renderTransaction = () => {
        return this.state.data.map(val => {
            return (
                <React.Fragment key={val.id}>
                    <tr className="table-success" key={val.id}>
                        <td colSpan='4'>{val.date}</td>
                        <td>Rp. {val.grandTotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td colSpan='5'>
                            <Button className='float-right' color='primary' onClick={() => this.showDetail(val.product, val.grandTotal, val.date)}>
                                Click For Details ({val.product.length} {val.product.length > 1 ? 'items' : 'item'})
                            </Button>
                        </td>
                    </tr>
                </React.Fragment>
            )
        })
    }

    showDetail = (product, grandTotal, date) => {
        let innerHtml = `<strong><p>Pembelian pada tanggal: ${date}</p></strong><hr />`
        product.forEach((val) => {
            innerHtml += `<img width='30%' src='${val.image}' alt='foto'/>
            <h5>${val.name}</h5>
            <p>Size: ${val.size}</p>
            <p>Quantity: ${val.qty} (@ Rp.${val.price.toLocaleString()})</p>
            <p>Subtotal: Rp. ${(val.qty * val.price).toLocaleString()}</p>
            <hr/>
            `
        })
        innerHtml += `<strong>Grand Total: Rp. ${grandTotal.toLocaleString()}</strong>`
        Swal.fire({
            html: innerHtml
        })
    }


    render() { 
        if(this.state.data.length === 0 ){
            return(
                <h1 style={{'textAlign' : 'center'}}>You don't have any transaction history.</h1>
            )
        }
        return ( 
            <div>
                <h1>Halaman Transaction</h1>
                <Table style={{'width': '75%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                    <thead>
                        <tr>
                            <th colSpan='4'>Tanggal</th>
                            <th>Total Belanja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransaction()}
                    </tbody>
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

export default connect(mapToSetProps, { fetchDataById })(Transaction);