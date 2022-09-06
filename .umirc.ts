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
      path: '/login',
      component: './Login',
      // 不展示顶栏
      headerRender: false,
      // 不展示页脚
      footerRender: false,
      // 不展示菜单
      menuRender: false,
      // 不展示菜单顶栏
      menuHeaderRender: false,
    },
    {
      name: "首页", // 设为""代表可访问该路由页面，但不展示在左侧菜单栏
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
      access: 'table',
      routes: [
        {
          name: "用户管理",
          path: "/table/userManage",
          component: "./UserManage",
          access: 'usermanage'
        },
        {
          name: "权限演示",
          path: "/table/access",
          component: "./Access",
          access: 'access'
        },
      ]
    },

    {
      name: "用户管理",
      path: "/userManage",
      component: "./UserManage",
      access: 'usermanage'
    },

    {
      name: "上传图片",
      path: '/upload',
      component: './Upload',
    }
  ],

  npmClient: "npm",
  dva: {},
});
