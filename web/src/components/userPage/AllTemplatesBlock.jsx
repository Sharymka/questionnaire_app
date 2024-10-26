import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

function AllTemplatesBlock(props) {

  const { temp } = props;

  return (
	  <div className="h-100 appBackground">
		  <div className=" p-5 container container_min_1200">
			  <div className=" screen_max_425 screen_min_425">
				  {
					  temp.map((template, index) => (
						  <Card sx={{  paddingBottom: 20, maxWidth: 300, maxHeight: 345 }}>
							  <CardActionArea>
								  <CardMedia
									  component="img"
									  height="150"
									  image={template.img}
									  alt="green iguana"
								  />
								  <CardContent>
									  <Typography gutterBottom variant="h5" component="div">
										  {template.title}
									  </Typography>
									  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
										  {template.description}
									  </Typography>
									  {/*<Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
										{/*  {template.user.first_name} {template.user.last_name} {template.user.email}*/}
									  {/*</Typography>*/}
								  </CardContent>
							  </CardActionArea>
						  </Card>
					  ))
				  }
			  </div>
		  </div>
	</div>
  );
}

export default AllTemplatesBlock;