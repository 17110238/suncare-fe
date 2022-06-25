import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from "../../store/actions"
import Navigator from '../../components/Navigator'
import { adminMenu, doctorMenu } from './menuApp'
import { FaSignOutAlt } from 'react-icons/fa'
import { LANGUAGES, USER_ROLE } from '../../utils'
import { FormattedMessage } from 'react-intl'
import en from '../../assets/images/en.png'
import vi from '../../assets/images/vi.png'
import _ from 'lodash'
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (e) => {
        this.props.changeLanguageAppRedux(e.target.value)
    }

    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props
        console.log("userInfo", userInfo)
        const { menuApp } = this.state
        return (
            <div className="flex justify-between items-center bg-indigo-600 text-gray-200 z-50">
                {/* thanh navigator */}
                <div className="header-tabs-container z-50">
                    <Navigator menus={menuApp} />
                </div>
                {/* nút logout */}
                <div className="btn btn-logout leading-10 mr-4 " title="Log out">
                    <div className="flex justify-between items-center">
                        <div className="text-white mr-3">
                            <FormattedMessage id="homeheader.welcome" /> <span className="text-white">{language === 'vi' ? userInfo?.lastName : userInfo.firstName} !</span>
                        </div>
                        {language === 'vi' ? <img className="w-8" src={vi} /> : <img className="w-8  " src={en} />}
                        <select value={language} className="outline-none mr-4 cursor-pointer ml-2" onChange={(e) => this.handleChangeLanguage(e)}>
                            <option value={LANGUAGES.VI}>
                                VN
                            </option>
                            <option value={LANGUAGES.EN}>
                                EN
                            </option>
                        </select>
                        <FaSignOutAlt className="text-2xl text-gray-200" onClick={processLogout} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
