import React, { Component } from 'react'
import { connect } from "react-redux"
import { LANGUAGES } from '../../../../utils/constant'
import * as actions from '../../../../store/actions'
import { revenueStatistics } from '../../../../services/userService'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import moment from 'moment'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satistics: [],
        }
    }

    async componentDidMount() {
        const res = await revenueStatistics()
        if (res.errCode === 0) {
            const dataFitler = {
                labels: res && res.data?.map((data) => moment.unix(+data.date / 1000).format('dddd - DD/MM/YYYY')),
                datasets: [{
                    label: `Tổng doanh thu ${res.data.reduce((sum, { total_amount }) => sum + total_amount, 0)}`,
                    data: res && res.data?.map((data) => data.total_amount),
                }]
            }
            this.setState({
                ...this.state, satistics: dataFitler
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        const { satistics } = this.state;
        return (
            <div className="p-5">
                <div className="flex justify-center mb-4">
                    <h3 className="font-semibold">Thống kê doanh thu</h3>
                </div>

                {
                    Object.keys(satistics).length > 0 &&
                    <div className="w-2/3">
                        <Chart type='line' data={satistics} />
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfoDoctors: (id) => dispatch(actions.getDetailInfoDoctors(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
