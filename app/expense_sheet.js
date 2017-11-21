import React from 'react';
import styles from './App.css'
export default class ExpenseSheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data:[],search:''};
	}
	componentDidMount() {
		this.loadData();
	}
	searchExpense(event) { 
		if(event.keyCode == 13){
			this.setState({search:this.refs.search.value},function () {
    console.log(this.state.search);this.loadData();
});
			
		}
	}
	loadData()
	{
		$.ajax({
		url: '/showExpense/',
      	type:'POST',
      	data:{id:this.state.search},
      	cache: false,
      	success: function(data) {
      		this.setState({data:data.data});
      		console.log(data)
      	}.bind(this),
      	error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      	}.bind(this)
      	});
	}
	render() {
		return (<div><h3>{ localStorage.getItem("user") }</h3>
			<p><input type="text" placeholder="Search" className="form-control" ref="search" onKeyUp={this.searchExpense.bind(this)}/></p>
			<p>Expense History</p>
			<table className="table">
			<thead><tr><th>ID</th><th>Reason</th><th>Price</th></tr></thead>
			<tbody>
			{this.state.data.map(function(obj,i){
				return <tr key={i}><td>{i+1}</td><td>{obj.reason}</td><td>{obj.price}</td></tr>
			})}
			</tbody>
			</table>
			</div>
		);
	}
}