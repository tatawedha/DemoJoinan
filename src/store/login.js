// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
// import { setToken, removeToken } from './utils/auth'
// import { ipBackend } from "@/ipBackend";

// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         isLoggedIn: false,
//         isRole:null
//     },
//     mutations: {
//         set_user(state,role) {
//             state.isLoggedIn = true
//             state.isRole = role
//         },
//         reset_user(state) {
//             state.isLoggedIn = false
//             state.isRole = null
//         }
//     },
//     getters: {
//         isLoggedIn(state){
//             return state.isLoggedIn
//         },
//         isRole(state){
//             return state.isRole
//         }
//     },
//     actions: {
//         login({ dispatch, commit }, data) {
//             axios.post(ipBackend + '/user/login', data)
//             .then(res => {
//                 const token = res.data.token
//                 localStorage.setItem('token',token)
//                 setToken(token)
//                 dispatch('get_user')
//             })
//             .catch(err => {
//                 commit('reset_user')
//                 localStorage.removeItem('token')
//                 console.log(err)
//             })
//         },
//         async get_user({ commit }) {
//             if(!localStorage.getItem('token')){
//                 return
//             }
//             try{
//                 let response = await axios.get(ipBackend + '/user/profile')
//                 console.log(response.data.data.role)
//                 commit('set_user', response.data.data.role)
//             }catch(error){
//                 commit('reset_user')
//                 removeToken()
//                 localStorage.removeItem('token')
//                 return error
//             }
//         },
//         logout( {commit} ) {
//             commit('reset_user')
//             localStorage.removeItem('token')
//             removeToken()
//         }
//     },
    
// })