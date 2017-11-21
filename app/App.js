import React from 'react';
import styles from './App.css';
import { hashHistory, Router, Route, Link } from 'react-router'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  handleAuth(event){
    $.ajax({
      url: '/auth/getToken/',
      type:'POST',
      data:{email:this.refs.user.value,password:this.refs.password.value},
      cache: false,
      success: function(data) {
       // this.setState({data: data});
        if(data.success) {
          localStorage.setItem("token",data.token);
          localStorage.setItem("user",data.user);
          hashHistory.push('/home')
        }
        else
        {
          this.refs.message.innerHTML = data.message;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  render() {
    return (
      <div className={styles.app}>
        <p>
        <input type="text" ref="user" placeholder="UserName" className="form-control"/>
        </p>
        <p><input type="password" ref="password" placeholder= "Password" className="form-control" /></p>
        <p><input type="button" className="btn btn-default" value="Login" onClick={this.handleAuth.bind(this)} /></p>
        <p ref="message"></p>
      </div>
    );
  }
}
