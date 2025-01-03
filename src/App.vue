<template>
  <el-config-provider :namespace="namespace">
    <hello-world />
  </el-config-provider>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { getUserInfoApi } from '@/api/modules/user.ts'

const namespace = import.meta.env.VITE_NAMESPACE

onMounted(async () => {
  const promiseAll = Promise.all([
    getUserInfoApi({ isLogin: true }).then((res) => {
      console.log('first', res)
    }).catch((err) => {
      console.log('first err', err)
    }),
    getUserInfoApi({ isLogin: true })
      .then((res) => {
        console.log('second', res)
      })
      .catch((err) => {
        console.log('second err', err)
      }),
  ])

  promiseAll.then(() => {
    console.log('all done')
  })
})
</script>
