<template>
  <div class="todoList" v-for="(item, index) in todoStore.todoList" :key="index">
    <div class="time">
      <n-time :time="item.datetimerange[0]" format="yyyy-MM-dd hh:mm" /> ~
      <n-time :time="item.datetimerange[1]" format="yyyy-MM-dd hh:mm" />
    </div>
    <div class="subject">{{ item.subject }}</div>
    <div class="description">{{ item.description }}</div>
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
  padding: 1.2rem 2rem;
  border-radius: 20px;
  background-color: #fafafa;
  box-shadow: 5px 5px 0px $gray2;
  color: rgb(199, 199, 199);

  .time {
    display: flex;
    margin-bottom: 5px;
    border-bottom: 2px dashed $gray2;
    margin-top: -.5rem;
    padding-bottom: 3px;


    >time {
      margin: 0 5px;

      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .subject {
    font-size: 1.2rem;
    color: #76bdcd
  }

  .description {
    margin-top: 5px;
    border-top: 2px dashed $gray2;

    padding-top: 5px;
  }

}
</style>