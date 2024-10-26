import React, {useContext, useEffect, useRef, useState} from 'react';
import { MDBCard } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import TemplateProvider, {TemplateContext} from "./contexts/TemplateContext";
import MyTemplates from "./MyTemplates/MyTemplates";
import {SAVE_TEMPLATE_URL} from "../../url/url";
import Template from "./ReusableTemplate/Template";
import Header from "../mainPage/head/Header";
import {templates} from "../../const/templates";
import {getData} from "../../Requests";
import AllTemplatesBlock from "./AllTemplatesBlock";

function Home() {

    const { refresh } = useContext(TemplateContext);
    const [temp, setTemp] = useState(templates);
    const [currentView, setCurrentView] = React.useState(null);
    const [editorAnchor, setEditorAnchor] = useState(false);
    const [showFormsTableAnchor, setShowFormsTableAnchor] = useState(false);
    const [showFilledFormAnchor, setShowFilledFormAnchor] = useState(false);
    const [showAllTemplates, setShowAllTemplates] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData("api/template");
                const data = await response.json();
                if(response.ok) {
                    setTemp(data);
                    console.log("templates were fetched successfully");
                } else {
                    console.log(data.error);
                    console.log("template getting failed");
                }
            }catch(error) {
                console.log("template getting failed" + error.message);
            }
        }
        fetchData();
    }, [refresh]);

    const renderComponent = () => {
        switch (currentView) {
            case 'addTemplate':
                return (
                    <div className="mt-3" role="alert">
                        <TemplateProvider  key={currentView}>
                            <Template
                                headerName="Новая форма"
                                url={SAVE_TEMPLATE_URL}
                                btnName="Сохранить шаблон"

                            />
                        </TemplateProvider>
                    </div>
                );
            case 'myTemplates':
                return (
                    <div className="mt-3" role="alert">
                        <TemplateProvider  key={currentView}>
                            <MyTemplates
                                temp={temp}
                                setTemp={setTemp}
                                editorAnchor={editorAnchor}
                                setEditorAnchor={setEditorAnchor}
                                showFormsTableAnchor={showFormsTableAnchor}
                                setShowFormsTableAnchor={setShowFormsTableAnchor}
                                setShowFilledFormAnchor={setShowFilledFormAnchor}
                                showFilledFormAnchor={showFilledFormAnchor}
                            />
                        </TemplateProvider>
                    </div>
                );
            case 'myForms':
                return (
                    <div className="mt-3" role="alert">
                        myForms
                        <TemplateProvider key={currentView}>
                            {/*<Template />*/}
                        </TemplateProvider>
                    </div>
                );
            default:
                return null;
        }
    };
  return (
      <>
          <Header/>
          {
              showAllTemplates ? (<AllTemplatesBlock temp={temp}/>): (
                  <>
                      <div className="h-100 appBackground">
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
                                          setEditorAnchor(false)
                                          setShowFormsTableAnchor(false)
                                          setShowFilledFormAnchor(false)
                                      }
                                      }
                                  >
                                      <MDBCard className="card-body">
                                          <h5 className="card-title">мои шаблоны</h5>
                                      </MDBCard>
                                  </Link>
                              </div>
                          </div>
                      </div>
                      {renderComponent()}
                  </>
              )
          }

      </>
  );

}

export default Home;