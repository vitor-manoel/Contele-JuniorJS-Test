import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/conteleLogo.jpeg';

import api from '../../services/api';

export default function OrderForm(){

    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');

    const [shippingAddress1, setSAddress1] = useState('');
    const [shippingAddress2, setSAddress2] = useState('');
    const [shippingCity, setSCity] = useState('');
    const [shippingState, setSState] = useState('');
    const [shippingZIPCode, setSZIPCode] = useState('');

    const [billingAddress1, setBAddress1] = useState('');
    const [billingAddress2, setBAddress2] = useState('');
    const [billingCity, setBCity] = useState('');
    const [billingState, setBState] = useState('');
    const [billingZIPCode, setBZIPCode] = useState('');
    const [sameShipping, setSameShipping] = useState(false);

    const [fuelCut, setFuelCut] = useState(false);
    const [trackersInstall, setTrackersI] = useState(false);
    const [identifyDrivers, setIdentifyD] = useState(false);
    const [trackersAcquisition, setTrackersA] = useState(0);

    async function handlePostOrder(e){
        e.preventDefault();

        const contact = {
            firstName,
            lastName,
            email,
            phone,
            language,
            country
        };

        const address1 = {
            shippingAddress1,
            shippingAddress2,
            shippingCity,
            shippingState,
            shippingZIPCode
        };

        const address2 = {
            billingAddress1,
            billingAddress2,
            billingCity,
            billingState,
            billingZIPCode
        };

        const checkBoxes = {
            fuelCut,
            trackersInstall,
            identifyDrivers,
            trackersAcquisition
        };

        try {
            await api.post('orders', {contact, address1, address2, checkBoxes});
        }catch(err){
            alert('Erro ao enviar solicitação, tente novamente.');
        }
    }

    return(
        <div id="order-container">
            <div className="order-content">
                <img src={logoImg} alt="Contele Logo"/>
                <Form className="order-form" onSubmit={handlePostOrder}>
                    <div className="order-box">
                        <div className="order-line">
                            <div className="order-component">
                                <h3>Contact Information:</h3>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control 
                                        type="text" 
                                        placeholder="First Name:" 
                                        pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                                        value={firstName}
                                        onChange={e => setFName(e.target.value)}
                                        required/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Last Name:" 
                                        pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                                        value={lastName}
                                        onChange={e => setLName(e.target.value)}
                                        required/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control 
                                        type="email" 
                                        placeholder="Email Address:"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control 
                                        type="tel" 
                                        placeholder="Phone:" 
                                        pattern="[0-9]+$" 
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        required/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={language}
                                        onChange={setLanguage}>
                                            <option>Language:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={country}
                                        onChange={setCountry}>
                                            <option>Country:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            <div className="order-component">
                                <h3>Shipping Address:</h3>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control 
                                    placeholder="Address Line 1:" 
                                    value={shippingAddress1}
                                    onChange={e => setSAddress1(e.target.value)}
                                    required/>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control 
                                    placeholder="Adress Line 2:" 
                                    value={shippingAddress2}
                                    onChange={e => setSAddress2(e.target.value)}/>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={shippingCity}
                                        onChange={setSCity}>
                                            <option>City:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={shippingState}
                                        onChange={setSState}>
                                            <option>State:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={shippingZIPCode}
                                        onChange={setSZIPCode}>
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
                                    <Form.Control 
                                    placeholder="Address Line 1:" 
                                    value={billingAddress1}
                                    onChange={e => setBAddress1(e.target.value)}
                                    required/>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control 
                                    placeholder="Address Line 2:"
                                    value={billingAddress2}
                                    onChange={e => setBAddress2(e.target.value)}/>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={billingCity}
                                        onChange={setBCity}>
                                            <option>City:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={billingState}
                                        onChange={setBState}>
                                            <option>State:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={billingZIPCode}
                                        onChange={setBZIPCode}>
                                            <option>ZIP Code:</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check 
                                    type="checkbox" 
                                    label="Use shipping address same as billing address." 
                                    value={sameShipping}
                                    onChange={e => setSameShipping(e.target.value)}/>
                                </Form.Group>
                            </div>

                            <div className="order-component">
                                <h3>Check the boxes below:</h3>
                                <Form.Row>
                                    <Form.Group as={Col} id="formGridCheckbox">
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Does any vehicle need to be equiped with a fuel cut off device?"
                                        value={fuelCut}
                                        onChange={e => setFuelCut(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group as={Col} id="formGridCheckbox">
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Will any trackers be installed on a bike, truck or machinery?"
                                        value={trackersInstall}
                                        onChange={e => setTrackersI(e.target.value)}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <Form.Group id="formGridCheckbox">
                                            <Form.Check 
                                            type="checkbox" 
                                            label="Will you need to identify the fleet drivers?"
                                            value={identifyDrivers}
                                            onChange={e => setIdentifyD(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col/> 
                                </Form.Row>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="How many trackers would you like to purchase?"
                                    value={setTrackersA}
                                    onChange={e => setTrackersA(e.target.value)}/>
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