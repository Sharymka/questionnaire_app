
import tooltipStyle from "../styles/tooltipStyle";
import {Tooltip} from "@mui/material";
import {forwardRef} from "react";

const withTooltip = (WrappedComponent) => {

	return forwardRef(({tooltipTitle, ...props}, ref) => {


		const classes = tooltipStyle();

		if (tooltipTitle) {
			return (
				<Tooltip
					title={tooltipTitle}
					placement="top-start"
					enterDelay={500}
					leaveDelay={200}
					classes={{
						tooltip: classes.customTooltip,
						arrow: classes.customArrow
					}}
					arrow
				>
					<WrappedComponent {...props} ref={ref}/>
				</Tooltip>
			)
		} else {
			return (
				<WrappedComponent {...props} ref={ref}/>
			)
		}

	})
}

export default withTooltip;