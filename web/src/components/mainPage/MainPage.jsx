import React from 'react';
import Header from "./head/Header";
import {ImageList, ImageListItem} from "@mui/material";

function MainPage() {
  return (
	  <>
		  <Header></Header>
		  <div className="h-100 appBackground">
			  <div className=" p-5 container container_min_1200">
				  <div className=" screen_max_425 screen_min_425">
					  <ImageList
						  sx={{
							  width: 800,
							  height: 800,
							  display: 'grid',
							  gridTemplateColumns: 'repeat(4, 1fr)',
							  gridTemplateRows: 'repeat(4, 1fr)',
							  gap: 3,
						  }}
					  >
						  <ImageListItem key="1" sx={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="2" sx={{ gridColumn: '3 / span 1', gridRow: ' span 1' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="3" sx={{ gridColumn: '3 / span 1', gridRow: '1 / span 1' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="4" sx={{ gridColumn: '4 / span 1', gridRow: '1 / span 2' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="5" sx={{ gridColumn: '1 / span 1', gridRow: '3 / span 1' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="6" sx={{ gridColumn: '2 / span 2', gridRow: '3 / span 2' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="7" sx={{ gridColumn: '1 / span 1', gridRow: '4 / span 1' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="8" sx={{ gridColumn: '3 / span 1', gridRow: '4 / span 1' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>

						  <ImageListItem key="9" sx={{ gridColumn: '4 / span 1', gridRow: '4 / span 1' }}>
							  <div className="card yfghbvth" style={{ width: '100%', height: '100%' }} />
						  </ImageListItem>
					  </ImageList>



				  </div>
			  </div>
		  </div>
	  </>

  );
}

export default MainPage;