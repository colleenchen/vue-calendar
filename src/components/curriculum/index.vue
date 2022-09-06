<template>
  <div class="curriculum-header">
    <span class="curriculum-header__item">時間</span>
  </div>
  <div class="curriculum-box">
    <div class="curriculum-time">
      <span v-for="(item, index) in classTime" :key="index">{{ item }} </span>
    </div>
    <div class="curriculum-con">
      <div>
        <span v-for="(item, index) in lessonsName" :key="index"
          >{{ item }}
        </span>
      </div>
      <div>
        <span v-for="(item, index) in lessonsAddress" :key="index"
          >{{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { weekMapZh } from "../calendar/calendar";
import { ref } from "vue";
import moment from "moment";
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

const lessonsName = ref([""]);
const lessonsAddress = ref([""]);
//當日課程
const filterDateItems = (date: any) => {
  const dateA = date || "2022-09-20";
  curriculum.filter(function (item, index) {
    if (item.date === dateA) {
      const name = item.info.map((x) => x.lessonsName);
      const address = item.info.map((x) => x.lessonsAddress);
      lessonsName.value = name;
      lessonsAddress.value = address;
    }
  });
};

filterDateItems("2022-09-20");
//當天
const getCurrentDay = () => {
  let date = [];
  let start = moment().format("YYYY-MM-DD 00:00:00");
  let end = moment().format("YYYY-MM-DD HH:mm:ss");
  date.push(start);
  date.push(end);
  console.log("今日", date);
  return date;
};

//取得周日期
const getCurrWeekDays = (dateCurr?: any) => {
  let currDate = dateCurr || "";
  let date = [];
  let weekOfday = parseInt(moment(currDate).format("d")); // 计算今天是这周第几天 周日为一周中的第一天
  let start = moment(currDate)
    .subtract(weekOfday, "days")
    .format("YYYY-MM-DD 00:00:00"); // 周一日期
  let end = moment(currDate)
    .add(7 - weekOfday - 1, "days")
    .format("YYYY-MM-DD 23:59:59"); // 周日日期
  date.push(start);
  date.push(end);
  console.log("本周", date);
  return date;
};
getCurrentDay();
getCurrWeekDays("2022-09-13");
</script>

<style lang="scss" scoped>
.curriculum-header {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  font-size: 1rem;
  .curriculum-header__item {
    flex: 1;
  }
}
.curriculum-box {
  display: flex;
  font-size: 1rem;
  .curriculum-time {
    text-align: center;
    span {
      display: block;
    }
    flex: 2;
  }
  .curriculum-con {
    display: flex;
    flex: 2;
    flex-direction: column;
  }
}
</style>