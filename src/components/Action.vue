<template>
  <div v-show="progressStore.start" class="Action">
    <div v-for="i in actionsList" class="mt-2">
      <div>{{ i.name }}</div>
      <div class="flex flex-wrap">
        <div
          v-for="j in actions.filter((e) => e.groups === i.key)"
          class="m-1 relative"
          @click="useAction(j.id)"
        >
          <img
            :src="getImageUrl(j.enName)"
            class="action-img"
            :class="{
              'is-disabled': j.isHQ && !isHqUse,
              'is-hq-use': j.isHQ && isHqUse,
            }"
          />
          <span class="action-cp" v-if="j.cp > 0">{{ j.cp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { actions } from '@/const/action'
import { postUseActions } from '@/https/api'
import { useProgressStore } from '@/stores/progress'
import { useStatusStore } from '@/stores/status'
import { getImageUrl } from '@/utils/getImageUrl'
import { computed } from 'vue'

const progressStore = useProgressStore()
const statusStore = useStatusStore()

const actionsList = [
  { name: '首次作业', key: 'First Turn Only' },
  { name: '作业', key: 'Synthesis' },
  { name: '加工', key: 'Quality' },
  { name: '耐久度', key: 'Durability' },
  { name: '增益', key: 'Buffs' },
  { name: '其他', key: 'Other' },
]

function useAction(id: number) {
  postUseActions(progressStore.uid, id).then((res) => {
    progressStore.updateMessage({
      info: res.message,
      code: (res.data && res.data['Action Result']) || 101,
    })

    statusStore.getStatus(progressStore.uid)
    // 计算高速
    if (id === 4) {
      progressStore.count.rapidAllTurn += 1
      if (res.data && res.data['Action Result'] === 100) {
        progressStore.count.rapidSuccessTurn += 1
      }
    }

    if (res.data && res.data['Action Result'] === 200) {
      progressStore.count.successTurn += 1
    }
  })
}

const isHqUse = computed(() => {
  return (
    statusStore.Current.CurrentStatus === 'HQ' ||
    statusStore.Current.Buffs['Heart And Soul']
  )
})
</script>

<style>
.Action {
  font-size: 12px;
}
.action-img {
  vertical-align: bottom;
  box-shadow: black 2px 2px 6px 0;
  border-radius: 4px;
  width: 36px;
  height: 36px;

  cursor: pointer;
}

@media screen and (max-width: 736px) {
  .action-img {
    width: 32px;
    height: 32px;
  }
}

.action-cp {
  position: absolute;
  bottom: 0;
  left: 2px;
  line-height: 12px;
  color: white;
  text-shadow: #000 0px 0px 2px, #000 0px 0px 2px, #000 0px 0px 2px,
    #000 0px 0px 2px, #000 0px 0px 2px, #000 0px 0px 2px;
}

.is-disabled {
  opacity: 0.4;
}

.is-hq-use {
  border: dashed 3px red;
}
</style>
