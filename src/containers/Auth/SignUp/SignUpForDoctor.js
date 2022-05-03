import React from "react";
import "./SignUp.scss";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import * as Yup from "yup";
// import { authRegister, authsSelector } from "./authSlice";
import image2 from "../../../assets/images/undraw_medicine_b-1-ol.svg";
import { Form } from "antd";
import { Button } from "antd";
const SignUpForDoctor = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  setTimeout(() => {
    document.getElementById("container-register").classList.add("sign-up");
  }, 200);

  return (
    <div className="register">
      <div id="container-register" className="container-register">
        <div className="row">
          {/* Start sign up for doctor */}
          <div className="col align-item-center">
            <div className="form-wrapper align-item-center">
              <div className="form sign-up">
                <h2 className="w-full text-3xl text-center">
                  Đăng ký cho các bác sĩ
                </h2>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    {/* <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      className="input"
                    /> */}
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 uppercase"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <div
                        className="email-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#efefef",
                          borderRadius: "0.5rem",
                          width: "100%",
                        }}
                      >
                        <MailOutlined
                          className="site-form-item-icon"
                          style={{ color: "#757575", marginLeft: "1rem" }}
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          autoFocus={false}
                          placeholder="Nhập email"
                          className="appearance-none block w-full mb-1     placeholder-#efefef focus:outline-none sm:text-sm"
                          style={{
                            backgroundColor: "#efefef",
                            fontSize: "1rem",
                            padding: "1rem",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền mật khẩu",
                      },
                    ]}
                  >
                    {/* <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      className="input"
                    /> */}
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 uppercase"
                    >
                      Mật khẩu
                    </label>
                    <div>
                      <div
                        className="password-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#efefef",
                          borderRadius: "0.5rem",
                          width: "100%",
                        }}
                      >
                        <LockOutlined
                          className="site-form-item-icon"
                          style={{ color: "#757575", marginLeft: "1rem" }}
                        />
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          required
                          autoFocus={false}
                          placeholder="Nhập mật khẩu"
                          className="appearance-none block w-full mb-1     placeholder-#efefef focus:outline-none sm:text-sm"
                          style={{
                            backgroundColor: "#efefef",
                            fontSize: "1rem",
                            padding: "1rem",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền mật khẩu",
                      },
                    ]}
                  >
                    {/* <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      className="input"
                    /> */}
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 uppercase"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <div>
                      <div
                        className="password-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#efefef",
                          borderRadius: "0.5rem",
                          width: "100%",
                        }}
                      >
                        <LockOutlined
                          className="site-form-item-icon"
                          style={{ color: "#757575", marginLeft: "1rem" }}
                        />
                        <input
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          autoComplete="password"
                          required
                          autoFocus={false}
                          placeholder="Xác nhận mật khẩu"
                          className="appearance-none block w-full mb-1     placeholder-#efefef focus:outline-none sm:text-sm"
                          style={{
                            backgroundColor: "#efefef",
                            fontSize: "1rem",
                            padding: "1rem",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Đăng ký
                    </Button>
                  </Form.Item>
                  <span className="navigate-sign-in">
                    Bạn là bệnh nhân đang có nhu cầu tham gia?{" "}
                    <span style={{ color: "red" }}>Đăng ký tại đây !</span>
                  </span>
                </Form>
              </div>
            </div>
          </div>
          {/* End sign up for doctor */}
          {/* Start sign up for doctor content */}
          <div className="col align-item-center flex-col">
            <div className="img sign-up">
              <img src={image2} alt="welcome" />
            </div>
            <div className="text sign-up">
              <h2>Tham gia cùng chúng tôi nào</h2>
              <p>
                Bạn đang muốn kiếm thêm thu nhập vào những khung giờ rảnh rỗi?
                Chúng tôi sẽ giới thiệu các bệnh nhân đang lo lắng về sức khỏe
                và cần sự trợ giúp từ bạn
              </p>
            </div>
          </div>
          {/* End sign up for doctor content */}
        </div>
      </div>
    </div>
  );
};

export default SignUpForDoctor;
