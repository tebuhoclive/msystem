import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../shared/functions/Context";
import { hideModalFromId } from "../../../../shared/functions/ModalShow";
import MODAL_NAMES from "../ModalName";
import React from "react";
import swal from "sweetalert";

const InventoryModal = observer(() => {
  const { api, store } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [inventoryItem, setInventoryItem] = useState<any>(null);

  useEffect(() => {
    if (store.inventory.selected) {
      setInventoryItem(store.inventory.selected);
    }
  }, [store.inventory.selected]);

  const handleVerify = async () => {
    setLoading(true);
    const verifiedInventory = {
      ...inventoryItem,
      status: "Verified",
    };

    try {
      // await api.inventory.verify(verifiedInventory);
      swal({
        icon: "success",
        text: "Inventory Verified Successfully!",
      });
      // hideModalFromId(MODAL_NAMES.ADMIN.VERIFY_INVENTORY_MODAL);
    } catch (error) {
      swal({
        icon: "error",
        text: "Error Verifying Inventory",
      });
    }

    setLoading(false);
  };

  const onCancel = () => {
    // hideModalFromId(MODAL_NAMES.ADMIN.VERIFY_INVENTORY_MODAL);
  };

  return (
    <div className="custom-modal-style uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button className="uk-modal-close-default" type="button" data-uk-close></button>
      <h3 className="main-title-sm text-to-break">Verify Inventory</h3>
      <hr />
      <div className="dialog-content uk-position-relative">
        <div className="uk-width-1-1">
          <label className="uk-form-label">Inventory Item</label>
          <div className="uk-form-controls">
            <input
              className="uk-input uk-form-small"
              type="text"
              value={inventoryItem?.itemName || ""}
              readOnly
            />
          </div>
        </div>
        <hr className="uk-width-1-1" />
        <div className="uk-width-1-1 uk-text-right">
          <button className="btn btn-success" type="button" onClick={handleVerify} disabled={loading}>
            Verify {loading && <div data-uk-spinner="ratio: .5"></div>}
          </button>
          <button className="btn btn-danger" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});

export default InventoryModal;
