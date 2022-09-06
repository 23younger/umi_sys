import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  ActionType,
  PageContainer,
  ProTable,
  WaterMark,
} from '@ant-design/pro-components';
import { getList } from '@/services/user';
import { Button, Table } from 'antd';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
// import { connect } from 'umi'; // 非hook写法用connect
import { useSelector, useDispatch } from 'umi';

const UserManage: React.FC<unknown> = (props: any) => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false)
  const [updateValues, setUpdateValues] = useState({})
  const [showColumnData, setShowColumnData] = useState<any>(null)
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState([])

  const columnsData = [
    {
      title: '姓名',
      dataIndex: 'name',
      tip: 'this is tip',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
      initialValue: 'xxx'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      // hideInForm: true, // 隐藏新建的表单里的该字段
      hideInSearch: true, // 隐藏搜索栏的该字段
      valueEnum: {
        'male': {text: '男', status: 'MALE'},
        'female': {text: '女', status: 'FEMALE'}
      },
      initialValue: 'male',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择性别',
          },
        ],
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row, index, action) => {
        // console.log(_, row, index, action);
        
        return [
          <a
            key="a"
            onClick={() => {
              handleUpdateModalVisible(true)
              setUpdateValues(row)
            }}
          >
            编辑
          </a>,
        ]
      } ,
    }
  ]

  const [columns, setColumn] = useState(columnsData)

  const addColumns = useCallback(async () => {
    let newColumn = columnsData.concat([{
      title: '年龄',
      dataIndex: 'age',
      tip: '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
      initialValue: 'xxx'
    },])
    setColumn(newColumn)
  }, [])

  const dispatch = useDispatch()
  const name = useSelector((state: any) => state.user.userInfo.name)

  const summaryMap: any = {
    name: 123,
    sex: 234
  }

  const summaryDom = useMemo(() => {
    const summaryCells: any[] = []
    const keys = Object.keys(summaryMap)
    columnsData.forEach((v, i) => {
      if (keys.includes(v.dataIndex)) {
        if (!showColumnData || showColumnData[v.dataIndex].show) {
          summaryCells.push({
            index: i + 1,
            key: v.dataIndex,
            val: summaryMap[v.dataIndex]
          })
        }
      }
    })
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell align='center' index={0}>合计</Table.Summary.Cell>
        {
          summaryCells.map(v => {
            return (
              <Table.Summary.Cell index={v.index} key={v.key}>
                {v.val}
              </Table.Summary.Cell>
            )
          })
        }
      </Table.Summary.Row>
    )
  }, [showColumnData])

  useEffect(() => {

    // 非hook写法
    // console.log(props);
    // props.dispatch({
    //   type: 'user/queryUser',
    //   payload: {id: 1}
    // })
    // console.log('user', props.user.name)

    // hook写法
    dispatch({
      type: 'user/queryUser',
      payload: {id: 1}
    })

  }, [])
  
  return (
    <WaterMark content='童洋水印'>
    <PageContainer
      header={{
        title: '用户管理'
      }}
    >
      {/* <p>{props.user.name}</p> */}
      <p>{name}</p>
      <ProTable
        headerTitle='表格展示'
        onColumnsStateChange={(data) => {
          console.log(data, actionRef)
          setShowColumnData(data)
        }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120
        }}
        summary={() => summaryDom}
        toolBarRender={()=>[
          <Button
            key='btn1'
            type="primary"
            onClick={() => handleCreateModalVisible(true)}
          >
            新建
          </Button>,
          <Button
            key='btn2'
            type="primary"
            onClick={() => addColumns()}
          >
            添加表头
          </Button>
        ]}
        request={async (params) => {
          const { data } = await getList({
            ...params,
          });
          return {
            data: data || [],
          };
        }}
        columns={columns}
        rowSelection={{
          // 注释该行则默认不显示下拉选项
          selections: ['SELECT_ALL','SELECT_INVERT','SELECT_NONE'],
          defaultSelectedRowKeys: [1],
          onChange: (selectedRowKeys, selectedRows, info) => {
            console.log(selectedRowKeys, selectedRows, info);
          },
          columnWidth: 60
        }}
        tableAlertRender={false}
        editable={{
          type: 'multiple',
        }}
      >
      </ProTable>
      <CreateForm
        modalVisible={createModalVisible}
        onCancel={() => handleCreateModalVisible(false)}
      >
        <ProTable
          columns={columns}
          type="form"
          onSubmit={async (params) => {
            // console.log(params, actionRef)
            if (actionRef.current) {
              actionRef.current.reload()
            }
            handleCreateModalVisible(false)
          }}
        ></ProTable>
      </CreateForm>
      <UpdateForm
        modalVisible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false)}
        values={updateValues}
      />
    </PageContainer>
    </WaterMark>
  )
}

// 非hook写法
// function mapStateToProps ({ user }: any) {
//   return {
//     ...user
//   }
// }
// export default connect(mapStateToProps)(UserManage)

export default UserManage
