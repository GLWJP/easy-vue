<template>
  <el-config-provider :namespace="namespace">
    <hello-world />
  </el-config-provider>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
const namespace = import.meta.env.VITE_NAMESPACE;
</script>