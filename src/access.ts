export default (initialState: API.UserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  console.log(initialState)
  const canSeeAdmin = !!(
    initialState && initialState.name !== 'dontHaveAccess'
  );
  let accessObj: {[key:string]: any} = {
    canSeeAdmin
  }
  const { menuList = [], btnList = [] } = initialState
  menuList.forEach((v:string): void => {
    accessObj[v] = true
  })
  accessObj.checkBtnAccess = (code: string): boolean => {
    return btnList.includes(code)
  }
  return accessObj;
};
