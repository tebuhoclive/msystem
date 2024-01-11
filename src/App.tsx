import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SnackbarManager from "./shared/components/snackbar/SnackbarManager";
import { AppContext } from "./shared/functions/Context";
import PrivateRoute from "./shared/functions/PrivateRoute";
import { MainApp } from "./shared/models/App";
import { observer } from "mobx-react-lite";
import LoggedOut from "./logged-out/LoggedOut";
import Loading from "./shared/components/loading/Loading";
import ScrollToTop from "./shared/components/NavSrcollTop/NavScrollTop";
import Dashboard from "./logged-in/system-modules/dashboard/Dashboard";
import MainLayout from "./logged-in/main-layout/MainLayout";
import Client from "./logged-out/Client";
import Login from "./logged-out/Login";

// import { Card } from "./logged-out/Card/Card";

// import { Card } from "./logged-out/Card";
// import card from "./logged-in/main-layout/card";
// import Card from "./logged-out/card/Card";
// import { Client } from "./logged-out/card/Client";

// import DynamicTable from "./logged-out/DynamicTable";

const LoggedIn = lazy(() => import("./logged-in/LoggedIn"));

const PrivateLoggedIn = () => (
  <PrivateRoute>
    <Suspense fallback={<Loading fullHeight={true} />}>
      <LoggedIn />
    </Suspense>
  </PrivateRoute>
);
const ROUTES = () => {
  //element={<PrivateLoggedIn />}
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="in" element={<LoggedOut />}>
          <Route path="client" element={<Client />} />
        </Route>
        <Route path="/l" element={<Login />}></Route>

        <Route path="/*" element={<Navigate to="l" />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = observer(() => {
  const app = new MainApp();
  const { store, api, ui } = app;

  return (
    <div className="app">
      <AppContext.Provider value={{ store, api, ui }}>
        <ROUTES />
        <SnackbarManager />
      </AppContext.Provider>
    </div>
  );
});
export default App;
