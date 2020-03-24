import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import jumboImage from '../Public/Assets/exp.jpg';
import Fade from 'react-reveal/Fade';
import MenCat from '../Public/Assets/$_10.jpg';
import WomenCat from '../Public/Assets/womencat.jpg';
import KidsCat from '../Public/Assets/kidscat.jpg';
import CardHome from '../Components/CardHome';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = { 
      dataCard : [
        {
          name : 'Men',
          image: MenCat
        },
        {
          name : 'Women',
          image: WomenCat
        },
        {
          name : 'Kids',
          image: KidsCat
        },
      ],
      boolean: false
    }

    renderCardHome = () => {
      let { dataCard } = this.state;
      return dataCard.map((val) => {
        return(
          <div className='col-4' key={val.name}>
            <CardHome
              image={val.image}
              name={val.name}
            />
          </div>
        )
      })
    }

    render() { 
        return ( 
            <div>
              <div>
                <Jumbotron style={{backgroundImage : 'linear-gradient(to right, #B48C69, #F5F5F5, #F5F5F5, #F5F5F5)', height: '500px'}} >
                  <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <div>
                      <Fade bottom>
                        <div>
                            <h1 className="display-3" style={{ color: '#1E2535' }}>Finding the Perfect Pair</h1>
                        </div>
                        <div>
                          <p className="lead" style={{ color: '#1E2535' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div>
                          {/* <hr className="my-2" /> */}
                          <p className="lead">
                            <Link to='/products'>
                              <Button style={{backgroundColor: '#1E2535'}}>Shop Now</Button>
                            </Link>
                          </p>
                        </div>
                      </Fade>
                    </div>
                    <div>
                      <img src={jumboImage} alt='jmb' style={{ height : '20em' }}/>
                    </div>
                  </div>
                </Jumbotron>
              </div>
              <div style={{display: 'flex'}} className='container'>
                {this.renderCardHome()}
              </div>
            </div>
        );
    }
}
 
export default Home;