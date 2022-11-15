<template>
  <div>
    <div>
      <div>进展</div>
      <div>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" />
        <div>{{ StatusStore.CurrentDurability }}</div>
      </div>
      <div>品质</div>
      <div>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" />
        <div>{{ StatusStore.CurrentCP }}</div>
      </div>
      <div>制作力</div>
      <div>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" />
        <div>{{ StatusStore.CurrentCP }}</div>
      </div>

      <div>耐久度:{{ StatusStore.CurrentDurability + "/" }}</div>
    </div>
    <div class="mt-10">
      <el-button v-if="!progressStore.start" @click="handleStart" type="primary"
        >开始制作</el-button
      >
      <el-button v-else @click="handleEnd">结束制作</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStatusStore } from "@/stores/status";
import { useProgressStore } from "@/stores/progress";
const progressStore = useProgressStore();
const StatusStore = useStatusStore();

function handleStart() {
  progressStore.handleStart();
}

function handleEnd() {
  progressStore.handleEnd();
}
</script>
