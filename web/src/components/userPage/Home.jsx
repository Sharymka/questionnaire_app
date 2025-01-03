import React, {useContext,  useState} from 'react';
import { MDBCard } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import  {TemplateContext} from "./contexts/TemplateContext";
import {SAVE_TEMPLATE_URL} from "../../url/url";
import Template from "./ReusableTemplate/Template";
import Header from "../mainPage/head/Header";
import AllTemplatesBlock from "./AllTemplatesBlock";
import MyTemplates from "./MyTemplates/MyTemplates";

function Home() {

    const {
        showAllTemplates,
        filteredTemp,
    } = useContext(TemplateContext);

    const [currentView, setCurrentView] = React.useState(null);
    const [refreshState, setRefreshState] = React.useState(false);
    const [showFormsTableAnchor, setShowFormsTableAnchor] = useState(false);
    const [showFilledFormAnchor, setShowFilledFormAnchor] = useState(false);

    const renderComponent = () => {
        switch (currentView) {
            case 'addTemplate':
                return (
                    <div className="mt-3" role="alert">
                            <Template
                                key={currentView}
                                headerName="Новая форма"
                                btnName="Сохранить шаблон"
                                url={SAVE_TEMPLATE_URL}
                            />
                    </div>
                );
            case 'myTemplates':
                return (
                    <div className="mt-3" role="alert">
                            <MyTemplates
                                key={refreshState}
                            />
                    </div>
                );
            case 'myForms':
                return (
                    <div className="mt-3" role="alert">
                        myForms
                    </div>
                );
            default:
                return null;
        }
    };
  return (
      <>
          <Header key="Header"/>
          {
              showAllTemplates ? (<AllTemplatesBlock key="AllTemplatesBlock" temp={filteredTemp}/>): (
                  <>
                      <div className=" appBackground">
                          <div className=" p-5 container container_min_1200">
                              <div className=" screen_max_425 screen_min_425">
                                  <Link
                                      type="btn"
                                      className=" flex-grow-1 screen_max_425_block_width text-primary"
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
                                      onClick={()=> {
                                          setCurrentView('myTemplates')
                                          setRefreshState(!refreshState);
                                          // setEditorAnchor(false)
                                          // setShowFormsTableAnchor(false)
                                          // setShowFilledFormAnchor(false)
                                      }
                                      }
                                  >
                                      <MDBCard className="card-body">
                                          <h5 className="card-title">мои шаблоны</h5>
                                      </MDBCard>
                                  </Link>
                              </div>
                              {renderComponent()}
                          </div>
                      </div>
                  </>
              )
          }

      </>
  );

}

export default Home;