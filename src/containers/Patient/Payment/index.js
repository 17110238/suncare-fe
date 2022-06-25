import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import StripeCheckout from 'react-stripe-checkout';
import HomeHeader from '../../Homepage/HomeHeader';
import _ from 'lodash'
import queryString from 'query-string'
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { handlePaymentCheckout } from '../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from "react-intl";
import "./payment.scss"

class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            doctorName: '',
            email: '',
            patientName: '',
            phoneNumber: '',
            price: '',
            timeSchudle: '',
            patientId: '',
            doctorId: '',
        }
    }

    componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url)
        console.log("params", params)
        if (params && !_.isEmpty(params)) {
            this.setState({
                date: params.date,
                doctorName: params.doctorName,
                email: params.email,
                patientName: params.patientName,
                phoneNumber: params.phoneNumber,
                price: params.price,
                timeSchudle: params.timeSchudle,
                patientId: params.patientId,
                doctorId: params.doctorId,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleToken = async (token, image) => {
        const { email, price, patientName, patientId, doctorId, date } = this.state
        const res = await handlePaymentCheckout({ token, email, price, patientName, patientId, doctorId, date })
        if (res.errCode === 0) {
            toast.success(res.errMessage)
        }
        else {
            toast.error(res.errMessage)
        }
    }

    render() {
        const { price, doctorName, email, patientName, phoneNumber, date, timeSchudle } = this.state
        const { language } = this.props
        const stripeKey = 'pk_test_51LC4rKI4mP7c8dVYr56BpOyiwPXPKYmjiMh5QNYDm27lIt7CRwVvkeyyPpvUHpztNEZZh3rFBAAbOqLbsz4LzNTS00kbdgI7hN'
        return (
            <div className='container'>
                <HomeHeader/>
                <div className='w-full mt-10 flex flex-col justify-center items-center payment'>
                    <h2 className='mb-4  title'><FormattedMessage id="payment.title" /></h2>
                    <div className='py-2 pl-4 payment-detail' >
                        <div className='mt-2'>
                            <h2 className='label'><FormattedMessage id="payment.full-name" /></h2>
                            <span className='label-detail'> {patientName}</span>
                            <hr className='underline'/>
                        </div>
                        <div className='mt-2'>
                            <h2 className='label'><FormattedMessage id="payment.phone" /></h2>
                            <span className='label-detail'> {phoneNumber}</span>
                            <hr className='underline'/>
                        </div>
                        <div className='mt-2'>
                            <h2 className='label'><FormattedMessage id="payment.doctor-name" /></h2>
                            <span className='label-detail'>{doctorName}</span>
                            <hr className='underline'/>
                        </div>
                        <div className='mt-2'>
                            <h2 className='label'><FormattedMessage id="payment.price" /></h2>
                            <NumberFormat className='label-detail' value={price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' VND'} />
                            <hr className='underline'/>
                        </div>
                        <div className='font-bold' style={{marginTop: "20px"}}>
                            <span className='font-semibold'><FormattedMessage id="payment.booking-date" />: </span>
                            {timeSchudle ? timeSchudle + '- ' : ''}
                            {
                                moment.unix(+date / 1000).format('dddd - DD/MM/YYYY')
                            }
                        </div>
                        <div className='mt-2 button'>
                            <StripeCheckout
                                stripeKey={stripeKey}
                                token={this.handleToken}
                                amount={price}
                                email={email}
                                currency={language === 'vi' ? 'VND' : 'USD'}
                            >
                                <button
                                    type="button"
                                    className="payment-button items-center border border-transparent text-md font-medium rounded shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                // onClick={() => this.handleLogin()}
                                >
                                    {language === 'vi' ? 'Thanh toán tại đây' : 'Payment in here'}
                                </button>
                            </StripeCheckout>
                        </div>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
