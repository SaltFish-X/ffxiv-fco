<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="制作精度">
        <el-input v-model="form.ProgressEfficiency" type="number" />
      </el-form-item>
      <el-form-item label="加工精度">
        <el-input v-model="form.QualityEfficiency" type="number" />
      </el-form-item>
      <el-form-item label="制作力">
        <el-input v-model="form.TotalCP" type="number" />
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
        <el-input v-model="form.TotalDurability" type="number" />
      </el-form-item>
      <el-form-item label="配方总进度">
        <el-input v-model="form.TotalProgress" type="number" />
      </el-form-item>
      <el-form-item label="配方总品质">
        <el-input v-model="form.TotalQuality" type="number" />
      </el-form-item>
      <el-form-item label="进度压制难度">
        <el-input v-model="form.ProgressDifficulty" type="number" />
      </el-form-item>
      <el-form-item label="品质压制难度">
        <el-input v-model="form.QualityDifficulty" type="number" />
      </el-form-item>
      <el-form-item label="配方进度等级">
        <el-input v-model="form.ProgressLevel" type="number" />
      </el-form-item>
      <el-form-item label="配方品质等级">
        <el-input v-model="form.QualityLevel" type="number" />
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
    ProgressDifficulty: 13,
    QualityDifficulty: 11.5,
    ProgressLevel: 1,
    QualityLevel: 1,
  },
  {
    label: "6.2 獭獭泉",
    value: 1,
    TotalDurability: 60,
    TotalProgress: 7480,
    TotalQuality: 13620,
    ProgressDifficulty: 180,
    QualityDifficulty: 180,
    ProgressLevel: 0.7,
    QualityLevel: 0.6,
  },
]);

const form = reactive({
  ProgressEfficiency: 0,
  QualityEfficiency: 0,
  TotalCP: 0,
  TotalDurability: 80,
  TotalProgress: 3000,
  TotalQuality: 25565,
  ProgressDifficulty: 13,
  QualityDifficulty: 11.5,
  ProgressLevel: 0.7,
  QualityLevel: 0.6,
  Mode: 2,
});
statusStore.setSetting(form);

onMounted(() => {
  handleChage(recipe.value);
});

const handleChage = (value: number) => {
  const find = recipeOption.value.find((e) => e.value === value);
  if (find) {
    form.TotalDurability = find.TotalDurability;
    form.TotalProgress = find.TotalProgress;
    form.TotalQuality = find.TotalQuality;
    form.ProgressDifficulty = find.ProgressDifficulty;
    form.QualityDifficulty = find.QualityDifficulty;
    form.ProgressLevel = find.ProgressLevel;
    form.QualityLevel = find.QualityLevel;

    statusStore.setSetting(form);
  }
};

function handlePostStatus() {
  postStatus(progressStore.uid, form);
}

watch(
  () => progressStore.uid,
  (count, prevCount) => {
    handlePostStatus();
  }
);
</script>
