import React, { Component } from 'react'
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, Label, Input, FormGroup, Row, Col } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor'
import _ from 'lodash'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../../components/Input/DatePicker'
import { LANGUAGES } from '../../../../utils'
import * as actions from "../.././../../store/actions"
import Select from 'react-select'
import { postPatientAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment'

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {

        return (
            <div>
                <Modal isOpen={show} toggle={() => this.toggle()} style={{ maxWidth: '60%' }} >
                    <ModalHeader toggle={() => this.toggle()} className="text-2xl">
                        <FormattedMessage id="patient.profile-doctor.title" />
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="row mb-3 justify-content-center">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputFirstName4"><FormattedMessage id="manage-user.firstName" /></label>
                                    <input type="text" className="form-control" id="inputFirstName4" placeholder="Tien" value={firstName}
                                        onChange={(e) => this.handleInput(e, 'firstName')} />
                                    <span className="text-red-600">{errors.firstName}</span>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputLastName4"><FormattedMessage id="manage-user.lastName" /></label>
                                    <input type="text" className="form-control" id="inputLastName4" placeholder="Pham Ngoc" value={lastName}
                                        onChange={(event) => this.handleInput(event, 'lastName')} />
                                    <span className="text-red-600">{errors.lastName}</span>
                                </div>
                            </div>
                            <div className="row mb-3 justify-content-center ">
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputNumberPhone4"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                    <input type="text" className="form-control" id="inputNumberPhone4" placeholder="0374327109" value={phoneNumber}
                                        onChange={(event) => this.handleInput(event, 'phoneNumber')} />
                                    <span className="text-red-600">{errors.phoneNumber}</span>
                                </div>
                                <div className="form-group col-md-7">
                                    <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address}
                                        onChange={(event) => this.handleInput(event, 'address')} />
                                    <span className="text-red-600">{errors.address}</span>
                                </div>
                            </div>
                            <div className="row mb-3 justify-content-center">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={email}
                                        onChange={(event) => this.handleInput(event, 'email')}
                                        disabled={action === CRUD_ACTIONS.EDIT ? true : false} />
                                    <span className="text-red-600">{errors.email}</span>
                                    <span className="text-red-600">{createNewUserInfo?.errCode === 1 ? createNewUserInfo.errMessage : ''}</span>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder="***********" value={password}
                                        onChange={(event) => this.handleInput(event, 'password')}
                                        disabled={action === CRUD_ACTIONS.EDIT ? true : false} />
                                    <span className="text-red-600">{errors.password}</span>
                                </div>
                            </div>
                            <div className="row mb-3 justify-content-center">
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputGender"><FormattedMessage id="manage-user.gender" /></label>
                                    <div className="flex items-center">
                                        <select id="inputGender" className="form-control" value={gender} onChange={(e) => this.handleInput(e, 'gender')}>
                                            {arrGenders && arrGenders.length > 0 ?
                                                <>
                                                    {arrGenders.map((item, index) => {
                                                        return <option value={item.keyMap}
                                                            key={index}> {language.language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                                    })}
                                                </> :
                                                <option></option>}
                                        </select>
                                        <FaAngleDown className="text-gray-700 text-xl -ml-8" />
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputPosition"><FormattedMessage id="manage-user.position" /></label>
                                    <div className="flex items-center">
                                        <select id="inputPosition" className="form-control" value={position} onChange={(e) => this.handleInput(e, 'position')}>
                                            {arrPositions && arrPositions.length > 0 ?
                                                <>
                                                    {arrPositions.map((item, index) => {
                                                        return <option value={item.keyMap}
                                                            key={index}> {language.language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                                    })}
                                                </> :
                                                <option></option>}
                                        </select>
                                        <FaAngleDown className="text-gray-700 text-xl -ml-8" />
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputRole"><FormattedMessage id="manage-user.role" /></label>
                                    <div className="flex items-center">
                                        <select id="inputRole" className="form-control" value={role} onChange={(e) => this.handleInput(e, 'role')}>

                                            {arrRoles && arrRoles.length > 0 ?
                                                <>
                                                    {arrRoles.map((item, index) => {
                                                        return <option value={item.keyMap}
                                                            key={index}> {language.language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                    })}
                                                </> :
                                                <option></option>}
                                        </select>
                                        <FaAngleDown className="text-gray-700 text-xl -ml-8" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4 offset-md-1 ">
                                <div className="form-group col-md-3 -ml-2">
                                    <label htmlFor="inputImage"><FormattedMessage id="manage-user.image" /></label>

                                    <div className="w-72">
                                        <div className="rounded-lg shadow-xl bg-gray-100 ">
                                            <div className="m-4">
                                                <label className="inline-block mb-2 text-gray-500">Upload
                                                    Image(jpg,png,svg,jpeg)</label>
                                                <div className="flex flex-col items-center justify-center w-full pb-2 ">
                                                    <label htmlFor="preview-img" className="flex flex-col w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
                                                        onClick={() => this.setState({ isOpen: true })}
                                                    >
                                                        <p className="w-full text-center text-gray-500 cursor-pointer">Click here to see image full</p>
                                                        <div className="flex items-center justify-center ">
                                                        </div>
                                                        <img src={previewImage} className="h-40" />
                                                    </label>
                                                    <div className="flex w-full justify-around mt-2">
                                                        <button type="button" className="bg-green-500 hover:bg-green-700 text-white rounded w-24 cursor-pointer"
                                                        // onClick={(e) => this.handleChangeImage(e)}
                                                        >
                                                            {previewImage === '' ? 'Add' : 'Change'}
                                                        </button>

                                                        <input title='' type="file" className="-ml-28 opacity-0 w-24  "
                                                            onChange={(e) => this.handleChangeImage(e)}
                                                        />
                                                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white rounded px-2 "
                                                            onClick={(e) => this.handleDeleteImage(e)}
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

                            <div className=" row mb-4 offset-md-1">
                                <div className="col-md-3">
                                    <button type="submit" className={action === CRUD_ACTIONS.EDIT ? "btn btn-warning -ml-2 px-4 py-2 font-bold" :
                                        "btn btn-primary -ml-2 px-4 py-2 font-bold"}
                                        onClick={(e) => this.handleSubmit(e)} >
                                        {action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            {confirm}
                        </Button>

                        <Button onClick={() => this.toggle()}>
                            {cancel}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
