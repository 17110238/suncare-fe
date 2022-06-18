import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from '../../store/actions'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import _ from 'lodash'
import { postVerifyBookAppoinment } from '../../services/userService'
import HomeHeader from '../Homepage/HomeHeader'
import { FormattedMessage } from 'react-intl'

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerified: false,
            errCode: 0,
            errMessage: ''
        }
    }

    async componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url)
        if (params && !_.isEmpty(params)) {
            let res = await postVerifyBookAppoinment(params)
            if (res && res.errCode === 0) {

                this.setState({
                    statusVerified: true,
                    errCode: res.errCode,
                    errMessage: res.errMessage
                })
            }
            else {
                this.setState({ statusVerified: true, errCode: res?.errCode ? res.errCode : -1, errMessage: res.errMessage })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { statusVerified, errCode, errMessage } = this.state
        return (
            <>
                <HomeHeader />

                <div className="w-full text-center mt-4">
                    {statusVerified === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className="text-xl text-green-500 font-semibold"> {errMessage}</div>
                                :
                                <div className="text-xl text-red-600 font-semibold"> {errMessage}</div>}
                        </div>
                    }
                </div>
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail))
