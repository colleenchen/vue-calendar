<template>
  <div class="calendar">
    <div class="calendar-operate">
      <div class="button-group">
        <button class="button" @click="changeMonth('prev')">
          <i class="icon ri-arrow-left-s-line"></i>
        </button>
        <button class="button" @click="changeMonth('next')">
          <i class="icon ri-arrow-right-s-line"></i>
        </button>
      </div>
      <div class="calendar-operate__title">{{ dateText }}</div>
      <button class="button" :disabled="isToday" @click="currentDate">
        <n-icon size="25">
          <home />
        </n-icon>
      </button>
    </div>
    <div class="calendar-header">
      <span v-for="(item, index) in weekMapZh" :key="index" class="calendar-header__item"
        :class="{ gray: index === 0 || index === 6 }">{{ item }}</span>
    </div>
    <div class="calendar-content" :data-month="date.getMonth() + 1">
      <div v-for="(item, index) in calendarTable" @click="
        getCurrDate(item.year, item.month, item.day);
      " :key="index" class="calendar-content__item"
        :class="[{ light: !item.isCurrentMonth }, { active: isActive(item) }]">
        {{ item.day }}
        <span class="hasTask" v-show="hasTask(item.year, item.month, item.day)"></span>
      </div>
    </div>
  </div>

  <n-drawer v-model:show=dialogStore.showTodoListDrawer :default-width="450" resizable>
    <n-drawer-content title="代辦事項" :native-scrollbar="false">
      <TaskEditor />
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts" setup>
import { NIcon, NDrawer, NDrawerContent } from "naive-ui";
import { ref, computed } from "vue";
import { weekMapZh, generateCalendar, CalendarItem, getDiffDate } from "./calendar";
import { isAllTrue } from "@/utils/common";
import { Home } from "@vicons/ionicons5";
import TaskEditor from "../Task/taskEditor.vue";
import { useDialogStore } from "../../store/dialog";
import { useTodoStore } from "../../store/todo";
import moment from "moment";
import { cloneDeep } from "lodash-es";

const dialogStore = useDialogStore();
const todoStore = useTodoStore();
const date = ref<Date>(new Date());
const todoList = ref(cloneDeep(todoStore.todoList) as any);


const calendarTable = computed(() => generateCalendar(date.value));
const dateText = computed(() => {
  return `${date.value.getFullYear()} 年 ${date.value.getMonth() + 1} 月`;
});

const hasTask = (year: number, month: number, day: number) => {
  let mm = (month + 1).toString().padStart(2, "0");
  let dd = day.toString().padStart(2, "0");
  let date = `${year}-${mm}-${dd}`;
  const results = todoList.value.filter((data: any) => {
    let start = moment(data.datetimerange[0]).format("YYYY-MM-DD");
    let end = moment(data.datetimerange[1]).format("YYYY-MM-DD");
    let all = getDiffDate(start, end);
    var allDate = all.map(function (item) {
      return item.toLowerCase().startsWith(date.toLowerCase());
    });
    return allDate.includes(true);
  });
  if (results.length !== 0) return true;
}

const dataCurr = ref("");
const getCurrDate = (year: number, month: number, day: number) => {
  dataCurr.value = `${year}-${month + 1}-${day}`;
  dialogStore.todoListDrawer();
  const dayCurr = day.toString().padStart(2, '0');
  const monthCurr = (month + 1).toString().padStart(2, '0');
  todoStore.currentDate = `${year}-${monthCurr}-${dayCurr}`;
  return `${year}-${monthCurr}-${day}`;
};

const isToday = computed(() => {
  const current = new Date();
  const validArr = [
    date.value.getFullYear() === current.getFullYear(),
    date.value.getMonth() === current.getMonth(),
    date.value.getDay() === current.getDay(),
  ];
  return isAllTrue(validArr);
});
/**
 * 當天日期高亮顯示, 兼容切換日期：
 * 年月日都要對上才能高亮
 * ps: 日曆可能會顯示下月/上月的同樣日期， 僅當月日期高亮
 */
const isActive = (item: CalendarItem) => {
  return isAllTrue([
    item.day === date.value.getDate(),
    item.isCurrentMonth,
    item.month === new Date().getMonth(),
    item.year === new Date().getFullYear(),
  ]);
};
// 切換到今天
const currentDate = () => {
  date.value = new Date();
};
// 切換月份, 上個月 or 下個月
const changeMonth = (type: "prev" | "next"): void => {
  let month = 0;
  let year = 1970;
  if (type === "prev") {
    month = date.value.getMonth() === 0 ? 11 : date.value.getMonth() - 1;
    year =
      month === 11 ? date.value.getFullYear() - 1 : date.value.getFullYear();
  } else {
    month = date.value.getMonth() === 11 ? 0 : date.value.getMonth() + 1;
    year =
      month === 0 ? date.value.getFullYear() + 1 : date.value.getFullYear();
  }
  // date.value.setDate(1);
  date.value.setMonth(month);
  date.value.setFullYear(year);
  date.value = new Date(date.value);
};



</script>
<style lang="scss" scoped>
$gap: 8px;
$sub-active-color: #dbf0ff;
$active-color: #0065ff;
$gray: #979797;
$gray1: #a1a1a1;
$gray2: #ebebeb;
$font: #414141;
$red: #ffd5d7;
$red1: #fa6261;

.calendar {
  min-width: 600px;
  border: 4px solid $gray2;
  padding: 2rem 3.5rem;
  border-radius: 50px;
  background-color: #fafafa;

}

.button {
  height: 32px;
  line-height: 48px;
  font-size: 12px;
  background: #fff;
  margin: 0;
  padding: 0 18px;
  border-radius: 20px;
  border: 1px solid $gray2;
  cursor: pointer;

  &:hover {
    color: $active-color;
  }

  &:active {
    background-color: rgba(0, 0, 0, 6%);
  }

  &:disabled {
    color: $gray;
    background-color: rgba(0, 0, 0, 6.5%);
    cursor: not-allowed;
  }
}

.button-group {
  .button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }

  .button:not(:first-child):not(:last-child) {
    border-radius: 0;
    border-left: 0;
  }
}

.icon {
  height: 100%;
  font-size: 24px;
  display: inline-flex;
  align-items: center;
}

.calendar-operate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba($gray, 0.15);
  position: relative;
  font-weight: 700;
  font-size: 2.3rem;

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 0 8px;
  }
}

.calendar-header {
  margin-top: 6px;
  padding: 8px 0 0;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  font-weight: 700;
  font-size: 1.5rem;

  &__item {
    flex: 1;
    text-align: center;
    border-radius: 1px;
    background-color: $gray2;
    border-radius: 40px;
    padding: 5px;
    margin: 5px;

    &.gray {
      color: $font;
      background-color: $red;
    }
  }
}

.calendar-content {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  position: relative;
  color: $font;
  font-weight: 700;
  font-size: 2rem;

  &::after {
    content: attr(data-month);
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10em;
    font-weight: bold;
    color: rgba($gray, 0.1);
    z-index: 1;
  }

  &__item {
    position: relative;
    height: 2.6em;
    flex: calc(14.2% - $gap);
    box-sizing: border-box;
    transition: all 0.2s ease;
    text-align: left;
    padding: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    margin-right: $gap;
    border-bottom: 4px solid $gray1;
    border-left: 4px solid $gray1;
    z-index: 10;

    &:nth-child(7n),
    &:nth-child(7n-6) {
      color: $red1;
    }

    &:nth-child(7n) {
      margin-right: 0;
    }

    &.active {
      color: $active-color;
      font-weight: bold;
      border-bottom: 4px solid $active-color;
      border-left: 4px solid $active-color;

      &:nth-child(7n),
      &:nth-child(7n-6) {
        color: $active-color;
      }
    }

    &:hover {
      background-color: rgba($red, 0.3);
      cursor: pointer;
    }

    &.light {
      color: rgba($gray, 0.4);
    }
  }

  .hasTask {
    position: absolute;
    right: 15px;
    bottom: 15px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: #5bc791;
  }
}
</style>
