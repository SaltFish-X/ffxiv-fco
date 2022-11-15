<template>
  <div class="flex m-10">
    <div class="w-1/2">
      <Progress class="mb-10"></Progress>
      <Action></Action>
    </div>
    <Setting></Setting>
  </div>
</template>
<script lang="ts" setup>
import Progress from "@/components/Progress.vue";
import Setting from "@/components/Setting.vue";
import Action from "@/components/Action.vue";
</script>
