import React from 'react';
import withFilledFormData from "../../hocs/withFilledFormData";
import Template from "../Template/Template";

function FilledForm(props) {
	const {  loading= true } = props;
	return (
		loading ? (<div>Loading...</div>):(
			<Template
			loading={loading}
			/>
		)
	);
}

export default withFilledFormData(FilledForm);