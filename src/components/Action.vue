<template>
  <div v-show="progressStore.start">
    <div v-for="i in actionsList" class="mt-4">
      <div>{{ i.name }}</div>
      <div class="flex">
        <div
          v-for="j in actions.filter((e) => e.groups === i.key)"
          class="mr-4 relative"
          @click="useAction(j.id)"
        >
          <img :src="getImageUrl(j.enName)" class="action-img" />
          <span class="action-cp" v-if="j.cp > 0">{{ j.cp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { actions } from "@/const/action";
import { postUseActions } from "@/https/api";
import { useProgressStore } from "@/stores/progress";
import { useStatusStore } from "@/stores/status";
import { ElMessage } from "element-plus";
import { getImageUrl } from "@/utils/getImageUrl";
const progressStore = useProgressStore();
const statusStore = useStatusStore();

const actionsList = [
  { name: "首次作业", key: "First Turn Only" },
  { name: "作业", key: "Synthesis" },
  { name: "加工", key: "Quality" },
  { name: "耐久度", key: "Durability" },
  { name: "增益", key: "Buffs" },
  { name: "其他", key: "Other" },
];

function useAction(id: number) {
  postUseActions(progressStore.uid, id).then((res) => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.message,
      center: true,
    });
    statusStore.getStatus(progressStore.uid);
  });
}
</script>

<style>
.action-img {
  vertical-align: bottom;
  box-shadow: black 2px 2px 6px 0;
  border-radius: 4px;
  width: 40px;
  height: 40px;

  cursor: pointer;
}

.action-cp {
  position: absolute;
  bottom: 0;
  left: 2px;
  font-size: 12px;
  line-height: 12px;
  color: white;
  text-shadow: #000 0px 0px 2px, #000 0px 0px 2px, #000 0px 0px 2px,
    #000 0px 0px 2px, #000 0px 0px 2px, #000 0px 0px 2px;
}
</style>
