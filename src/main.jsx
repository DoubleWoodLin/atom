import React from "react";
import ReactDOM from "react-dom";
import "lib-flexible/flexible";
import "./index.css";
import App from "./App";
// import { pm } from "@/utils";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// 计算资源加载时间
// 在项目的入口文件的底部
// const log = async () => {
//   // const pMonitor = await import("@/utils/pm.js");
//   const pMonitor = pm;
//   console.log(pMonitor);
//   pMonitor.init({ url: "xxx", timeoutUrl: "xxxx" });
//   pMonitor.logPackage();
//   // 可以进一步将 bindEvent 方法从源码中删除
// };
// const oldOnload = window.onload;
// window.onload = (e) => {
//   if (oldOnload && typeof oldOnload === "string") {
//     oldOnload(e);
//   }
//   // 尽量不影响页面主线程
//   if (window.requestIdleCallback) {
//     window.requestIdleCallback(log);
//   } else {
//     setTimeout(log);
//   }
// };
