import React, {useContext} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js/auto';
import {TemplateContext} from "@/features/template-editor/model/TemplateContext";
import AllTemplatesBlock from "@/pages/all-templates-block";
import StatisticData from "@/widgets/statistics-dashboard/ui/StatisticData";


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
