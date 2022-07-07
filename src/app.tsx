// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
// import Footer from "./Footer";
export async function getInitialState(): Promise<any> {
  console.log('初始化getInit')
  return { 
    name: '用户',
    menuList: ['home', 'access', 'table', 'usermanage'],
    btnList: ['add', 'delete']
  };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    // logout: () => { console.log('退出登录') },
    // rightContentRender: () => (
    //   <p>右边内容</p>
    // ),
    // footerRender: () => <Footer />,
  };
};

export function onRouteChange(params:any) {
  console.log('routeChange', params)
}

export function patchRoutes(params:any) {
  console.log('patchRoutes', params);
}
