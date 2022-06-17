import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import { FormattedMessage } from 'react-intl'
import { saveNewSpecialtyService } from '../../../services/userService'
import { toast } from 'react-toastify'
const mdParser = new MarkdownIt(/* Markdown-it options */)
function getBase64(file) {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
        };
        return fileInfo
    })
}

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: '',
            contentMarkdown: ''
        }
    }


    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeNameInput = (e) => {
        this.setState({ name: e.target.value })
    }

    handleOnChangeImageInput = async (e) => {
        let fileInfo = await getBase64(e.target.files[0])
        if (fileInfo) {
            this.setState({ imageBase64: fileInfo })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveSpecialty = async () => {
        let res = await saveNewSpecialtyService({
            name: this.state.name,
            image: this.state.imageBase64,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown
        })

        if (res?.errCode === 0) {
            toast.success('Create a new Specialty success!')
            this.setState({
                name: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkdown: ''
            })
            document.getElementsByClassName("uploadCaptureInputFile")[0].value = "";
        }
        else {
            toast.error('Create a new Specialty fail!')
        }

    }

    render() {
        let { name, imageBase64, contentHTML, contentMarkdown } = this.state
        let { language } = this.props
        return (
            <div className="px-2">
                <div className="uppercase font-bold text-center my-2 text-xl">
                    <FormattedMessage id="admin.manage-specialty.title" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            <FormattedMessage id="admin.manage-specialty.name" />
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Specialty Name"
                            value={name} onChange={(e) => this.handleOnChangeNameInput(e)}
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            <FormattedMessage id="admin.manage-specialty.image" />
                        </label>
                        <input type='file' name="file" className="uploadCaptureInputFile"
                            onChange={(e) => this.handleOnChangeImageInput(e)}
                        />
                    </div>
                </div>
                <div className="container-markdown">
                    <MdEditor value={contentMarkdown} style={{ height: '450px' }}
                        renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-3"
                    type="button" onClick={() => this.handleSaveSpecialty()}>
                    Save
                </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)
