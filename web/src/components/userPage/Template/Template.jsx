import React, {useContext} from 'react';
import TemplateHeader from "./TemplateHeader";
import QuestionList from "./QuestionList";
import {Button} from "@mui/material";
import {TemplateContext} from "../../contexts/TemplateContext";
import ImageUploadModal from "./ImageUploadModal";
import MessageBlock from "./MessageBlock";
import withTemplateData from "../../hocs/withTemplateData";

function Template(props) {

  const {
      headerName,
      btnName,
      data,
      actions,
      url,
      loading,
      showModalAnchor,
      setShowModalAnchor,
  } = props;

    const {
        saveTemplate,
        saveForm,
        imgUrl,
        message,
    } = useContext(TemplateContext);

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
                                onClick={() => btnName === 'Сохранить шаблон' || btnName === 'Сохранить изменения' ? saveTemplate(url) :
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