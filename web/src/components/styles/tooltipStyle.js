import { makeStyles } from '@mui/styles';

const tooltipStyle = makeStyles(()=> ({
	customTooltip: {
		backgroundColor: 'rgba(208,205,206,0.8)',
		color: 'rgba(21,21,21,0.8)',
		fontSize: '1.2rem',
	},
	customArrow: {
		color: 'rgba(208,205,206,0.8)',
	},
}));


export default tooltipStyle;