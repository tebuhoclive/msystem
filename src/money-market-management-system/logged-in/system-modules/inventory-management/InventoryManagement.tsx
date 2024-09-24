import MODAL_NAMES from "../../dialogs/ModalName";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Modal from "../../../../shared/components/Modal";
import { useAppContext } from "../../../../shared/functions/Context";
import showModalFromId from "../../../../shared/functions/ModalShow";
import InventoryTabs from "./InventoryTabs ";
import { ActiveInventoryGrid } from "./ActiveInventoryGrid";
import InventoryTypeTabs from "./InventoryTypeTabs";
import { NewInventoryGrid } from "./NewInventoryGrid";
import InventoryModal from "../../dialogs/inventory/InventoryModal";
import ImportInventoryModal from "../../dialogs/inventory/ImportInventoryModal";
import Toolbar from "../../shared/components/toolbar/Toolbar";

const InventoryManagement = observer(() => {
  const { store } = useAppContext();
  const user = store.auth.meJson;

  const [selectedTab, setSelectedTab] = useState("active-inventory-tab");
  const [loading, setLoading] = useState(false);

  const activeInventory = store.inventory.all
    .filter((item) => item.asJson.status === "active")
    .sort((a, b) => {
      const createdAtA = new Date(a.asJson.createdAt || 0);
      const createdAtB = new Date(b.asJson.createdAt || 0);
      return createdAtB.getTime() - createdAtA.getTime();
    })
    .map((item) => item.asJson);

  const newInventory = store.inventory.all
    .filter((item) => item.asJson.status === "pending")
    .sort((a, b) => {
      const dateA = new Date(a.asJson.inventoryCode);
      const dateB = new Date(b.asJson.inventoryCode);
      return dateB.getTime() - dateA.getTime();
    })
    .map((item) => item.asJson);

  const hasCreatePermission = user?.feature.some(
    (feature) =>
      feature.featureName === "Inventory Management" && feature.create === true
  );

  const onAddNewInventory = () => {
    store.inventory.clearSelected();
    showModalFromId(MODAL_NAMES.ADMIN.INVENTORY_MODAL);
  };

  const onImportInventory = () => {
    showModalFromId(MODAL_NAMES.ADMIN.IMPORT_INVENTORY_MODAL);
  };

  return (
    <div className="page uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <div className="sticky-top">
          <Toolbar
            title="Inventory"
            rightControls={
              <>
                {hasCreatePermission && (
                  <>
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={onAddNewInventory}
                      >
                        Add New Inventory
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={onImportInventory}
                      >
                        Import Inventory
                      </button>
                    </>
                  </>
                )}
              </>
            }
          />
          <hr />
        </div>

        <div className="page-main-card uk-card uk-card-default uk-card-body">
          <Toolbar
            leftControls={
              <h4 className="main-title-lg">
                {selectedTab === "active-inventory-tab"
                  ? "Active Inventory"
                  : "New Inventory"}
              </h4>
            }
            rightControls={
              <InventoryTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            }
          />
          <hr />
          {selectedTab === "active-inventory-tab" && (
            <>
              <Toolbar
                leftControls={
                  <InventoryTypeTabs
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                }
              />
              <hr />
              {!loading && <ActiveInventoryGrid data={activeInventory} />}
            </>
          )}
          {selectedTab === "new-inventory-tab" && (
            <>{!loading && <NewInventoryGrid data={newInventory} />}</>
          )}
        </div>
      </div>
      <Modal modalId={MODAL_NAMES.ADMIN.INVENTORY_MODAL}>
        <InventoryModal />
      </Modal>
      <Modal modalId={MODAL_NAMES.ADMIN.IMPORT_INVENTORY_MODAL}>
        <ImportInventoryModal />
      </Modal>
    </div>
  );
});

export default InventoryManagement;
