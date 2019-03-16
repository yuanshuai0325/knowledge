import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var request = axios.create({
  baseURL: '/api/knowdb',
  timeout: 10000
})

function getall () {
  return request({
    method: 'get',
    url: '/answer'
  })
};

function submit (data) {
  return request({
    method: 'post',
    url: '/edit',
    data: data,
    transformRequest: [
      function (data) {
        let params = ''
        for (let key in data) {
          params += key + '=' + data[key] + '&'
        }
        return params
      }
    ]
  })
};

const SET_NAME = 'SET_NAME'
const SET_ANSWER = 'SET_ANSWER'

const state = {
  name: '',
  answer: ''
}

const mutations = {
  [ SET_NAME ] (state, data) {
    state.name = data
  },
  [ SET_ANSWER ] (state, data) {
    state.answer = data
  }
}

const getters = {
  name (state) {
    return state.name
  },
  answer (state) {
    return state.answer
  }
}

const actions = {
  Submit ({ commit }, data) {
    return new Promise((resolve, reject) => {
      submit(data).then(resp => {
        let pd = resp.data.exec
        if (pd === 'true') {
          resolve(resp.data.ret)
        } else {
          reject(resp.data.ret)
        }
      }).catch(err => {
        reject(err.data.ret)
      })
    })
  },

  Getall ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getall().then(resp => {
        let pd = resp.data.exec
        if (pd === 'true') {
          commit(SET_NAME, resp.data.ret.name)
          commit(SET_ANSWER, resp.data.ret.answer)
          resolve('执行成功')
        } else {
          reject(resp.data.ret)
        }
      }).catch(err => {
        reject(err.data.ret)
      })
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
