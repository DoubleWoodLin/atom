import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { ConfigProvider } from "zarm";
import zhCN from "zarm/lib/config-provider/locale/zh_CN";
import routes from "@/router";

import NavBar from "@/components/NavBar";

function App() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  const { pathname } = location;
  const needNav = ["/", "/data", "/user"];

  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]);
  return (
    <>
      <ConfigProvider primaryColor={"#007fff"} locale={zhCN}>
        <Switch>
          {routes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </ConfigProvider>
      <NavBar showNav={showNav}></NavBar>
    </>
  );
}

export default App;
