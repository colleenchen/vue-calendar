<template>
  <n-form
    ref="formRef"
    :model="todoStore.todo"
    :rules="rules"
    size="large"
    label-placement="top"
  >
    <n-grid :gutter="[0, 24]" class="lab">
      <n-form-item-gi
        :span="24"
        label="時間"
        path="datetimerange"
      ></n-form-item-gi>
    </n-grid>
    <n-space vertical class="date">
      <n-date-picker
        size="large"
        type="datetimerange"
        v-model:value="todoStore.todo.datetimerange"
      >
      </n-date-picker>
    </n-space>
    <n-grid :gutter="[0, 24]">
      <n-form-item-gi :span="24" label="標題" path="subject">
        <n-input
          v-model:value="todoStore.todo.subject"
          placeholder="subject"
          clearable
        />
      </n-form-item-gi>
    </n-grid>
    <n-grid :gutter="[0, 24]">
      <n-form-item-gi :span="24" label="摘要" path="description">
        <n-input
          v-model:value="todoStore.todo.description"
          placeholder="description"
          type="textarea"
          clearable
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
          <n-button type="error" color="#ff575f" @click="handleValidateClick"
            >確定新增</n-button
          >
        </div>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import { useTodoStore } from "../../store/todo";

const todoStore = useTodoStore();
const message = useMessage();
const formRef = ref<FormInst | null>(null);

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
  todoStore.todo = cloneDeep(todoStore.initialTodo);
};

const handleValidateClick = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.info("新增成功");
      todoStore.addTodo();
    } else {
      console.log(errors);
    }
  });
};
</script>

<style lang="scss" scoped>
.lab {
  margin-bottom: -65px;
}

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