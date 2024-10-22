import React, {useContext} from 'react';
import {Typography} from "@mui/material";
import {TemplateContext} from "../../contexts/TemplateContext";
import {SAVE_ICON_URL} from "../../../../url/url";

const HeaderBlock = ({
	                        headerName,
	                    LeftComponent,
	                    RightComponent,
	                    DescriptionComponent,
	                    TagsComponent,
                    }) => {

	const { imgUrl } = useContext(TemplateContext);
	return (
		<div className="p-4 card mb-3">
			<Typography variant="h5">{headerName}</Typography>
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

export default HeaderBlock;
