```
├── App.vue
├── assets
│   ├── css
│   │   ├── loading-btn.css
│   │   └── loading.css
│   └── logo.png
├── chatkit.js
├── components
│   ├── ChatNavBar.vue 基本的导航栏
│   ├── LoginForm.vue
│   ├── MessageForm.vue 用于将消息发送到所选房间的表单
│   ├── MessageList.vue 显示在选定房间中发布的消息
│   ├── RoomList.vue 列出了已登录用户有权访问的房间，也是房间选择器
│   └── UserList.vue 列出了所选房间的成员
├── main.js
├── router.js
├── store
│   ├── actions.js
│   ├── index.js
│   └── mutations.js
└── views
    ├── ChatDashboard.vue  聊天用户界面
    └── Login.vue  登录入口
```

- @pusher/chatkit-client, 是ChatKit服务的实时客户端界面
- bootstrap-vue, 
- moment, 
- vue-chat-scroll, 添加新内容后会自动滚动到底部
- vuex-persist, 将Vuex状态保存在浏览器的本地存储中
