import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import OrderForm from './pages/OrderForm';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/orderForm" component={OrderForm} />
            </Switch>
        </BrowserRouter>
    );
}