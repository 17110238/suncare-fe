import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FaGooglePlus, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import * as actions from "../../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import doccare from "../../../assets/images/doctorcare.jpg";
import { handleLoginApi } from "../../../services/userService";
// import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../Homepage/HomeHeader";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      type: "password",
      errorMessage: "",
      hideShow: false,
    };
  }

  handleUserNameChange = (e) => {
    this.setState({ errorMessage: "" });
    const userName = e.target.value;
    this.setState({ username: userName });
  };

  handlePassWordChange = (e) => {
    this.setState({ errorMessage: "" });
    const password = e.target.value;
    this.setState({ password: password });
  };

  handleOnSignIn = async () => {
    try {
      const data = await handleLoginApi(
        this.state.username,
        this.state.password
      );
      if (data && data.errCode !== 0) {
        this.setState({ errorMessage: data.message });
      }

      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errorMessage: error.response.data.message });
        }
      }
    }
  };

  handleOnKeyDown = async (e) => {
    // if (e.keyCode === 13) {
    //     alert('yeyeyeyey')
    // }
    if (e.key === "Enter" || e.charCode === 13) {
      try {
        const data = await handleLoginApi(
          this.state.username,
          this.state.password
        );
        if (data && data.errCode !== 0) {
          this.setState({ errorMessage: data.message });
        }

        if (data && data.errCode === 0) {
          this.props.userLoginSuccess(data.user);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            this.setState({ errorMessage: error.response.data.message });
          }
        }
      }
    }
  };

  handleShowPassWord = () => {
    this.setState({
      type: "password",
      hideShow: false,
    });
  };

  handleHidePassWord = () => {
    this.setState({
      type: "text",
      hideShow: true,
    });
  };

  handleClickRegister = () => {
    const { history } = this.props;
    history.push("/sign-up");
  };

  render() {
    const { username, password, type, hideShow } = this.state;
    return (
      <div className="w-full h-screen overflow-hidden">
        <HomeHeader />
        <div
          className="login-background h-screen flex items-center justify-center lg:p-56 -mt-12"
          onKeyPress={(e) => this.handleOnKeyDown(e)}
        >
          <div className="bg-white px-8 rounded-3xl">
            <div className="flex items-center justify-center">
              <div className="w-3/5 lg:block sm:hidden md:block xl:block">
                <img src={doccare} />
              </div>
              <form className="bg-gray-100 shadow-md px-8 pt-6 pb-8 w-2/5">
                <div className="text-2xl font-bold text-center mb-6">
                  <FormattedMessage id="login.login" />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    <FormattedMessage id="login.email" />
                  </label>
                  <input
                    className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-300 focus:outline-none focus:shadow-outline"
                    value={username}
                    id="username"
                    type="text"
                    placeholder="Enter your email"
                    onChange={(e) => this.handleUserNameChange(e)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    <FormattedMessage id="login.password" />
                  </label>
                  <div className="flex ">
                    <input
                      className="shadow appearance-none rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-2 focus:ring-blue-300 focus:outline-none focus:shadow-outline"
                      id="password"
                      type={type}
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => this.handlePassWordChange(e)}
                    />
                    {hideShow === false ? (
                      <FaEyeSlash
                        onClick={() => this.handleHidePassWord()}
                        className="cursor-pointer -ml-8 mt-2.5 z-10"
                      ></FaEyeSlash>
                    ) : (
                      <FaEye
                        onClick={() => this.handleShowPassWord()}
                        className="cursor-pointer -ml-8 mt-2.5 z-10"
                      ></FaEye>
                    )}
                  </div>
                  <div className="text-red-600 ml-4 -mt-2">
                    {this.state.errorMessage}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold lg:py-2 lg:px-4 md:py-1 md:px-1 sm:py-1 sm:px-1 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => this.handleOnSignIn()}
                  >
                    <FormattedMessage id="login.login" />
                  </button>
                  {/* <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    <FormattedMessage id="login.forgot-password" />
                  </a> */}
                </div>
                <div className="sign-up-btn">
                  <FormattedMessage id="login.note" />{" "}
                  <span onClick={() => this.handleClickRegister()}>
                    <FormattedMessage id="login.register-here" />
                  </span>
                </div>
                {/* <div className="mt-8 flex items-center">
                  <div className="w-1 h-1 bg-gray-400 flex-1"></div>
                  <div className="mx-2">
                    <FormattedMessage id="login.sign-in-with" />
                  </div>
                  <div className="w-1 h-1 bg-gray-400 flex-1"></div>
                </div> */}
                {/* <div className="mt-4 flex justify-center">
                  <div className="text-5xl mr-4 text-red-700">
                    <FaGooglePlus />
                  </div>
                  <div className="text-5xl text-blue-700">
                    <FaFacebook />
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
