import React from 'react';
import {ImageList, ImageListItem} from "@mui/material";
import {Bar, Doughnut, Line} from "react-chartjs-2";

function StatisticData() {
  return (
	  <div data-context="StatisticData" className="h-100 appBackground">
		  <div className=" p-5 container container_min_1200">
			  <div className=" screen_max_425 screen_min_425 justify-content-center align-items-center">
				  <ImageList
					  sx={{
						  width: 1000,
						  height: 800,
						  display: 'grid',
						  gridTemplateColumns: 'repeat(4, 1fr) !important',
						  gridTemplateRows: 'repeat(4, 1fr)',
						  gap: '15px !important',
					  }}
				  >
					  <ImageListItem key="1" sx={{gridColumn: 'span 2', gridRow: 'span 2'}}>
						  <div className="card yfghbvth" style={{width: '100%', height: '100%'}}>
							  <div className="card" style={{width: '100%', height: '100%'}}>
								  <div className="card-body">
									  <h5 className="card-title">Bar Chart</h5>
									  <Bar
										  data={{
											  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
											  datasets: [{
												  label: 'Bar Chart',
												  data: [65, 59, 80, 81, 56, 55, 40],
												  fill: true,
												  borderColor: 'rgb(75, 192, 192)',
												  tension: 0.1,
												  backgroundColor: 'rgb(75, 192, 192)',
												  borderRadius: 5
											  }]
										  }}
									  />
								  </div>
							  </div>
						  </div>
					  </ImageListItem>

					  <ImageListItem key="2" sx={{gridColumn: '3/span 1', gridRow: ' span 1'}}>
						  <div className="card " style={{width: '100%', height: '100%'}}/>
					  </ImageListItem>

					  <ImageListItem key="3" sx={{gridColumn: '4 / span 1', gridRow: 'span 1'}}>
						  <div className="card " style={{width: '100%', height: '100%'}}/>
					  </ImageListItem>

					  <ImageListItem key="4"
					                 sx={{gridColumn: '3 / span 2 !important', gridRow: '2 / span 1'}}>
						  <div className="card " style={{width: '100%', height: '100%'}}>
							  <div className="card">
								  <div className="card-body">
									  <h5 className="card-title">Line Chart</h5>
									  <Line
										  style={{
											  width: '100%',
											  height: '100%',
											  maxWidth: '475px',
											  maxHeight: '105px'
										  }}
										  data={{
											  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
											  datasets: [
												  {
													  label: 'Line Chart1',
													  data: [65, 59, 80, 81, 56, 55, 40],
													  fill: false,
													  tension: 0.1,
													  borderColor: 'rgb(75, 192, 192)',
													  backgroundColor: 'rgb(75, 192, 192)',
												  },
												  {
													  label: 'Line Chart2',
													  data: [60, 70, 80, 90, 106, 90, 50],
													  fill: false,
													  tension: 0.1,
													  borderColor: 'rgb(237,71,34)',
													  backgroundColor: 'rgb(237,71,34)',
												  },

											  ]
										  }}
									  />
								  </div>
							  </div>
						  </div>
					  </ImageListItem>

					  <ImageListItem key="5" sx={{gridColumn: 'span 1', gridRow: '3 / span 1'}}>
						  <div className="card " style={{width: '100%', height: '100%'}}/>
					  </ImageListItem>

					  <ImageListItem key="6" sx={{gridColumn: '2 / span 1', gridRow: '3 / span 1'}}>
						  <div className="card " style={{width: '100%', height: '100%'}}/>
					  </ImageListItem>
					  <ImageListItem key="7"
					                 sx={{
						                 gridColumn: '3 / span 2 !important',
						                 gridRow: '3 / span 2 !important'
					                 }}>
						  <div className="card ">
							  <div className="card-body"
							       style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
								  <h5 className="card-title" style={{
									  width: '100%',
									  height: '100%',
									  maxWidth: '200px',
									  maxHeight: '200px'
								  }}>Doughnut Chart</h5>
								  <Doughnut
									  style={{
										  width: '100%',
										  height: '100%',
										  maxWidth: '310px',
										  maxHeight: '310px'
									  }}
									  data={{
										  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
										  datasets: [{
											  label: 'Bar Chart',
											  data: [65, 59, 80, 81, 56, 55, 40],
											  fill: true,
											  tension: 0.1,
											  backgroundColor: [
												  'rgb(75, 192, 192)',
												  'rgb(241,192,15)',
												  'rgb(237,71,34)',
												  'rgb(163,237,34)',
												  'rgb(34,81,237)',
												  'rgb(125,34,237)',
												  'rgb(230,34,237)',
											  ],
											  borderRadius: 5
										  }]
									  }}
								  />
							  </div>
						  </div>
					  </ImageListItem>
					  <ImageListItem key="8" sx={{gridColumn: 'span 2 !important', gridRow: '4 / span 1 '}}>
						  <div className="card " style={{width: '100%', height: '100%'}}/>
					  </ImageListItem>
				  </ImageList>
			  </div>
		  </div>
	  </div>
  );
}

export default StatisticData;