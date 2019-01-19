import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class Clients extends Component {
    state={
        totalOwed:null
    };
     
    static getDerivedStateFromProps(props,state){
        const {clients}=props;

        if(clients){
            // Add Balances using loop

            const total=clients.reduce((total,client)=>{
                return total + parseFloat(client.balance.toString());
            },0);

            return {totalOwed:total}
        }else{
            return null;
        }
    }

  render() {
    //   const clients=[{
    //       id:'1',
    //       firstName:'Hp',
    //       lastName:'ss',
    //       email:'hp@gmail.com',
    //       phone:'55555',
    //       balance:'20'
    //   }]

    const {clients} =this.props;
    const {totalOwed}=this.state;

      if(clients){
        return (
            <div>
              {/* <h1>Clients</h1> */}
              <div className="row">
                <div className="col-md-6">
                    <h2><i className="fa fa-users"></i> Clients</h2>
                </div>

                <div className="col-md-6">
                    <h5 className="text-right text-secondary">
                    Total Owed{' '}
                    <span className="text-primary">
                    ${parseFloat(totalOwed).toFixed(2)}
                    </span>
                    </h5>
                </div>
              </div>

              <table className="table table-striped">
                <thead className="thead-inverse">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* For All The Clients  */}
                    {/* Apply Loop using MAP */}
                    {clients.map(client=>(
                        <tr key={client.id}>
                            <td>{client.firstName} {client.lastName}</td>
                            <td>{client.email}</td>
                            <td>${parseFloat(client.balance).toFixed(2)}</td>
                            <td>
                                <Link to={`/client/${client.id}`} 
                                className="btn btn-secondary btn-sm"
                                ><i className="fa fa-arrow-circle-right"></i> Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
      }else{
        //   return <h1>Loading...</h1>
        return <Spinner></Spinner>
      }
  }
}

Clients.propTypes={
    firestore:PropTypes.object.isRequired,
    clients:PropTypes.array
}

// export default Clients;
export default compose(
    firestoreConnect([{collection:'clients'}]),
    connect((state,props)=>({
clients:state.firestore.ordered.clients
    }))
)(Clients); 
