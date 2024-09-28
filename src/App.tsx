import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading, { LoadingEllipsis } from "./shared/components/loading/Loading";
import SnackbarManager from "./shared/components/snackbar/SnackbarManager";
import { AppContext } from "./shared/functions/Context";
import PrivateRoute from "./shared/functions/PrivateRoute";
import { MainApp } from "./shared/models/App";
import { observer } from "mobx-react-lite";
import useNetwork from "./shared/hooks/useNetwork";
import ScrollToTop from "./shared/components/NavScrollTop/NavScrollTop";
import LoggedIn from "./money-market-management-system/logged-in/LoggedIn";



import LoggedOut from "./money-market-management-system/logged-out/LoggedOut";
import { createTheme, ThemeProvider } from "@mui/material";
import InventoryManagement from "./money-market-management-system/logged-in/system-modules/inventory-management/InventoryManagement";
import React from "react";
import { LockPage } from "./money-market-management-system/logged-out/lock/Lock";
import { OfflinePage } from "./money-market-management-system/logged-out/offline-page/OfflinePage";
import AdminSettings from "./money-market-management-system/logged-in/system-modules/system-settings-module/AdminSettings";
import Dashboard from "./money-market-management-system/logged-in/system-modules/dashboard-module/Dashboard";
import { Notifications } from "@mui/icons-material";

import Reports from "./money-market-management-system/logged-in/system-modules/reports/Reports";
import SalesManagement from "./money-market-management-system/logged-in/system-modules/sales-management/SalesManagement";
import Suppliers from "./money-market-management-system/logged-in/system-modules/suppliers/Suppliers";

const PrivateLoggedIn = () => (
  <PrivateRoute>
    <Suspense fallback={<Loading fullHeight={true} />}>
      <LoggedIn />
    </Suspense>
  </PrivateRoute>
);



// Wrap your lazy-loaded components with Suspense
const LoadingFallback = () => <LoadingEllipsis />;



const MANAGEMENT_SYSTEM_ROUTES = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* Existing routes */}
          <Route path="dashboard" element={
           
              <Dashboard/>
          
          } />

          {/* New e-commerce stock management routes */}
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="settings" element={<AdminSettings />} />
          {/* <Route path="orders" element={<Orders />} /> */}
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="sales" element={<SalesManagement />} />
          {/* <Route path="menu" element={<MenuManagement />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} /> */}
          <Route path="reports" element={<Reports />} />
       
          <Route path="notifications" element={<Notifications />} />

          {/* Other existing routes */}
       
          {/* <Route path="accounts" element={
            <React.Suspense fallback={<LoadingFallback />}>
              <MoneyMarketAccounts />
            </React.Suspense>
          } />
         */}
          <Route path="*" element={<Navigate to="/c" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/lock" element={<LockPage />} />
        {/* <Route path="/command" element={<SystemCommandCenter />} />
        <Route path="/back-dating" element={<TestBackDating />} /> */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const theme = createTheme({
  typography: {
    fontSize: 13,
    fontWeightLight:'lighter',
    fontFamily: 'inherit'
  },
});

const MainRoutes = observer(() => {
  useNetwork();

  // return <MONEY_MARKET_MANAGEMENT_SYSTEM_ROUTES />;
  return <MANAGEMENT_SYSTEM_ROUTES />;

});

const App = observer(() => {
  const app = new MainApp();
  const { store, api, ui } = app;


  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    <div className="app">
      <AppContext.Provider value={{ store, api, ui }}>
        {!isOnline && (
          <div className="offline-message" style={{ background: "#051e38" }}>
            <OfflinePage />
          </div>
        )}
        {isOnline && (
          <>
            <ThemeProvider theme={theme}>
              <MainRoutes />
              <SnackbarManager />
             
            </ThemeProvider>
          </>
        )}
      </AppContext.Provider>
    </div>

  );
});

export default App;


