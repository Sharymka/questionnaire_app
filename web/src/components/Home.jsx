import React from 'react';
import { MDBCard } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import Template from "./Template/Template";
import TemplateProvider from "./Template/TemplateContext";
import MyTemplates from "./MyTemplates/MyTemplates";

function Home() {
    const [currentView, setCurrentView] = React.useState(null);

    const renderComponent = () => {
        switch (currentView) {
            case 'addTemplate':
                return (
                    <div className="mt-3" role="alert">
                        <TemplateProvider>
                            <Template />
                        </TemplateProvider>
                    </div>
                );
            case 'myTemplates':
                return (
                    <div className="mt-3" role="alert">
                        <TemplateProvider>
                            <MyTemplates/>
                        </TemplateProvider>
                    </div>
                );
            case 'myForms':
                return (
                    <div className="mt-3" role="alert">
                        myForms
                        {/*<TemplateProvider>*/}
                        {/*    <Template />*/}
                        {/*</TemplateProvider>*/}
                    </div>
                );
            default:
                return null;
        }
    };
  return (
   <div className="h-100 appBackground">
    <div className=" p-5 container container_min_1200">
        <div className=" screen_max_425 screen_min_425">
            <Link
                type="btn"
                className=" flex-grow-1 screen_max_425_block_width text-primary"
                // onClick={()=> setAddTempAnchor(true)}

                onClick={()=> {

                    setCurrentView('addTemplate')}
                }
            >
                <MDBCard className="card-body">
                    <h5 className="card-title">добавить шаблон</h5>
                </MDBCard>
            </Link >
            <Link
                className="flex-grow-1 screen_max_425_block_width text-primary"
                onClick={()=> setCurrentView('myTemplates')}
            >
                <MDBCard className="card-body">
                    <h5 className="card-title">мои шаблоны</h5>
                </MDBCard>
            </Link>
            <Link
                className="flex-grow-1 screen_max_425_block_width text-primary"
                onClick={()=> setCurrentView('myForms')}
            >
                <MDBCard className="card-body">
                    <h5 className="card-title">мои формы</h5>
                </MDBCard>
            </Link>
        </div>
        {renderComponent()}
        {/*{addTempAnchor && (*/}
        {/*    <div className=" mt-3" role="alert">*/}
        {/*        <Link className="col-lg-3 screen_max_425_block_width text-primary">*/}
        {/*            <TemplateProvider>*/}
        {/*                <Template/>*/}
        {/*            </TemplateProvider>*/}
        {/*        </Link>*/}
        {/*    </div>*/}
        {/*)}*/}
        {/*{myTemplatesAnchor && (*/}
        {/*    <div className=" mt-3" role="alert">*/}
        {/*        <Link className="col-lg-3 screen_max_425_block_width text-primary">*/}
        {/*            <TemplateProvider>*/}
        {/*                <Template/>*/}
        {/*            </TemplateProvider>*/}
        {/*        </Link>*/}
        {/*    </div>*/}
        {/*)}*/}
    </div>
  </div>);
}

export default Home;