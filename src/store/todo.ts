import { ref } from "vue";
import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import router from "@/router";

export const useTodoStore = defineStore("todo", () => {
  const currentDate = ref("");
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const initialTodo = {
    subject: "",
    datetimerange: [todayStart.valueOf(), Date.now()],
    description: "",
    done: false,
  };
  const todoList = ref([initialTodo]);
  const todo = ref({ ...initialTodo });

  const resetForm = () => {
    todo.value = cloneDeep(initialTodo);
  };

  const initTodos = () => {
    localStorage.todoList = localStorage.todoList || "[]";
    todoList.value = JSON.parse(localStorage.todoList);
    console.log("initTodos", todoList.value);
  };

  const addTodo = () => {
    const todos = {
      subject: todo.value.subject,
      datetimerange: todo.value.datetimerange,
      description: todo.value.description,
      done: false,
    };
    todoList.value.push(todos);
    localStorage.todoList = JSON.stringify(todoList.value);
    resetForm();
    router.push('/refresh');
  };

  return {
    todoList,
    initialTodo,
    todo,
    initTodos,
    resetForm,
    addTodo,
    currentDate,
  };
});
