import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layout/Sidebar';

export default ()=> {
  return (
    <div>
      {/* <h1>dashboard</h1> */}
      <div className="row">
      <div className="col-md-10">
      {/* Load the Client file */}
      <Clients></Clients>              
      </div>

      <div className="col-md-2">
      {/* Load the Sidebar */}
      <Sidebar></Sidebar>
      </div>
      </div>
    </div>
  );
};
