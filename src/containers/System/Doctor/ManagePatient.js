import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import { FormattedMessage } from 'react-intl'
import { getAllPatientForDoctor, handleConfirmAndPaymentPatient } from '../../../services/userService'
import moment from 'moment'
import noData from '../../../assets/images/Nodata.jpg'
import { toast } from 'react-toastify'

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        const { user } = this.props
        const { currentDate } = this.state
        const formatedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, formatedDate)
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res?.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            const { user } = this.props
            const { currentDate } = this.state
            const formatedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formatedDate)
        })
    }

    handleConfirmSchedule = async (item, action) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            action
        }
        const res = await handleConfirmAndPaymentPatient(data)
        if (res?.errCode === 0) {
            toast.success('Xác nhận đặt lịch thành công!')
        }
    }

    render() {
        const { currentDate, dataPatient } = this.state
        console.log("dataPatient", dataPatient)
        const { user, language } = this.props
        return (
            <div className='w-full h-full p-4'>
                <h2 className='text-center text-2xl font-semibold'>Quản lý lịch khám bệnh nhân</h2>
                <div className='grid grid-cols-3'>
                    <div >
                        <label className="font-bold"> <FormattedMessage id="manage-schudule.choose-date" /></label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={currentDate}
                            selected={currentDate}
                        />
                    </div>
                </div>
                {dataPatient.length > 0 ? <table className="min-w-full divide-y divide-gray-300 mt-5">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                STT
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Họ và tên
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Thời gian
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Địa chỉ
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Giới tính
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Trạng thái thanh toán
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Actions
                            </th>

                        </tr>
                    </thead>
                    <tbody className="min-w-full divide-y divide-gray-200 bg-white">
                        {dataPatient.length > 0 && dataPatient.map((item, index) => (
                            <tr className="group" key={item.id}>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {Object.keys(item?.patientData).length > 0 ? item?.patientData?.firstName : '-'}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {language === 'vi' ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {Object.keys(item?.patientData).length > 0 ? item?.patientData?.address : '-'}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {language === 'vi' ? item?.patientData?.genderData.valueVi : item?.patientData?.genderData.valueEn}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {item.statusId === 'S3' ? <span className='text-red-500'>Đã thanh toán</span> : <span className='text-red-500'>Chưa thanh toán</span>}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    <button
                                        type="button"
                                        className="mr-5 rounded text-white bg-green-500 w-52 whitespace-nowrap px-2 py-2 font-bold"
                                        onClick={(e) => this.handleConfirmSchedule(item, 'confirm')}
                                    >
                                        Xác nhận và gửi thanh toán
                                    </button>

                                    <button
                                        type="button"
                                        className="mr-5 rounded text-white bg-yellow-500 w-24 whitespace-nowrap px-2 py-2 font-bold"
                                        onClick={(e) => this.handleConfirmSchedule(item, 'cancel')}
                                    >
                                        Hủy
                                    </button>

                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                    :
                    <>
                        <div div className="w-full h-96 flex justify-center items-center">
                            <div className='w-96 h-96 flex flex-col justify-center'>
                                <img src={noData} />
                                <span className='text-center'>Không tìm thấy dữ liệu</span>
                            </div>
                        </div>
                    </>
                }
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfoDoctors: (id) => dispatch(actions.getDetailInfoDoctors(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient)
