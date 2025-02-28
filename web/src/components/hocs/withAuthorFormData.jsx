import {Typography} from "@mui/material";
import {getFieldValue} from "../../utilits/getFieldValue";
import {hasNonEmptyValues} from "../../utilits/hasNonEmptyValue";
import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

function withAuthorFormData(WrappedComponent) {

	return function WithAuthorData(props) {

		const { config } = useContext(TemplateContext);
		const { filledForm, ...otherProps } = props;
		const first_name = filledForm && getFieldValue(filledForm.user, "first_name");
		const last_name = filledForm && getFieldValue(filledForm.user, "last_name");

		return (
			<div className="p-4 card mb-3 position-relative">
				<WrappedComponent
					filledForm={filledForm}
					{...otherProps}
				/>
				{
					config?.baseConfig?.header === 'readOnly' && (
						<div className="absolute_right_bottom_corner">
							<Typography component="em" className="label">Автор</Typography>
							<Typography component="em" className="font_size_08rem">{first_name + ' ' + last_name}</Typography>
						</div>
					)
				}
			</div>
		);
	};
}

export default withAuthorFormData;