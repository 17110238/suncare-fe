import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom'
import Header from '../containers/Header/Header'
import UserManage from '../containers/System/Admin/Modal/UserManage'
import ManageSchedule from '../containers/System/Doctor/ManageSchedule'
import ManagePatient from '../containers/System/Doctor/ManagePatient'
import VideoMeeting from '../containers/System/Doctor/VideoMeeting'


class Doctor extends Component {
    render() {

        const { isLoggedIn } = this.props
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-redux" component={UserManage} />
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            <Route path="/doctor/video-meeting" component={VideoMeeting}/>
                        </Switch>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor)
