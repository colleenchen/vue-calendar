<template>
  <div v-for="(task, index) in todoList" :key="index">
    <div>{{ task.subject }}</div>
    <div>{{ task.datetimerange }}</div>
    <div>{{ task.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
const todoList = ref([{}]);
onMounted(() => {
  initTodos();
});

const initTodos = () => {
  const initTodos = localStorage.getItem("todoList");
  todoList.value = initTodos ? JSON.parse(initTodos) : [];
  console.log(todoList);
};
</script>

<style>
</style>