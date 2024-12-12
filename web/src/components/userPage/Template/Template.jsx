import React, {useContext, useEffect, useState} from 'react';
import TemplateHeader from "./TemplateHeader";
import QuestionList from "./QuestionList";
import SidePanel from "./SidePanel";
import {Button} from "@mui/material";
import {TemplateContext} from "../../contexts/TemplateContext";
import ImageUploadModal from "./ImageUploadModal";
import MessageBlock from "./MessageBlock";
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
      loading,
      config // config = {
      // header: true,
      // sidePanel: true,
      // questionList: [{ id: 1, toolBlock: false, question: 'edit', answer: 'readOnly', checkboxMode: "select"}];
  } = props;

    const {
        saveTemplate,
        imgUrl,
        message,
        resetTemplateStates,
    } = useContext(TemplateContext);

  const [showModalAnchor, setShowModalAnchor] = useState(false);

    // useEffect(() => {
    //     resetTemplateStates(config);
    // }, [config]);

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
                {
                    config?.sidePanel && (
                        <SidePanel
                            showImgModalOnClick={setShowModalAnchor}
                        />
                    )
                }
                <>
                    {renderImageUploadModal()}
                    {renderImageCard()}
                </>
                <TemplateHeader
                    headerName={headerName}
                    data={data}
                    actions={actions}
                    config={config}
                />
                <QuestionList
                    data={data}
                    actions={actions}
                    config={config}
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