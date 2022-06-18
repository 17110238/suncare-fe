import React, { Component } from 'react'
import { connect } from "react-redux"
import HomeHeader from '../../Homepage/HomeHeader'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant'
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfo from './DoctorExtraInfo'

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoDoctor: {},
            currentDoctorId: -1,
        }
    }

    componentDidMount() {
        let id = +this.props.match?.params?.id
        this.setState({
            currentDoctorId: id,
        })
        if (id) {
            this.props.getDetailInfoDoctors(id)
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
        let infoDoctor = this.state.infoDoctor
        let language = this.props.language
        let nameVi = '', nameEn = ''
        if (infoDoctor?.positionData) {
            nameVi = `${infoDoctor.positionData.valueVi} - ${infoDoctor?.firstName} ${infoDoctor?.lastName}`
            nameEn = `${infoDoctor.positionData.valueEn} - ${infoDoctor?.lastName} ${infoDoctor?.firstName}`
        }

        return (
            <div className="max-w-7xl mx-auto">
                <HomeHeader />
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
                        <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
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
