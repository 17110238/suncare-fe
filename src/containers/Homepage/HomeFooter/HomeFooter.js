import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../../assets/images/logo.png";
import "./HomeFooter.scss";
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
                    <span className="font-bold">Hotline </span>
                    <a href="/" onClick={handleATag}>1900113114</a>
                  </li>
                  <li>
                    <span className="font-bold">Hỗ trợ </span>
                    <a href="/" onClick={handleATag}>support@admin.com</a>
                  </li>
                  <li>
                    <span className="font-bold">Địa chỉ </span>
                    SALA TOWER 10 Mai Chí Thọ, Phường An Lợi Đông, TP. Thủ Đức,
                    TP.HCM
                  </li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="footer-list" style={{marginLeft: '10px'}}>
                  <li>
                    <span className="font-bold">Dịch vụ</span>
                  </li>
                  <li>Đặt lịch khám trực tuyến</li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">Tìm hiểu thêm</span>
                  </li>
                  <li>Đội ngũ bác sĩ</li>
                  <li>Cơ sở y tế</li>
                  <li>Chuyên khoa phổ biến</li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">Hỗ trợ khách hàng</span>
                  </li>
                  <li>
                    <a href="/cau-hoi-thuong-gap" onClick={handleATag}>Câu hỏi thường gặp</a>
                  </li>
                  <li>
                    <a href="/chinh-sach-bao-mat" onClick={handleATag}>Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="/chinh-sach-hoat-dong" onClick={handleATag}>Chính sách hoạt động</a>
                  </li>
                  <li>
                    <a href="/chinh-sach-khieu-nai" onClick={handleATag}
                    >Chính sách khiếu nại</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row footer-bottom">
              <div className="col-15" style={{marginTop: '10px'}}>
                <hr className="separated-line" />
              </div>
              <div className="col-6">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">
                      CÔNG TY PHÒNG KHÁM ĐA KHOA JIO HEALTH
                    </span>
                  </li>
                  <li>
                    <span className="font-bold">Giấy CNĐKDN </span>
                    <p>
                      0309145924 đăng ký lần đầu ngày 06/07/2009, đăng ký thay
                      đổi lần thứ 6 ngày 11/09/2019, cấp bởi Sở KHĐT thành phố
                      Hồ Chí Minh.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="footer-list">
                  <li>
                    <span className="font-bold">
                      Hãy theo dõi chúng tôi tại{" "}
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
