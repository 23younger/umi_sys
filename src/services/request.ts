import { RequestConfig, AxiosResponse } from "@umijs/max";
import { message } from "antd";

// 处理错误类型
enum ErrorShowType {
    ERROR1 = 1,
    ERROR2 = 2,
}

interface ResponseStructure {
    data: any,
    code?: number,
    msg?: string
}
interface AxiosResponseNews extends AxiosResponse {
    data: any
}

export const req: RequestConfig = {
    // 统一的请求设定
    timeout: 10000,
    baseURL: 'https://www.fastmock.site/mock/6ee7c0cf18905b238310bb7b99fea75e/api',
    errorConfig: {
        // 错误抛出
        errorThrower: (res: any) => {
            const { code, data, msg } = res;
            if (code === 1) {
              const error: any = new Error(msg);
              error.name = 'cusError';
              error.info = { code, data, msg };
              throw error; // 抛出自制的错误
            }
        },
        // 错误接收及处理
        errorHandler: (error: any, opts: any) => {
            if (opts?.skipErrorHandler) throw error;
            // 处理自定义的错误抛出
            if (error.name === "cusError") {
                const errorInfo: ResponseStructure | undefined = error.errorInfo;
                if (errorInfo) {
                    const { code, msg } = errorInfo;
                    switch(code) {
                        case ErrorShowType.ERROR1:
                            message.error(msg);
                            break;
                        case ErrorShowType.ERROR2:
                            message.error(msg);
                            break;
                        default: 
                            message.error(msg);
                    }
                }
            } else if (error.response) {
                // axios的错误
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                message.error('Response status:', error.response.status);
            } else if (error.request) {
                // 请求已经成功发起，但没有收到响应
                // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
                // 而在node.js中是 http.ClientRequest 的实例
                message.error('None response! Please retry.');
            } else {
                // 发送请求时出了点问题
                message.error('Request error, please retry.');
            }
        }
    },
    // 请求拦截器
    requestInterceptors: [
        (config) => {
            console.log('打印', config)
            // 拦截请求配置，进行个性化处理。
            config.headers.path = "icon?ssss"
            // const url = config.url.concat('?token = 123');
            // return { ...config, url };
            return config;
        }
    ],

    // 响应拦截器
    responseInterceptors: [
        (response: AxiosResponseNews) => {
            // 拦截响应数据，进行个性化处理
            // 拦截响应数据，进行个性化处理
            const { data } = response;
            console.log('response', response);
            
            if(data.code !== 0){
                message.error('请求失败！');
            }
            return response;
        }
    ]
}