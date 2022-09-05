<template>
  <div>課表</div>
  <span
    v-for="(item, index) in weekMapZh"
    :key="index"
    class="calendar-header__item"
    :class="{ gray: index === 0 || index === 6 }"
    >{{ item }}</span
  >
  <div>
    <div id="coursesTable"></div>
  </div>
</template>

<script setup lang="ts">
import { weekMapZh } from "../calendar/calendar";

const curriculum = {};
</script>

<style>
</style>