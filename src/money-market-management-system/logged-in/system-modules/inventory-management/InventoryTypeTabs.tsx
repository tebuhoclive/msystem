import React from "react";
import "./InventoryTypeTabs.scss";

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
      {/* Main Tabs */}
      <button
        className={`main-tab ${selectedTab === "active-inventory-tab" ? "active" : ""}`}
        onClick={() => setSelectedTab("active-inventory-tab")}
      >
        Food
      </button>
      <button
        className={`main-tab ${selectedTab === "drinks-inventory-tab" ? "active" : ""}`}
        onClick={() => setSelectedTab("drinks-inventory-tab")}
      >
        Drinks
      </button>

      {/* Sub Tabs (Example) */}
      <div className="sub-tabs">
        <button
          className={`sub-tab ${selectedTab === "fruits-tab" ? "active" : ""}`}
          onClick={() => setSelectedTab("fruits-tab")}
        >
          Fruits
        </button>
        <button
          className={`sub-tab ${selectedTab === "vegetables-tab" ? "active" : ""}`}
          onClick={() => setSelectedTab("vegetables-tab")}
        >
          Vegetables
        </button>
      </div>
    </div>
  );
};

export default InventoryTypeTabs;
