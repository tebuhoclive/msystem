import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../nagivation/Navbar";
import {
  LoadingEllipsis
} from "../../../shared/components/loading/Loading";
import { useAppContext } from "../../../shared/functions/Context";
import { observer } from "mobx-react-lite";
import useInactivityTimer from "../../../shared/hooks/userInteractionTime";


const MainLayout = observer(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [systemDataLoading, setSystemDataLoading] = useState(false);
  const { api, store } = useAppContext();

  const me = store.auth.meJson;

  const isInactive = useInactivityTimer(300000); // 5 min

  const handleLock = async () => {
    try {
      const email = me?.email || ""; // Replace this with the actual email you want to store
      localStorage.setItem('userEmail', email);
      await api.auth.onSignedOut();
      navigate("/lock")
    } catch (error) {
      // Handle the error
    } finally {
      // Any cleanup actions
    }
  };



  // if (isInactive === true && pathname !== "/c/month-end") {
  //   handleLock();
  // }

  useEffect(() => {
    const loadSystemData = async () => {
      try {
        setSystemDataLoading(true);
        await Promise.all([
        
          api.user.getAll(),
        ]);
      } catch (error) {
      } finally {
        setSystemDataLoading(false);
      }
    };
    // Call the function directly inside useEffect
    loadSystemData();
  }, []); // Empty dependency array to run the effect once on mount


  useEffect(() => {
    if (pathname === "/c") navigate("/c/dashboard");
  }, [navigate, pathname]);

  return (
    <main className="main-layout">
      {systemDataLoading &&
        <div style={{ textAlign: "center" }}>
          <LoadingEllipsis />
          <h2 style={{ color: "#004c98" }}>Loading System Data....</h2>
        </div>
      }
      {!systemDataLoading &&
        <>

          <Navbar />
          <Outlet />
        </>
      }
    </main >
  );
});

export default MainLayout;
