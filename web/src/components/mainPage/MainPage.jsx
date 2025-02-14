import React, {useContext} from 'react';
import Header from "./Header";
import {ImageList, ImageListItem} from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {TemplateContext} from "../contexts/TemplateContext";
import AllTemplatesBlock from "../userPage/AllTemplatesBlock";
import StatisticData from "./StatisticData";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MainPage() {

	const { showAllTemplates, temp, filteredTemp } = useContext(TemplateContext);
  return (
	  <>
		  {
			  showAllTemplates ? (
				  <AllTemplatesBlock/>
			  ): (
				  <StatisticData/>
			  )
		  }

	  </>

  );
}

export default MainPage;