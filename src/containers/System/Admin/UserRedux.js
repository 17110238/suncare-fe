import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'
import * as actions from "../../../store/actions"
import { Menu, Transition } from '@headlessui/react'
import MarkdownIt from 'markdown-it';
import moment from 'moment'
import 'react-markdown-editor-lite/lib/index.css';
import UserManageModal from './Modal/UserManage'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpen: false,
            isShowCreateModal: false,
            user: {},
            action: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux()
    }

    componentDidUpdate(prevProps) {
        if (this.props.listUsers !== prevProps.listUsers) {
            this.setState({
                arrUsers: this.props.listUsers
            })
        }
    }

    handleDeleteUser(userId) {
        this.props.DeleteUser(userId)
    }

    handleIsOpen = () => {
        this.setState({
            isOpen: true
        })
    }
    handleCloseModal = () => {
        this.setState({
            isShowCreateModal: false
        })
    }

    render() {
        const arrUsers = this.state.arrUsers
        const handleShowModal = (user, action) => {
            this.setState({
                user: user && Object.keys(user).length > 0 ? user : {},
                isShowCreateModal: true,
                action
            })
        }
        return (
            <div className='overflow-x-hidden'>
                <UserManageModal
                    isShow={this.state.isShowCreateModal}
                    handleClose={this.handleCloseModal}
                    userData={this.state.user}
                    action={this.state.action}
                />

                <div className="w-full my-4">
                    <h1 className='text-center mb-4 text-3xl font-semibold'>
                        <FormattedMessage id="manage-user.manage-doctor" />
                    </h1>
                </div>

                <div className="px-4 sm:px-6 lg:px-8 mb-12 w-full overflow-x-hidden overflow-visible">
                    <div className="flex w-full justify-end sm:flex sm:items-center">
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                onClick={() => handleShowModal({}, CRUD_ACTIONS.CREATE)}
                            >
                                Add user
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col w-full">
                        <div className="-my-2 -mx-4 overflow-x-hidden sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-0.5 align-middle md:px-6 lg:px-8">
                                <div className="overflow-x-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    <FormattedMessage id="manage-user.firstName" />
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    Last Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    Phone Number
                                                </th>
                                                <th scope="col" className="w-20 px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    Thời gian tạo
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    Trạng thái
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white  ">
                                            {arrUsers.length > 0 && arrUsers.map((user, index) => (
                                                <tr key={user.id} className="group">
                                                    <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                                        {user.id}
                                                    </td>
                                                    <td className="whitespace-nowrap group-hover:bg-gray-50 px-3 py-4 text-sm text-gray-500">{user?.firstName}</td>
                                                    <td className="whitespace-nowrap group-hover:bg-gray-50 px-3 py-4 text-sm text-gray-500">{user?.lastName}</td>
                                                    <td className="whitespace-nowrap group-hover:bg-gray-50 px-3 py-4 text-sm text-gray-500">{user?.email}</td>
                                                    <td className="whitespace-nowrap group-hover:bg-gray-50 px-3 py-4 text-sm text-gray-500">{user?.phoneNumber}</td>
                                                    <td className="whitespace-nowrap group-hover:bg-gray-50 px-3 py-4 text-left text-sm text-gray-500">{moment(user?.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                                    <td className={`whitespace-wrap group-hover:bg-gray-50 px-3 py-4 text-sm ${user?.isVerify ? 'text-green-500' : 'text-yellow-500'}`}>{user?.isVerify ? 'Đã xác thực' : 'Chờ xác thực'}</td>
                                                    <td className="relative whitespace-nowrap group-hover:bg-gray-50 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <div className="flex justify-end text-lg">
                                                            <FaEdit
                                                                className="mr-4 text-yellow-600 cursor-pointer "
                                                                onClick={() => handleShowModal(user, CRUD_ACTIONS.EDIT)}
                                                            />
                                                            <Menu as="div" className="relative inline-block text-left">
                                                                <div>
                                                                    <Menu.Button className="text-red-600 cursor-pointer">
                                                                        <FaTrashAlt
                                                                            onClick={() => this.handleIsOpen()}
                                                                        />
                                                                    </Menu.Button>
                                                                </div>
                                                                <Transition
                                                                    show={this.isOpen}
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <Menu.Items className="absolute border-2 border-gray-200 z-10 flex flex-col justify-center top-7 -right-6 w-64 h-28 mt-2 origin-top-right bg-white rounded-md shadow-lg"
                                                                    >
                                                                        <p className="w-full text-sm font-semibold text-center mb-3">Are you sure delete this item!</p>
                                                                        <div className="flex z-10 w-full justify-around items-center text-white">
                                                                            <button
                                                                                type="button"
                                                                                className="px-6 py-2 text-sm font-medium rounded shadow-sm bg-gray-600 hover:bg-gray-700"

                                                                            >
                                                                                Cancle
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="px-6 py-2 text-sm font-medium rounded shadow-sm bg-red-600 hover:bg-red-700 "
                                                                                onClick={() => this.handleDeleteUser(user.id)}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                        <div
                                                                            className="bg-white z-0 border-t-2 border-l-2 border-gray-200 h-5 w-5 absolute"
                                                                            style={{ right: '22px', top: "-10px", transform: "rotate(45deg)" }}
                                                                        />
                                                                    </Menu.Items>
                                                                </Transition>
                                                            </Menu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchALLUserStart()),
        DeleteUser: (id) => dispatch(actions.DeleteUser(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
