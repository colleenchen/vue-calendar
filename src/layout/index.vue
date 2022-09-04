<template>
  <div class="layout">
    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { routes } from '@/router';
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
}

.layout-content {
  flex: 1;
  padding: 2rem;
  background: #fafafa;
}
</style>
