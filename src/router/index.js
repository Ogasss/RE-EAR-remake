import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import TheLogin from '../pages/TheLogin.vue'
import Person from '../pages/Person.vue'
import PersonMessage from '../pages/PersonMessage.vue'
import PersonDynamic from '../pages/PersonDynamic.vue'
import ForgetPassword from '../pages/ForgetPassword.vue'
import ChangePassword from '../pages/ChangePassword.vue'
import ChangeTel from '../pages/ChangeTel.vue'
import ChangeEmail from '../pages/ChangeEmail.vue'

export default new VueRouter({
    routes:[
        {
            path:'/home',
            component: Home
        },
        {
            path:'/news',
            component: News
        },
        {
            path:'/login',
            component: TheLogin
        },
        {
            path:'/person',
            component: Person,
            children:[
                {
                    path:'message',
                    component:PersonMessage,
                },
                {
                    path:'dynamic',
                    component:PersonDynamic,
                },
                {
                    path:'forgetPassword',
                    component:ForgetPassword,
                },
                {
                    path:'changePassword',
                    component:ChangePassword,
                },
                {
                    path:'changeTel',
                    component:ChangeTel,
                },
                {
                    path:'changeEmail',
                    component:ChangeEmail
                }
            ]
        },
        {
            path:'/',
            redirect:'/home'
        }, 
    ]
})