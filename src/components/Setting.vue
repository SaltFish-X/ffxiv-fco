<template>
  <div v-show="!progressStore.start">
    <el-form :model="form" label-width="120px">
      <el-form-item label="制作精度">
        <el-input v-model="form.ProgressEfficiency" />
      </el-form-item>
      <el-form-item label="加工精度">
        <el-input v-model="form.QualityEfficiency" />
      </el-form-item>
      <el-form-item label="制作力">
        <el-input v-model="form.TotalCP" />
      </el-form-item>
      <el-form-item label="是否专家">
        <el-switch v-model="form.Mode" :active-value="2" :inactive-value="1" />
      </el-form-item>
      <el-form-item label="配方选择">
        <el-select v-model="recipe" @change="handleChage">
          <el-option
            v-for="item in recipeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="配方总耐久">
        <el-input v-model="form.TotalDurability" />
      </el-form-item>
      <el-form-item label="配方总进度">
        <el-input v-model="form.TotalProgress" />
      </el-form-item>
      <el-form-item label="配方总品质">
        <el-input v-model="form.TotalQuality" />
      </el-form-item>
      <el-form-item label="作业难度系数">
        <el-input v-model="form.ProgressDivider" />
      </el-form-item>
      <el-form-item label="加工难度系数">
        <el-input v-model="form.QualityDivider" />
      </el-form-item>
      <el-form-item label="作业压制系数">
        <el-input v-model="form.ProgressModifier" />
      </el-form-item>
      <el-form-item label="加工压制系数">
        <el-input v-model="form.QualityModifier" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { postStatus } from "@/https/api";
import { useProgressStore } from "@/stores/progress";
import { useStatusStore } from "@/stores/status";

const progressStore = useProgressStore();
const statusStore = useStatusStore();

const recipe = ref(1);
const recipeOption = ref([
  {
    label: "自定义",
    value: 0,
    TotalDurability: 80,
    TotalProgress: 0,
    TotalQuality: 0,
    ProgressDivider: 100,
    QualityDivider: 100,
    ProgressModifier: 100,
    QualityModifier: 100,
  },
  {
    label: "6.2 獭獭泉",
    value: 1,
    TotalDurability: 60,
    TotalProgress: 7480,
    TotalQuality: 13620,
    ProgressDivider: 180,
    QualityDivider: 180,
    ProgressModifier: 100,
    QualityModifier: 100,
  },
]);

const form = reactive({
  ProgressEfficiency: 3804,
  QualityEfficiency: 3804,
  TotalCP: 588,
  TotalDurability: 80,
  TotalProgress: 3000,
  TotalQuality: 25565,
  ProgressDivider: 13,
  QualityDivider: 11.5,
  ProgressModifier: 100,
  QualityModifier: 100,
  Mode: 2,
});

onMounted(() => {
  console.log(getLocalForm());
  statusStore.setSetting(getLocalForm() || form);
  handleChage(recipe.value);
});

const handleChage = (value: number) => {
  const find = recipeOption.value.find((e) => e.value === value);
  if (find) {
    form.TotalDurability = find.TotalDurability;
    form.TotalProgress = find.TotalProgress;
    form.TotalQuality = find.TotalQuality;
    form.ProgressDivider = find.ProgressDivider;
    form.QualityDivider = find.QualityDivider;
    form.ProgressModifier = find.ProgressModifier;
    form.QualityModifier = find.QualityModifier;

    statusStore.setSetting(form);
  }
};

function handlePostStatus() {
  postStatus(progressStore.uid, form);
}

function setLocalForm() {
  window.localStorage.setItem("form", JSON.stringify(form));
}

function getLocalForm() {
  return JSON.parse(window.localStorage.getItem("form") || "0");
}

watch(
  () => progressStore.uid,
  (count, prevCount) => {
    handlePostStatus();
    setLocalForm();
  }
);
</script>
