import React from 'react';
import styles from './App.css'
import { hashHistory, Router, Route, IndexRoute, Link } from 'react-router'
export default class Home extends React.Component {
	saveExpense(event) {
		$.ajax({
		url: '/saveExpense/',
      	type:'POST',
      	data:{reason:this.refs.reason.value,price:this.refs.price.value},
      	cache: false,
      	success: function(data) {
      		if(data.success)
      			this.refs.message.innerHTML=data.message;
      	}.bind(this),
      	error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      	}.bind(this)
    });
	}
	render() {
		return (<div><h3>{ localStorage.getItem("user") }</h3>
			<Link to='/expense_sheet'>Summary</Link>
			<p>Submit your expense</p>
			<p><input type="text" ref="reason" placeholder="Spend For"  className="form-control" /></p>
			<p><input type="text" ref="price"  placeholder="Price" className="form-control" /></p>
			<p><input type="submit" className="btn btn-default" value ="Svee" onClick={this.saveExpense.bind(this)}/></p>
			<p ref="message"></p>
			</div>
		);
	}
}