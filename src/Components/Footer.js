import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
    return (
      <div style={{backgroundColor: '#1E2535', color: 'white'}}>
        <MDBFooter className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Shoesilo</h5>
                        <p>
                            Here you can use rows and columns here to organize your footer
                            content.
                        </p>
                    </MDBCol>
                    <MDBCol md="6">
                        <ul>
                          <li className="list-unstyled">
                            <a href="#!">Men</a>
                          </li>
                          <li className="list-unstyled">
                            <a href="#!">Women</a>
                          </li>
                          <li className="list-unstyled">
                            <a href="#!">Kids</a>
                          </li>
                          <li className="list-unstyled">
                            <a href="#!">About Us</a>
                          </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Shoesilo.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    </div>
    );
}

export default FooterPage;