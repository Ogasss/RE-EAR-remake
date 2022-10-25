import {loginApi} from '../api'

const state = {
    loginTel:{}
}

const actions = {
    async getLoginTel({commit},telPhone){
        const result = await loginApi(telPhone)
        commit('RECEIVE_LoginTel',result)
    }
}

const mutations = {
    RECEIVE_LoginTel(state,loginTel){
        state.loginTel = loginTel
    }
}

const getters = {

}

export default{
    state,
    mutations,
    actions,
    getters,
}