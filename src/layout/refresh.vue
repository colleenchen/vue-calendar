<!-- 空頁面，負責中轉到目標頁面 -->
<template>
    <div></div>
</template>
   
<script lang="ts" setup>
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
    router.back();
});

</script>
<style scoped>

</style>