import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import CoXuongKhop from '../../../assets/images/120331-co-xuong-khop.jpg'
import ThanKinh from '../../../assets/images/121042-than-kinh.jpg'
import Slider from "react-slick"

class About extends Component {

    render() {
        return (
            <div className="bg-gray-200 pt-3 pb-11">
                <div className="h-96 pb-4 pt-4 mx-auto w-10/12">
                    <div className="text-2xl font-medium mb-4"> Truyền thông nói về BookingCare</div>
                    <div className="flex">
                        <div>
                            <iframe width="570" height="320" src="https://www.youtube.com/embed/gDH6CJDEdGQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="pl-4 italic">
                            react slick active arrow not showing
                            there is no arrow in react slick
                            do not show the arrow on the last slide react slick
                            do not show the arrow on the last slide react slick
                            react slick arrow show always
                            arrows not showing in react slick
                            slick component arrows are not visible in react
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
