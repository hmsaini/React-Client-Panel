import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import {notifyUser} from '../../actions/notifyActions';
import Alert from '../layout/Alert';

 class Login extends Component {

    state={
email:'',
password:''
    };

    onSubmit=(e)=>{
e.preventDefault();

const {firebase,notifyUser}=this.props;
const {email,password}=this.state;

firebase.login({
email,
password
})
// .catch(err=> alert('Invalid Login Credentials'));
.catch(err=>notifyUser('Invalid Login Credentials','error'));
    };

    onChange=(e)=>{
this.setState({[e.target.name]:e.target.value});
    };

  render() {
      const {message,messageType}=this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-body">

                {message ? (
                    <Alert message={message} messageType={messageType}></Alert>
                ) : null}

                    <h1 className="text-center pb-4 pt-3">
                    <span className="text-primary">
                        <i className="fa fa-lock"></i>{' '}
                        Login
                    </span>
                    </h1>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.onChange}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                            type="password"
                            className="form-control"
                            name="password"
                            required
                            value={this.state.password}
                            onChange={this.onChange}
                            ></input>
                        </div>

                        <input type="submit" 
                        value="Login" 
                        className="btn btn-primary btn-block"></input>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

// export default Login;

Login.proTypes={
    firebase:PropTypes.object.isRequired,
    notify:PropTypes.object.isRequired,
    notifyUser:PropTypes.func.isRequired
}

// export default firebaseConnect()(Login);

export default compose(
firebaseConnect(),
connect((state,props)=>({
    notify:state.notify
}),{notifyUser})
)(Login);
