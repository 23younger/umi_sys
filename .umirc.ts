import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "customer_refactor",
  },
  hash: true,
  routes: [
    {
      path: "/",
      redirect: "/home",
    },

    {
      name: "首页",
      path: "/home",
      component: "./Home",
      access: 'home'
    },

    {
      name: "权限演示",
      path: "/access",
      component: "./Access",
      access: 'access'
    },

    {
      name: " CRUD 示例",
      path: "/table",
      component: "./Table",
      access: 'table'
    },

    {
      name: "用户管理",
      path: "/userManage",
      component: "./UserManage",
      access: 'usermanage'
    }
  ],

  npmClient: "npm",
  dva: {},
});
