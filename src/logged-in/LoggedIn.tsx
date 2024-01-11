import { observer } from "mobx-react-lite";
import MainLayout from "./main-layout/MainLayout";
import Drawer from "./nagivation/Drawer";
import Navbar from "./nagivation/Navbar";
import LOGO from "../assets/IJG.png";
const LoggedIn = observer(() => {
  return (
    <div className="container">
      <Drawer />
      <main>
        <MainLayout />
      </main>

      {/*  Right Section */}
      <div className="right-section">
        <Navbar />
      </div>
    </div>
  );
});

export default LoggedIn;
