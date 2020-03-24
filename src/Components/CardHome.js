import React, { Component } from 'react';
import { Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap';

class CardHome extends Component{
  state ={
    data : 'lian'
  }
  render(){
    return (
      <div className='card-home'>
        <Card inverse>
          <CardImg width="100%" src={this.props.image} alt="Card image cap" style={{ height: '28em', objectFit: 'cover' }}/>
          <CardImgOverlay>
              <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <CardTitle className='card-text'>{this.props.name}</CardTitle>
              </div>
          </CardImgOverlay>
        </Card>
      </div>
    );
  }
};

export default CardHome;