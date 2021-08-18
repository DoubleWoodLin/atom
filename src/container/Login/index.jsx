import React, { useState, useCallback } from "react";
import { Cell, Input, Button, Checkbox, Toast } from "zarm";
import CustomIcon from "@/components/CustomIcon";
import { post } from "@/utils";
import s from "./style.module.less";
import Captcha from "react-captcha-code";
import cx from "classnames";

const Login = () => {
  const [type, setType] = useState("login");
  const [username, setUsername] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [verify, setVerify] = useState(""); // 验证码
  const [captcha, setCaptcha] = useState(""); // 验证码变化后存储值
  const handleChange = useCallback((captcha) => {
    console.log("captcha", captcha);
    setCaptcha(captcha);
  }, []);

  const onSubmit = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }
    try {
      if (type === "login") {
        const { data } = await post("/api/user/login", {
          username,
          password,
        });
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        if (!verify) {
          Toast.show("请输入验证码");
          return;
        }
        if (verify != captcha) {
          Toast.show("验证码错误");
          return;
        }
        const { data } = await post("/api/user/register", {
          username,
          password,
        });
        Toast.show("注册成功");
        setType("login");
      }
    } catch (error) {
      Toast.show("系统错误");
    }
  };

  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        {" "}
        <div className={s.tab}>
          <span
            className={cx({ [s.avtive]: type == "login" })}
            onClick={() => setType("login")}
          >
            登录
          </span>
          <span
            className={cx({ [s.avtive]: type == "register" })}
            onClick={() => setType("register")}
          >
            注册
          </span>
        </div>
      </div>
      <div className={s.form}>
        <Cell icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={(value) => setUsername(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(value) => setPassword(value)}
          />
        </Cell>
        {type === "register" ? (
          <Cell icon={<CustomIcon type="mima" />}>
            <Input
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={(value) => setVerify(value)}
            />
            <Captcha charNum={4} onChange={handleChange} />
          </Cell>
        ) : null}
      </div>
      <div className={s.operation}>
        {type === "register" ? (
          <div className={s.agree}>
            <Checkbox />
            <label className="text-light">
              阅读并同意<a>《Atom手札条款》</a>
            </label>
          </div>
        ) : null}
        <Button onClick={onSubmit} block theme="primary">
          {type === "login" ? "登录" : "注册"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
