import React, {Component, PropTypes} from 'react';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import dateFormat from '../../../utils/dateFormat';
import {PAGE_SIZE} from '../../../constants/constants';
import Spliter from '../../Spliter/Spliter';
import numberFormat from '../../../utils/numberFormat';
import * as moment from 'moment';
import {billsList, billsListTitle} from './index.css';

class BillsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectId: ''
		};
		this.columns = [
			{
				title: '序号',
				dataIndex: 'serialNumber',
				key: 'serialNumber',
				render: (text, record, index) => <span>{index + 1}</span>
			},
			{
				title: '客户名称',
				dataIndex: 'customerName',
				key: 'customerName'
			},
			{
				title: '应付金额',
				dataIndex: 'totalAmount',
				key: 'totalAmount',
				render: (text, record, index)=> numberFormat(text)
			},
			{
				title: '已付金额',
				dataIndex: 'paymentAmount',
				key: 'paymentAmount',
				render: (text, record, index)=> numberFormat(text)
			},
			{
				title: '所欠金额',
				dataIndex: 'debtAmount',
				key: 'debtAmount',
				render: (text, record, index)=> <span style={{color:'red'}}>{numberFormat(text)}</span>
			},
			{
				title: '操作',
				key: 'operation',
				render: (text, record)=>(
					<p>
						<a onClick={()=> onClearBill(record['_id'])}>清账</a>
					</p>
				)
			}
		];
	}

	static propTypes = {
		onClearBill: PropTypes.func,
		onPageChange: PropTypes.func,
		dataSource: PropTypes.array,
		loading: PropTypes.any,
		total: PropTypes.any,
		current: PropTypes.any
	};

	onPageChange = (page) => {
		const {onPageChange} = this.props;
		onPageChange(page);
	};

	render() {
		const {
			loading,
			dataSource
		} = this.props;
		return (
			<div className={billsList}>
				<h2 className={billsListTitle}>账单列表</h2>
				<Table
					columns={this.columns}
					dataSource={dataSource}
					loading={loading}
					rowKey={record => record._id}
					pagination={false}
				/>
			</div>
		)
	}
}

export default BillsList;