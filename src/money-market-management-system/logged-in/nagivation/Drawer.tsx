import {
  faBell,
  faBoxes,
 
  faChartLine,
  faClipboardList,
  faCog,

  faFileAlt,

  faShoppingCart,

  faTruck,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import ErrorBoundary from "../../../shared/components/error-boundary/ErrorBoundary";
import { useAppContext } from "../../../shared/functions/Context";

import { hasFeaturePermission } from "../../../shared/functions/users-management/UserFeaturePermissionFunctions";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { ACTIVE_ENV } from "../CloudEnv";
import TimeDisplay from "../shared/components/display-time/TimeDisplay";

export const AccountLogo = () => {
  return (
    <div className="account-settings uk-margin-remove">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/CliveTech.png`} alt="Account Logo" className="account-logo" />
      </div>
     
      
      <hr />
    </div>
  );
};


const USER_DRAWER = observer(() => {
  const { store, api } = useAppContext();
  const me = store.auth.meJson;
  const [locking, setLocking] = useState<boolean>(false);

  const handleLock = async () => {
    try {
      setLocking(true);
      const email = me?.email || "";
      localStorage.setItem('userEmail', email);
      await api.auth.onSignedOut();

    } catch (error) {
    }
    finally {
      setLocking(false);
    }
  };


  // const handleLogOut = async () => {
  //   try {
  //     setLocking(true);
  //     await api.auth.onSignedOut();

  //   } catch (error) {
  //   }
  //   finally {
  //     setLocking(false);
  //   }
  // };

  return (
    <div className="drawer-list">

      {hasFeaturePermission(store, "Dashboard", "read") &&
        <ul className="main-list uk-nav-default" data-uk-nav>
          <li className="list-item">
            <NavLink to={"dashboard"} className="navlink">
              Dashboard
            </NavLink>
          </li>
        </ul>
      }

{hasFeaturePermission(store, "Client Profile Management", "read") &&
  <ul className="main-list uk-nav-default" data-uk-nav>
    <li className="list-item">
      <NavLink to={"inventory"} className="navlink">
        <FontAwesomeIcon
          icon={faBoxes}
          className="icon uk-margin-small-right"
        />
        Inventory Management
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"orders"} className="navlink">
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="icon uk-margin-small-right"
        />
        Orders
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"suppliers"} className="navlink">
        <FontAwesomeIcon
          icon={faTruck}
          className="icon uk-margin-small-right"
        />
        Suppliers
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"sales"} className="navlink">
        <FontAwesomeIcon
          icon={faChartLine}
          className="icon uk-margin-small-right"
        />
        Sales Management
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"menu"} className="navlink">
        <FontAwesomeIcon
          icon={faUtensils}
          className="icon uk-margin-small-right"
        />
        Menu/Product Management
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"purchase-orders"} className="navlink">
        <FontAwesomeIcon
          icon={faClipboardList}
          className="icon uk-margin-small-right"
        />
        Purchase Orders
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"reports"} className="navlink">
        <FontAwesomeIcon
          icon={faFileAlt}
          className="icon uk-margin-small-right"
        />
        Reporting & Analytics
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"settings"} className="navlink">
        <FontAwesomeIcon
          icon={faCog}
          className="icon uk-margin-small-right"
        />
        Settings
      </NavLink>
    </li>
    <li className="list-item">
      <NavLink to={"notifications"} className="navlink">
        <FontAwesomeIcon
          icon={faBell}
          className="icon uk-margin-small-right"
        />
        Notifications
      </NavLink>
    </li>
  </ul>
}


    
      <TimeDisplay />
    </div >
  );
});

const DrawerContent = () => {
  return (
    <div className="drawer-content ">
      <div className="drawer-split-view-visible-scrollbar">
        <AccountLogo />
        <USER_DRAWER />
      </div>
    </div>
  );
};

const OverlayDrawer = () => {
  return (
    <div id="navbar-drawer" data-uk-offcanvas="overlay: true">
      <div className="uk-offcanvas-bar">
        <button
          className="uk-offcanvas-close"
          type="button"
          data-uk-close
        ></button>
        <DrawerContent />
      </div>
    </div>
  );
};

const FixedDrawer = () => {
  return (
    <div className="drawer-layout uk-visible@s">
      <DrawerContent />

    </div>
  );
};

const Drawer = () => {
  return (
    <ErrorBoundary>
      <OverlayDrawer />
      <FixedDrawer />

    </ErrorBoundary>
  );
};

export default Drawer;
