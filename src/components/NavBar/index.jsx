import React, { useState } from "react";
import propTypes from "prop-types";
import { TabBar } from "zarm";
import { useHistory, useLocation } from "react-router-dom";
import s from "./style.module.less";
import CustomIcon from "../CustomIcon";

const { Item } = TabBar;
const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState(useLocation().pathname);
  const history = useHistory();

  const changeTab = (path) => {
    setActiveKey(path);
    history.push(path);
  };

  return (
    <TabBar
      visible={showNav}
      className={s.tab}
      activeKey={activeKey}
      onChange={changeTab}
    >
      <Item itemKey="/" title="账单" icon={<CustomIcon type="zhangdan" />} />
      <Item itemKey="/data" title="统计" icon={<CustomIcon type="tongji" />} />
      <Item itemKey="/user" title="我的" icon={<CustomIcon type="wode" />} />
    </TabBar>
  );
};

NavBar.propTypes = {
  showNav: propTypes.bool,
};

export default NavBar;
