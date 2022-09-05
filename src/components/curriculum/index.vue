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
const classTime = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
];

const curriculum = [
  {
    date: "2022-09-18",
    info: [
      { timeId: 0, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 1, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 2, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 3, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 4, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 5, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 6, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 7, lessonsName: "-", lessonsAddress: "-" },
    ],
  },
  {
    date: "2022-09-19",
    info: [
      { timeId: 0, lessonsName: "數學", lessonsAddress: "101" },
      { timeId: 1, lessonsName: "數學", lessonsAddress: "101" },
      { timeId: 2, lessonsName: "國文", lessonsAddress: "201" },
      { timeId: 3, lessonsName: "國文", lessonsAddress: "201" },
      { timeId: 4, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 5, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 6, lessonsName: "地球科學", lessonsAddress: "304" },
      { timeId: 7, lessonsName: "地球科學", lessonsAddress: "304" },
    ],
  },
  {
    date: "2022-09-20",
    info: [
      { timeId: 0, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 1, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 2, lessonsName: "美術", lessonsAddress: "503" },
      { timeId: 3, lessonsName: "美術", lessonsAddress: "503" },
      { timeId: 4, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 5, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 6, lessonsName: "英文", lessonsAddress: "222" },
      { timeId: 7, lessonsName: "英文", lessonsAddress: "222" },
    ],
  },
  {
    date: "2022-09-21",
    info: [
      { timeId: 0, lessonsName: "化學", lessonsAddress: "101" },
      { timeId: 1, lessonsName: "化學", lessonsAddress: "101" },
      { timeId: 2, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 3, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 4, lessonsName: "體育", lessonsAddress: "E101" },
      { timeId: 5, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 6, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 7, lessonsName: "-", lessonsAddress: "-" },
    ],
  },
  {
    date: "2022-09-22",
    info: [
      { timeId: 0, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 1, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 2, lessonsName: "程式設計", lessonsAddress: "404" },
      { timeId: 3, lessonsName: "程式設計", lessonsAddress: "404" },
      { timeId: 4, lessonsName: "物理", lessonsAddress: "101" },
      { timeId: 5, lessonsName: "物理", lessonsAddress: "101" },
      { timeId: 6, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 7, lessonsName: "-", lessonsAddress: "-" },
    ],
  },
  {
    date: "2022-09-23",
    info: [
      { timeId: 0, lessonsName: "數學", lessonsAddress: "101" },
      { timeId: 1, lessonsName: "數學", lessonsAddress: "101" },
      { timeId: 2, lessonsName: "國文", lessonsAddress: "201" },
      { timeId: 3, lessonsName: "國文", lessonsAddress: "201" },
      { timeId: 4, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 5, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 6, lessonsName: "地球科學", lessonsAddress: "304" },
      { timeId: 7, lessonsName: "地球科學", lessonsAddress: "304" },
    ],
  },
  {
    date: "2022-09-24",
    info: [
      { timeId: 0, lessonsName: "計算機概論", lessonsAddress: "222" },
      { timeId: 1, lessonsName: "計算機概論", lessonsAddress: "222" },
      { timeId: 2, lessonsName: "地理", lessonsAddress: "304" },
      { timeId: 3, lessonsName: "地理", lessonsAddress: "304" },
      { timeId: 4, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 5, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 6, lessonsName: "-", lessonsAddress: "-" },
      { timeId: 7, lessonsName: "-", lessonsAddress: "-" },
    ],
  },
];
</script>

<style>
</style>