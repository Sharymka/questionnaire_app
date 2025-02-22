import React, {useContext, useState} from 'react';
import { MDBCard } from "mdb-react-ui-kit";
import  {TemplateContext} from "../contexts/TemplateContext";
import {SAVE_TEMPLATE_URL} from "../../url/url";
import Template from "./Template/Template";
import AllTemplatesBlock from "./AllTemplatesBlock";
import MyTemplates from "./MyTemplates/MyTemplates";
import {HistoryContext} from "../contexts/HistoryContext";
import SidePanel from "./Template/SidePanel";
import useGetFormsByTempId from "../hooks/API/useGetFormsByTempId";

function Home() {

    const { resetStates } = useContext(HistoryContext);
    const { forms } = useGetFormsByTempId();

    const {
        showAllTemplates,
        filteredTemp,
        setCurrentView,
        currentView,
    } = useContext(TemplateContext);

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
            case 'templatesTable':
            case 'filledForm':
            case 'templateEditor':
            case 'filledFormsTable':

                return (
                    <div className="mt-3" role="alert">
                        <MyTemplates
                            key={currentView}
                            forms={forms}
                        />
                    </div>
                );
            default:
                return null;
        }
    };
  return (
      <> {
          currentView === 'allTemplates' ? (<AllTemplatesBlock key="AllTemplatesBlock" temp={filteredTemp}/>): (
              <>
                  <div className="p-5 main_container">
                      <div className=" screen_max_425 screen_min_425">
                              <MDBCard
                                  className="card-body flex-grow-1 screen_max_425_block_width text-primary"
                                  onClick={()=> {
                                      setCurrentView('addTemplate');
                                  }}
                              >
                                  <h5 className="card-title">добавить шаблон</h5>
                              </MDBCard>
                              <MDBCard
                                  className="card-body flex-grow-1 screen_max_425_block_width text-primary "
                                  onClick={()=> {
                                      setCurrentView('TemplatesTable');
                                      resetStates();
                                  }
                                  }
                              >
                                  <h5 className="card-title">мои шаблоны</h5>
                              </MDBCard>
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