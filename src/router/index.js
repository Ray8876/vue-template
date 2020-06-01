import Vue from 'vue';
import Router from 'vue-router';

// const Login = () => import('../views/Login.vue');
// const Home = () => import('../views/home/Home.vue');
const Dashboard = () => import('../views/home/comps/Dashboard.vue');
// const GoodClassify = () => import('../views/home/comps/mall/Classify.vue')
// const PsyTest = () => import('../views/home/comps/secretGarden/psyTest')
// const Heart = () => import('../views/home/comps/backGarden/heart')
// const SystemSetting = () => import('../views/home/comps/setting/SystemSetting.vue');
// const CourseDetail = () => import('../views/home/comps/college/CourseDetail');
// const Lecturer = () => import('../views/home/comps/college/Lecturer');
// const Course = () => import('../views/home/comps/college/Course');
// const Activity = () => import('../views/home/comps/activity/Activity');
// const Coupon = () => import('../views/home/comps/coupon/Coupon');
// const Goods = () => import('../views/home/comps/mall/Goods');
// const NewGoods = () => import('../views/home/comps/mall/NewGoods');
// const Store = () => import('../views/home/comps/mall/Store');
// const Merchant = () => import('../views/home/comps/mall/Merchant');
// const Orders = () => import('../views/home/comps/orders/Orders');
// const NewOrders = () => import('../views/home/comps/orders/NewOrders');
// const RefundList = () => import('../views/home/comps/orders/RefundList');
// const Topic = () => import('../views/home/comps/backGarden/topic.vue');
// const StarUsers = () => import('../views/home/comps/user/starUsersList.vue');
// const Users = () => import('../views/home/comps/user/userList.vue');
// const OrderPay = () => import('../views/home/comps/orders/OrderPay');
const BuList = () => import('../views/home/page/buList.vue');
const KehuList = () => import('../views/home/page/kehuList.vue');
const CaigouList = () => import('../views/home/page/caigouList.vue');
const chuku = () => import('../views/home/page/chuku.vue');
const ruku = () => import('../views/home/page/ruku.vue');

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: /*Login*/() => import( /* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    redirect: 'dashboard',
    component: /*Home*/ () => import( /* webpackChunkName: "Home" */ '../views/home/Home.vue'),
    meta: { title: '自述文件' },
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        meta: { title: '系统首页' }
      },
      {
        path: '/buList',
        component: BuList,
        meta: { title: '布匹列表' }
      },
      {
        path: '/kehuList',
        component: KehuList,
        meta: { title: '客户列表' }
      },
      {
        path: '/caigouList',
        component: CaigouList,
        meta: { title: '采购方列表' }
      },
      {
        path: '/chuku',
        component: chuku,
        meta: { title: '出库记录' }
      },
      {
        path: '/ruku',
        component: ruku,
        meta: { title: '入库记录' }
      },
      // },
      // {
      //   path: '/setting',
      //   component: SystemSetting,
      //   meta: { title: '系统设置' }
      // },
      // {
      //   path: '/usersList',
      //   component: Users,
      //   meta: { title: '用户列表' }
      // },
      // {
      //   path: '/starUsersList',
      //   component: StarUsers,
      //   meta: { title: '星用户列表' }
      // },
      // {
      //   path: '/psyTest',
      //   component: PsyTest,
      //   meta: { title: '心理测试' }
      // },
      // {
      //   path: '/topic',
      //   component: Topic,
      //   meta: { title: '话题管理' }
      // },
      // {
      //   path: '/courseDetail',
      //   component: CourseDetail,
      //   meta: { title: '课程列表' }
      // },
      // {
      //   path: '/heart',
      //   component: Heart,
      //   meta: { title: '心声列表'}
      // },
      // {
      //   path: '/Lecturer',
      //   component: Lecturer,
      //   meta: { title: '讲师列表' }
      // },
      // {
      //   path: '/goodClassify',
      //   component: GoodClassify,
      //   meta: { title: '商品分类' }
      // },
      // {
      //   path: '/course',
      //   component: Course,
      //   meta: { title: '系列列表' }
      // },
      // {
      //   path: '/activity',
      //   component: Activity,
      //   meta: { title: '活动列表' }
      // },
      // {
      //   path: '/coupon',
      //   component: Coupon,
      //   meta: { title: '优惠券列表' }
      // },
      // {
      //   path: '/goods',
      //   component: Goods,
      //   meta: { title: '商品列表' }
      // },
      // {
      //   path: '/newGoods',
      //   component: NewGoods,
      //   meta: { title: '(新)商品列表' }
      // },
      // {
      //   path: '/refundList',
      //   component: RefundList,
      //   meta: { title: '退款列表' }
      // },
      // {
      //   path: '/store',
      //   component: Store,
      //   meta: { title: '门店列表' }
      // },
      // {
      //   path: '/merchant',
      //   component: Merchant,
      //   meta: { title: '商户列表' }
      // },
      // {
      //   path: '/orders',
      //   component: Orders,
      //   meta: { title: '订单列表' }
      // },
      // {
      //   path: '/newOrders',
      //   component: NewOrders,
      //   meta: { title: '(新)订单列表' }
      // },
      // {
      //   path: '/orderPay',
      //   component: OrderPay,
      //   meta: { title: '交易记录' }
      // },


      {
        path: '/404',
        component: () => import(/* webpackChunkName: "404" */ '../views/home/comps/404.vue'),
        meta: { title: '404' }
      },
      {
        path: '/403',
        component: () => import(/* webpackChunkName: "403" */ '../views/home/comps/403.vue'),
        meta: { title: '403' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new Router({
  mode: 'history',
  routes
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  const role = localStorage.getItem('sj_bops_token');
  if (!role && to.path !== '/login') {
    next('/login');
  }
  else {
    next();
  }
});

export default router;
