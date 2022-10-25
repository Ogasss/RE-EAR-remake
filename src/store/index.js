import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './login'

const state = {
    loginAndRegisterChoice: true,
    logined: false,

    NewAlertTitle:'',
    NewAlertContent:'主体提示信息',
    NewAlertBtnS:false,
    NewAlertShowFlag:false,
    NewAlertShowFlagInPerson:false,
    NewAlertF5Flag:false,
}

const actions = {
}

const mutations = {
}

const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        login
    }
})