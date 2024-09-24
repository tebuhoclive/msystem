import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useAppContext } from "../../../../shared/functions/Context";
import { hideModalFromId } from "../../../../shared/functions/ModalShow";
import MODAL_NAMES from "../ModalName";
import React from "react";
import swal from "sweetalert";


const ImportInventoryModal = observer(() => {
  const { api, store } = useAppContext();
  const [instructionFileURL, setInstructionFileURL] = useState("");
  const [reasonForNoAttachment, setReasonForNoAttachment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInstructionFileUpload = (url: string) => {
    setInstructionFileURL(url);
  };

  const handleReasonForNoAttachment = (reason: string) => {
    setReasonForNoAttachment(reason);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const inventoryImportDetails = {
      support: instructionFileURL,
      reasonForNoInstruction: reasonForNoAttachment,
    };

    try {
      // await api.inventory.import(inventoryImportDetails);
      swal({
        icon: "success",
        text: "Inventory Imported Successfully!",
      });
      hideModalFromId(MODAL_NAMES.ADMIN.IMPORT_INVENTORY_MODAL);
    } catch (error) {
      swal({
        icon: "error",
        text: "Error Importing Inventory",
      });
    }

    setLoading(false);
  };

  const onCancel = () => {
    hideModalFromId(MODAL_NAMES.ADMIN.IMPORT_INVENTORY_MODAL);
  };

  return (
    <div className="custom-modal-style uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button className="uk-modal-close-default" type="button" data-uk-close></button>
      <h3 className="main-title-sm text-to-break">Import Inventory</h3>
      <hr />
      <div className="dialog-content uk-position-relative">
        <form className="uk-form-stacked uk-grid-small" data-uk-grid onSubmit={handleSubmit}>
          {/* <InstructionFileUploader
            onFileUpload={handleInstructionFileUpload}
            onProvideReason={handleReasonForNoAttachment}
            fileUrl={instructionFileURL}
            reasonForNotProvingFile={reasonForNoAttachment}
            label="Support"
          /> */}
          <hr className="uk-width-1-1" />
          <div className="uk-width-1-1 uk-text-right">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              Import {loading && <div data-uk-spinner="ratio: .5"></div>}
            </button>
            <button className="btn btn-danger" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ImportInventoryModal;
