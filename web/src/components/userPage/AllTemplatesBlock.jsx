import React, {useContext} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {TemplateContext} from "../contexts/TemplateContext";
import {Link} from "react-router-dom";
import useGetTemplates from "../hooks/API/useGetTemplates";

function AllTemplatesBlock() {

  const { templates, loading } = useGetTemplates();
  const { setShowSelectedTemplate } = useContext(TemplateContext);
  return (
	 loading ? (
		    <div> Loading... </div>
		 ): (
		 <div className=" p-5 container container_min_1200">
			 <div className=" screen_max_425 screen_min_425 ">
				 {
					 templates.map((template, index) => (
						 <Link key={index} to={`/templates/${template.id}`}>
							 <Card
								 key={index}
								 sx={{paddingBottom: 20, maxWidth: 300, maxHeight: 345}}
								 onClick={() => setShowSelectedTemplate(true)}
							 >
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
										 <Typography variant="body2" sx={{color: 'text.secondary'}}>
											 {template.description}
										 </Typography>
										 {/*<Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
										 {/*  {template.user.first_name} {template.user.last_name} {template.user.email}*/}
										 {/*</Typography>*/}
									 </CardContent>
								 </CardActionArea>
							 </Card>
						 </Link>
					 ))
				 }
			 </div>
		 </div>
	 )

  );
}

export default AllTemplatesBlock;