import React from 'react';
import withData from "@/features/template-editor/model/hocs/withData";
import Template from "@/features/template-editor/ui/template/Template";

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

export default withData(FilledForm);