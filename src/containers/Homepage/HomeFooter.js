import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"

class HomeFooter extends Component {

    render() {
        return (
            <div className="bg-gray-50">
                <div className="h-16 w-full border-t-2 border-gray-300 flex flex-col items-center">
                    <div className="text-center py-6">
                        <p className="text-sm text-blue-700 font-bold mb-2">
                            © 2020 by SunCare
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
