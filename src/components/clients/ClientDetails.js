import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import classnames from 'classnames';

 class ClientDetails extends Component {

    state={
        showBalanceUpdate:false,
        balanceUpdateAmount:''
    };

    onChange=(e)=>{
this.setState({[e.target.name]:e.target.value});
    };

    // Update Balance
    balanceSubmit=(e)=>{
e.preventDefault();

const {client,firestore}=this.props;
const {balanceUpdateAmount}=this.state;

// console.log(this.state.balanceUpdateAmount);  // you can check it from console

const clientUpdate={
    balance:parseFloat(balanceUpdateAmount)
}

// Update in firestore
firestore.update({collection:'clients',doc:client.id},clientUpdate);
    };

    // Delete Client
onDeleteClick=()=>{
    const {client,firestore,history}=this.props;
    
    firestore.delete({collection:'clients',doc:client.id})
    .then(history.push('/'));
    };

  render() {
      const {client}=this.props;
      const {showBalanceUpdate,balanceUpdateAmount}=this.state;

      let balanceForm='';

    //   if balance form should display
    if(showBalanceUpdate){
balanceForm=(
    <form onSubmit={this.balanceSubmit}>
        <div className="input-group">
            <input type="text"
            className="form-control"
            name="balanceUpdateAmount"
            placeholder="Add new Balance"
            value={balanceUpdateAmount}
            onChange={this.onChange}
            ></input>
        </div>

        <div className="input-group-append">
            <input type="submit" value="Update" className="btn btn-outline-dark"></input>
        </div>
    </form>
)
    }else{
        balanceForm=null;
    }

      if(client){
        return (
            <div>
              {/* <h1>Name: {client.firstName}</h1> */}
              <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                    <i className="fa fa-arrow-circle-left"></i> Back to Dashboard
                    </Link>
                </div>

                <div className="col-md-6">
                    <div className="btn-group float-right">
                        <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                        Edit
                        </Link>
                        <button 
                        onClick={this.onDeleteClick}
                        className="btn btn-danger">
                        Delete
                        </button>
                    </div>
                </div>
              </div>

              <hr></hr>

              <div className="card">
                <h3 className="card-header">
                {client.firstName} {client.lastName}
                </h3>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 col-sm-6">
                        <h4>Client ID:{' '} <span className="text-secondary">{client.id}</span></h4>
                        </div>

                        <div className="col-md-4 col-sm-6">
                        <h3 className="pull-right">
                        Balance: <span className={classnames({
                            'text-danger':client.balance===0,
                            'text-success':client.balance>0
                        })}>${parseFloat(client.balance).toFixed(2)}</span>

                        <small>
                            <a href="#!" onClick={()=>this.setState({
                                // toggle the state on click
                                showBalanceUpdate: !this.state.showBalanceUpdate
                            })}>{' '}
                            <i className="fa fa-pencil-alt"></i>
                            </a>
                        </small>
                        </h3>
                        {/*  @todo - balanceform */}
                        {balanceForm}
                        </div>
                    </div>

                    <hr></hr>

                    <ul className="list-group">
                        <li className="list-group-item">Contact Email: {client.email}</li>
                        <li className="list-group-item">Contact Phone: {client.phone}</li>
                    </ul>
                </div>
              </div>
            </div>
          );
      }else{
        return <h1>Sorry...</h1>
      }
    
  }
}

ClientDetails.propTypes={
    firestore:PropTypes.object.isRequired
}

// export default ClientDetails;
// export default compose(
//     firestoreConnect([{collection:'clients'}]),
//     connect((state,props)=>({
// clients:state.firestore.ordered.clients
//     }))
// )(ClientDetails); 

// ============== Get Single Client ==========
export default compose(
    firestoreConnect(props=>[
        {collection:'clients',storeAs:'client',doc:props.match.params.id}

    ]),
    connect(({firestore:{ordered}},props)=>({
        client:ordered.client && ordered.client[0]
    }))
)(ClientDetails);