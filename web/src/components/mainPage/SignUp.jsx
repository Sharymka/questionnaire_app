import React, {useContext, useState} from 'react';
import { MDBInput} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import { postData } from "../../Requests";
import {AuthContext} from "./context/AuthContext";

function SignUp() {

	const navigate = useNavigate();
	const { signIn } = useContext(AuthContext);
	const [singUpData, setSingUpData] = useState([]);
	const [message, setMessage] = useState('');

	const handleFormChange = (field, value) => {
		setSingUpData((prevState) => ({...prevState, [field]: value}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data, status } = await postData('api/signUp', singUpData);

			if (status >= 200 && status < 300) {
				console.log("Registered successfully:");
				signIn(data);
				setMessage('');
			} else {
				console.log("Registered failed:", data.error);
				setMessage(data.error);
			}
		}catch (error) {
			console.log("error:", error.response.data.message || error.message);
		}
	}

  return (
	  <section style={{ height: '100%' }} className="text-center row justify-content-center">
		  <div className="p-5 bg-image"
		       style={{
				   backgroundImage: `url('https://oir.mobi/uploads/posts/2021-03/1616426621_12-p-belo-goluboi-fon-16.jpg')`,
		       }}
		  ></div>
		  <div className=" col-md-7 col-xl-5  mx-4 mx-md-5 " style= {{ marginTop: '-100px'}}
		  >
			  <div className="card py-5 px-md-5">

				  <div className="row d-flex justify-content-center">
					  <div className="col-lg-8">
						  <h2 className="fw-bold mb-5">Sign up now</h2>
						  <form
							  onSubmit={handleSubmit}
						  >
							  <div className="form-outline mb-4">
								  <MDBInput
									  type="text"
									  label='First Name'
									  className="form-control form-control-lg"
									  onChange={(event) => handleFormChange('firstName', event.target.value)}
								  />
							  </div>
							  <div className="form-outline mb-4">
								  <MDBInput
									  type="text"
									  label='Last Name'
									  className="form-control form-control-lg"
									  onChange={(event) => handleFormChange('lastName', event.target.value)}
								  />
							  </div>
							  <div className="form-outline mb-4">
								  <MDBInput
									  type="email"
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
								  Sign up
							  </button>
							  <div className="pt-1 mb-4">
								  <Link to='/signIn' type='submit'
								        className="btn btn-light btn-block">
									  Sign In
								  </Link>
							  </div>
							  {message && (
								  <div className="alert alert-danger mt-3" role="alert">
									  {message}
								  </div>
							  )}
							  <div className="text-center">
								  <p>or sign up with:</p>
								  <button type="button" data-mdb-button-init data-mdb-ripple-init
								          className="btn btn-link btn-floating mx-1">
									  <i className="fab fa-facebook-f"></i>
								  </button>

								  <button type="button" data-mdb-button-init data-mdb-ripple-init
								          className="btn btn-link btn-floating mx-1">
									  <i className="fab fa-google"></i>
								  </button>

								  <button type="button" data-mdb-button-init data-mdb-ripple-init
								          className="btn btn-link btn-floating mx-1">
									  <i className="fab fa-twitter"></i>
								  </button>

								  <button type="button" data-mdb-button-init data-mdb-ripple-init
								          className="btn btn-link btn-floating mx-1">
									  <i className="fab fa-github"></i>
								  </button>
							  </div>
						  </form>
					  </div>
				  </div>
			  </div>
		  </div>
	  </section>
  );
}

export default SignUp;