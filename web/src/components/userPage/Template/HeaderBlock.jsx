import React, {useContext} from 'react';
import {Typography} from "@mui/material";
import {TemplateContext} from "../../contexts/TemplateContext";
import {SAVE_ICON_URL} from "../../../url/url";
import withDataAttributes from "../../hocs/withDataAttributes";
import withAuthorFormData from "../../hocs/withAuthorFormData";

const HeaderBlock = (props) => {

	const {
		filledForm,
		headerName,
		TitleComponent,
		TopicComponent,
		DescriptionComponent,
		TagsComponent,
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

export default withAuthorFormData(withDataAttributes(HeaderBlock));
