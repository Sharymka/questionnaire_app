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
	                    filledForm
                    }) => {

	return (
		<div className="p-4 card mb-3 position-relative">
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
				{
					filledForm?.user? (
						<div className="absolute_right_bottom_corner">
							<Typography component="em" className="label">Автор</Typography>
							<Typography component="em" className="font_size_08rem">{filledForm.user.first_name + ' ' + filledForm.user.last_name}</Typography>
						</div>
					):(<></>)
				}
		</div>
	);
};

export default HeaderBlock;
