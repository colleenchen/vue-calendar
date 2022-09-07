import { ref } from "vue";
import { defineStore } from "pinia";

export const counterStore = defineStore("todo", {
  state: () => {
    return {
      todos: [],
    };
  },
  actions: {
    initTodos() {
      localStorage.todos = localStorage.todos || "[]";
      this.todos = JSON.parse(localStorage.todos);
    },

    addTodo(todoInfo: any) {
      const todo = {
        datetimeRange: todoInfo.datetimeRange,
        subject: todoInfo.subject,
        description: todoInfo.description,
        done: false,
      };

      // this.todos.push(todo);
      localStorage.todos = JSON.stringify(this.todos);
    },
  },
});
