import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router-dom'
import Slider from "react-slick"
import * as actions from '../../../store/actions'

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTopDoctors: [],
            index: 0,
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctors()
    }

    componentDidUpdate(prevProps) {
        if (this.props.topDoctorsRedux !== prevProps.topDoctorsRedux) {
            this.setState({
                arrTopDoctors: this.props.topDoctorsRedux
            })
        }
    }
    beforeChange = (prev, next) => {
        this.setState({ index: next });
    }

    handleViewDetailDoctor = (doctorId) => {
        const { history } = this.props
        history.push(`/detail-doctor?doctorId=${doctorId}&formality=offline`)
    }

    render() {
        let { arrTopDoctors } = this.state
        let { language } = this.props
        return (
            <div className="bg-gray-200" >
                <div className="h-96 pb-3 pt-3 mx-auto w-10/12">
                    <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-2xl ">{language === 'vi' ? 'Khám bệnh trực tiếp tại phòng khám' : 'Direct medical examination at the clinic'}</div>
                        <button className="p-2 bg-gray-300 uppercase hover:bg-yellow-300 hover:text-white"><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <Slider {...this.props.settings} >
                        {arrTopDoctors && arrTopDoctors.length > 0 && arrTopDoctors.map((item, index) => {
                            let imageBase64 = ''
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                            }
                            let nameVi = `${item.positionData.valueVi} - ${item.firstName} ${item.lastName}`
                            let nameEn = `${item.positionData.valueEn} - ${item.lastName} ${item.firstName}`
                            return (
                                <div className="p-2" key={item.id}>
                                    <div className="cursor-pointer border-4 border-white w-72 h-64 bg-white rounded-lg"
                                        onClick={() => this.handleViewDetailDoctor(item.id)}>
                                        <div className="bg-avatar mt-3 " style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                        <div className="mt-3 text-center">
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </Slider>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: () => dispatch(actions.fetchTopDoctors())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor))
