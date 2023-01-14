<template>
  <div class="Setting ml-5">
    <div v-show="progressStore.start">
      <div>{{ recordTurn }}</div>
      <div>{{ rapidRecord }}</div>
      <div v-show="statusStore.Current.InnerQuiet">{{ extraDurability }}</div>
    </div>

    <div v-show="!progressStore.start">
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="制作精度">
          <el-input v-model="form.ProgressEfficiency" />
        </el-form-item>
        <el-form-item label="加工精度">
          <el-input v-model="form.QualityEfficiency" />
        </el-form-item>
        <el-form-item label="制作力">
          <el-input v-model="form.TotalCP" />
        </el-form-item>
        <!-- <el-form-item label="是否专家">
          <el-switch
            v-model="form.Mode"
            :active-value="2"
            :inactive-value="1"
          />
        </el-form-item> -->
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
        <el-form-item label="球色">
          <el-select v-model="form.Mode">
            <el-option
              v-for="item in ballOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { postStatus } from "@/https/api";
import { useProgressStore } from "@/stores/progress";
import { useStatusStore } from "@/stores/status";

const progressStore = useProgressStore();
const statusStore = useStatusStore();

const recipe = ref(2);
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
    Mode: 499,
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
    Mode: 435,
  },
  {
    label: "6.3 高难",
    value: 2,
    TotalDurability: 60,
    TotalProgress: 7920,
    TotalQuality: 17240,
    ProgressDivider: 180,
    QualityDivider: 180,
    ProgressModifier: 100,
    QualityModifier: 100,
    Mode: 499,
  },
]);

const form = reactive({
  ProgressEfficiency: 3820,
  QualityEfficiency: 3640,
  TotalCP: 676,
  TotalDurability: 80,
  TotalProgress: 3000,
  TotalQuality: 25565,
  ProgressDivider: 13,
  QualityDivider: 11.5,
  ProgressModifier: 100,
  QualityModifier: 100,
  Mode: 435,
});

const ballOption = reactive([
  // { label: "1色-白", value: 0 },
  // { label: "4色-白红彩黑", value: 15 }, 或者 1也是一样
  { label: "5色-白红黄蓝绿", value: 115 },
  { label: "6色-白红黄蓝紫深蓝囗（无绿", value: 435 },
  { label: "6色-白红囗蓝紫深蓝绿（无黄", value: 483 },
  { label: "7色-白红黄蓝紫深蓝绿", value: 499 },
]);

onMounted(() => {
  const LocalForm = getLocalForm();
  form.ProgressEfficiency = LocalForm.ProgressEfficiency || 3820;
  form.QualityEfficiency = LocalForm.QualityEfficiency || 3640;
  form.TotalCP = LocalForm.TotalCP || 676;
  statusStore.setSetting(form);

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
    form.Mode = find.Mode;

    statusStore.setSetting(form);
  }
};

function handlePostStatus() {
  postStatus(progressStore.uid, form);
  statusStore.init();
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

const recordTurn = computed(() => {
  return `制作总次数：${progressStore.count.allTurn}；制作成功次数：${
    progressStore.count.successTurn
  }；制作成功率：${Math.round(
    progressStore.count.allTurn
      ? (progressStore.count.successTurn * 100) / progressStore.count.allTurn
      : 0
  )}%`;
});

const rapidRecord = computed(() => {
  return `高速总数：${progressStore.count.rapidAll}；高速总成功数：${progressStore.count.rapidSuccess}；本轮高速次数${progressStore.count.rapidAllTurn}；本轮高速成功次数${progressStore.count.rapidSuccessTurn}`;
});

const extraDurability = computed(() => {
  // 当前耐久 + 5*掌握层数 - 5*(10-内静层数) - 11
  const extra =
    statusStore.Current.CurrentDurability +
    5 * statusStore.Current.Buffs.Manipulation -
    5 * (10 - statusStore.Current.InnerQuiet) -
    11;
  return `额外耐久：${extra}`;
});
</script>
