import React, { Component } from 'react'
import { connect } from "react-redux"
import HomeHeader from '../../Homepage/HomeHeader'
import * as actions from '../../../store/actions'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from 'react-intl'
import NumberFormat from 'react-number-format'


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameClinic: '',
            addressClinic: '',
            price: '',
            note: '',
            payment: '',
            info: '',
            isShowDetailInfo: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            this.props.getDetailInfoDoctors(this.props.doctorIdFromParent)
        }

        if (this.props.getInfoDoctor !== prevProps.getInfoDoctor) {
            this.setState({
                info: this.props.getInfoDoctor
            })
            this.getDoctor(this.props.language)
        }

        if (this.props.language !== prevProps.language) {
            this.getDoctor(this.props.language)
        }
    }

    getDoctor(language) {
        let info = this.state.info

        if (info?.Doctor_Info) {

            let nameClinic = info.Doctor_Info.nameClinic
            let addressClinic = info.Doctor_Info.addressClinic
            let price = language === LANGUAGES.VI ? info.Doctor_Info.priceData.valueVi : info.Doctor_Info.priceData.valueEn
            let payment = language === LANGUAGES.VI ? info.Doctor_Info.paymentData.valueVi : info.Doctor_Info.paymentData.valueEn
            let note = info.Doctor_Info.note

            this.setState({
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                price: price,
                payment: payment,
                note: note,
            })
        }
    }

    handleShowDetailInfo = () => {
        let isShowDetailInfo = this.state.isShowDetailInfo
        this.setState({
            isShowDetailInfo: !isShowDetailInfo
        })
    }

    render() {
        const { nameClinic, addressClinic, price, note, payment, isShowDetailInfo } = this.state
        let { language } = this.props

        return (
            <div className="border-l border-gray-400 my-4 pl-8 ml-8">
                <div className="border-b border-gray-400 pb-3 mb-3 leading-7">
                    <div className="uppercase text-gray-700 font-semibold"><FormattedMessage id="patient.extra-info-doctor.address-clinic" /></div>
                    <div className="font-bold">{nameClinic}</div>
                    <div>{addressClinic}</div>
                </div>
                {
                    isShowDetailInfo === false ?
                        <div className="flex items-center">
                            <div className="uppercase text-gray-700 font-semibold mr-1"><FormattedMessage id="patient.extra-info-doctor.price" />: </div>
                            <div className="text-lg">
                                <NumberFormat value={price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
                                {language === LANGUAGES.VI ? ' VND' : ' $'}.</div>
                            <div onClick={() => this.handleShowDetailInfo()} className="text-blue-400 text-lg ml-1 cursor-pointer">
                                <FormattedMessage id="patient.extra-info-doctor.see-details" />
                            </div>
                        </div> :
                        <div>
                            <div className="text-gray-700 font-semibold mb-2 text-lg"><FormattedMessage id="patient.extra-info-doctor.price" />: </div>
                            <div className=" bg-gray-200 p-1">
                                <div className="flex justify-between text-lg">
                                    <div className=" font-semibold ">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </div>
                                    <div className="mr-2 text-lg">
                                        <NumberFormat value={price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
                                        {language === LANGUAGES.VI ? ' VND' : ' $'}
                                    </div>
                                </div>
                                <p>{note}</p>
                            </div>
                            <div className="bg-gray-300 p-1 ">
                                <p className=" text-lg"><FormattedMessage id="patient.extra-info-doctor.payment" />{payment}</p>
                            </div>
                            <div className="mt-2 text-lg text-blue-400 cursor-pointer"
                                onClick={() => this.handleShowDetailInfo()}><FormattedMessage id="patient.extra-info-doctor.hide-price-list" /></div>
                        </div>
                }

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        getInfoDoctor: state.admin.getInfoDoctor,
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfoDoctors: (id) => dispatch(actions.getDetailInfoDoctors(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo)
