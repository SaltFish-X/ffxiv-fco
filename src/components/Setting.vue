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
        <el-switch v-model="form.Mode" active-value="2" inactive-value="1" />
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
      <template v-if="recipe === 0">
        <el-form-item label="配方总耐久">
          <el-input v-model="form.TotalDurability" type="number" />
        </el-form-item>
        <el-form-item label="配方总进度">
          <el-input v-model="form.TotalProgress" type="number" />
        </el-form-item>
        <el-form-item label="配方总品质">
          <el-input v-model="form.TotalQuality" type="number" />
        </el-form-item>
        <el-form-item label="配方进度压制难度">
          <el-input v-model="form.ProgressDifficulty" type="number" />
        </el-form-item>
        <el-form-item label="配方品质压制难度">
          <el-input v-model="form.QualityDifficulty" type="number" />
        </el-form-item>
        <el-form-item label="配方进度等级">
          <el-input v-model="form.ProgressLevel" type="number" />
        </el-form-item>
        <el-form-item label="配方品质等级">
          <el-input v-model="form.QualityLevel" type="number" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
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
  ProgressEfficiency: 2552,
  QualityEfficiency: 2662,
  TotalCP: 605,
  TotalDurability: 80,
  TotalProgress: 3000,
  TotalQuality: 25565,
  ProgressDifficulty: 13,
  QualityDifficulty: 11.5,
  ProgressLevel: 0.7,
  QualityLevel: 0.6,
  Mode: 2,
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
  }
};
</script>
