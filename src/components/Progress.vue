<template>
  <div class="Progress">
    <div>
      <div>
        进展
        {{
          StatusStore.Current.CurrentProgress +
          '/' +
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
          '/' +
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
        {{ StatusStore.Current.CurrentCP + '/' + StatusStore.Setting.TotalCP }}
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
            '/' +
            StatusStore.Setting.TotalDurability
          }}
        </div>
        <div class="flex">
          <div
            class="ball"
            :style="{ background: ballcolorStatus?.color }"
          ></div>
          <div>{{ ballcolorStatus?.remark }}</div>
        </div>
      </div>
    </div>

    <div class="mt-2 flex justify-between hidden-sm-and-up items-center">
      <el-button
        v-if="!progressStore.start"
        @click="handleStart"
        type="primary"
        size="small"
        >开始制作</el-button
      >
      <el-button v-else @click="handleEnd" size="small">结束制作</el-button>
      <div :class="colortext">{{ progressStore.message.info }}</div>
    </div>

    <div class="mt-2 flex justify-between hidden-xs-only items-center">
      <el-button v-if="!progressStore.start" @click="handleStart" type="primary"
        >开始制作</el-button
      >
      <el-button v-else @click="handleEnd">结束制作</el-button>
      <div :class="colortext">{{ progressStore.message.info }}</div>
    </div>

    <div class="Progress-buff flex mt-2 h-14">
      <div class="mr-4" v-if="StatusStore.Current.InnerQuiet > 0">
        <img :src="InnerQuiet" width="30" />
        <div class="text-center">{{ StatusStore.Current.InnerQuiet }}</div>
      </div>
      <div v-for="(value, key) in StatusStore.Current.Buffs">
        <div class="mr-4" v-if="value > 0">
          <img :src="getImageUrl(key)" width="30" />
          <div class="text-center">{{ value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStatusStore } from '@/stores/status'
import { useProgressStore } from '@/stores/progress'
import { ballcolor } from '@/const/ballcolor'
import { computed } from '@vue/reactivity'
import { getImageUrl } from '@/utils/getImageUrl'
import InnerQuiet from '@/assets/InnerQuiet.png'
const progressStore = useProgressStore()
const StatusStore = useStatusStore()

function handleStart() {
  progressStore.handleStart()
}

function handleEnd() {
  progressStore.handleEnd()
}

const ballcolorStatus = computed(() =>
  ballcolor.find((e) => e.name === StatusStore.Current.CurrentStatus)
)

const colortext = computed(() =>
  progressStore.message.code === 100 ? 'succuess' : 'warnning'
)
</script>
<style>
.ball {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  margin: 5px;
}

.Progress {
  /* padding: 10px; */
  border: soild 1px #000;
  border-radius: 10px;
}

@media screen and (max-width: 736px) {
  .Progress {
    position: sticky;
    z-index: 10;
    top: 0;
    background: #fff;
  }

  .ball {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin: auto 2px;
  }
}

.succuess {
  color: #67c23a;
}

.warnning {
  color: red;
}
</style>
