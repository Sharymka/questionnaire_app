import React, {useState} from 'react';
import {MDBInput} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {postData} from "../../Requests";

function SignIn() {
    const [signInData, setSignInData] = React.useState([]);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleFormChange = (field, value) => {
        setSignInData((prevState) => ({...prevState, [field]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postData('api/signIn', signInData);
            const data = await response.json();

            if (response.ok) {
                console.log("SignIn successfully:", data);
                setMessage('');
                navigate('/home');
            } else {
                console.log("SignIn failed:", data.error);
                setMessage(data.error);
            }
        }catch (error) {
            console.log("SignIn failed:", error.message);
        }
    }

  return (
      <section
          style={{backgroundImage: `url('https://oir.mobi/uploads/posts/2021-03/1616426621_12-p-belo-goluboi-fon-16.jpg')`}}
          className="text-center h-100 row justify-content-center align-items-center"
      >
        <div className="card  col-md-7 col-xl-5  mx-4 mx-md-5 shadow-5-strong bg-body-tertiary"
             style={{marginTop: '30px', backdropFilter: 'blur(30px)'}}
        >
          <div className="card-body  py-5 px-md-5">

            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign in</h2>
                  <form
                      onSubmit={handleSubmit}
                  >
                      <div className="form-outline mb-4">
                          <MDBInput
                              type="email"
                              name="email"
                              className="form-control form-control-lg"
                              label='Email address'
                              onChange={(event) => handleFormChange('email', event.target.value)}
                          />
                      </div>
                      <div className="form-outline mb-4">
                          <MDBInput
                              type="password"
                              label='Password'
                              className="form-control form-control-lg"
                              onChange={(event) => handleFormChange('password', event.target.value)}
                          />
                      </div>
                      <button type="submit" data-mdb-button-init={true} data-mdb-ripple-init={true}
                              className="btn btn-primary btn-block mb-4">
                          Sign in
                      </button>
                      <div className="pt-1 mb-4">
                          <Link to='/signUp' type='submit'
                                className="btn btn-light btn-block">
                              Sign Up
                          </Link>
                      </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default SignIn;