import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import { FormattedMessage } from 'react-intl'
import { getAllPatientForDoctor, handleConfirmAndPaymentPatient } from '../../../services/userService'
import moment from 'moment'
import noData from '../../../assets/images/Nodata.jpg'
import { toast } from 'react-toastify'
import NumberFormat from 'react-number-format'
import { FaEdit, FaTrashAlt, FaPlus, FaCheckCircle, FaTimes, FaWindowClose } from "react-icons/fa"
import { Menu, Transition } from "@headlessui/react"
import Loading from '../../../components/Loading/Loading'
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isLoading: false
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
        const { language, user } = this.props
        let data = {
            doctorId: item?.doctorId,
            patientId: item?.patientId,
            email: item?.patientData.email,
            timeType: item?.timeType,
            action,
            date: item.date,
            language: language === 'vi' ? 'vi' : 'en',
            price: language === 'vi' ? item.priceDataPatient.valueVi : item.priceDataPatient.valueEn,
            patientName: item?.patientData?.firstName,
            phoneNumber: item?.patientData?.phoneNumber,
            currentDate: this.state.currentDate,
            doctorName: language === 'vi' ? user.firstName + ' ' + user.lastName : user.lastName + user.firstName,
            timeSchudle: language === 'vi' ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
        }
        this.setState({
            isLoading: true
        })
        const res = await handleConfirmAndPaymentPatient(data)
        if (res?.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success(res?.errMessage)
            const { currentDate } = this.state
            const formatedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formatedDate)
        }
    }

    render() {
        const { currentDate, dataPatient, isLoading } = this.state
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
                                Số điện thoại
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
                                Giá
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Hình thức
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                            >
                                Trạng thái
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
                                    {item?.patientData?.phoneNumber ? item.patientData?.phoneNumber : '-'}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {Object.keys(item?.patientData).length > 0 ? item?.patientData?.address : '-'}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {language === 'vi' ? item?.patientData?.genderData.valueVi : item?.patientData?.genderData.valueEn}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {language === 'vi' ?
                                        <NumberFormat value={item?.priceDataPatient?.valueVi} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' VND'} />
                                        :
                                        <NumberFormat value={item?.priceDataPatient?.valueEn} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' USD'} />}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {item?.formality === 'online' ? <span className="text-green-500">{language === 'vi' ? 'Khám trực tuyến' : 'online'}</span> :
                                        <span className="text-red-500">{item?.formality === 'offline' ? 'Khám tại phòng khám' : 'Examination at the clinic'}</span>}
                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    {item.statusId === 'S1' ? <span className='text-yellow-500'>Chờ xác nhận</span> : item.statusId === 'S2' ? <span className='text-blue-500'>Đã xác nhận</span> :
                                        item.statusId === 'S3' ? <span className='text-green-500'>Đã thanh tóan</span> : item.statusId === 'S4' ? <span className='text-red-500'>Đã hủy</span> : item.statusId === 'S5' ? <span className='text-indigo-500'>Chờ thanh toán</span> : ''}

                                </td>
                                <td className="whitespace-nowrap group-hover:bg-gray-50 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                                    <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                    >
                                        <div>
                                            <Menu.Button className="text-yellow-600 text-xl cursor-pointer">
                                                <FaEdit />
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
                                            <Menu.Items className={`absolute border-2 border-gray-200 z-10 flex flex-col top-7 -right-6 w-56 ${item?.formality === 'online' ? ' h-24 ' : 'h-16'} mt-2 origin-top-right bg-white rounded-md shadow-lg`}>

                                                <div className="flex z-10 w-full justify-around items-center text-white">
                                                    <div className="flex flex-col">
                                                        <span className={`text-green-500 hover:text-green-700 mt-2 flex items-center text-sm  ${item.statusId === 'S5' || item.statusId === 'S1' || item.statusId === 'S4' || item.statusId === 'S3' ? ' opacity-50 cursor-not-allowed pointer-events-none' : ' cursor-pointer'}`} onClick={(e) => this.handleConfirmSchedule(item, 'confirm')} > <FaCheckCircle className="text-xl mr-2" /> Xác nhận và gửi thanh toán</span>
                                                        <span className={`text-red-500 mt-2 hover:text-red-700 flex cursor-pointer items-center text-sm  ${item.statusId === 'S5' || item.statusId === 'S1' || item.statusId === 'S4' || item.statusId === 'S3' ? ' opacity-50 cursor-not-allowed pointer-events-none' : ''}`} onClick={(e) => this.handleConfirmSchedule(item, 'cancel')} > <FaWindowClose className="text-xl mr-2" />  Hủy lịch</span>
                                                        {item?.formality === 'online' ?
                                                            <span className={`text-yellow-500 mt-2 hover:text-yellow-700 flex cursor-pointer items-center text-sm  ${item.statusId === 'S5' || item.statusId === 'S1' || item.statusId === 'S4' || item.statusId === 'S2' ? ' opacity-50 cursor-not-allowed pointer-events-none' : ''}`} onClick={(e) => this.handleConfirmSchedule(item, 'cancel')} > <FaWindowClose className="text-xl mr-2" />  Bắt đầu khám</span>
                                                            : ''
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-white z-0 border-t-2 border-l-2 border-gray-200 h-5 w-5 absolute"
                                                    style={{
                                                        right: "22px",
                                                        top: "-10px",
                                                        transform: "rotate(45deg)",
                                                    }}
                                                />
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

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
                {isLoading && <Loading />}
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


