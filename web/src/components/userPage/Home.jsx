import React, {useContext, useState} from 'react';
import { MDBCard } from "mdb-react-ui-kit";
import  {TemplateContext} from "../contexts/TemplateContext";
import {SAVE_TEMPLATE_URL} from "../../url/url";
import Template from "./Template/Template";
import AllTemplatesBlock from "./AllTemplatesBlock";
import MyTemplates from "./MyTemplates/MyTemplates";
import {HistoryContext} from "../contexts/HistoryContext";
import SidePanel from "./Template/SidePanel";

function Home() {

    const { resetStates } = useContext(HistoryContext);
    const [showModalAnchor, setShowModalAnchor] = useState(false);

    const {
        showAllTemplates,
        filteredTemp,
        setCurrentView,
        currentView,
        config
    } = useContext(TemplateContext);

    const renderComponent = () => {
        switch (currentView) {
            case 'addTemplate':
                return (
                    <div className="mt-3" role="alert">
                            <Template
                                key={currentView}
                                config={config}
                                headerName="Новая форма"
                                btnName="Сохранить шаблон"
                                url={SAVE_TEMPLATE_URL}
                                showModalAnchor={showModalAnchor}
                                setShowModalAnchor={setShowModalAnchor}
                            />
                    </div>
                );
            case 'templatesTable':
            case 'filledForm':
            case 'templateEditor':
            case 'filledFormsTable':

                return (
                    <div className="mt-3" role="alert">
                        <MyTemplates
                            key={currentView}
                            showModalAnchor={showModalAnchor}
                            setShowModalAnchor={setShowModalAnchor}
                        />
                    </div>
                );
            default:
                return null;
        }
    };
  return (
      <> {
          showAllTemplates ? (<AllTemplatesBlock key="AllTemplatesBlock" temp={filteredTemp}/>): (
              <>
                  <div className=" p-5 container container_min_1200">
                      <div className=" screen_max_425 screen_min_425">
                          <div
                              type="btn"
                              className=" flex-grow-1 screen_max_425_block_width text-primary"
                              onClick={()=> {
                                  setCurrentView('addTemplate');
                              }

                              }
                          >
                              <MDBCard className="card-body">
                                  <h5 className="card-title">добавить шаблон</h5>
                              </MDBCard>
                          </div >
                          <div
                              className="flex-grow-1 screen_max_425_block_width text-primary"
                              onClick={()=> {
                                  setCurrentView('TemplatesTable');
                                  resetStates();
                              }
                              }
                          >
                              <MDBCard className="card-body">
                                  <h5 className="card-title">мои шаблоны</h5>
                              </MDBCard>
                          </div>
                          <SidePanel
                              showImgModalOnClick={setShowModalAnchor}
                              config={config}
                          />
                      </div>
                      {renderComponent()}
                  </div>
              </>
          )
      }
      </>
  );

}

export default Home;