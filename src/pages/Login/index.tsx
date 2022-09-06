import React from "react";
import style from './index.less';
import { ProForm, ProFormText } from "@ant-design/pro-components";

const Login: React.FC = () => {
    return (
        <div className={style['login-wrapper']}>
            <ProForm
                onFinish={async (params: any) => {
                    console.log(params)
                }}
            >
                <ProForm.Group title="登录页">
                    <ProFormText
                        label="用户名"
                        name='name'
                        width='lg'
                        placeholder='请输入用户名'
                        rules={[
                            { required: true, message: '请输入用户名' }
                        ]}
                    />
                    <ProFormText.Password
                        label="密码"
                        name="password"
                        width='lg'
                        placeholder='请输入密码'
                        rules={[
                            { required: true, message: '请输入密码' }
                        ]}
                    />
                </ProForm.Group>

            </ProForm>
        </div>
    )
}
export default Login;