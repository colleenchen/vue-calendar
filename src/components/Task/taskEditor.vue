<template>
  <div class="todoList" v-for="(item, index) in todoStore.todoList" :key="index">
    <div class="time">
      <n-time :time="item.datetimerange[0]" format="yyyy-MM-dd hh:mm:ss" /> ~
      <n-time :time="item.datetimerange[1]" format="yyyy-MM-dd hh:mm:ss" />
    </div>
    <div class="subject">標題：{{ item.subject }}</div>
    <div class="description">描述：{{ item.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "../../store/todo";
import { NTime } from "naive-ui";

const todoStore = useTodoStore();

</script>

<style lang="scss" scoped>
$gray2: #ebebeb;

.todoList {
  font-family: Noto Sans SC;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 4px solid $gray2;
  padding: 1rem;
  border-radius: 20px;
  background-color: #fafafa;
  box-shadow: 5px 5px 0px $gray2;

  .time {
    display: flex;
    margin-bottom: 5px;

    >time {
      margin: 0 5px;
    }
  }

}
</style>