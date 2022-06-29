import React, { Component } from 'react'
import { connect } from "react-redux"
import HomeHeader from '../../Homepage/HomeHeader'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant'
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfo from './DoctorExtraInfo'
import Loading from '../../../components/Loading/Loading'

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoDoctor: {},
            currentDoctorId: -1,
            isLoading: false,
            formality: ''
        }
    }

    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const formality = urlParams.get('formality')
        const doctorId = urlParams.get('doctorId')
        this.setState({
            currentDoctorId: +doctorId,
            formality
        })
        if (doctorId) {
            this.props.getDetailInfoDoctors(doctorId)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.getInfoDoctor !== prevProps.getInfoDoctor) {
            this.setState({
                infoDoctor: this.props.getInfoDoctor
            })
        }
    }

    render() {
        let { infoDoctor, formality } = this.state
        let language = this.props.language
        let nameVi = '', nameEn = ''
        if (infoDoctor?.positionData) {
            nameVi = `${infoDoctor.positionData.valueVi} - ${infoDoctor?.firstName} ${infoDoctor?.lastName}`
            nameEn = `${infoDoctor.positionData.valueEn} - ${infoDoctor?.lastName} ${infoDoctor?.firstName}`
        }

        return (
            <div className="max-w-7xl mx-auto">
                <HomeHeader />
                {this.state.isLoading && <Loading />}
                <div className="grid grid-cols-8 h-32 my-4">
                    <div className="">
                        <div className="bg-avatar mx-0" style={{ backgroundImage: `url(${infoDoctor?.image})` }}></div>
                    </div>
                    <div className="col-span-7">
                        <div className="font-semibold text-3xl">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="mt-3">
                            {infoDoctor?.Markdown?.description &&
                                <span>
                                    {infoDoctor.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  mb-8 border-b-2 border-gray-600">
                    <div className="col-span-7">
                        {formality && <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} formality={formality} />}
                    </div>
                    <div className="col-span-5 ">
                        <DoctorExtraInfo doctorIdFromParent={this.state.currentDoctorId} />
                    </div>
                </div>

                <div>
                    {infoDoctor?.Markdown?.contentHTML &&
                        <div dangerouslySetInnerHTML={{ __html: infoDoctor.Markdown.contentHTML }}>
                        </div>
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
