import React, { Component } from 'react'
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import * as actions from "../../../../store/actions"
import { toast } from 'react-toastify'
import { FaAngleDown } from 'react-icons/fa'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import Loading from '../../../../components/Loading/Loading';
import '../ManageDoctor.scss'

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            password: '',
            image: '',
            previewImage: '',
            gender: '',
            role: '',
            position: '',
            isVerify: 0,
            previewCertificateImage: '',
            photoIndex: 0,
            errors: {},
            arrGenders: [],
            arrRoles: [],
            arrPositions: [],
            createNewUserInfo: {},
        }
    }

    componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionSuccess()
        this.props.getRoleSuccess()
    }

    handleInput(e, name) {
        e.preventDefault()
        let copyState = { ...this.state }
        copyState[name] = e.target.value
        this.setState({
            ...copyState
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.genderRedux !== prevProps.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                arrGenders: arrGenders,
                gender: arrGenders?.length > 0 ? arrGenders[0].keyMap : '',
            })
        }

        if (this.props.positionRedux !== prevProps.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                arrPositions: arrPositions,
                position: arrPositions?.length > 0 ? arrPositions[0].keyMap : '',
            })
        }

        if (this.props.roleRedux !== prevProps.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                arrRoles: arrRoles,
                role: arrRoles?.length > 0 ? arrRoles[0].keyMap : '',
            })
        }

        if (this.props.listUsers !== prevProps.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positionRedux
            let arrRoles = this.props.roleRedux
            this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                email: '',
                password: '',
                previewCertificateImage: '',
                certificateImage: '',
                image: '',
                previewImage: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                photoIndex: 0,
                errors: {},
                action: CRUD_ACTIONS.CREATE
            })
        }

        if (this.props.createNewUserInfo !== prevProps.createNewUserInfo) {
            if (this.props.createNewUserInfo?.errCode === 0) {
                toast.success('Create a new user success!')
                this.props.handleClose()
                this.setState({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                    email: '',
                    password: '',
                    image: '',
                    previewCertificateImage: '',
                    certificateImage: '',
                    previewImage: '',
                    photoIndex: 0,
                    createNewUserInfo: {}
                })
            }
            else {
                this.setState({
                    createNewUserInfo: this.props.createNewUserInfo
                })
            }
        }

        if (this.props.editUserInfo !== prevProps.editUserInfo) {
            if (this.props.editUserInfo?.errCode === 0) {
                toast.success('Update user success!')
                this.props.handleClose()
            }
            else {
                toast.error('Update user not success!')
            }
        }

        if (this.props.userData !== prevProps.userData) {
            this.handleEditUserFromParent(this.props.userData)
        }
    }

    handleChangeImage = async (e, image) => {
        let file = e.target.files[0]
        if (file) {
            const base64 = await CommonUtils.getBase64(file)
            this.setState({
                previewImage: image === 'IMAGE' ? URL.createObjectURL(file) : this.state.previewImage,
                previewCertificateImage: image === 'CERTIFICATEIMAGE' ? URL.createObjectURL(file) : this.state.previewCertificateImage,
                image: image === 'IMAGE' ? base64 : this.state.image,
                certificateImage: image === 'CERTIFICATEIMAGE' ? base64 : this.state.certificateImage,
            })
        }
    }

    handleDeleteImage = (image) => {
        document.getElementById("myForm").reset()
        if (image) {
            this.setState({
                previewImage: image === 'IMAGE' ? '' : this.state.previewImage,
                image: image === 'IMAGE' ? '' : this.state.image,
                previewCertificateImage: image === 'CERTIFICATEIMAGE' ? '' : this.state.previewCertificateImage,
                certificateImage: image === 'CERTIFICATEIMAGE' ? '' : this.state.certificateImage,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const validate = this.validate()
        if (validate === false) return
        if (validate) {
            let action = this.props.action
            if (action === CRUD_ACTIONS.CREATE) {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    address: this.state.address,
                    role: this.state.role,
                    position: this.state.position,
                    image: this.state.image,
                    certificateImage: this.state.certificateImage,
                })
            }
            if (action === CRUD_ACTIONS.EDIT) {
                this.props.editUser({
                    id: this.state.id,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    address: this.state.address,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    image: this.state.image,
                    certificateImage: this.state.certificateImage,
                })
            }
        }
    }

    handleChangeGender = (e) => {
        this.setState({ gender: e.target.value })
    }

    validate = () => {
        const { email, password, phoneNumber, firstName, lastName, address } = this.state
        const errors = {}

        const action = this.props.action

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        }

        if (email === '') {
            errors.email = "Required"
        }

        if (phoneNumber === '') {
            errors.phoneNumber = "Required"
        }

        else if (!validateEmail(email)) {
            errors.email = "Not an email adress"
        }

        if (password === '' && action === CRUD_ACTIONS.CREATE) {
            errors.password = "Required"
        }

        if (firstName === '') {
            errors.firstName = "Required"
        }
        if (lastName === '') {
            errors.lastName = "Required"
        }
        if (address === '') {
            errors.address = "Required"
        }

        this.setState({ errors: errors })
        if (Object.keys(errors).length > 0) return false
        return true
    }

    handleEditUserFromParent = (data) => {
        if (this.props.action === CRUD_ACTIONS.EDIT) {
            let imageBase64 = ''
            let certificateImageBase64 = ''
            if (data.image) {
                imageBase64 = new Buffer(data.image, 'base64').toString('binary')
            }
            if (data.certificateImage) {
                certificateImageBase64 = new Buffer(data.certificateImage, 'base64').toString('binary')
            }
            this.setState({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                address: data.address,
                role: data.roleId,
                position: data.positionId,
                image: '',
                previewImage: imageBase64,
                previewCertificateImage: certificateImageBase64,
                certificateImage: '',
                isVerify: data.isVerify
            })
        }
    }

    handleCloseModal() {
        this.props.handleClose()
        this.props.action === CRUD_ACTIONS.CREATE && this.setState({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            password: '',
            image: '',
            previewImage: '',
            previewCertificateImage: '',
            certificateImage: '',
            photoIndex: 0,
            createNewUserInfo: {}
        })
    }

    handleCancleDoctor(doctorId) {
        this.props.DeleteUser({ doctorId, language: this.props.language === 'vi' ? 'vi' : 'en' })
    }

    handleConfirmDoctor(doctorId) {
        this.props.confirmDoctor({ doctorId, language: this.props.language === 'vi' ? 'vi' : 'en' })
    }

    render() {
        const { arrGenders, arrPositions, gender, arrRoles, firstName, lastName, address, email, password, phoneNumber, image, isOpen, errors,
            role, position, previewImage, createNewUserInfo, previewCertificateImage, isVerify, id } = this.state
        const { language, action, isShow, isLoading } = this.props
        isShow && document.getElementsByTagName('body')[0].classList.add('showScroll')
        !isShow && document.getElementsByTagName('body')[0].classList.remove('showScroll')
        return (
            <div className='overflow-visible' >
                <Modal isOpen={isShow} toggle={() => this.handleCloseModal()} style={{ maxWidth: '80%' }}
                    backdrop="static"
                >
                    <ModalHeader toggle={() => this.handleCloseModal()} className="text-2xl">
                        {isVerify === 0 ? 'Xác nhận thông tin người dùng' : action === CRUD_ACTIONS.CREATE ? <FormattedMessage id="manage-user.create-doctor-information" /> :
                            action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit-doctor-information" /> : ''
                        }
                    </ModalHeader>
                    <ModalBody>
                        <form id="myForm">
                            <div className="row mb-3 justify-content-center">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputFirstName4">
                                        <FormattedMessage id="manage-user.firstName" />
                                    </label>
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
                            <div className="row mb-3 justify-content-center">
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
                                <div className={`${role === 'R3' | role === 'R1' | !role ? 'col-md-5' : 'col-md-3'} form-group mt-2`}>
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
                                {role === 'R3' | role === 'R1' | !role ? '' : <div className="form-group col-md-4 mt-2">
                                    <label className='text-md font-semibold' htmlFor="inputPosition"><FormattedMessage id="manage-user.position" /></label>
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
                                </div>}
                                <div className={`${role === 'R3' | role === 'R1' | !role ? 'col-md-5' : 'col-md-3'} form-group mt-2`}>
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
                            <div className="flex">
                                <div className="mb-4 offset-md-1 ">
                                    <label htmlFor="inputImage" className='font-semibold'><FormattedMessage id="manage-user.image" /></label>
                                    <div className="w-72">
                                        <div className="rounded-lg shadow-xl bg-gray-100 ">
                                            <div className="m-4">
                                                <label className="inline-block mb-2 text-gray-500">Upload
                                                    Image(jpg,png,svg,jpeg)</label>
                                                <div className="flex flex-col items-center justify-center w-full pb-2 ">
                                                    <label htmlFor="preview-img" className="flex flex-col w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
                                                    >
                                                        <p className="w-full text-center text-gray-500 cursor-pointer">Click here to see image full</p>
                                                        <div className="flex items-center justify-center ">
                                                        </div>
                                                        <img src={previewImage} className="h-40" />
                                                    </label>
                                                    <div className="flex w-full justify-around mt-2">
                                                        <button type="button" className="bg-green-500 hover:bg-green-700 text-white rounded  w-24 cursor-pointer"
                                                        >
                                                            {previewImage === '' ? 'Add' : 'Change'}
                                                        </button>

                                                        <input accept="image/*" title='' type="file" className="-ml-28 opacity-0 w-24  "
                                                            onChange={(e) => this.handleChangeImage(e, 'IMAGE')}
                                                        />
                                                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white rounded px-2 "
                                                            onClick={() => this.handleDeleteImage('IMAGE')}
                                                        >
                                                            Delete Image
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {role === 'R3' | role === 'R1' | !role ? '' :
                                    <div className="mb-4 offset-md-1">
                                        <div className="form-group col-md-3 -ml-2 flex w-full">
                                            <div className='mr-5'>
                                                <label className='text-md font-semibold' htmlFor="inputImage"><FormattedMessage id="manage-user.bang-cap" /></label>
                                                <div className="w-72">
                                                    <div className="rounded-lg shadow-xl bg-gray-100 ">
                                                        <div className="m-4">
                                                            <label className="inline-block mb-2 text-gray-500">Upload
                                                                Image(jpg,png,svg,jpeg)</label>
                                                            <div className="flex flex-col items-center justify-center w-full pb-2 ">
                                                                <label htmlFor="preview-img" className="flex text-md font-semibold flex-col w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
                                                                >
                                                                    <p className="w-full text-center text-gray-500 cursor-pointer">Click here to see image full</p>
                                                                    <div className="flex items-center justify-center ">
                                                                    </div>
                                                                    <img src={previewCertificateImage} className="h-40" />
                                                                </label>
                                                                <div className="flex w-full justify-around mt-2">
                                                                    <button type="button" className="bg-green-500 hover:bg-green-700 text-white rounded w-24 cursor-pointer"
                                                                    >
                                                                        {!previewCertificateImage ? 'Add' : 'Change'}
                                                                    </button>

                                                                    <input accept="image/*" id="image" title='' type="file" className="-ml-28 opacity-0 w-24"
                                                                        onInput={(e) => {
                                                                            this.handleChangeImage(e, 'CERTIFICATEIMAGE')
                                                                        }}
                                                                    />
                                                                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white rounded px-2 "
                                                                        onClick={() => this.handleDeleteImage('CERTIFICATEIMAGE')}
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
                                    </div>
                                }
                            </div>

                            <div className=" row mb-4 offset-md-1">
                                <div className="col-md-3">
                                    {
                                        isVerify === 0 ?
                                            <div className="flex">
                                                <button type="button" className="mr-5 rounded text-white bg-indigo-500 w-40 whitespace-nowrap -ml-2 px-4 py-2 font-bold"
                                                    onClick={(e) => this.handleConfirmDoctor(id)}
                                                >
                                                    Xác nhận
                                                </button>

                                                <button type="button" className="btn rounded text-black bg-yellow-500 w-40 whitespace-nowrap -ml-2 px-4 py-2 font-bold"
                                                    onClick={(e) => this.handleCancleDoctor(id)} >
                                                    Hủy xác nhận
                                                </button>
                                            </div>
                                            :
                                            <button className={action === CRUD_ACTIONS.EDIT ? "btn btn-warning w-40 whitespace-nowrap -ml-2 px-4 py-2 font-bold" :
                                                "btn btn-primary w-40 whitespace-nowrap -ml-2 px-4 py-2 font-bold"}
                                                onClick={(e) => this.handleSubmit(e)} >
                                                {action === CRUD_ACTIONS.EDIT ?
                                                    <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                            </button>
                                    }
                                </div>
                            </div>
                            {isLoading && <Loading />}
                        </form>
                    </ModalBody>
                </Modal >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGenders: state.admin.isLoadingGenders,
        listUsers: state.admin.users,
        createNewUserInfo: state.admin.createNewUserInfo,
        editUserInfo: state.admin.editUserInfo,
        isLoading: state.admin.isLoading,
        deleteUserInfo: state.admin.deleteUserInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionSuccess: () => dispatch(actions.fetchPositionStart()),
        getRoleSuccess: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchALLUserStart()),
        editUser: (data) => dispatch(actions.editUser(data)),
        DeleteUser: (data) => dispatch(actions.DeleteUser(data)),
        confirmDoctor: (data) => dispatch(actions.confirmDoctor(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
