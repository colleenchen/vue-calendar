<template>
  <n-form
    ref="formRef"
    :model="todo"
    :rules="rules"
    size="large"
    label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="時間" path="datetimerange">
        <n-space vertical>
          <n-date-picker
            type="datetimerange"
            v-model:value="todo.datetimerange"
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

    <div>
      <n-button @click="resetForm">清除表單</n-button>
      <n-button @click="handleValidateClick">儲存任務</n-button>
    </div>
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

const todo = ref(cloneDeep(initialTodo));
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
      console.log("新增成功");
      addTodo();
    } else {
      console.log(errors);
    }
  });
};

const methodSave = ref("new");

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
pre {
  margin-top: 20px;
}
</style>