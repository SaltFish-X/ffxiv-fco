<template>
  <div class="mx-8 mt-4 HomeView">
    <div class="mb-4 flex-1">
      <Progress class="mb-4"></Progress>
      <Action></Action>
    </div>

    <Setting class="flex-1"></Setting>
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
}

@media screen and (max-width: 736px) {
  .HomeView {
    font-size: 12px;
  }
}
</style>
