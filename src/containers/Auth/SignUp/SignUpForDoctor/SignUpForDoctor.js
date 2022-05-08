import React, { useState } from "react";
import "./SignUpForDoctor.scss";
import { FaAngleDown } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  HomeOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";
// import { authRegister, authsSelector } from "./authSlice";
import image2 from "../../../../assets/images/undraw_medicine_b-1-ol.svg";
import { Form } from "antd";
import { Button } from "antd";
import CommonUtils from './../../../../utils/CommonUtils';

const SignUpForDoctor = () => {
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState('');
  const handleChangeImage = async (e) => {
    const file = e.target.files[0]
    if (file) {
        let base64 = await CommonUtils.getBase64(file)
        setPreviewImage(URL.createObjectURL(file))
        setImage(base64);
    }
  }
const handleDeleteImage = () => {
  setPreviewImage('');
}

  return (
    <div className="sign-up-for-doctor">
      <div className="container">
        <div className="form-wrapper">
          <div className="form-sign-up">
            <div className="title">
              <h2>Đăng ký cho các bác sĩ</h2>
            </div>
            <div className="form-input">
              <div className="name group-input row justify-content-center">
                <div className="surname form-group col-md-6">
                  <label
                    htmlFor="surname"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Họ
                  </label>
                  <div
                    className="surname-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    <UserOutlined
                      className="site-form-item-icon"
                      style={{ color: "#757575", marginLeft: "1rem" }}
                    />
                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      required
                      placeholder="Dang"
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="lastname form-group col-md-6">
                  <label
                    htmlFor="lastname"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Tên
                  </label>
                  <div
                    className="lastname-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    <UserOutlined
                      className="site-form-item-icon"
                      style={{ color: "#757575", marginLeft: "1rem" }}
                    />
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      required
                      placeholder="Huynh Hoang Long"
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="email-password group-input row justify-content-center">
                <div className="email form-group col-md-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Email
                  </label>
                  <div
                    className="email-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
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
                      required
                      placeholder="long@gmail.com"
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="password form-group col-md-6">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Mật khẩu
                  </label>
                  <div
                    className="password-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
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
                      required
                      placeholder="Nhập mật khẩu"
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="phone-address group-input row justify-content-center">
                <div className="phone form-group col-md-6">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Số điện thoại
                  </label>
                  <div
                    className="phone-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    <PhoneOutlined
                      className="site-form-item-icon"
                      style={{ color: "#757575", marginLeft: "1rem" }}
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      placeholder="0903113114"
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="address form-group col-md-6">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Địa chỉ
                  </label>
                  <div
                    className="address-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    <HomeOutlined
                      className="site-form-item-icon"
                      style={{ color: "#757575", marginLeft: "1rem" }}
                    />
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      placeholder="Số 1 Võ Văn Ngân, Tp. Thủ Đức, Tp. HCM"
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="gender-position group-input row justify-content-center">
                <div className="gender form-group col-md-6">
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Giới tính
                  </label>
                  <div
                    className="gender-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    <ion-icon
                      name="transgender-outline"
                      className="site-form-item-icon"
                      style={{
                        color: "#757575",
                        marginLeft: "1rem",
                        fontSize: "25px",
                      }}
                    ></ion-icon>
                    <select
                      id="gender"
                      required
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm cursor-pointer"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Female">Other</option>
                    </select>
                    <FaAngleDown className="text-gray-700 text-xl -ml-8" />
                  </div>
                </div>
                <div className="position form-group col-md-6">
                  <label
                    htmlFor="position"
                    className="text-sm font-medium text-gray-600 uppercase"
                  >
                    Vị trí
                  </label>
                  <div
                    className="position-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#efefef",
                      borderRadius: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    <CompassOutlined
                      className="site-form-item-icon"
                      style={{
                        color: "#757575",
                        marginLeft: "1rem",
                        fontSize: "25px",
                      }}
                    />
                    <select
                      id="position"
                      required
                      className="appearance-none mb-1 placeholder-#efefef focus:outline-none sm:text-sm cursor-pointer"
                      style={{
                        backgroundColor: "#efefef",
                        fontSize: "1rem",
                        padding: "0.8rem",
                        outline: "none",
                        width: "100%",
                      }}
                    >
                      <option value="None">None</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Master">Master</option>
                      <option value="Associate Professor">
                        Associate Professor
                      </option>
                      <option value="Professor">Professor</option>
                    </select>
                    <FaAngleDown className="text-gray-700 text-xl -ml-8" />
                  </div>
                </div>
              </div>
            </div>
            <div className="upload-img row mb-4 justify-content-center">
              <div className="form-group col-md-3">
                <label
                  htmlFor="inputImage"
                  className="text-sm font-medium text-gray-600 uppercase"
                  style={{ display: "block", textAlign: "center" }}
                >
                  <FormattedMessage id="manage-user.image" />
                </label>

                <div className="w-72 justify-content-center">
                  <div className="rounded-lg shadow-xl bg-gray-100 ">
                    <div className="m-4">
                      <label className="inline-block mb-2 text-gray-500">
                        Upload Image(jpg,png,svg,jpeg)
                      </label>
                      <div className="flex flex-col items-center justify-center w-full pb-2 ">
                        <label
                          htmlFor="preview-img"
                          className="flex flex-col w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
                          // onClick={() => this.setState({ isOpen: true })}
                        >
                          <p className="w-full text-center text-gray-500 cursor-pointer">
                            Click here to see image full
                          </p>
                          <div className="flex items-center justify-center "></div>
                          <img src={previewImage} className="h-40" />
                        </label>
                        <div className="flex w-full justify-around mt-2">
                          <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white rounded w-24 cursor-pointer"
                            onClick={handleChangeImage}
                          >
                            {previewImage === '' ? 'Add' : 'Change'}
                          </button>

                          <input
                            title=""
                            type="file"
                            className="-ml-28 opacity-0 w-24  "
                            onChange={handleChangeImage}
                          />
                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white rounded px-2 "
                            onClick={handleDeleteImage}
                          >
                            Delete Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn" style={{width: "100%"}}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForDoctor;
