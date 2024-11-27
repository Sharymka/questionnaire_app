import React, {useContext, useEffect, useState} from 'react';
import TemplateHeader from "./head/TemplateHeader";
import QuestionList from "./body/realQuestions/QuestionList";
import SidePanel from "./head/SidePanel";
import {Button} from "@mui/material";
import {TemplateContext} from "../contexts/TemplateContext";
import ImageUploadModal from "./head/ImageUploadModal";
import MessageBlock from "./reusableSimpleComp/MessageBlock";
import withDataAttributes from "../../hocs/withDataAttributes";
import withTemplateData from "../../hocs/withTemplateData";

function Template(props) {

  const {
      headerName,
      btnName,
      data,
      actions,
      url,
      templateId = null,
      loading
  } = props;

    const {
        saveTemplate,
        imgUrl,
        message,
        resetTemplateStates,
    } = useContext(TemplateContext);

  const [showModalAnchor, setShowModalAnchor] = useState(false);

    useEffect(() => {
        resetTemplateStates();
    }, []);

    const renderImageUploadModal = () => (
        showModalAnchor && <ImageUploadModal open={showModalAnchor} handleClose={setShowModalAnchor} />
  );

  const renderImageCard = () => (
        imgUrl && <div className="card mb-2 card-background" style={{ backgroundImage: `url(${imgUrl})` }}></div>
  );

    return (
        loading ? (
            <div>Загрузка</div>
            ): (
            <div>
                <SidePanel
                    showImgModalOnClick={setShowModalAnchor}
                />
                <>
                    {renderImageUploadModal()}
                    {renderImageCard()}
                </>
                <TemplateHeader
                    headerName={headerName}
                    data={data}
                    actions={actions}
                />
                <QuestionList
                    data={data}
                    actions={actions}
                />
                <div className="card p-4 mt-3">
                    <div className="d-flex justify-content-end">
                        <Button className='p-3 btn-primary'
                                variant="contained"
                                onClick={() => saveTemplate(`${url}`)}
                            // onClick={() => {
                            //     // setEditorAnchor && setEditorAnchor(false)
                            //     // saveTemplate(`${url}${selectedTemplate ? `/${selectedTemplate.id}` : ''}`)
                            //     saveTemplate(`${url}`)
                            // }
                            // }
                        >
                            {btnName}
                        </Button>
                    </div>
                </div>
                <MessageBlock message={message}/>
            </div>
        )

    );
}

Template.displayName = "Template";
export default withTemplateData(withDataAttributes(Template));