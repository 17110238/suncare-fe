import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Specialty from './Sections/Specialty'
import MedicalFacility from './Sections/MedicalFacility'
import OutstandingDoctor from './Sections/OutstandingDoctor'
import About from './Sections/About'
import HomeFooter from './HomeFooter/HomeFooter'
import HandBook from './Sections/HandBook'
import HomeBanner from './HomeBanner/HomeBanner'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './Homepage.scss'
import Slider from "react-slick"

function SampleNextArrow(props) {

    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, }}
            onClick={onClick}
        />
    );
}


class Homepage extends Component {

    render() {
        let settings = {
            arrows: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,

            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        }
        return (
            <div >
                <HomeHeader />
                <HomeBanner />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                {/* <HandBook settings={settings} /> */}
                {/* <About /> */}
                <HomeFooter />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
