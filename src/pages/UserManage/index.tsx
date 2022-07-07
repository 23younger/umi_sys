import React, { useRef, useState } from 'react';
import { 
  PageContainer,
  ProTable
} from '@ant-design/pro-components';
import styles from './index.less';
import { Button } from 'antd';

const UserManage: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef()
  const [row, setRow] = useState()
  const [selectedRowsState, setSelectedRows] = useState([])
  const columns = [

  ]
  return (
    <PageContainer
      header={{
        title: '用户管理'
      }}
    >
      <ProTable
        headerTitle='表格展示'
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120
        }}
        toolBarRender={()=>[
          <Button
            key='btn1'
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>
        ]}
        request={async (params, sorter, filter) => {
          
        }}
      >

      </ProTable>
    </PageContainer>
  )
}

export default UserManage
