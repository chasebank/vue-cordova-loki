<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h2>Hello {{ world }}</h2>
    <button @click="changeWorld('Mars')">Change World</button>

    <pre>
      {{ todos }}
    </pre>

    <label for="">
      <span>New Todo</span>
      <input type="text" v-model.trim="newTodoValue">
    </label>

    <button @click="submitNewTodo">Submit new Todo</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'home',

  data: () => ({
    newTodoValue: ''
  }),

  computed: {
    ...mapState([
      "world",
      "todos"
    ])
  },

  methods: {
    ...mapMutations([
      "changeWorld",
      "createNewTodo",
    ]),

    submitNewTodo() {
      if (this.newTodoValue) {
        this.createNewTodo(this.newTodoValue)

        this.newTodoValue = ''
      }
    }
  }
}
</script>