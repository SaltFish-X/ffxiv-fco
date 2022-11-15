<template>
  <div class="Progress">
    <div>
      <div>
        进展
        {{
          StatusStore.Current.CurrentProgress +
          "/" +
          StatusStore.Setting.TotalProgress
        }}
      </div>
      <div>
        <el-progress
          :show-text="false"
          :stroke-width="24"
          :percentage="
            (StatusStore.Current.CurrentProgress /
              StatusStore.Setting.TotalProgress) *
            100
          "
        />
      </div>
      <div>
        品质
        {{
          StatusStore.Current.CurrentQuality +
          "/" +
          StatusStore.Setting.TotalQuality
        }}
      </div>
      <div>
        <el-progress
          :show-text="false"
          :stroke-width="24"
          :percentage="
            (StatusStore.Current.CurrentQuality /
              StatusStore.Setting.TotalQuality) *
            100
          "
        />
      </div>
      <div>
        制作力
        {{ StatusStore.Current.CurrentCP + "/" + StatusStore.Setting.TotalCP }}
      </div>
      <div>
        <el-progress
          :show-text="false"
          :stroke-width="24"
          :percentage="
            (StatusStore.Current.CurrentCP / StatusStore.Setting.TotalCP) * 100
          "
        />
      </div>
      <div class="flex justify-between">
        <div>
          耐久度:{{
            StatusStore.Current.CurrentDurability +
            "/" +
            StatusStore.Setting.TotalDurability
          }}
        </div>
        <div>
          {{ "状态：" + ballcolorStatus?.remark }}
        </div>
      </div>
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
import { ballcolor } from "@/const/ballcolor";
import { computed } from "@vue/reactivity";
const progressStore = useProgressStore();
const StatusStore = useStatusStore();

function handleStart() {
  progressStore.handleStart();
}

function handleEnd() {
  progressStore.handleEnd();
}

const ballcolorStatus = computed(() =>
  ballcolor.find((e) => e.name === StatusStore.Current.CurrentStatus)
);
</script>
