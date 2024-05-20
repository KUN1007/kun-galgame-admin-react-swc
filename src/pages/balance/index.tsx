import { FC } from 'react'
import BillList from './BillList'

const BalancePage: FC = () => {
  return (
  <div>
    <h2>收支管理</h2>
    <div className='mb-8'>
      <h3>操作说明</h3>
      <ul>
        <li>
          <p>选择账单日期即可查询收入或支出记录</p>
        </li>
        <li>
          <p>输入金额后可以添加记录</p>
        </li>
        <li>
          <p>选中查询结果里的一项记录即可删除、修改</p>
        </li>
      </ul>
    </div>

    <BillList/>
  </div>
  )
}

export default BalancePage
