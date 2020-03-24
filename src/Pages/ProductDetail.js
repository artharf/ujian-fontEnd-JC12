import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { Button } from 'reactstrap';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import { fetchDataById } from '../Redux/Action';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class ProductDetail extends Component {
    state = { 
        data : {},
        sizes : [
            {
                value: 40,
                label: 40
            },
            {
                value: 41,
                label: 41
            },
            {
                value: 42,
                label: 42
            },
            {
                value: 43,
                label: 43
            },
            {
                value: 44,
                label: 44
            },
            {
                value: 45,
                label: 45
            },
            {
                value: 46,
                label: 46
            },
        ],
        selectedSize: false,
        sizeValue: 0,
        dataImage: false
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1]
        Axios.get(`${API_URL}/products/${id}`)
        .then((res) =>{
            this.setState({
                data: res.data
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    addToCart = () => {
            if(this.state.selectedSize === true){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added to Cart',
                    showConfirmButton: false,
                    timer: 1500
                  })

                  let obj = {
                    userId: this.props.userId,
                    productId: this.state.data.id,
                    name: this.state.data.name,
                    brand: this.state.data.brand,
                    price: this.state.data.price,
                    category: this.state.data.category,
                    image: this.state.data.image,
                    size: this.state.sizeValue,
                    qty: 1
                  }
            Axios.get(`${API_URL}/cart?userId=${obj.userId}&size=${obj.size}&productId=${obj.productId}`)
            .then((res) =>{
                if(res.data.length > 0){
                    Axios.patch(`${API_URL}/cart/${res.data[0].id}`, {qty: res.data[0].qty+1})
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                }else{
                    Axios.post(`${API_URL}/cart`,obj)
                }
            })
            .catch((err) => {
                console.log(err)
            })

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Please select size',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                  })
            }
    }
    selectSize = (sz) => {
        if(sz.value !== 0){
            this.setState({
                selectedSize: true,
                sizeValue: sz.value
            })
                
            
        }
    }



    render() { 
        console.log(this.props.userId)
        let { data } = this.props;
        if(this.props.loading){
            return(
                <div style={{height : '100vh'}}>
                    loading
                </div>
            )
        }
        return ( 
            <div className='row mr-0'>
                <div className='col-4 d-flex justify-content-center'>
                    {
                        this.state.data.image
                        ?
                        <img src={this.state.data.image} alt='sepatu' width='300px' height='220px'/>
                        :
                        <Loader type="Circles" color="#5A6268" height={80} width={80}/>
                    }
                </div>
                <div className='col-8 container'>
                    <div className='py-1'>
                        <h3>
                            {data.name}
                        </h3>
                    </div>
                    <div className='py-1'>
                        <h5>
                            {data.brand}
                        </h5>
                    </div>
                    <div className='py-1'>
                        {data.category}
                    </div>
                    <div className='py-1'>
                        
                        {
                            data.price
                            ?
                            <h5>
                                Rp.{data.price.toLocaleString()}
                            </h5>
                            :
                            null
                        }
                    </div>
                    <div className='py-1'>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <div className='py-1'>
                        <Select options={this.state.sizes} onChange={this.selectSize}/>
                    </div>
                    <div className='py-3' style={{float: 'right'}}>
                        <Button onClick={this.addToCart}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        data : state.product.productById,
        loading : state.product.loading,
        userId : state.auth.id

    }
}

export default connect(mapStatetoProps, { fetchDataById })(ProductDetail);