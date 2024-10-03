import React from 'react';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import {postData} from "web/src/Requests";

function SignUp() {

	const [singUpData, setSingUpData] = React.useState([]);

	const handleFormChange = (field, value) => {
		setSingUpData((prevState) => ({...prevState, [field]: value}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = postData('api/signUp', singUpData);
			const data = await response.json();
			console.log("Registered successfully:", data);
		}catch (error) {
			console.log("Registered failed:", error);
		}
	}

  return (
	  <section className="text-center row justify-content-center">
		  <div className="p-5 bg-image" style={{  backgroundImage: `url('https://oir.mobi/uploads/posts/2021-03/1616426621_12-p-belo-goluboi-fon-16.jpg')`,
			  height: '300px' }}
		  ></div>
		  <div className="card  col-md-7 col-xl-5  mx-4 mx-md-5 shadow-5-strong bg-body-tertiary" style=
			  {{ marginTop: '-100px', backdropFilter: 'blur(30px)'}}
		  >
			  <div className="card-body  py-5 px-md-5">

				  <div className="row d-flex justify-content-center">
					  <div className="col-lg-8">
						  <h2 className="fw-bold mb-5">Sign up now</h2>
						  <form
							  onClick={handleSubmit}
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