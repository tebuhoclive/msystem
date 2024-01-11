import { observer } from "mobx-react-lite";
import MainLayout from "../logged-in/main-layout/MainLayout";
import Drawer from "../logged-in/nagivation/Drawer";
import Navbar from "../logged-in/nagivation/Navbar";
import UserProfile from "./components/UserProfile/UserProfile";
import Reminders from "./components/Reminders/Reminders";
import { useAppContext } from "../shared/functions/Context";
import { useState } from "react";
import { IDrink, defaultDrink } from "../shared/models/DrinkModel";


const LoggedOut = observer(() => {
   const [newDrink,setDrink] = useState<IDrink>({ ...defaultDrink });

    const { api, store } = useAppContext();

   const drink = newDrink.name
   console.log(drink);
   
    
  return (
    <div className="container">
      {/* This is the main Layout  which will contain the Drawer The main layout which renders components in nested Routes 
       structure is the Drawer |Main Content| right Drawer  */}
      <Drawer />
      <main>
        <MainLayout />
      </main>

      {/*  Right Section */}
      <div
        className="right-section"
        >
        <Navbar />
        {/* <UserProfile
          username="Clive"
          jobTitle="Web Developer"
          logoSrc="/images/lotswhite.png"
        /> */}
        <Reminders />
      </div>
    </div>
  );
});

export default LoggedOut;


