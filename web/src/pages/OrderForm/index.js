import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/conteleLogo.jpeg';

export default function OrderForm(){

    return(
        <div id="order-container">
            <div className="order-content">
                <img src={logoImg} alt="Contele Logo"/>
                <Form className="order-form">
                    <div className="order-box">
                        <div className="order-line">
                            <div className="order-component">
                                <h3>Contact Information:</h3>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control type="text" placeholder="First Name:" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control type="text" placeholder="Last Name:" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control type="email" placeholder="Email Address:" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control type="text" placeholder="Phone:" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option>Language:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option>Country:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            <div className="order-component">
                                <h3>Shipping Address:</h3>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control placeholder="Address Line 1:" />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control placeholder="Adress Line 2:" />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option>City:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option>State:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" placeholder="ZIP Code:" defaultValue="Choose...">
                                            <option>ZIP Code:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                        </div>

                        <div className="order-line">
                            <div className="order-component">
                                <h3>Billing Address:</h3>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control placeholder="Address Line 1:" />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control placeholder="Address Line 2:" />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option>City:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option>State:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" placeholder="ZIP Code:" defaultValue="Choose...">
                                            <option>ZIP Code:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="Use shipping address same as billing address." />
                                </Form.Group>
                            </div>

                            <div className="order-component">
                                <h3>Check the boxes below:</h3>
                                <Form.Row>
                                    <Form.Group as={Col} id="formGridCheckbox">
                                        <Form.Check type="checkbox" label="Does any vehicle need to be equiped with a fuel cut off device?" />
                                    </Form.Group>
                                    <Form.Group as={Col} id="formGridCheckbox">
                                        <Form.Check type="checkbox" label="Will any trackers be installed on a bike, truck or machinery?" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <Form.Group id="formGridCheckbox">
                                            <Form.Check type="checkbox" label="Will you need to identify the fleet drivers?" />
                                        </Form.Group>
                                    </Col>
                                    <Col/> 
                                </Form.Row>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control placeholder="How many trackers would you like to purchase?" />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <Button className="button" variant="primary" type="submit">
                        Order Now
                    </Button>
                </Form>
            </div>
        </div>
    );
}