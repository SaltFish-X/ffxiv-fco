<template>
  <div v-show="progressStore.start" class="Statistics">
    <div>{{ recordTurn }}</div>
    <div>{{ rapidRecord[0] }}</div>
    <div>{{ rapidRecord[1] }}</div>
    <div v-show="statusStore.Current.InnerQuiet">{{ extraDurability }}</div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { useStatusStore } from '@/stores/status'

const progressStore = useProgressStore()
const statusStore = useStatusStore()

const recordTurn = computed(() => {
  return `制作总次数：${progressStore.count.allTurn}；制作成功次数：${
    progressStore.count.successTurn
  }；制作成功率：${Math.round(
    progressStore.count.allTurn
      ? (progressStore.count.successTurn * 100) / progressStore.count.allTurn
      : 0
  )}%`
})

const rapidRecord = computed(() => {
  return [
    `高速总数：${progressStore.count.rapidAll}；高速总成功数：${progressStore.count.rapidSuccess}；`,
    `本轮高速次数${progressStore.count.rapidAllTurn}；本轮高速成功次数${progressStore.count.rapidSuccessTurn}`,
  ]
})

const extraDurability = computed(() => {
  // 当前耐久 + 5*掌握层数 - 5*(10-内静层数) - 11
  const extra =
    statusStore.Current.CurrentDurability +
    5 * statusStore.Current.Buffs.Manipulation -
    5 * (10 - statusStore.Current.InnerQuiet) -
    11
  return `额外耐久：${extra}`
})
</script>
