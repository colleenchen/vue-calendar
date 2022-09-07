<template>
  <n-form
    ref="formRef"
    :model="todo"
    :rules="rules"
    size="large"
    label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="時間" path="datetimeValue">
        <n-space vertical>
          <n-date-picker
            type="datetimerange"
            v-model:value="todo.datetimeRange"
          >
          </n-date-picker>
        </n-space>
      </n-form-item-gi>
    </n-grid>
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="標題" path="subject">
        <n-input v-model:value="todo.subject" placeholder="subject" />
      </n-form-item-gi>
    </n-grid>
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="摘要" path="description">
        <n-input
          v-model:value="todo.description"
          placeholder="description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item-gi>
    </n-grid>

    <div><n-button @click="addTodo">儲存任務</n-button></div>
  </n-form>
  <pre>{{ JSON.stringify(todo, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref } from "vue";
import {
  NSpace,
  NDatePicker,
  NForm,
  NGrid,
  NFormItemGi,
  NInput,
  FormInst,
  useMessage,
  NButton,
} from "naive-ui";

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const todoList = ref([{}]);
const todo = ref({
  subject: "",
  datetimeRange: 0,
  description: "",
});
const rules = {
  subject: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入標題",
  },
  datetimeRange: {
    required: true,
    trigger: ["blur", "change"],
    message: "请输入時間",
  },
  description: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入摘要",
  },
};

const methodSave = ref("new");

const addTodo = () => {
  const todos = {
    subject: todo.value.subject,
    datetimeRange: todo.value.datetimeRange,
    description: todo.value.datetimeRange,
    done: false,
  };

  todoList.value.push(todos);

  console.log("todoList.value", todoList.value);
  localStorage.todos = JSON.stringify(todoList.value);
};
</script>

<style lang="scss" scoped>
pre {
  margin-top: 20px;
}
</style>