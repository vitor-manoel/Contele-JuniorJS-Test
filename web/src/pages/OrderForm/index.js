/*#######################################################################
# - Dependências :                                                      #
#######################################################################*/
import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

//Importação de estilos :
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Importação da Logo Contele
import logoImg from '../../assets/conteleLogo.jpeg';

//Objeto de comunicação com Back-end
import api from '../../services/api';

export default function OrderForm(){

    //Exemplo amostral de linguagens
    const languageSample = [
        ["en-us", "English (United States)"],
        ["en-ca", "English (Canada)"],
        ["fr", "French"],
        ["de", "German"],
        ["de-ch", "German (Switzerland)"],
        ["it", "Italian"],
        ["ja", "Japanese"],
        ["ko", "Korean"],
        ["pl", "Polish"],
        ["pt", "Portuguese (Portugal)"],
        ["pt-br", "Portuguese (Brazil)"],
        ["ru", "Russian"],
        ["es", "Spanish (Spain)"],
    ];

    //Exemplo amostral de CEP's (Foi pensando em usar jQuery para auto complete à partir do CEP)
    const zipCodeSample = ["94027", "10011", "93108", "10128", "10007", "10075", "90077", "98039", "07620"];

    //Importando lista de países/cidades/estados JSON
    const ccsJSON = require('countrycitystatejson');

    //Constantes de Estados dos componentes (Formulário Contato) :
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');

    //Constantes de Estados dos componentes (Formulário Endereço de Remessa) :
    const [shippingAddress1, setSAddress1] = useState('');
    const [shippingAddress2, setSAddress2] = useState('');
    const [shippingCity, setSCity] = useState('');
    const [shippingState, setSState] = useState('');
    const [shippingZIPCode, setSZIPCode] = useState('');

    //Constantes de Estados dos componentes (Formulário Endereço de Faturamento) :
    const [billingAddress1, setBAddress1] = useState('');
    const [billingAddress2, setBAddress2] = useState('');
    const [billingCity, setBCity] = useState('');
    const [billingState, setBState] = useState('');
    const [billingZIPCode, setBZIPCode] = useState('');
    const [sameShipping, setSameShipping] = useState(false);

    //Listas de paises/cidades/estados (ccsJSON) :
    const countryList = ccsJSON.getCountries();
    const stateList = ccsJSON.getStatesByShort('US');
    const [sCityList, setSCityList] = useState([]);
    const [bCityList, setBCityList] = useState([]);

    /*#######################################################################
    # - Controle de Associação Estados -> Cidades :                         #
    #######################################################################*/
    useEffect(() => {
        function loadCities(){
            setSCityList(ccsJSON.getCities('US', shippingState));
            setBCityList(ccsJSON.getCities('US', billingState));
        }
        loadCities();
    }, [ccsJSON, shippingState, billingState]);

    /*#######################################################################
    # - Controle de Associação ShippingForm -> BillingForm :                #
    #######################################################################*/
    useEffect(() => {
        function sincroShippingBilling() {
            if(sameShipping){
                setBAddress1(shippingAddress1);
                setBAddress2(shippingAddress2);
                setBCity(shippingCity);
                setBState(shippingState);
                setBZIPCode(shippingZIPCode);
            };

            let billingForm = [
                document.getElementById("bAddress1"),
                document.getElementById("bAddress2"),
                document.getElementById("bCity"),
                document.getElementById("bState"),
                document.getElementById("bZIPCode"),
            ];

            billingForm.forEach(input => {
                input.disabled = sameShipping;
            });
        }
        sincroShippingBilling();
    }, [sameShipping, shippingAddress1, shippingAddress2, shippingState, shippingCity, shippingZIPCode]);

    //Constantes de Estados dos componentes (Caixa de Seleção) :
    const [fuelCut, setFuelCut] = useState(false);
    const [trackersInstall, setTrackersI] = useState(false);
    const [identifyDrivers, setIdentifyD] = useState(false);
    const [trackersAcquisition, setTrackersA] = useState('');

    //Função de Submit do Formulário (POST) :
    async function handlePostOrder(e){
        e.preventDefault();
        //Contato - Object
        const contact = {
            firstName,
            lastName,
            email,
            phone,
            language,
            country
        };
        //Endereço de Remessa - Object
        const address1 = {
            shippingAddress1,
            shippingAddress2,
            shippingCity,
            shippingState,
            shippingZIPCode
        };
        //Endereço de Faturamento - Object
        const address2 = {
            billingAddress1,
            billingAddress2,
            billingCity,
            billingState,
            billingZIPCode
        };
        //Caixa de Seleção - Object
        const checkBoxes = {
            fuelCut,
            trackersInstall,
            identifyDrivers,
            trackersAcquisition
        };

        //Tentativa de comunicação com servidor Back-end (api) :
        try {
            //Aguardar execução do método POST :
            await api.post('orders', {contact, address1, address2, checkBoxes});
            //Mensagem de sucesso :
            alert("Order sent successfully!");
            //Recarregar página
            window.location.reload();
        }catch(err){
            //Mensagem de falha :
            alert("Failure on request - " + err.message);
        }
    }

    /*#######################################################################
    # - Renderização da página :                                            #
    #######################################################################*/
    return(
        <div id="order-container">
            <div className="order-content">
                <img src={logoImg} alt="Contele Logo"/>
                <Form className="order-form" onSubmit={handlePostOrder}>
                    <div className="order-box">
                        <div className="order-line">
                            <div className="order-component">
                                {/*Formulário de Contato (Foi pensando em dividir em componentes)*/}
                                <h3>Contact Information:</h3>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridFirstName">
                                        <Form.Control 
                                        type="text" 
                                        placeholder="First Name:" 
                                        value={firstName}
                                        onChange={e => setFName(e.target.value)}
                                        required/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLastName">
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

                                    <Form.Group as={Col} controlId="formGridPhone">
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
                                    <Form.Group as={Col} controlId="formGridLanguage">
                                        <Form.Control 
                                        as="select" 
                                        value={language}
                                        onChange={e => setLanguage(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>Language:</option>
                                            {languageSample.map(language => {
                                                return(<option value={language[0]}>{language[1]}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCountry">
                                        <Form.Control 
                                        as="select" 
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>Country:</option>
                                            {countryList.map(country => {
                                                return(<option value={country.shortName}>{country.name}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </div>

                            <div className="order-component">
                                {/*Formulário de Endereço da Remessa*/}
                                <h3>Shipping Address:</h3>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control 
                                    id="sAddress1"
                                    placeholder="Address Line 1:" 
                                    value={shippingAddress1}
                                    onChange={e => setSAddress1(e.target.value)}
                                    required/>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control 
                                    id="sAddress2"
                                    placeholder="Adress Line 2:" 
                                    value={shippingAddress2}
                                    onChange={e => setSAddress2(e.target.value)}/>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control
                                        id="sCity"
                                        as="select" 
                                        value={shippingCity}
                                        onChange={e => setSCity(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>City:</option>
                                            {sCityList.map(city => {
                                                return(<option>{city}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        id="sState"
                                        as="select" 
                                        value={shippingState}
                                        onChange={e => setSState(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>State:</option>
                                            {stateList.map(state => {
                                                return(<option>{state}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZIPCode">
                                        <Form.Control 
                                        id="sZIPCode"
                                        as="select" 
                                        value={shippingZIPCode}
                                        onChange={e => setSZIPCode(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>ZIP Code:</option>
                                            {zipCodeSample.map(zipCode => {
                                                return(<option>{zipCode}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                        </div>

                        <div className="order-line">
                            <div className="order-component">
                                {/*Formulário de Endereço do Faturamento*/}
                                <h3>Billing Address:</h3>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control 
                                    id="bAddress1"
                                    placeholder="Address Line 1:" 
                                    value={billingAddress1}
                                    onChange={e => setBAddress1(e.target.value)}
                                    required/>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Control 
                                    id="bAddress2"
                                    placeholder="Address Line 2:"
                                    value={billingAddress2}
                                    onChange={e => setBAddress2(e.target.value)}/>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control 
                                        id="bCity"
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={billingCity}
                                        onChange={e => setBCity(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>City:</option>
                                            {bCityList.map(city => {
                                                return(<option>{city}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control 
                                        id="bState"
                                        as="select" 
                                        defaultValue="Choose..." 
                                        value={billingState}
                                        onChange={e => setBState(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>State:</option>
                                            {stateList.map(state => {
                                                return(<option>{state}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZIPCode">
                                        <Form.Control 
                                        id="bZIPCode"
                                        as="select" 
                                        value={billingZIPCode}
                                        onChange={e => setBZIPCode(e.target.value)}
                                        required>
                                            <option value='' disabled selected hidden>ZIP Code:</option>
                                            {zipCodeSample.map(zipCode => {
                                                return(<option>{zipCode}</option>);
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check 
                                    id="sameShipping"
                                    type="checkbox" 
                                    label="Use shipping address same as billing address." 
                                    value={sameShipping}
                                    onChange = {e => setSameShipping(e.target.checked)}/>
                                </Form.Group>
                            </div>

                            <div className="order-component">
                                {/*Formulário de Caixa de seleção*/}
                                <h3>Check the boxes below:</h3>
                                <Form.Row>
                                    <Form.Group as={Col} id="formGridCheckbox">
                                        <Form.Check 
                                        className="order-checkBox"
                                        type="checkbox" 
                                        label="Does any vehicle need to be equiped with a fuel cut off device?"
                                        value={fuelCut}
                                        onChange={e => setFuelCut(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group as={Col} id="formGridCheckbox">
                                        <Form.Check
                                        className="order-checkBox"
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
                                            className="order-checkBox"
                                            type="checkbox" 
                                            label="Will you need to identify the fleet drivers?"
                                            value={identifyDrivers}
                                            onChange={e => setIdentifyD(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col/> 
                                </Form.Row>

                                <Form.Group>
                                    <Form.Control 
                                    type="number" 
                                    min="1"
                                    max="100"
                                    placeholder="How many trackers would you like to purchase?"
                                    value={trackersAcquisition}
                                    onChange={e => setTrackersA(e.target.value)}
                                    required/>
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