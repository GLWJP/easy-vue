<template>
  <h1>Hello World</h1>
  <el-button type="primary">Click me</el-button>
  <el-button
    type="primary"
    @click="handleClick"
  >
    Click me
  </el-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert('Hello World')
  alert('You clicked me!')
}
</script>
