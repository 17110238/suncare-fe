import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import CoXuongKhop from "../../../assets/images/120331-co-xuong-khop.jpg";
import ThanKinh from "../../../assets/images/121042-than-kinh.jpg";
import Slider from "react-slick";
import "./Specialty.scss"

class MedicalFacility extends Component {
  render() {
    return (
      <div className="bg-gray-50">
        <div className="h-80 pb-4 pt-4 mx-auto w-10/12">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium text-2xl ">
              <FormattedMessage id="homepage.outstanding-medical-facility" />
            </div>
            <button className="p-2 bg-gray-300 uppercase hover:bg-yellow-300 hover:text-white">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <Slider {...this.props.settings}>
            <div className="cursor-pointer important">
              <div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: `url(https://media-cdn.laodong.vn/storage/newsportal/2021/6/7/917811/Cho-Ray.jpg)` }}
                >
                </div>
                <div className="mt-1">Bệnh viên Chợ Rẫy</div>
              </div>
            </div>
            <div className="cursor-pointer important">
              <div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: `url(https://photo-cms-sggp.zadn.vn/Uploaded/2022/bpivpawv/2021_06_13/bvgiadinh1_jdhk.jpg)` }}
                >
                </div>
                <div className="mt-1">Bệnh viện Nhân Dân Gia Định</div>
              </div>
            </div>
            <div className="cursor-pointer important">
              <div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: `url(https://tudu.com.vn/data/image/227.jpg)` }}
                >
                </div>
                <div className="mt-1">Bệnh viện Từ Dũ</div>
              </div>
            </div>
            <div className="cursor-pointer important">
              <div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: `url(https://thuonghieuvaphapluat.vn/Images/hoangduc/2020/09/08/bvub.jpg)` }}
                >
                </div>
                <div className="mt-1">Bệnh viện ung bướu</div>
              </div>
            </div>
            <div className="cursor-pointer important">
              <div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: `url(https://cdn.tgdd.vn/med/1/benh-vien-nhi-dong-2-3.jpg)` }}
                >
                </div>
                <div className="mt-1">Bệnh viện nhi đồng 2</div>
              </div>
            </div>
            <div className="cursor-pointer important">
              <div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: `url(${CoXuongKhop})` }}
                >
                </div>
                <div className="mt-1">Cơ Xương Khớp</div>
              </div>
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
