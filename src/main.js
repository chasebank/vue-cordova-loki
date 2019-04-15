import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import router from './router'
import './registerServiceWorker'

import mutations from "./store/mutations"

Vue.config.productionTip = false

import cordovaLoader from "./cordovaLoader"

import loki from "lokijs"
import LokiIndexedAdapter from "lokijs/src/loki-indexed-adapter.js"
import LokiCordovaFSAdapter from "./loki-cordova-fs-adapter.js"

cordovaLoader(() => {
  var fsAdapter = new LokiIndexedAdapter("HelloWorld");
  // var fsAdapter = new LokiCordovaFSAdapter({ prefix: "loki" });

  var db = new loki("products_db", {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 1500,
    adapter: fsAdapter
  })

  function databaseInitialize() {
    if (!db.getCollection("todos")) {
      db.addCollection("todos")
    }

    runProgramLogic();
  }

  function runProgramLogic() {
    let todos = db.getCollection("todos")

    Vue.use(Vuex)

    const state = {
      world: 'Earth',
      todos: todos.data,
    };

    const store = new Vuex.Store({
      state,
      mutations: {
        // non Loki related mutations
        ...mutations,

        // all mutations that interact with Loki
        createNewTodo(state, payload) {
          todos.insert({
            title: payload.title,
          })
        },
      }
    })

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})