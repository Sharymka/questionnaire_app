import React from 'react';
import TemplateHeader from "../ReusableTemplate/head/TemplateHeader";
import {Typography} from "@mui/material";
import useGetFormById from "../../hooks/API/useGetFormById";
import withFilledFormData from "../../hocs/withFilledFormData";

function FilledForm(props) {

	const { data, actions, loading= true, filledFormId } = props;

	return (
		loading ? (<div>Loading...</div>):(<div>
				<div className="card mb-2 card-background"
				     style={{backgroundImage: `url(${data?.img})`}}>
				</div>
				<TemplateHeader
					data={data}
					actions={actions}
					isReadOnly={true}
				/>

				<div className="d-flex flex-column gap-1">
					{
						data?.questions.map((question, index) => (
							<div key={index} className="card p-3">
								<Typography
									component="h6"
									variant="h6"
									className="mb-4"
								>
									<span>{index + 1}.</span> {' '}
									{question?.question || "Неизвестное имя"}
								</Typography>
								<Typography
									className="ms-3 darkGrey_color"
									variant="body1"
								>{question?.answer} </Typography>
								<div className="width-50 separator">
								</div>
							</div>
						))
					}
				</div>
			</div>)
	);
}

export default withFilledFormData(FilledForm);