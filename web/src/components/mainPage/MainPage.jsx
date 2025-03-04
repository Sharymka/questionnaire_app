import React, {useContext} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js/auto';
import {TemplateContext} from "../contexts/TemplateContext";
import AllTemplatesBlock from "../userPage/AllTemplatesBlock";
import StatisticData from "./StatisticData";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MainPage() {

	const { showAllTemplates } = useContext(TemplateContext);
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