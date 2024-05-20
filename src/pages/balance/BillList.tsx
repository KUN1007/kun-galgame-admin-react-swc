import { FC, useState } from 'react'
import { List, Button, Popconfirm, Flex, DatePicker, Select, Divider, InputNumber, Input, message, Modal, Space, DatePickerProps } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import type { Balance, CreateBalanceRequestData } from '@/api/balance/balance';
import { getBalanceApi, createBalanceApi, deleteBalanceApi, updateBalanceApi } from '@/api/balance/balance';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

const BillList:FC = () => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [reasonInputPlace, setReasonInputPlace] = useState<string>('请输入中文描述');
  const [bills, setBills] = useState<Balance[]>([]);
  const [oneBill, setOneBill] = useState<Balance>({
    bid: 0,
    type: true,
    amount: 0,
    reason: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    },
    time: Date.now(),
    status: 0,
  });
  const [searchDateStart, setSearchDateStart] = useState<number>(0);
  const [searchDateEnd, setSearchDateEnd] = useState<number>(0);
  const [searchAmountMin, setSearchAmountMin] = useState<number>(0);
  const [searchAmountMax, setSearchAmountMax] = useState<number>(0);

  const [searchBillType, setSearchBillType] = useState<number>(2);
  const [searchDateType, setSearchDateType] = useState<number>(2);
  const [searchAmountType, setSearchAmountType] = useState<number>(2);

  const [openEditPanel, setOpenEditPanel] = useState<boolean>(false);
  const [openCustomPanel, setOpenCustomPanel] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const HandleReasonInputTypeChange = (option: string) => {
    if (option === 'en-us') {
      setReasonInputPlace('Please input description');
    } else if (option === 'ja-jp') {
      setReasonInputPlace('説明を入力してください');
      setOneBill({ ...oneBill, reason: { ...oneBill.reason, 'ja-jp': "" } })
    } else {
      setReasonInputPlace('请输入中文描述');
    }
  }
  const reasonInputBefore = (
    <Select defaultValue="zh-cn" onChange={HandleReasonInputTypeChange}>
      <Option value="en-us">Reason</Option>
      <Option value="ja-jp">りゆう</Option>
      <Option value="zh-cn">原因</Option>
    </Select>
  );

  const HandleChangeSearchBillType = (option: string) => {
    if (option === 'income') {
      setSearchBillType(1);
    } else if (option === 'outcome') {
      setSearchBillType(0);
    } else {
      setSearchBillType(2);
    }
  }

  const HandleChangeCreateBillType = (option: string) => {
    if (option === 'income') {
      setOneBill({ ...oneBill, type: true })
    } else {
      setOneBill({ ...oneBill, type: false })
    }
  }

  const HandleSearchBill = async () => {
    var start: number, end: number, min: number, max: number;
    if (searchDateType === 1) {
      end = Date.now();
      start = end - Date.parse("1979-01-08");
    } else if (searchDateType === 2) {
      end = Date.now();
      start = end - Date.parse("1979-02-01");
    } else if (searchDateType === 3) {
      end = Date.now();
      start = end - Date.parse("1979-04-01");
    } else if (searchDateType === 4) {
      end = Date.now();
      start = end - Date.parse("1979-07-01");
    } else if (searchDateType === 5) {
      end = Date.now();
      start = end - Date.parse("1980-01-01");
    } else if (searchDateType === 6) {
      start = searchDateStart;
      end = searchDateEnd;
    } else {
      start = 0;
      end = 0;
    }

    if (searchAmountType === 1) {
      min = 1; max = 10;
    } else if (searchAmountType === 2) {
      min = 1; max = 50;
    } else if (searchAmountType === 3) {
      min = 1; max = 100;
    } else if (searchAmountType === 4) {
      min = 1; max = 500;
    } else if (searchAmountType === 5) {
      min = searchAmountMin; max = searchAmountMax;
    } else {
      min = 0; max = 0;
    }

    const response = await getBalanceApi(searchBillType, start, end, min, max);
    setBills(response.data);
  };

  const HandleCreatBill = async () => {
    if (oneBill.amount == 0 ||
        (oneBill.reason['zh-cn'].trim() == '' &&
         oneBill.reason['en-us'].trim() == '' &&
         oneBill.reason['ja-jp'].trim() == '')
    ) {
      messageApi.open({
        type: 'error',
        content: '请填写完整信息'
      })
      return;
    }

    const oneBillData: CreateBalanceRequestData = {
      type: oneBill.type,
      amount: oneBill.amount,
      reason: oneBill.reason,
      time: oneBill.time,
      status: 0,
    }

    await createBalanceApi(oneBillData);

    messageApi.open({
      type: 'success',
      content: '成功添加账单记录'
    })
  }

  const confirmDeleteBill = async (bid: number) => {
    await deleteBalanceApi(bid);

    messageApi.open({
      type: 'success',
      content: '成功删除记录'
    })
  }

  const HandleUpdateBill = async () => {
    const res = await updateBalanceApi(oneBill);
    if (res.code === 200) {
      messageApi.open(
        {
          type: 'success',
          content: '成功编辑记录'
        }
      )

      setOpenEditPanel(false);

      for (let i = 0; i < bills.length; i++) {
        if (oneBill.bid === bills[i].bid) {
          bills[i] = oneBill;
          break;
        }
      }
    }
  }

  const HandleInputReason = async (language: string, reason: string) => {
    if (language.includes('input')) {
      setOneBill({
        ...oneBill,
        reason: {
          ...oneBill.reason,
          'en-us': reason
        }
      });
    } else if(language.includes('入力して')) {
      setOneBill({
        ...oneBill,
        reason: {
          ...oneBill.reason,
          'ja-jp': reason
        }
      });
    } else {
      setOneBill({
        ...oneBill,
        reason: {
          ...oneBill.reason,
          'zh-cn': reason
        }
      });
    }
  }

  const confirmCustomSearchConditions = async () => {
    if ((searchAmountMin > 0 && searchAmountMax < searchAmountMin) ||
        (searchDateStart > 0 && searchDateEnd < searchDateStart)) {
      messageApi.open(
        {
          type: 'error',
          content: '请填写有效的查询条件'
        }
      )
      return;
    }

    setOpenCustomPanel(false);
    return;
  }

  const pickBillDate: DatePickerProps['onChange'] = (_, dateString) => {
    setOneBill({ ...oneBill, time: Date.parse(dateString as string) });
  }

  return (
    <div>
        {contextHolder}
        <Space className='gap-5 mb-5'>
            <Select
              defaultValue="total"
              className="w-20"
              options = {[
                { value: 'total',  label: '全部'},
                { value: 'income',  label: '收入'},
                { value: 'outcome', label: '支出'},
              ]}
              onChange={HandleChangeSearchBillType}
            />

            <Select
              value={searchDateType}
              options= {[
                { value: 0, label: '全部'},
                { value: 1, label: '1 周内' },
                { value: 2, label: '1 月内' },
                { value: 3, label: '3 月内' },
                { value: 4, label: '半年内' },
                { value: 5, label: '1 年内' },
                { value: 6, label: '自定义' },
              ]}
              onChange={ (option) => {
                setSearchDateType(option);
                if (option === 6) {
                  setOpenCustomPanel(true);
                }
              }}
            >
            </Select>

            <Select
              value={searchAmountType}
              options= {[
                { value: 0, label: '全部'},
                { value: 1, label: '$10 以内' },
                { value: 2, label: '$50 以内' },
                { value: 3, label: '$100 以内' },
                { value: 4, label: '$500 以内' },
                { value: 5, label: '自定义' },
              ]}
              onChange={ (option) => {
                setSearchAmountType(option);
                if (option === 5) {
                  setOpenCustomPanel(true);
                }
              }}
            >
            </Select>

            {
              (searchAmountType === 5 || searchDateType === 6) && (
                <Button type="primary" onClick={ () => setOpenCustomPanel(true) }>
                  自定义
                </Button>
              )
            }

            <Button type="primary" icon={<SearchOutlined/>} onClick={HandleSearchBill}>
              查询
            </Button>

            <div style={{background:"CornflowerBlue ", width:4, height:30}}></div>
            <Select
              defaultValue="income"
              className="w-20"
              options = {[
                { value: 'income',  label: '收入'},
                { value: 'outcome', label: '支出'},
              ]}
              onChange={HandleChangeCreateBillType}
            />
            <InputNumber
              className='w-15'
              placeholder='金额 ( $ )'
              min={0}
              onChange={(dollar) => { setOneBill({ ...oneBill, amount: dollar || 0 }) }}
            />

            <Input className='w-25'
              addonBefore={reasonInputBefore}
              placeholder={reasonInputPlace}
              maxLength={40}
              showCount
              allowClear
              onChange={(event) => { HandleInputReason(reasonInputPlace, event.target.value) }}
            >
            </Input>

            <DatePicker
              showTime placeholder='账单日期'
              value={dayjs.unix(oneBill.time / 1000) as Dayjs}
              onChange={ pickBillDate }
            >
            </DatePicker>

            <Button type="primary" onClick={HandleCreatBill}>
              添加
            </Button>
        </Space>

        <Flex className='gap-10' vertical>
            <Divider>账单列表</Divider>
            <List
              bordered
              dataSource={bills}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: 6
              }}
              renderItem={(bill) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title='修改账单记录'
                      description='是否要编辑这条账单记录呢'
                      okText='是'
                      cancelText='否'
                      onConfirm={ () => { setOpenEditPanel(true); setOneBill(bill); } }
                    >
                      <Button type='dashed'>修改</Button>,
                    </Popconfirm>,

                    <Popconfirm
                      title='删除账单记录'
                      description='确定删除这条账单记录吗'
                      okText='确定'
                      cancelText='取消'
                      onConfirm={ () => confirmDeleteBill(bill.bid) }
                    >
                      <Button type='primary' danger>删除</Button>
                    </Popconfirm>
                  ]}
                >
                  <Flex className='gap-8'>
                    <p>{bill.type ? "收入":"支出"}</p>
                    <p>${bill.amount}</p>
                    <p>{new Date(bill.time).toLocaleString()}</p>
                    <p>{bill.reason['zh-cn']}</p>
                  </Flex>
                </List.Item>
              )}
            >
            </List>
        </Flex>

        <Modal
          title='重新编辑账单记录'
          open={openEditPanel}
          onOk={HandleUpdateBill}
          onCancel={ () => setOpenEditPanel(false) }
        >
          <Flex className='gap-5 mt-5' justify='space-between'>
            <Select
              defaultValue="income"
              value={oneBill.type ? "income" : "outcome"}
              className="w-20"
              options = {[
                { value: 'income',  label: '收入'},
                { value: 'outcome', label: '支出'},
              ]}
              onChange={HandleChangeCreateBillType}
            />

            <InputNumber
              addonBefore='请输入金额：'
              className='w-15'
              placeholder='金额 ( $ )'
              min={0}
              value={oneBill.amount}
              onChange={(dollar) => { setOneBill({ ...oneBill, amount: dollar || 0 }) }}
            />
          </Flex>

          <Flex vertical className='gap-5 mt-5'>
            <DatePicker
              showTime placeholder='账单日期'
              value={dayjs.unix(oneBill.time / 1000)}
              onChange={ pickBillDate }
            >
            </DatePicker>

            <Input
              placeholder='原因'
              className='w-30'
              onChange={(event) => { setOneBill({
                ...oneBill,
                reason: {
                  ...oneBill.reason,
                  'zh-cn': event.target.value
                }
              })}}
              value={oneBill.reason['zh-cn']}
            >
            </Input>

            < Input
              placeholder='Reason'
              className='w-30'
              onChange={(event) => { setOneBill({
                ...oneBill,
                reason: {
                  ...oneBill.reason,
                  'en-us': event.target.value
                }
              })}}
              value={oneBill.reason['en-us']}
            >
            </Input>

            < Input
              placeholder='述べる'
              className='w-30'
              onChange={(event) => { setOneBill({
                ...oneBill,
                reason: {
                  ...oneBill.reason,
                  'ja-jp': event.target.value
                }
              })}}
              value={oneBill.reason['ja-jp']}
            >
            </Input>
          </Flex>
        </Modal>

        <Modal
          title='自定义查询条件'
          open={openCustomPanel}
          onOk={confirmCustomSearchConditions}
          onCancel={ confirmCustomSearchConditions }
        >
          { searchDateType === 6 && (
            <RangePicker
              showTime className='gap-5 mt-5'
              placeholder={["起始日期", "截止日期"]}
              onChange={ (dateString) => {
                setSearchDateStart(dayjs(dateString[0]).unix() * 1000);
                setSearchDateEnd(dayjs(dateString[1]).unix() * 1000);
              } }
            >
            </RangePicker> )
          }

          { searchAmountType === 5 && (
            <Space className='gap-5 mt-5'>
              <InputNumber
                  addonBefore='金额范围 (最小值) :'
                  className='w-15'
                  placeholder='金额 ( $ )'
                  min={0}
                  value={searchAmountMin}
                  onChange={ (dollar) => { setSearchAmountMin(dollar || 0); } }
              />
              <InputNumber
                  className='w-15'
                  addonBefore='(最大值) :'
                  placeholder='金额 ( $ )'
                  min={0}
                  value={searchAmountMax}
                  onChange={(dollar) => { setSearchAmountMax(dollar || 0); }}
              />
            </Space> )
          }
        </Modal>

        <h2 className='mt-8'>新增收支记录</h2>

    </div>
  )
};

export default BillList;