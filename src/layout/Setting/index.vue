<template>
  <div class="setting">
    <n-button strong secondary circle type="info" @click="showModal = true">
      <template #icon>
        <n-icon size="35"><Settings /></n-icon>
      </template>
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header>
          <div class="modHead">
            <span>設定課表</span>
            <n-button text @click="showModal = false">
              <template #icon>
                <n-icon size="30" color="#414141"><CloseOutline /></n-icon>
              </template>
            </n-button>
          </div>
        </template>
        <div class="modCon">123
            
        </div>
        <template #footer>
          <div class="modFoot">
            <n-button type="tertiary" @click="showModal = false">取消</n-button>
            <n-button type="primary">確認</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NModal, NButton, NIcon } from "naive-ui";
import { Settings, CloseOutline } from "@vicons/ionicons5";
const showModal = ref(false);
</script>

<style lang="scss" scoped>
.setting {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 99;
  > button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
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