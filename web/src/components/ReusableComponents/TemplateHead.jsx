import React from 'react';
import {Typography} from "@mui/material";

const TemplateHeader = ({
	                    title,
	                    LeftComponent,
	                    RightComponent,
	                    DescriptionComponent,
	                    TagsComponent,
                    }) => {
	return (
		<div className="p-4 card">
			<Typography variant="h5">{title}</Typography>
			<div className="d-flex flex-row justify-content-between align-items-center gap-5">
				<div className="flex-grow-1">
					{LeftComponent}
				</div>
				<div className="flex-grow-1">
					{RightComponent}
				</div>
			</div>
			{DescriptionComponent}
			{TagsComponent}
		</div>
	);
};

export default TemplateHeader;
