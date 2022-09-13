<template>
  <!-- <router-view /> -->
  <n-message-provider>
    <Layout />
  </n-message-provider>
</template>
<script lang="ts" setup>
import { NMessageProvider } from "naive-ui";
import Layout from "./layout/index.vue";
import { useTodoStore } from "./store/todo";
import { onMounted } from "vue";
const todoStore = useTodoStore();

onMounted(() => {
  todoStore.initTodos();
});
</script>
<style lang="scss">
body {
  background: #fff;
}
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300&display=swap");
</style>
