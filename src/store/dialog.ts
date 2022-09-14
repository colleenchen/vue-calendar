import { ref } from "vue";
import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", () => {
  //彈窗-新增代辦事項
  const showAddTodoModal = ref(false);
  //滑動抽屜-代辦清單列表
  const showTodoListDrawer = ref(false);

  return { showAddTodoModal, showTodoListDrawer };
});
