<template>
  <div>
    <div v-for="i in actionsList">
      <div>{{ i.name }}</div>
      <div class="flex">
        <div
          v-for="j in actions.filter((e) => e.groups === i.key)"
          class="ml-4"
        >
          <img :src="getImageUrl(j.enName)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// '@/assets/actions/Advanced Touc.png'
import { actions } from "@/const/action";
const actionsList = [
  { name: "首次作业", key: "First Turn Only" },
  { name: "作业", key: "Synthesis" },
  { name: "加工", key: "Quality" },
  { name: "耐久度", key: "Durability" },
  { name: "增益", key: "Buffs" },
  { name: "其他", key: "Other" },
];

function getImageUrl(name: string) {
  return new URL(`/src/assets/actions/${name}.png`, import.meta.url).href;
}
</script>
