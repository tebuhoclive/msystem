import React from "react";

interface InventoryTypeTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const InventoryTypeTabs: React.FC<InventoryTypeTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className="type-tabs">
      <button
        className={`tab ${selectedTab === "active-inventory-tab" ? "active" : ""}`}
        onClick={() => setSelectedTab("active-inventory-tab")}
      >
        Food
      </button>
      <button
        className={`tab ${selectedTab === "active-inventory-tab" ? "active" : ""}`}
        onClick={() => setSelectedTab("active-inventory-tab")}
      >
        Drinks
      </button>
    </div>
  );
};

export default InventoryTypeTabs;
