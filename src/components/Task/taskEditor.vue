<template>
  <div v-for="(item, index) in todoStore.todoList" :key="index">
    <div>{{ item.subject }}</div>
    <div>{{ item.datetimerange }}</div>
    <div>{{ item.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent,  ref, onMounted } from "vue";
import { useTodoStore } from "../../store/todo";

const todoStore = useTodoStore();

</script>

<style>
</style>