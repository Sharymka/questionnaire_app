import React from 'react';
import {Typography} from "@mui/material";
import withAuthorFormData from "../../hocs/withAuthorFormData";

const HeaderBlock = (props) => {

	const {
		headerName,
		TitleComponent,
		TopicComponent,
		DescriptionComponent,
		TagsComponent
	} = props;

	return (
		<>
			<Typography variant="h5">{headerName}</Typography>
			<div className="d-flex flex-row justify-content-between align-items-center gap-5">
				<div className="flex-grow-1">
					{TitleComponent}
				</div>
				<div className="flex-grow-1">
					{TopicComponent}
				</div>
			</div>
				{DescriptionComponent}
			<div className="mt-3">
				{TagsComponent}
			</div>

		</>
	);
};

export default withAuthorFormData(HeaderBlock);
