import React from 'react';
import { MDBCard } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import Template from "./Template/Template";
import TemplateProvider from "./Template/TemplateContext";

function Home() {
    const [addTemp, setAddTemp] = React.useState(false);
  return (
   <div className="h-100 appBackground">
    <div className=" p-5 container container_min_1200">
        <div className=" screen_max_425 screen_min_425">
            <Link
                type="btn"
                className=" flex-grow-1 screen_max_425_block_width text-primary"
                onClick={()=> setAddTemp(true)}
            >

                <MDBCard className="card-body ">
                    <h5 className="card-title">добавить шаблон</h5>
                </MDBCard>
            </Link >
            <Link className="flex-grow-1 screen_max_425_block_width text-primary">
                <MDBCard className="card-body">
                    <h5 className="card-title">мои шаблоны</h5>
                </MDBCard>
            </Link>
            <Link className="flex-grow-1 screen_max_425_block_width text-primary">
                <MDBCard className="card-body">
                    <h5 className="card-title">мои формы</h5>
                </MDBCard>
            </Link>
        </div>
        {addTemp && (
            <div className=" mt-3" role="alert">
                <Link className="col-lg-3 screen_max_425_block_width text-primary">
                    <TemplateProvider>
                        <Template/>
                    </TemplateProvider>
                </Link>
            </div>
        )}
    </div>
  </div>);
}

export default Home;