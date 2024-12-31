<template>
  <h1> Hello World </h1>
  <el-button type="primary" @click="handleClick">Click me</el-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert('Hello World')
}
</script>