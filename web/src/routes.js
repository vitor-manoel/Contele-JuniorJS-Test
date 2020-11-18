/*#######################################################################
# - Dependências :                                                      #
#######################################################################*/
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Instânciando página 'OrderForm' :
import OrderForm from './pages/OrderForm';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={OrderForm} /> {/*Definição de rota para página 'OrderForm'*/}
            </Switch>
        </BrowserRouter>
    );
}