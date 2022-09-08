<template>
  <div class="setting">
    <n-button strong secondary circle type="info" @click="showModal = true">
      <template #icon>
        <n-icon size="35"><Add /></n-icon>
      </template>
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 550px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header>
          <div class="modHead">
            <span>新增代辦事項</span>
            <n-button text @click="showModal = false">
              <template #icon>
                <n-icon size="30" color="#414141"><CloseOutline /></n-icon>
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
import router from "@/router";
const showModal = ref(false);

const goList = () => {
  router.push("/list");
};
</script>

<style lang="scss" scoped>
.setting {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;
  > button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgba(205, 228, 255, 0.95);
  }
}
.n-card {
  min-height: 50vh;
  border-radius: 20px;
}
.modHead {
  display: flex;
  > span {
    flex: 1;
  }
  > button {
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