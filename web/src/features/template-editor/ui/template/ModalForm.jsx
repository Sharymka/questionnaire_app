import React, {useEffect, useState} from 'react';
import {MDBInput} from "mdb-react-ui-kit";
import {Box, Modal, Typography} from "@mui/material";

function ModalForm(props) {

  const { showModal,showForm, handleCloseModal, handleCloseForm } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {first_name: 'Irina', last_name:'Krotova', email:'krot@eee.uuu'});
  const [message, setMessage] = useState(false);
  const [showMessage,setShowMessage] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      companyName: 'questionnaire',
      industry: 'Tech',
    };

    const response = await fetch('/api/salesforce/createCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userData}),
    });

    const result = await response.json();
    if (response.ok) {

      setTimeout(() => {
        handleCloseForm();
        setMessage(result.message);
      }, 2000);

      setTimeout(() => {
        handleCloseForm();
      }, 5000);
      setTimeout(() => {
        handleCloseModal()
      }, 6000);

      console.log('Account and Contact created:', result, result.contactId, result.accountId);
    } else {
      console.error('Error:', result.message);
    }
  }

  return (
      <Modal
          open={showModal}
          onClose={handleCloseModal}
          className="modal-container"
      >
        <Box className="modal-content">
          {
            showForm && (
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <MDBInput
                          type="text"
                          label="First Name"
                          className="form-control form-control-lg"
                          value={user.first_name}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <MDBInput
                          type="text"
                          label="Last Name"
                          className="form-control form-control-lg"
                          value={user.last_name}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <MDBInput
                          type="email"
                          label="Email address"
                          className="form-control form-control-lg"
                          value={user.email}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <MDBInput
                          type="number"
                          label="Phone"
                          className="form-control form-control-lg"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Submit
                    </button>
                  </form>
              )
          }
          {
              message && (
                 <Typography variant="body2" color="textSecondary" component="p">{message}</Typography>
              )
          }
        </Box>
      </Modal>
  );
}

export default ModalForm;