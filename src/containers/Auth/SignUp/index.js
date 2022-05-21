import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../Homepage/HomeHeader';
import CreateUser from '../../System/Admin/UserRedux'
import FormSignUp from './FormSignUp';
class index extends Component {
    render() {
        return (
            <>
                <HomeHeader />
                <div className="w-full py-10 border overflow-hidden">
                    <h1 className="text-center font-bold text-3xl mb-4"><FormattedMessage id="manage-user.sign-in" /></h1>
                    <FormSignUp />
                </div>
            </>

        );
    }
}

export default index;