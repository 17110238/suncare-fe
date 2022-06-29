import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import HomeHeader from '../../Homepage/HomeHeader'
import { getAllCodeService, getDetailSpecialtyService } from '../../../services/userService'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailSpecialtyByIdService } from '../../../services/userService'
import _ from 'lodash'
class SpecialtyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        let id = +this.props.match?.params?.id
        if (id) {
            let res = await getDetailSpecialtyService(id)
            let getDetailSByID = await getDetailSpecialtyByIdService({ id, location: 'ALL' })
            let resProvince = await getAllCodeService('PROVINCE')
            if (getDetailSByID.errCode === 0 && resProvince?.errCode === 0) {
                let data = getDetailSByID.data
                let arrDoctor = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpeciaty
                    if (arr?.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                let result = []
                if (dataProvince?.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: getDetailSByID.data,
                    arrDoctor,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
            if (res?.errCode === 0) {
                this.setState({
                    infoSpecialty: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeSelect = async (location) => {
        let id = +this.props.match?.params?.id
        if (id) {
            let res = await getDetailSpecialtyService(id)
            let getDetailSByID = await getDetailSpecialtyByIdService({ id, location })
            let resProvince = await getAllCodeService('PROVINCE')
            if (getDetailSByID.errCode === 0) {
                let data = getDetailSByID.data
                let arrDoctor = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpeciaty
                    if (arr?.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: getDetailSByID.data,
                    arrDoctor,
                })
            }
        }
    }

    render() {
        const { arrDoctor, dataDetailSpecialty, listProvince } = this.state
        const { language } = this.props
        return (
            <div className='px-4'>
                <HomeHeader />
                <div>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.contentHTML }}>
                        </div>
                    }
                </div>
                <div className="my-4">
                    <select onChange={(e) => this.handleOnChangeSelect(e.target.value)}
                        className='w-32 border rounded-2 border-amber-400 p-1'
                    >
                        {listProvince?.length > 0 &&
                            listProvince.map(province => (
                                <option key={province.keyMap} value={province.keyMap}>
                                    {language === 'vi' ? province.valueVi : province.valueEn}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {
                    arrDoctor?.length > 0 && arrDoctor.map(doctor => {
                        return (
                            <div className="flex w-full border p-4" style={{ minHeight: '300px' }}>
                                <div className="flex-1 w-2/3 pr-4">
                                    <ProfileDoctor
                                        doctorId={doctor}
                                        isShowDescriptionDoctor={true}
                                        isShowLinkDetail={true}
                                        isShowPrice={false}
                                    />
                                </div>

                                <div className="flex-1 w-1/3 flex flex-col">
                                    <div>
                                        <DoctorSchedule
                                            doctorIdFromParent={doctor}
                                            formality='offline'
                                        />
                                    </div>
                                    <div>
                                        <DoctorExtraInfo
                                            doctorIdFromParent={doctor}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail)
