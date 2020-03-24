import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { Button } from 'reactstrap';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import { fetchDataById } from '../Redux/Action';
import { connect } from 'react-redux';

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
                label: 47
            },
        ]
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1]
        this.props.fetchDataById(id)
    }

    render() { 
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
                        data.image
                        ?
                        <img src={data.image} alt='sepatu' width='300px' height='220px'/>
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
                        <Select options={this.state.sizes}/>
                    </div>
                    <div className='py-3' style={{float: 'right'}}>
                        <Button>
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
        loading : state.product.loading
    }
}

export default connect(mapStatetoProps, { fetchDataById })(ProductDetail);