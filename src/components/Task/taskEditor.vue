<template>
  <n-space vertical class="search">
    <n-input-group>
      <n-input type="text" size="large" v-model:value="searchInput" placeholder="Search..." @keyup="filteredList()" />
      <Close class="icon-close" @click="clearSearch" />
    </n-input-group>
  </n-space>
  <div class="noTodo" v-if="todoStore.searchList.length === 0 && searchInput===''">
    <div class="btn" @click="noData()">
      <Duplicate class="icon-duplicate" />
      <div>尚無資料 火速新增</div>
    </div>
  </div>
  <div class="todoList" v-for="(item, index) in todoStore.searchList" :key="index">
    <div class="time">
      <n-time :time="item.datetimerange[0]" type="datetime" /> ~
      <n-time :time="item.datetimerange[1]" type="datetime" />
    </div>
    <div class="subject">{{ item.subject }}</div>
    <div class="description">{{ item.description }}</div>
    <n-space class="btn-box">
      <n-button @click="remove(item,item.index)">刪除</n-button>
      <n-button type="primary" @click="edit(item.index)">編輯</n-button>
    </n-space>
  </div>
  <div class="seachNull" v-if="todoStore.searchList.length === 0 && searchInput!==''">
    <FileTray class="icon-fileTray" />
    <div>搜尋無資料</div>
  </div>
  <n-modal v-model:show="showModal" preset="dialog" title="確定刪除?" content="確定刪除嗎?刪除的資料無法回復!!" positive-text="確定"
    negative-text="再考慮一下" @positive-click="confirmRemoveTask" @negative-click="cancelCallback" />

  <!--編輯彈窗-->
  <n-modal v-model:show="showEditModal">
    <n-card style="width: 550px" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header>
        <div class="modHead">
          <span>編輯代辦事項</span>
          <n-button text @click="clearEdit">
            <template #icon>
              <n-icon size="30" color="#414141">
                <CloseOutline />
              </n-icon>
            </template>
          </n-button>
        </div>
      </template>
      <div class="modCon">
        <n-form ref="formRef" :model="todoStore.searchList[editIndex]" :rules="rules" size="large"
          label-placement="top">
          <n-grid :gutter="[0, 24]" class="lab">
            <n-form-item-gi :span="24" label="時間" path="datetimerange"></n-form-item-gi>
          </n-grid>
          <n-space vertical class="date">
            <n-date-picker size="large" type="datetimerange"
              v-model:value="todoStore.searchList[editIndex].datetimerange">
            </n-date-picker>
          </n-space>
          <n-grid :gutter="[0, 24]">
            <n-form-item-gi :span="24" label="標題" path="subject">
              <n-input v-model:value="todoStore.searchList[editIndex].subject" placeholder="subject" clearable />
            </n-form-item-gi>
          </n-grid>
          <n-grid :gutter="[0, 24]">
            <n-form-item-gi :span="24" label="摘要" path="description">
              <n-input v-model:value="todoStore.searchList[editIndex].description" placeholder="description"
                type="textarea" clearable :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }" />
            </n-form-item-gi>
          </n-grid>
          <n-grid :gutter="[0, 24]">
            <n-form-item-gi :span="24">
              <div class="btn-box">
                <n-button @click="clearEdit">取消</n-button>
                <n-button type="error" @click="handleValidateClick">確定修改</n-button>
              </div>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { useTodoStore } from "../../store/todo";
import { useDialogStore } from "../../store/dialog";
import {
  NTime,
  NSpace,
  NButton,
  useMessage,
  NModal,
  NIcon,
  NCard,
  FormInst,
  FormItemRule,
  NForm,
  NGrid,
  NFormItemGi,
  NInput,
  NDatePicker,
  NInputGroup,
} from "naive-ui";
import { CloseOutline, Close, FileTray, Duplicate } from "@vicons/ionicons5";
import { ref, onMounted } from "vue";
import moment from "moment";
import router from "@/router";
import { getDiffDate } from "../calendar/calendar";

const message = useMessage();
const todoStore = useTodoStore();
const dialogStore = useDialogStore();
const taskSelected = ref([] as any);
const formRef = ref<FormInst | null>(null);
const showModal = ref(false);
const showEditModal = ref(false);
const editIndex = ref(0);
let searchInput = ref(todoStore.currentDate);

const filteredList = () => {
  todoStore.searchList = todoStore.todoList;
  if (searchInput.value != '') {
    const results = todoStore.searchList.filter((data: any) => {
      let start = moment(data.datetimerange[0]).format("YYYY-MM-DD HH:mm:ss");
      let end = moment(data.datetimerange[1]).format("YYYY-MM-DD HH:mm:ss");
      let all = getDiffDate(start, end);
      var allDate = all.map(function (item) {
        return item.toLowerCase().startsWith(searchInput.value.toLowerCase());
      });
      return data.subject.toLowerCase().startsWith(searchInput.value.toLowerCase())
        || data.description.toLowerCase().startsWith(searchInput.value.toLowerCase())
        || allDate.includes(true)
    });
    todoStore.searchList = results;
  } else {
    todoStore.searchList = todoStore.todoList;
  }
}

const edit = (index: number) => {
  editIndex.value = index;
  showEditModal.value = true;
};

const remove = (task: any, index: number) => {
  taskSelected.value = task;
  taskSelected.value.index = index;
  showModal.value = true;
};

const confirmRemoveTask = () => {
  todoStore.todoList.splice(taskSelected.value.index, 1);
  message.success("刪除成功");
  localStorage.setItem("todoList", JSON.stringify(todoStore.todoList));
  todoStore.searchList = todoStore.todoList;
  filteredList();
  showModal.value = false;
  router.push('/refresh');
};

const cancelCallback = () => {
  message.success("取消");
  showModal.value = false;
};

const saveTask = () => {
  localStorage.setItem("todoList", JSON.stringify(todoStore.todoList));
  todoStore.searchList = todoStore.todoList;
  filteredList();
  showEditModal.value = false;
  router.push('/refresh');
};

const clearEdit = () => {
  showEditModal.value = false;
  todoStore.initTodos();
  router.push('/refresh');
};

const noData = () => {
  dialogStore.showAddTodoModal = true;
  todoStore.firstData = true;
}

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

const handleValidateClick = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.info("修改成功");
      saveTask();
    } else {
      console.log(errors);
    }
  });
};

const clearSearch = () => {
  searchInput.value = '';
  todoStore.currentDate = '';
  filteredList();
}

onMounted(() => {
  todoStore.addIndex();
  filteredList();
});


</script>

<style lang="scss" scoped>
$gray2: #ebebeb;

.todoList {
  font-family: Noto Sans SC;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 4px solid $gray2;
  padding: 1.2rem 2rem;
  border-radius: 20px;
  background-color: #fafafa;
  box-shadow: 5px 5px 0px $gray2;
  color: rgb(199, 199, 199);

  .time {
    display: flex;
    margin-bottom: 5px;
    border-bottom: 2px dashed $gray2;
    margin-top: -0.5rem;
    padding-bottom: 3px;

    >time {
      margin: 0 5px;

      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .subject {
    font-size: 1.2rem;
    color: #76bdcd;
  }

  .description {
    margin-top: 5px;
    border-top: 2px dashed $gray2;
    padding-top: 5px;
  }

  .btn-box {
    margin-top: 10px;
    justify-content: flex-end !important;
  }
}

.n-card {
  min-height: 50vh;
  border-radius: 20px;
  font-family: Noto Sans SC;
}

.modHead {
  display: flex;

  >span {
    flex: 1;
  }

  >button {
    width: 30px;
  }
}

.modCon {
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
}

.n-input {
  padding-right: 40px;
}

.search {
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;

  .icon-close {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 25px;
    color: #ccc;
    cursor: pointer;
  }
}

.noTodo {
  padding: 20px;
  text-align: center;
  color: #ccc;
  cursor: pointer;

  .btn {
    display: inline-block;
    padding: 20px;
    color: #6dc59c;
    opacity: .6;

    &:hover {
      opacity: 1;
    }
  }

  .icon-duplicate {
    width: 40px
  }
}

.seachNull {
  padding: 20px;
  text-align: center;
  color: #ccc;

  .icon-fileTray {
    width: 40px;
  }
}
</style>