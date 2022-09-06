import {
    ProForm,
    ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import { Button, Modal } from "antd";
import React from "react";

interface UpdateFormProps {
    modalVisible: boolean,
    onCancel: () => void,
    values: any
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const { modalVisible, onCancel, values } = props

    return (
        <Modal
            visible={modalVisible}
            onCancel={() => onCancel()}
            title="修改"
            footer={null}
        >
            <ProForm
                initialValues={values}
                submitter={{
                    render: (props, dom) => {
                        console.log('props', props);
                        
                        return [
                            ...dom,
                            <Button key='press1'>点击按钮</Button>
                        ]
                    }
                }}
            >
                <ProForm.Group
                    title='编辑信息'
                >
                    <ProFormText 
                        label="姓名"
                        name='name'
                        placeholder="请输入姓名"
                        tooltip="最长23位"
                        width='lg'
                        required
                        rules={[
                            {required: true, message: '请输入姓名'}
                        ]}
                    />
                    <ProFormSelect
                        label="性别"
                        valueEnum={{
                            'male': '男',
                            'female': '女'
                        }}
                        name="sex"
                        placeholder="请选择性别"
                        rules={[
                            {required: true, message: '请选择性别'}
                        ]}
                    />
                </ProForm.Group>
            </ProForm>
        </Modal>
    )
}

export default UpdateForm;