import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'vue-router'
import layout from '@/layout'
NProgress.configure({
  showSpinner: false
})

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: layout,
      redirect: '/home/index',
      children: [{
        path: 'index',
        name: 'homeIndex',
        //首页
        component: () => import( /* webpackChunkName: "home" */ '@/views/home/index')
      }]
    },
    // 身份证 OCR
    {
      path: '/IDcardOCR',
      component: layout,
      redirect: '/IDcardOCR/index',
      children: [{
          path: 'index',
          name: 'IDcardOCRIndex',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/IDcardOCR/index')
        },
        {
          path: 'success',
          name: 'IDcardOCRSuccess',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/IDcardOCR/success')
        },
        {
          path: 'failure',
          name: 'IDcardOCRFailure',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/IDcardOCR/failure')
        }
      ]
    },
    // 银行卡 OCR
    {
      path: '/bankCardOCR',
      component: layout,
      redirect: '/bankCardOCR/index',
      children: [{
          path: 'index',
          name: 'bankCardOCRIndex',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/bankCardOCR/index')
        },
        {
          path: 'success',
          name: 'bankCardOCRSuccess',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/bankCardOCR/success')
        },
        {
          path: 'failure',
          name: 'bankCardOCRFaile',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/bankCardOCR/failure')
        }
      ]
    },
    // 运营商认证
    {
      path: '/operatorAuth',
      component: layout,
      redirect: '/operatorAuth/index',
      children: [{
          path: 'index',
          name: 'operatorAuthIndex',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/operatorAuth/index')
        },
        {
          path: 'result',
          name: 'operatorAuthResult',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/operatorAuth/result')
        }
      ]
    },
    // 人证对比
    {
      path: '/figureContrast',
      component: layout,
      redirect: '/figureContrast/index',
      children: [{
          path: 'index',
          name: 'figureContrastIndex',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/figureContrast/index')
        },
        {
          path: 'result',
          name: 'figureContrastResult',
          component: () => import( /* webpackChunkName: "repayment" */ '@/views/figureContrast/result')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router
