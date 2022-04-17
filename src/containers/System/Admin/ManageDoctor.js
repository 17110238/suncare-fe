import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import * as actions from "../../../store/actions"
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'

import Select from 'react-select'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { getDetailInfoDoctorService } from '../../../services/userService'
import './ManageDoctor'

const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            listDoctors: [],
            selectedDoctor: '',
            description: '',
            isHasInfo: false,
            arrPrices: [],
            arrPayments: [],
            arrProvinces: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            arrSpecialty: [],
            arrClinic: [],
        }
    }

    buildDataInputSelect = (inputData, types) => {

        let result = []
        let { language } = this.props
        if (inputData?.length > 0) {
            inputData.map(item => {
                let object = {}
                let valueEN = '', valueVI = ''
                if (types === 'USER') {
                    valueEN = `${item.lastName} ${item.firstName}`
                    valueVI = `${item.firstName} ${item.lastName}`
                    object.value = item.id
                }
                if (types === 'PRICES') {
                    valueEN = item.valueEn + ' USD'
                    valueVI = item.valueVi
                    object.value = item.keyMap
                }

                if (types === 'PAYEMENTS') {
                    valueEN = item.valueEn
                    valueVI = item.valueVi
                    object.value = item.keyMap
                }

                if (types === 'PROVINCES') {
                    valueEN = item.valueEn
                    valueVI = item.valueVi
                    object.value = item.keyMap
                }

                object.label = language === LANGUAGES.VI ? valueVI : valueEN

                if (types === 'SPECIALTIES') {
                    object.value = item.id
                    object.label = item.name
                }


                result.push(object)
            })
        }
        return result
    }

    componentDidMount() {
        this.props.fetchAllDoctor()

        this.props.getListPrices()
        this.props.getListPayments()
        this.props.getListProvinces()
        this.props.getAllSpecialty()
    }

    componentDidUpdate(prevProps) {
        if (this.props.AllDoctorRedux !== prevProps.AllDoctorRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.AllDoctorRedux, 'USER')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (this.props.language !== prevProps.language) {
            let dataSelectDoctor = this.buildDataInputSelect(this.props.AllDoctorRedux, 'USER')
            let dataSelectPrices = this.buildDataInputSelect(this.props.listPrices, 'PRICES')
            let dataSelectPayments = this.buildDataInputSelect(this.props.listPayments, 'PAYEMENTS')
            let dataSelectProvinces = this.buildDataInputSelect(this.props.listProvinces, 'PROVINCES')
            // let dataSelectSpecialties = this.buildDataInputSelect(this.props.listProvinces, 'SPECIALTIES')

            this.setState({
                listDoctors: dataSelectDoctor,
                arrPrices: dataSelectPrices,
                arrPayments: dataSelectPayments,
                arrProvinces: dataSelectProvinces,
                // arrSpecialty: dataSelectSpecialties
            })
        }

        if (this.props.listPrices !== prevProps.listPrices) {
            let dataSelect = this.buildDataInputSelect(this.props.listPrices, 'PRICES')
            this.setState({
                arrPrices: dataSelect
            })
        }

        if (this.props.listPayments !== prevProps.listPayments) {
            let dataSelect = this.buildDataInputSelect(this.props.listPayments, 'PAYEMENTS')
            this.setState({
                arrPayments: dataSelect
            })
        }

        if (this.props.listProvinces !== prevProps.listProvinces) {
            let dataSelect = this.buildDataInputSelect(this.props.listProvinces, 'PROVINCES')
            this.setState({
                arrProvinces: dataSelect
            })
        }

        if (this.props.listSpecialties !== prevProps.listSpecialties) {
            let dataSelect = this.buildDataInputSelect(this.props.listSpecialties, 'SPECIALTIES')
            this.setState({
                arrSpecialty: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown() {
        const { isHasInfo } = this.state

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: isHasInfo === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : ''
        })
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

        let response = await getDetailInfoDoctorService(selectedDoctor.value)
        if (response?.errCode === 0 && response?.data?.Markdown) {
            let { arrPayments, arrPrices, arrProvinces, arrSpecialty } = this.state

            let Markdown = response.data.Markdown
            let nameClinic = '', addressClinic = '', note = '',
                setProvince = '', setPrice = '', setPayment = '', setSpecialty = ''

            if (response?.data?.Doctor_Info) {
                nameClinic = response.data.Doctor_Info.nameClinic
                addressClinic = response.data.Doctor_Info.addressClinic
                note = response.data.Doctor_Info.note

                let specialtyId = response.data.Doctor_Info.specialtyId
                let provinceId = response.data.Doctor_Info.provinceId
                let priceId = response.data.Doctor_Info.priceId
                let paymentId = response.data.Doctor_Info.paymentId

                setSpecialty = arrSpecialty.find(item => item.value === specialtyId)
                setProvince = arrProvinces.find(item => item.value === provinceId)
                setPrice = arrPrices.find(item => item.value === priceId)
                setPayment = arrPayments.find(item => item.value === paymentId)
            }

            this.setState({
                contentHTML: Markdown.contentHTML,
                contentMarkdown: Markdown.contentMarkdown,
                description: Markdown.description,
                isHasInfo: true,
                selectedPrice: setPrice,
                selectedPayment: setPayment,
                selectedProvince: setProvince,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedSpecialty: setSpecialty,
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                isHasInfo: false,
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }
    }

    handleChangeDesc(e) {
        this.setState({ description: e.target.value })
    }

    handleChangeInput = (e, name) => {
        let stateCopy = { ...this.state }
        stateCopy[name] = e.target.value
        this.setState({ ...stateCopy })
    }

    handleChangeSelectDoctorInfo = (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    handleChangeValue = (selectedValue) => {
        this.setState({
            selectedSpecialty: selectedValue.name
        })
    }

    render() {
        const { listDoctors, selectedDoctor, description, contentMarkdown, isHasInfo, arrPrices, arrPayments, arrProvinces,
            selectedPrice, selectedPayment, selectedProvince, nameClinic, addressClinic, note, selectedSpecialty, selectedClinic,
            arrClinic, arrSpecialty } = this.state

        let { language } = this.props

        return (
            <div className="p-2 w-full">
                <div className="flex justify-between items-center">
                    <div></div>
                    <div className="text-center uppercase font-bold text-2xl my-4"><FormattedMessage id="admin.manage-doctor.title" /></div>
                    <div>
                        <button className={isHasInfo === false ?
                            'bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 border border-blue-700 rounded z-50' :
                            "bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 border border-yellow-700 rounded z-50"
                        }
                            onClick={() => this.handleSaveContentMarkdown()}>
                            {isHasInfo === false ? 'Create' : 'Edit'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-choose-doctor">
                            <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                        </label>

                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={listDoctors}
                            id="grid-choose-doctor"
                            placeholder={language === LANGUAGES.VI ? 'Chọn Bác sĩ...' : 'Choose Doctor...'}
                            className="w-full pr-4 mt-2"
                        />
                    </div>
                    <div className="">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-doctor-info">
                            <FormattedMessage id="admin.manage-doctor.doctor-info" />
                            <textarea
                                onChange={(e) => this.handleChangeDesc(e)}
                                value={description}
                                className="form-textarea my-2 block w-full border border-gray-700 outline-none"
                                rows="3"
                                id="grid-doctor-info"
                                placeholder={language === LANGUAGES.VI ? 'Nhập một vài thông tin...' : 'Enter some long form content...'}
                            ></textarea>
                        </label>
                    </div>
                    <div className="col-span-2 mb-3">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-choose-price">
                                    <FormattedMessage id="admin.manage-doctor.choose-price" />
                                </label>
                                <Select
                                    value={selectedPrice}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={arrPrices}
                                    placeholder={language === LANGUAGES.VI ? 'Chọn giá...' : 'Choose price...'}
                                    name="selectedPrice"
                                />
                            </div>
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-method-pay">
                                    <FormattedMessage id="admin.manage-doctor.pay-method" />
                                </label>
                                <Select
                                    value={selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={arrPayments}
                                    placeholder={language === LANGUAGES.VI ? 'Chọn phương thức thanh toán...' : 'Choose payment method...'}
                                    name="selectedPayment"
                                />
                            </div>
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-choose-province">
                                    <FormattedMessage id="admin.manage-doctor.choose-province" />
                                </label>
                                <Select
                                    value={selectedProvince}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={arrProvinces}
                                    placeholder={language === LANGUAGES.VI ? 'Chọn tỉnh thành...' : 'Choose province...'}
                                    name="selectedProvince"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 mb-3">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-clinic-name">
                                    <FormattedMessage id="admin.manage-doctor.name-clinic" />
                                </label>
                                <input className="appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" id="grid-clinic-name" type="text"
                                    value={nameClinic} onChange={(e) => this.handleChangeInput(e, 'nameClinic')} />
                            </div>
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-clinic-address">
                                    <FormattedMessage id="admin.manage-doctor.address-clinic" />
                                </label>
                                <input className="appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" id="grid-clinic-address" type="text"
                                    value={addressClinic} onChange={(e) => this.handleChangeInput(e, 'addressClinic')} />
                            </div>
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-note">
                                    <FormattedMessage id="admin.manage-doctor.note" />
                                </label>
                                <input className="appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" id="grid-note" type="text"
                                    value={note} onChange={(e) => this.handleChangeInput(e, 'note')} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 mb-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-specialty">
                                    <FormattedMessage id="admin.manage-doctor.specialty" />
                                </label>
                                <Select
                                    value={selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={arrSpecialty}
                                    id="grid-specialty"
                                    placeholder={language === LANGUAGES.VI ? 'Chọn chuyên khoa...' : 'Choose Specialty...'}
                                    name="selectedSpecialty"
                                />
                            </div>
                            <div className="grid grid-cols-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2" htmlFor="grid-clinic">
                                    <FormattedMessage id="admin.manage-doctor.clinic" />
                                </label>
                                <Select
                                    value={selectedClinic}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={listDoctors}
                                    id="grid-clinic"
                                    placeholder={language === LANGUAGES.VI ? 'Chọn phòng khám...' : 'Choose Clinic...'}
                                    name="selectedClinic"
                                />
                            </div>

                        </div>
                    </div>

                </div>
                <div className="container-markdown">
                    <MdEditor value={contentMarkdown} style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        AllDoctorRedux: state.admin.allDoctors,
        language: state.app.language,
        listPrices: state.admin.listPrices,
        listPayments: state.admin.listPayments,
        listProvinces: state.admin.listProvinces,
        listSpecialties: state.admin.listSpecialties,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

        getListPrices: () => dispatch(actions.getListPrices()),
        getListPayments: () => dispatch(actions.getListPayments()),
        getListProvinces: () => dispatch(actions.getListProvinces()),
        getAllSpecialty: () => dispatch(actions.getAllSpecialty()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
