import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Home from './home.js'
import ExpenseSheet from './expense_sheet.js'
import { hashHistory, Router, Route, IndexRoute, Link } from 'react-router'
App.title = 'Home'
App.path = '/'


const Products = () => (
  <div className="Page">
    <h1>Products</h1>
  </div>
)

Products.title = 'Products'
Products.path = '/products'

const Orders = () => (
  <div className="Page">
    <h1>Orders</h1>
  </div>
)

Orders.title = 'Orders'
Orders.path = '/orders'
Home.path = '/home';
ExpenseSheet.path ='/expense_sheet'
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path={App.path} component={App}>
      <IndexRoute component={Products} />
    </Route>
    <Route path={Orders.path} component={Orders} />
    <Route path={Home.path} component={Home} />
    <Route path={ExpenseSheet.path} component={ExpenseSheet} />
    <Route path={Products.path} component={Products} ></Route>
  </Router>
), document.getElementById('root'));
