import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import CoXuongKhop from '../../../assets/images/120331-co-xuong-khop.jpg'
import ThanKinh from '../../../assets/images/121042-than-kinh.jpg'
import Slider from "react-slick"

class MedicalFacility extends Component {

    render() {
        return (
            <div className="bg-gray-50">
                <div className="h-80 pb-4 pt-4 mx-auto w-10/12">
                    <div className="flex items-center justify-between mb-4">
                        <div className="font-medium text-2xl "><FormattedMessage id="homepage.outstanding-medical-facility" /></div>
                        <button className="p-2 bg-gray-300 uppercase hover:bg-yellow-300 hover:text-white"><FormattedMessage id="homepage.more-info"/></button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${CoXuongKhop})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="bg-img" style={{ backgroundImage: `url(${ThanKinh})` }}></div>
                            <div className="mt-1">Cơ Xương Khớp</div>
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
