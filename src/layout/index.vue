<template>
  <Setting></Setting>
  <div class="layout">
    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { routes } from "@/router";
import Setting from "./Setting/index.vue";
</script>
<style lang="scss">
.layout {
  display: flex;
}

.layout-content {
  flex: 1;
  padding: 1.5rem;
  background: #fafafa;
}
</style>
