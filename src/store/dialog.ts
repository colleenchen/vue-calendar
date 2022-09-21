import { ref } from "vue";
import { defineStore } from "pinia";
import { useTodoStore } from "./todo";
export const useDialogStore = defineStore("dialog", () => {
  const todoStore = useTodoStore();
  //彈窗-新增代辦事項
  const showAddTodoModal = ref(false);
  //滑動抽屜-代辦清單列表
  const showTodoListDrawer = ref(false);

  const todoListDrawer = () => { 
    if (todoStore.currentDate !== '') {
      todoStore.searchList = todoStore.todoList;
    }
    showTodoListDrawer.value = true;
  }
  return { showAddTodoModal, showTodoListDrawer,todoListDrawer};
});
