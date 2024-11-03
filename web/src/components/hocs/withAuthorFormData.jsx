import {Typography} from "@mui/material";
import {getFieldValue} from "../../utilits/getFieldValue";
import {hasNonEmptyValues} from "../../utilits/hasNonEmptyValue";

function withAuthorFormData(WrappedComponent) {

	return function WithAuthorData(props) {
		const { filledForm, ...otherProps } = props;

		const isFilledUserData = !!(filledForm && filledForm.user && hasNonEmptyValues(filledForm));

		const first_name = filledForm && getFieldValue(filledForm.user, "first_name");
		const last_name = filledForm && getFieldValue(filledForm.user, "last_name");

		return (
			<div className="p-4 card mb-3 position-relative">
				<WrappedComponent filledForm={filledForm} {...otherProps}
				/>
				{
					isFilledUserData && (
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