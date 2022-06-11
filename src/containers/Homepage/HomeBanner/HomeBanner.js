import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeBanner.scss";
// import Logo from "../../assets/images/logo.png";
import { FormattedMessage } from "react-intl";
import {
  FaBars,
  FaQuestionCircle,
  FaSearch,
  FaHospital,
  FaMobileAlt,
  FaBed,
  FaFlask,
  FaUserMd,
  FaBriefcaseMedical,
} from "react-icons/fa";
// import { LANGUAGES } from "../../utils";
// import en from "../../assets/images/en.png";
import en from "../../../assets/images/en.png";
import vi from "../../../assets/images/vi.png";
import { SearchOutlined } from "@ant-design/icons";

// import { changeLanguageApp } from "../../store/actions";
import {changeLanguageApp} from "../../../store/actions"

class HomeHeader extends Component {
  handleChangeLanguage = (e) => {
    this.props.changeLanguageAppRedux(e.target.value);
  };

  render() {
    let isShowBanner = this.props.isShowBanner;
    const handleATag = (e) => {
        e.prevenDefault();
    }
    return (
      <div>
        <div className="HomeBanner">
          <div>
            <div className="banner_content">
              <div className="container">
                <h1><FormattedMessage id="banner.medical-background" /></h1>
                <b><FormattedMessage id="banner.comprehensive-health-care" /></b>
                <div className="search_form">
                  <div className="search_bar">
                    <span>
                      <SearchOutlined />
                    </span>
                    <input type="search" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="banner_option">
              <ul>
                <li>
                  <a href="/chuyenkhoa" onClick={handleATag}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png")`,
                      }}
                    ></div>
                    {/* Khám
                    <br />
                    Chuyên khoa */}
                    <FormattedMessage id="banner.speciality-examination" style={{whiteSpace: "pre-line"}} />
                  </a>
                </li>
                <li>
                  <a href="/chuyenkhoa" onClick={handleATag}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png")`,
                      }}
                    ></div>
                    <FormattedMessage id="banner.general-examination" />
                  </a>
                </li>
                <li>
                  <a href="/chuyenkhoa" onClick={handleATag}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png")`,
                      }}
                    ></div>
                    <FormattedMessage id="banner.medical-test" />
                  </a>
                </li>
                <li>
                  <a href="/chuyenkhoa" onClick={handleATag}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png")`,
                      }}
                    ></div>
                    <FormattedMessage id="banner.mental-health" />
                  </a>
                </li>
                <li>
                  <a href="/chuyenkhoa" onClick={handleATag}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("https://png.pngtree.com/png-clipart/20191123/original/pngtree-dental-clinic-line-icon-vector-png-image_5199460.jpg")`,
                      }}
                    ></div>
                    <FormattedMessage id="banner.dental-examination" />
                  </a>
                </li>
                {/* <li>
                  <a href="/chuyenkhoa" onClick={handleATag}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/134356-goi-phau-thuat.png")`,
                      }}
                    ></div>
                    Gói
                    <br />
                    Phẫu thuật
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="home-header-panner w-full h-bg  antialiased bg-header-panner">
                    <div className="flex flex-col ml-32 bg-header-panner">
                        <div className="pt-16 text-3xl font-bold text-purple-700 w-3/5 text-center">
                            <FormattedMessage id="banner.medical-background" />
                        </div>
                        <div className="pt-2 text-3xl font-bold text-purple-700 w-3/5 text-center">
                            <FormattedMessage id="banner.comprehensive-health-care" />
                        </div>
                        <div className="ml-36 mt-16 p-2 bg-yellow-300 w-2/5 rounded-3xl flex items-center">
                            <FaSearch className="text-xl ml-2 mr-4" />
                            <input type="text" className="outline-none w-full bg-yellow-300" placeholder="Tìm kiếm chuyên khoa khám bệnh" />
                        </div>

                        <ul className="flex mt-32">
                            <li className=" mr-4 text-xl cursor-pointer hover:text-purple-700 text-center">
                                <div className="flex justify-center mb-2">
                                    <FaHospital className="bg-white p-1 text-3xl rounded-full text-blue-500" />
                                </div>
                                <div className="w-32">
                                    <div>
                                        <FormattedMessage id="banner.examination" />
                                    </div>
                                    <div >
                                        <FormattedMessage id="banner.speciality" />
                                    </div>
                                </div>
                            </li>
                            <li className="mr-4 text-xl cursor-pointer hover:text-purple-700 text-center">
                                <div className="flex justify-center mb-2">
                                    <FaMobileAlt className="bg-white p-1 text-3xl rounded-full text-blue-500" />
                                </div>
                                <div className="w-32">
                                    <FormattedMessage id="banner.remote-examination" />
                                </div>

                            </li>
                            <li className="mr-4 text-xl cursor-pointer hover:text-purple-700 text-center">
                                <div>
                                    <div className="flex justify-center mb-2">
                                        <FaBed className="bg-white p-1 text-3xl rounded-full text-blue-500" />
                                    </div>
                                    <div className="w-32">
                                        <FormattedMessage id="banner.general-examination" />
                                    </div>
                                </div>

                            </li>
                            <li className="mr-4 text-xl cursor-pointer hover:text-purple-700 text-center">

                                <div className="flex justify-center mb-2">
                                    < FaFlask className="bg-white p-1 text-3xl rounded-full text-blue-500" />
                                </div>
                                <div>
                                    <div className="w-32">
                                        <FormattedMessage id="banner.medical-test" />

                                    </div>
                                </div>
                            </li>
                            <li className="mr-4 text-xl cursor-pointer hover:text-purple-700 text-center">
                                <div>
                                    <div className="flex justify-center mb-2">
                                        < FaUserMd className="bg-white p-1 text-3xl rounded-full text-blue-500" />
                                    </div>
                                    <div className="w-32">
                                        <FormattedMessage id="banner.health" />
                                    </div>
                                    <div className="text-center">
                                        <FormattedMessage id="banner.mental" />
                                    </div>
                                </div>
                            </li>
                            <li className="text-xl cursor-pointer hover:text-purple-700 text-center">
                                <div>
                                    <div className="flex justify-center mb-2">
                                        < FaBriefcaseMedical className="bg-white p-1 text-3xl rounded-full text-blue-500" />
                                    </div>
                                    <div className="w-32">
                                        <FormattedMessage id="banner.dental-examination" />
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div> */}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
