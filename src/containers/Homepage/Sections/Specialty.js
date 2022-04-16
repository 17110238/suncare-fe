import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import CoXuongKhop from '../../../assets/images/120331-co-xuong-khop.jpg'
import ThanKinh from '../../../assets/images/121042-than-kinh.jpg'
import Slider from "react-slick"
import { getAllSpecialtyService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router-dom'

class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService()
        if (res?.errCode === 0) {
            this.setState({
                arrSpecialty: res.data
            })
        }
    }

    componentDidUpdate() {

    }

    handleViewDetailSpecialty = (id) => {
        const { history } = this.props
        history.push(`/detail-specialty/${id}`)
    }

    render() {
        let arrSpecialty = this.state.arrSpecialty
        let { language } = this.props
        return (
            <div className="bg-gray-200 z-0">
                <div className="h-80 pb-4 pt-4 mx-auto w-10/12">
                    <div className="flex items-center justify-between mb-4">
                        <div className="font-medium text-2xl "><FormattedMessage id="homepage.popular-specialties" /></div>
                        <button className="p-2 bg-gray-300 uppercase hover:bg-yellow-300 hover:text-white">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <Slider {...this.props.settings}>
                        {arrSpecialty && arrSpecialty.length > 0 && arrSpecialty.map((item, index) => {
                            let imageBase64 = ''
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                            }
                            return (
                                <div className="cursor-pointer" key={item.id}
                                    onClick={() => this.handleViewDetailSpecialty(item.id)}
                                >
                                    <div className="bg-img" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                    <div className="mt-1 text-center">
                                        <div>{item.name} </div>
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
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty))
