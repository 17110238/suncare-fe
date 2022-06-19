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

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfo: false,
            doctorId: '',
            name: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthday: '',
            gender: '',
            reason: '',
            doctorName: '',
            timeType: '',
            arrGenders: [],
            errors: {}
        }
    }

    componentDidMount() {
        this.props.getGenderStart()
    }

    componentDidUpdate(prevProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            this.setState({ isShowDetailInfo: this.props.isOpen })
        }

        if (this.props.language !== prevProps.language) {
            let arrGenders = this.buildDataInputGender(this.props.language)
            this.setState({
                arrGenders: arrGenders,
                name: '',
                phoneNumber: '',
                email: '',
                address: '',
                birthday: '',
                gender: '',
                reason: '',
            })
        }

        if (this.props.genderRedux !== prevProps.genderRedux) {
            if (this.props.genderRedux.length > 0) {
                let arrGenders = this.buildDataInputGender(this.props.language)
                this.setState({
                    arrGenders: arrGenders
                })
            }
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
        if (this.props.isOpen !== prevProps.isOpen) {
            if ((this.props.userInfo)) {
                let arrGenders = this.buildDataInputGender(this.props.language)
                const genderDefault = arrGenders.filter(item => {
                    if (item.value === this.props.userInfo.gender) {
                        return item
                    }
                })
                this.setState({
                    name: this.props.language === 'vi' ? this.props.userInfo.firstName + ' ' + this.props.userInfo.lastName : this.props.userInfo.lastName + ' ' + this.props.userInfo.firstName,
                    phoneNumber: this.props.userInfo.phoneNumber,
                    email: this.props.userInfo.email,
                    address: this.props.userInfo.address,
                    birthday: this.props.userInfo.birthday,
                    gender: genderDefault,
                    reason: this.props.userInfo.reason,
                })
            }
        }
    }

    buildDataInputGender = (language) => {
        let result = []
        this.props.genderRedux.map(item => {
            let object = {}
            let label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
            let value = item.keyMap
            object.label = label
            object.value = value
            result.push(object)
        })
        return result
    }

    handleInput = (e, input) => {

    }

    toggle() {
        this.setState({
            isShowDetailInfo: false,
        })

        this.props.handleCloseModal()
    }

    handleInput = (e, name) => {
        let stateCopy = { ...this.state }
        stateCopy[name] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeGender = (genderInput) => {
        this.setState({
            gender: genderInput,

        })
    }

    validate = () => {
        const { name, phoneNumber, email, address, birthday, gender, reason } = this.state
        const errors = {}

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        }

        if (birthday === '') {
            errors.birthday = "Required"
        }

        if (gender === '') {
            errors.gender = "Required"
        }

        if (reason === '') {
            errors.reason = "Required"
        }

        if (email === '') {
            errors.email = "Required"
        }

        else if (!validateEmail(email)) {
            errors.email = "Not an email adress"
        }

        if (name === '') {
            errors.name = "Required"
        }
        if (phoneNumber === '') {
            errors.phoneNumber = "Required"
        }
        if (address === '') {
            errors.address = "Required"
        }

        this.setState({ errors: errors })
        if (Object.keys(errors).length > 0) return false
        return true
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en-US').format('dddd - MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            return `${date} - ${time}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let doctorName = language === LANGUAGES.VI ? dataTime.doctorData.lastName + ' ' + dataTime.doctorData.firstName
                : dataTime.doctorData.firstName + ' ' + dataTime.doctorData.lastName
            return doctorName
        }
        return ''
    }

    handleConfirmBooking = async () => {

        if (this.validate()) {
            let date = new Date(this.state.birthday).getTime()
            let timeString = this.buildTimeBooking(this.props.dataTime)
            let doctorName = this.buildDoctorName(this.props.dataTime)
            let res = await postPatientAppointment({
                doctorId: this.state.doctorId,
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                date: this.props.dataTime.date,
                birthday: date,
                gender: this.state.gender.value,
                reason: this.state.reason,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName,
                scheduleId: this.props.dataTime.id,
                priceId: this.props.getInfoDoctor.Doctor_Info.priceId,
                price: this.props.language === 'vi' ? this.props.getInfoDoctor.Doctor_Info.priceData.valueVi : this.props.getInfoDoctor.Doctor_Info.priceData.valueEn

            })

            if (res?.errCode === 0) {
                toast.success('Booking a new appointment successed!')
                this.props.handleCloseModal()
                this.setState({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    birthday: '',
                    gender: '',
                    reason: '',
                })
            }
            else {
                toast.error('Booking a new appointment failed! ')
            }
        }
    }

    render() {
        let { isShowDetailInfo, name, phoneNumber, email, arrGenders, gender, birthday, reason, address, errors } = this.state
        let { dataTime, language, getInfoDoctor } = this.props
        console.log("getInfoDoctor", getInfoDoctor)
        let doctorId = '', price = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        let confirm = language === LANGUAGES.VI ? 'Xác nhận' : 'Confirm'
        let cancel = language === LANGUAGES.VI ? 'Hủy' : 'Cancel'

        return (
            <div>
                <Modal isOpen={isShowDetailInfo} toggle={() => this.toggle()} style={{ maxWidth: '60%' }} backdrop="static">
                    <ModalHeader toggle={() => this.toggle()} className="text-2xl">
                        <FormattedMessage id="patient.profile-doctor.title" />
                    </ModalHeader>
                    <ModalBody>
                        <Form className="create-user-form">
                            <Row form>
                                <Row className="mb-4">
                                    <Col xs={12}>
                                        <ProfileDoctor
                                            doctorId={doctorId}
                                            isShowDescriptionDoctor={false}
                                            dataTime={dataTime}
                                            isShowPrice={true}
                                            isShowLinkDetail={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="name">
                                                <FormattedMessage id="patient.profile-doctor.name" />
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => this.handleInput(e, 'name')}
                                            />
                                            <p className="text-red-600">{errors.name}</p>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="phoneNumber">
                                                <FormattedMessage id="patient.profile-doctor.phoneNumber" />
                                            </Label>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={phoneNumber}
                                                onChange={(e) => this.handleInput(e, 'phoneNumber')}
                                            />
                                            <p className="text-red-600">{errors.phoneNumber}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="email">
                                                Email:
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => this.handleInput(e, 'email')}
                                            />
                                            <p className="text-red-600">{errors.email}</p>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="address">
                                                <FormattedMessage id="patient.profile-doctor.address" />
                                            </Label>
                                            <Input
                                                id="address"
                                                name="lastName"
                                                value={address}
                                                onChange={(e) => this.handleInput(e, 'address')}
                                            />
                                            <p className="text-red-600">{errors.address}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="birthday">
                                                <FormattedMessage id="patient.profile-doctor.birthday" />
                                            </Label>
                                            <DatePicker
                                                className="form-control"
                                                onChange={this.handleOnChangeDatePicker}
                                                value={birthday}
                                            />
                                            <p className="text-red-600">{errors.birthday}</p>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="gender">
                                                <FormattedMessage id="patient.profile-doctor.gender" />
                                            </Label>
                                            <Select
                                                value={gender}
                                                onChange={this.handleChangeGender}
                                                options={arrGenders}
                                            />
                                            <p className="text-red-600">{errors.gender}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="reason">
                                                <FormattedMessage id="patient.profile-doctor.reason" />
                                            </Label>
                                            <Input
                                                id="reason"
                                                name="address"
                                                onChange={(e) => this.handleInput(e, 'reason')}
                                                value={reason}
                                            />
                                            <p className="text-red-600">{errors.reason}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Row>
                        </Form>
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
        userInfo: state.user.userInfo,
        getInfoDoctor: state.admin.getInfoDoctor,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
