import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    loginAndRegisterFlag: true
}
const actions = {
    lARFchange(context){
        context.commit('LARFChange')
    }
}
const mutations = {
    LARFChange(){
        state.loginAndRegisterFlag = !state.loginAndRegisterFlag
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})