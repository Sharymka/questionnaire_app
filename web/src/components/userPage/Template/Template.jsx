import React, {useContext, useEffect, useMemo, useState} from 'react';
import TemplateHeader from "./TemplateHeader";
import QuestionList from "./QuestionList";
import {Button} from "@mui/material";
import {TemplateContext} from "../../contexts/TemplateContext";
import ImageUploadModal from "./ImageUploadModal";
import MessageBlock from "./MessageBlock";
import withTemplateData from "../../hocs/withTemplateData";
import useActionsTemplates from "../../hooks/useActionsTemplates";
import SidePanel from "./SidePanel";

function Template(props) {

  const {
      headerName,
      btnName,
      data,
      actions,
      url,
      loading,
  } = props;

    const {
        saveForm,
        message,
        imgUrl,
        selectedTempId
    } = useContext(TemplateContext);

    const [blobUrl, setBlobUrl] = useState(null);
    const [showModalAnchor, setShowModalAnchor] = useState(false);


    const { saveTemplate, updateTemplate } = useActionsTemplates();

    const renderImageUploadModal = () => (
        showModalAnchor && <ImageUploadModal
            open={showModalAnchor}
            handleClose={setShowModalAnchor}
            blobUrl={blobUrl}
            setBlobUrl={setBlobUrl}
        />
  );

 const renderCardImg = () => {
     return (imgUrl ? blobUrl ? <div className="card mb-2 card-background" style={{backgroundImage: `url(${blobUrl})`}}></div> :
         <div className="card mb-2 card-background" style={{backgroundImage: `url(${imgUrl})`}}></div>: <></>)
 };

    return (
        loading ? (
            <div>Загрузка</div>
        ) : (
            <div class="relativePosition">
                <>
                    {renderImageUploadModal()}
                    {renderCardImg()}
                </>
                <SidePanel
                    showImgModalOnClick={setShowModalAnchor}
                />
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
                                onClick={() => btnName === 'Сохранить шаблон'? saveTemplate(url): btnName === 'Сохранить изменения' ? updateTemplate(selectedTempId):
                                    btnName === 'Отправить форму' ? saveForm(url): null}
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
export default withTemplateData(Template);