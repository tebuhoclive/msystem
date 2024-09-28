import React, { useEffect, useRef } from "react";
import "./InventoryTabs.scss";
interface InventoryTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const InventoryTabs: React.FC<InventoryTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  const gliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeTab = document.querySelector(".tab.active");
    if (activeTab && gliderRef.current) {
      const { offsetLeft, offsetWidth, offsetHeight } = activeTab as HTMLElement;
      gliderRef.current.style.left = `${offsetLeft}px`;
      gliderRef.current.style.width = `${offsetWidth}px`;
      gliderRef.current.style.height = `${offsetHeight}px`;
    }
  }, [selectedTab]);

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
      {/* Glider wrapping the active tab */}
      <div className="glider" ref={gliderRef}></div>
    </div>
  );
};

export default InventoryTabs;
