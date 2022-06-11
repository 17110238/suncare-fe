import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../../assets/images/logo.png";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
class HomeFooter extends Component {
  render() {
    const handleATag = (e) => {
      e.preventDefault();
    };
    return (
      <div className="footer">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-logo">
                  <div
                    className="flex items-center"
                    onClick={() => this.returnToHome()}
                  >
                    <img
                      className="h-8 w-auto sm:h-10"
                      src={Logo}
                      alt="Image Doctor"
                    />
                    <span className="ml-2 text-2xl text-white font-semibold">
                      SunCare
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row footer-top">
              <div className="col-3">
                <ul className="footer-list-text">
                  <li>
                    <span className="font-bold">Hotline: </span>
                    <a href="/" onClick={handleATag}>
                      1900113114
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.support" />:{" "}
                    </span>
                    <a href="/" onClick={handleATag}>
                      support@admin.com
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.address" />:{" "}
                    </span>
                    <FormattedMessage id="footer.detail-address" />
                  </li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="footer-list" style={{ marginLeft: "10px" }}>
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.service" />
                    </span>
                  </li>
                  <li>
                    <FormattedMessage id="footer.detail-service" />
                  </li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.more-infomation" />
                    </span>
                  </li>
                  <li>
                    <FormattedMessage id="footer.detail-infomation-crew" />
                  </li>
                  <li>
                    <FormattedMessage id="footer.detail-infomation-facility" />
                  </li>
                  <li>
                    <FormattedMessage id="footer.detail-infomation-speciality" />
                  </li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.customer-support" />
                    </span>
                  </li>
                  <li>
                    <a href="/cau-hoi-thuong-gap" onClick={handleATag}>
                      <FormattedMessage id="footer.detail-cs-question" />
                    </a>
                  </li>
                  <li>
                    <a href="/chinh-sach-bao-mat" onClick={handleATag}>
                      <FormattedMessage id="footer.detail-cs-private-policy" />
                    </a>
                  </li>
                  <li>
                    <a href="/chinh-sach-hoat-dong" onClick={handleATag}>
                      <FormattedMessage id="footer.detail-cs-policy" />
                    </a>
                  </li>
                  <li>
                    <a href="/chinh-sach-khieu-nai" onClick={handleATag}>
                      <FormattedMessage id="footer.detail-cs-complain" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row footer-bottom">
              <div className="col-15" style={{ marginTop: "10px" }}>
                <hr className="separated-line" />
              </div>
              <div className="col-6">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.name" />
                    </span>
                  </li>
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.business-certificate" />
                    </span>
                    <p>
                      <FormattedMessage id="footer.detail-bc" />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">
                      <FormattedMessage id="footer.follow-us" />{" "}
                    </span>
                  </li>
                  <li className="footer-icon">
                    <a href="fb.com" onClick={handleATag}>
                      <FacebookOutlined
                        style={{ fontSize: 50, marginRight: 20 }}
                      />
                    </a>
                    <a href="instagram.com" onClick={handleATag}>
                      <InstagramOutlined style={{ fontSize: 50 }} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div
          className="h-16 w-full  flex flex-col items-center"
          style={{ backgroundColor: "#242a61" }}
        >
          <div className="text-center py-6">
            <p className="text-sm text-white font-bold mb-2">
              © 2022 by SunCare
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
