<template>
  <n-form
    ref="formRef"
    :model="todo"
    :rules="rules"
    size="large"
    label-placement="top"
  >
    <n-space vertical class="date">
      <n-date-picker type="datetimerange" v-model:value="todo.datetimerange">
      </n-date-picker>
    </n-space>
    <n-grid :gutter="[0, 24]">
      <n-form-item-gi :span="24" label="標題" path="subject">
        <n-input v-model:value="todo.subject" placeholder="subject" />
      </n-form-item-gi>
    </n-grid>
    <n-grid :gutter="[0, 24]">
      <n-form-item-gi :span="24" label="摘要" path="description">
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
    <n-grid :gutter="[0, 24]">
      <n-form-item-gi :span="24">
        <div class="btn-box">
          <n-button @click="resetForm">清除表單</n-button>
          <n-button type="error" @click="handleValidateClick"
            >確定新增</n-button
          >
        </div>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import {
  NSpace,
  NDatePicker,
  NForm,
  NGrid,
  NFormItemGi,
  NInput,
  FormInst,
  FormItemRule,
  useMessage,
  NButton,
} from "naive-ui";
import { cloneDeep } from "lodash-es";

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const todoList = ref([{}]);

const initialTodo = {
  subject: "",
  datetimerange: null,
  description: "",
};

const todo = ref({ ...initialTodo });
const rules = {
  subject: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入標題",
  },
  datetimerange: {
    required: true,
    trigger: ["blur", "change"],
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        if (value === null) {
          reject(Error("尚未輸入日期時間")); // reject with error message
        } else {
          resolve();
        }
      });
    },
  },
  description: {
    required: false,
    trigger: ["blur", "input"],
    message: "请输入摘要",
  },
};

const resetForm = () => {
  todo.value = cloneDeep(initialTodo);
};

const handleValidateClick = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.info("新增成功");
      addTodo();
    } else {
      console.log(errors);
    }
  });
};

onMounted(() => {
  initTodos();
});

const initTodos = () => {
  localStorage.todoList = localStorage.todoList || "[]";
  todoList.value = JSON.parse(localStorage.todoList);
  console.log("initTodos", todoList.value);
};

const addTodo = () => {
  const todos = {
    subject: todo.value.subject,
    datetimerange: todo.value.datetimerange,
    description: todo.value.description,
    done: false,
  };
  todoList.value.push(todos);
  localStorage.todoList = JSON.stringify(todoList.value);
  console.log("todoList.value", todoList.value);
};
</script>

<style lang="scss" scoped>
.date {
  margin-bottom: 20px;
}
.btn-box {
  width: 100%;
  text-align: right;
  button {
    margin-left: 15px;
  }
}
</style>