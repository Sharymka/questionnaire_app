import React from 'react';
import { Typography } from "@mui/material";

function CustomTypography(props) {

	const { value } = props;
	const firstKey = Object.keys(value)[0];

	const renderComponent = (value, firstKey) => {
		switch (firstKey) {
			case "title":
				return (
					<div>
						<Typography component="span" className="label">Название</Typography>
						<Typography component="span" className="font_size_1rem">{value[firstKey]}</Typography>
						<div className="separator"></div>
					</div>
				);
			case "topic":
				return (
					<>
						<div>
							<Typography component="span" className="label">Тема</Typography>
							<Typography component="span" className="font_size_1rem">{value[firstKey]}</Typography>
						</div>
						<div className="separator"></div>
					</>
				);
			case "description":
				return (
					<div className="mt-3">
						<div>
							<Typography component="span" className="label">Описание</Typography>
							<Typography component="span" className="font_size_1rem">{value[firstKey]}</Typography>
						</div>
					</div>

				);
			default:
				return (
					<div>
						<Typography component="span" className="label">Неизвестное поле:</Typography>
						<Typography component="span" className="font_size_1rem">{value[firstKey]}</Typography>
					</div>
				);
		}
	};

	return (
		renderComponent(value, firstKey)
	);
}

export default CustomTypography;
