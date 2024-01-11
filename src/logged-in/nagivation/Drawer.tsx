import { NavLink } from "react-router-dom";
import ErrorBoundary from "../../shared/components/error-boundary/ErrorBoundary";
import AccordionSection from "./Accordian-Section/Accordion";

const USER_DRAWER = () => {
  return (
    <aside>
      <div className="toggle">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/lotswhite.png"} alt="Logo" />
          <h2>
            Mana<span className="danger">gement</span>
          </h2>
        </div>
        <div className="close" id="close-btn">
          <span className="material-icons-sharp">close</span>
        </div>
      </div>

      <div className="sidebar">
        <NavLink to="/in/client">
          <span className="material-icons-sharp">dashboard</span>
          <h3>Stock</h3>
        </NavLink>
        {/* <NavLink to="/in/client">
          <span className="material-icons-sharp">person_outline</span>
          <h3>Users</h3>
        </NavLink> */}

        <NavLink to="/in/client">
          <span className="material-icons-sharp">receipt_long</span>
          <h3>Credits</h3>
        </NavLink>
        <NavLink to="/in/client">
          <span className="material-icons-sharp">insights</span>
          <h3>Statistics</h3>
        </NavLink>
      
        <NavLink to="/in/client">
          <span className="material-icons-sharp">inventory</span>
          <h3>Sales</h3>
        </NavLink>
       

       
        <NavLink to="/logout">
          <span className="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </NavLink>
      </div>
    </aside>
  );
};

const DrawerContent = () => {
  return (
    <>
      <USER_DRAWER />
    </>
  );
};

const FixedDrawer = () => {
  return <DrawerContent />;
};

const Drawer = () => {
  return (
    <ErrorBoundary>
      <FixedDrawer />
    </ErrorBoundary>
  );
};

export default Drawer;
