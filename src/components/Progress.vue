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
    <div class="Progress-buff flex mt-4">
      <div class="mr-5">
        <img :src="InnerQuiet" width="30" />
        <div class="text-center">{{ StatusStore.Current.InnerQuiet }}</div>
      </div>
      <div v-for="(value, key) in StatusStore.Current.Buffs">
        <div class="mr-5">
          <img :src="getImageUrl(key)" width="30" />
          <div class="text-center">{{ value }}</div>
        </div>
      </div>
    </div>
    <div class="mt-4">
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
import { getImageUrl } from "@/utils/getImageUrl";
import InnerQuiet from "@/assets/actions/InnerQuiet.png";
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
