<template>
  <div class="mx-8 mt-4 HomeView">
    <div class="mb-4 mr-12 flex-1">
      <Progress></Progress>
      <Action class="flex-1"></Action>
    </div>

    <Setting class="flex-1"></Setting>
    <Statistics class="flex-1"></Statistics>
  </div>
</template>
<script lang="ts" setup>
import Progress from '@/components/Progress.vue'
import Setting from '@/components/Setting.vue'
import Action from '@/components/Action.vue'
import Statistics from '@/components/Statistics.vue'
</script>
<style>
.HomeView {
  font-size: 14px;
}

@media screen and (min-width: 736px) {
  .HomeView {
    display: flex;
  }
}

@media screen and (max-width: 736px) {
  .HomeView {
    font-size: 12px;
  }
}
</style>
