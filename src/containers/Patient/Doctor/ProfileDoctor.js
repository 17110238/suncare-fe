import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import { getProfileDoctorByIdService } from '../../../services/userService'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import moment from 'moment'
import { withRouter } from 'react-router'

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({ dataProfile: data })
    }

    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorByIdService(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }

        return result
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInfoDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en-US').format('dddd - MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            return (
                <>
                    <div> {time} - {date.charAt(0).toUpperCase() + date.slice(1)} </div>
                    <span><FormattedMessage id="patient.profile-doctor.schedule-free" /></span>
                </>
            )
        }
        return <></>
    }
    handleOnChangeToDotocDetail = (doctorId) => {
        this.props.history.push(`/detail-doctor/${doctorId}`);
    }
    render() {
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props
        let { dataProfile } = this.state
        let nameVi = '', nameEn = ''
        if (dataProfile?.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} - ${dataProfile?.firstName} ${dataProfile?.lastName}`
            nameEn = `${dataProfile.positionData.valueEn} - ${dataProfile?.lastName} ${dataProfile?.firstName}`
        }

        return (
            <>
                <div className="grid grid-cols-10 mb-4">
                    <div className="col-span-2">
                        <div className="bg-avatar " style={{ backgroundImage: `url(${dataProfile?.image})` }}></div>
                    </div>
                    <div className="col-span-8">
                        <div className="font-semibold text-2xl">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        {isShowDescriptionDoctor === true ?
                            <>
                                <div className="mt-3">
                                    {dataProfile?.Markdown?.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </div>
                            </> :
                            <>
                                {this.renderTimeBooking(dataTime)}
                            </>
                        }

                    </div>
                </div>

                {isShowLinkDetail === true && <span className="underline text-blue-500 cursor-pointer pl-4"
                    onClick={() => this.handleOnChangeToDotocDetail(doctorId)}
                >Xem thêm</span>}

                {isShowPrice &&
                    <div className="flex ">
                        <div className="mr-1"><FormattedMessage id="patient.extra-info-doctor.price" />:</div>
                        {dataProfile?.Doctor_Info && language === LANGUAGES.VI ?
                            <span> <NumberFormat value={dataProfile.Doctor_Info.priceData.valueVi} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' VND'} /></span> : ''}

                        {dataProfile?.Doctor_Info && language === LANGUAGES.EN ?
                            <span> <NumberFormat value={dataProfile.Doctor_Info.priceData.valueEn} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' $'} /></span> : ''}
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfoDoctors: (id) => dispatch(actions.getDetailInfoDoctors(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor))
