<template>
  <!-- <div class="taskList">
    <n-button @click="goList" size="large" strong type="primary">代辦事項</n-button>
  </div> -->
  <div class="addList">
    <n-button strong secondary circle type="info" @click="dialogStore.showAddTodoModal = true">
      <template #icon>
        <n-icon size="45">
          <Add />
        </n-icon>
      </template>
    </n-button>
    <n-modal v-model:show="dialogStore.showAddTodoModal ">
      <n-card style="width: 550px" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header>
          <div class="modHead">
            <span>新增代辦事項</span>
            <n-button text @click="dialogStore.showAddTodoModal  = false">
              <template #icon>
                <n-icon size="30" color="#414141">
                  <CloseOutline />
                </n-icon>
              </template>
            </n-button>
          </div>
        </template>
        <div class="modCon">
          <formAddTask />
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NModal, NButton, NIcon } from "naive-ui";
import { Add, CloseOutline } from "@vicons/ionicons5";
import formAddTask from "../../components/Task/formAddTask.vue";
import { useDialogStore } from "../../store/dialog";
import router from "@/router";

const dialogStore = useDialogStore();


const goList = () => {
  router.push("/list");
};

const fatherFun = (n: number) => {
  console.log('父组件函数,接收到子组件的值为：', n)
}
</script>

<style lang="scss" scoped>
.taskList {
  position: fixed;
  right: 10.5rem;
  bottom: 3.2rem;
  z-index: 99;

  >button {
    width: 10rem;
    height: 3.3rem;
    border-radius: .5rem;
    font-size: 1.3rem;
  }
}

.addList {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;

  >button {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
    background-color: rgba(205, 228, 255, 0.95);
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
  padding: 10px 0;

}

.modFoot {
  text-align: right;

  button {
    margin-left: 10px;
  }
}
</style>