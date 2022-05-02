import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo.png";

import { FormattedMessage } from "react-intl";
import { FaBars, FaQuestionCircle } from "react-icons/fa";
import { LANGUAGES } from "../../utils";
import en from "../../assets/images/en.png";
import vi from "../../assets/images/vi.png";
import { withRouter, Router, Redirect } from "react-router-dom";

import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
  handleChangeLanguage = (e) => {
    this.props.changeLanguageAppRedux(e.target.value);
  };

  returnToHome = () => {
    const { history } = this.props;
    history.push("/home/");
  };

  render() {
    let language = this.props.language;
    return (
      <>
        <div className="sticky top-0 left-0 right-0 z-50 bg-white ">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 ">
              <div className="flex items-center justify-center cursor-pointer">
                <FaBars className="mr-3 text-2xl" />
                <div
                  className="flex items-center"
                  onClick={() => this.returnToHome()}
                >
                  <img
                    className="h-8 w-auto sm:h-10"
                    src={Logo}
                    alt="Image Doctor"
                  />
                  <span className="ml-2 text-2xl text-red-600 font-semibold">
                    SunCare
                  </span>
                </div>
              </div>
              <nav className="md:flex space-x-10 cursor-pointer">
                <div className="text-base">
                  <div className="font-bold">
                    <FormattedMessage id="homeheader.speciality" />
                  </div>
                  <div>
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </div>
                </div>
                <div className="text-base">
                  <div className="font-bold">
                    <FormattedMessage id="homeheader.health-facility" />
                  </div>
                  <div>
                    <FormattedMessage id="homeheader.choose-hospital-clinic" />
                  </div>
                </div>
                <div className="text-base">
                  <div className="font-bold">
                    {" "}
                    <FormattedMessage id="homeheader.doctor" />
                  </div>
                  <div>
                    <FormattedMessage id="homeheader.choose-doctor" />
                  </div>
                </div>
                <div className="text-base">
                  <div className="font-bold">
                    <FormattedMessage id="homeheader.fee" />
                  </div>
                  <div>
                    <FormattedMessage id="homeheader.general-health-check" />
                  </div>
                </div>
              </nav>
              <div className="flex items-center">
                <div className="flex items-center mr-4 cursor-pointer">
                  {/* <FaQuestionCircle className="text-blue-500 mr-1 text-sm" />
                   */}
                  <div
                    className="login_btn"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center mr-5 px-3 py-1 border border-transparent text-md font-medium rounded-3xl shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Đăng nhập
                    </button>
                  </div>
                  {/* <div className="font-bold text-base flex items-center ">
                    <FormattedMessage id="homeheader.support" />
                  </div> */}
                </div>

                {language === "vi" ? (
                  <img className="w-4" src={vi} />
                ) : (
                  <img className="w-4  " src={en} />
                )}
                <select
                  className="outline-none"
                  value={language}
                  onChange={(e) => this.handleChangeLanguage(e)}
                >
                  <option value={LANGUAGES.VI}>VI</option>
                  <option value={LANGUAGES.EN}>EN</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
