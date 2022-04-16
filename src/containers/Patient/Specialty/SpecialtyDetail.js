import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import HomeHeader from '../../Homepage/HomeHeader'
import { getDetailSpecialtyService } from '../../../services/userService'
import ProfileDoctor from '../Doctor/ProfileDoctor'

class SpecialtyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoSpecialty: {}
        }
    }

    async componentDidMount() {
        let id = +this.props.match?.params?.id
        if (id) {
            let res = await getDetailSpecialtyService(id)
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

    render() {
        return (
            <>
                <HomeHeader />


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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail)
