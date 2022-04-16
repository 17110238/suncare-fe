import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa'
import * as actions from "../../../store/actions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
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

    handleEditUser(data) {
        this.props.handleEditUserFromParent(data)
    }

    render() {
        const arrUsers = this.state.arrUsers
        return (
            <>
                <div className="">
                    <table className="divide-y divide-gray-200">
                        <thead className="bg-gray-400">
                            <tr>
                                <th
                                    scope="col"
                                    className=" px-3 py-2 text-left text-base font-bold text-gray-800 uppercase tracking-wider border-fuchsia-600 border-r-2 border-l-2"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className=" px-3 py-2 text-left text-base font-bold text-gray-800 uppercase tracking-wider border-fuchsia-600 border-r-2 border-l-2"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className=" px-3 py-2 text-left text-base font-bold text-gray-800 uppercase tracking-wider border-fuchsia-600 border-r-2 border-l-2"
                                >
                                    First Name
                                </th>
                                <th
                                    scope="col"
                                    className=" px-3 py-2 text-left text-base font-bold text-gray-800 uppercase tracking-wider border-fuchsia-600 border-r-2 border-l-2"
                                >
                                    LastName
                                </th>
                                <th
                                    scope="col"
                                    className=" px-3 py-2 text-left text-base font-bold text-gray-800 uppercase tracking-wider border-fuchsia-600 border-r-2 border-l-2"
                                >
                                    Address
                                </th>
                                <th
                                    scope="col"
                                    className=" px-3 py-2 text-left text-base font-bold text-gray-800 uppercase tracking-wider"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">

                            {arrUsers.length > 0 && arrUsers.map((user, index) => (

                                <tr key={user.id} className="hover:bg-gray-200 ">
                                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-l-2 border-fuchsia-600 border-b-2 " >
                                        <div className="text-bold font-bold text-gray-900" >
                                            {index}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-l-2 border-fuchsia-600 border-b-2">
                                        <div className="text-sm font-medium  text-gray-700">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-l-2 border-fuchsia-600 border-b-2">
                                        <div className="text-sm font-medium text-gray-700">
                                            {user.firstName}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-l-2 border-fuchsia-600 border-b-2">
                                        <div className="text-sm font-medium text-gray-700">
                                            {user.lastName}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-700 border-r-2 border-l-2 border-fuchsia-600 border-b-2">
                                        {user.address}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-l-2 border-fuchsia-600 border-b-2 ">
                                        <div className="flex">
                                            <FaPencilAlt
                                                className="mr-4 text-yellow-600 cursor-pointer "
                                                onClick={() => this.handleEditUser(user)}
                                            />
                                            <FaTrashAlt
                                                className="text-red-600 cursor-pointer"
                                                onClick={() => this.handleDeleteUser(user.id)}
                                            />
                                        </div>
                                    </td>

                                </tr>

                            ))}

                        </tbody>
                    </table>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(TableManage)
