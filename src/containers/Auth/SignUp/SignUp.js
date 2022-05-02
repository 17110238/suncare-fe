import "./SignUp.scss";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { authRegister, authsSelector } from "./authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import image from "../../assets/undraw_doctor_kw-5-l_v2.svg";
import image2 from "../../assets/undraw_medicine_b-1-ol.svg";
const Register = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const toggle = () => {
    document.getElementById("container-register").classList.toggle("sign-in");
    document.getElementById("container-register").classList.toggle("sign-up");
  };

  setTimeout(() => {
    document.getElementById("container-register").classList.add("sign-in");
  }, 200);

  return (
    <div className="register">
      <div id="container-register" className="container-register">
        <div className="row">
          {/* Start sign up */}
          <div className="col align-item-center">
            <div className="form-wrapper align-item-center">
              <div className="form sign-up">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                      className="input"
                    />
                  </Form.Item>
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
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Confirm Password"
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Register
                    </Button>
                  </Form.Item>
                  <span className="navigate-sign-in" onClick={toggle}>
                    Already have an account? Sign in here
                  </span>
                </Form>
              </div>
            </div>
          </div>
          {/* End sign up */}
          {/* Start sign in */}
          <div className="col align-item-center">
            <div className="form-wrapper align-item-center">
              <div className="form sign-in">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Sign in
                    </Button>
                  </Form.Item>
                  <span className="navigate-sign-in" onClick={toggle}>
                    Don't have an account? Sign up here
                  </span>
                </Form>
              </div>
            </div>
          </div>
          {/* End sign in */}
          {/* Start Content section */}
          <div className="row content-row">
            {/* Start Sign in content */}
            <div className="col align-item-center flex-col">
              <div className="text sign-in">
                <h2>Welcome back</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aperiam aliquam praesentium minima totam sit nulla mollitia
                  neque. Cum facere cumque voluptatem, incidunt optio quam?
                  Maxime quas praesentium dolore quae.
                </p>
              </div>
              <div className="img sign-in">
                <img src={image} alt="welcome" />
              </div>
            </div>
            {/* End Sign in content */}
            {/* Start sign up content */}
            <div className="col align-item-center flex-col">
              <div className="img sign-up">
                <img src={image2} alt="welcome" />
              </div>
              <div className="text sign-up">
                <h2>Join with us</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aperiam aliquam praesentium minima totam sit nulla mollitia
                  neque. Cum facere cumque voluptatem, incidunt optio quam?
                  Maxime quas praesentium dolore quae.
                </p>
              </div>
            </div>
            {/* End sign up content */}
          </div>
          {/* End Content section */}
        </div>
      </div>
    </div>
  );
};

export default Register;
