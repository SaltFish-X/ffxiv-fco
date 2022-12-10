<template>
  <div class="mx-8 mt-4 HomeView">
    <div class="mb-4 HomeView-left">
      <Progress class="mb-4"></Progress>
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
<style>
@media screen and (min-width: 736px) {
  .HomeView {
    display: flex;
  }

  .HomeView-left {
    width: 50%;
    margin: 20px;
  }
}
</style>
