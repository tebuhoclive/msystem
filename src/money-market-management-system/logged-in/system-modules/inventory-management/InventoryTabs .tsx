import React from "react";

interface InventoryTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const InventoryTabs: React.FC<InventoryTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${selectedTab === "active-inventory-tab" ? "active" : ""}`}
        onClick={() => setSelectedTab("active-inventory-tab")}
      >
        Active Inventory
      </button>
      <button
        className={`tab ${selectedTab === "new-inventory-tab" ? "active" : ""}`}
        onClick={() => setSelectedTab("new-inventory-tab")}
      >
        New Inventory
      </button>
    </div>
  );
};

export default InventoryTabs;
