<template>
  <div class="Setting" v-show="!progressStore.start">
    <el-form :model="form" label-width="100px" label-position="left">
      <el-form-item label="制作精度">
        <el-input v-model.number="form.ProgressEfficiency" />
      </el-form-item>
      <el-form-item label="加工精度">
        <el-input v-model.number="form.QualityEfficiency" />
      </el-form-item>
      <el-form-item label="制作力">
        <el-input v-model.number="form.TotalCP" />
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
        <el-input v-model.number="form.TotalDurability" />
      </el-form-item>
      <el-form-item label="配方总进度">
        <el-input v-model.number="form.TotalProgress" />
      </el-form-item>
      <el-form-item label="配方总品质">
        <el-input v-model.number="form.TotalQuality" />
      </el-form-item>
      <el-form-item label="作业难度系数">
        <el-input v-model.number="form.ProgressDivider" />
      </el-form-item>
      <el-form-item label="加工难度系数">
        <el-input v-model.number="form.QualityDivider" />
      </el-form-item>
      <el-form-item label="作业压制系数">
        <el-input v-model.number="form.ProgressModifier" />
      </el-form-item>
      <el-form-item label="加工压制系数">
        <el-input v-model.number="form.QualityModifier" />
      </el-form-item>
      <el-form-item label="球色">
        <el-select v-model.number="form.Mode">
          <el-option
            v-for="item in ballOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主手工具">
        <el-radio-group v-model="form.Red">
          <el-radio-button :label="1.5">普通工具</el-radio-button>
          <el-radio-button :label="1.75">莫雯工具</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { postStatus } from '@/https/api'
import { useProgressStore } from '@/stores/progress'
import { useStatusStore } from '@/stores/status'

const progressStore = useProgressStore()
const statusStore = useStatusStore()

const recipe = ref(3)
const recipeOption = ref([
  {
    label: '自定义',
    value: 0,
    TotalDurability: 60,
    TotalProgress: 0,
    TotalQuality: 0,
    ProgressDivider: 180,
    QualityDivider: 180,
    ProgressModifier: 100,
    QualityModifier: 100,
    Mode: 115,
  },
  {
    label: '6.2 高难',
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
    label: '6.3 高难',
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
  {
    label: '6.4 高难',
    value: 3,
    TotalDurability: 60,
    TotalProgress: 8800,
    TotalQuality: 18040,
    ProgressDivider: 180,
    QualityDivider: 180,
    ProgressModifier: 100,
    QualityModifier: 100,
    Mode: 995,
  },
])

const form = reactive({
  ProgressEfficiency: 4048,
  QualityEfficiency: 4095,
  TotalCP: 701,
  TotalDurability: 80,
  TotalProgress: 3000,
  TotalQuality: 25565,
  ProgressDivider: 13,
  QualityDivider: 11.5,
  ProgressModifier: 100,
  QualityModifier: 100,
  Mode: 435,
  Red: 1.5,
})

const ballOption = reactive([
  // { label: "1色-白", value: 0 },
  // { label: "4色-白红彩黑", value: 15 }, 或者 1也是一样
  // { label: "5色-白红黄蓝绿", value: 115 },
  { label: '6色-白红黄蓝紫深蓝（6.2高难）', value: 435 },
  { label: '6色-白红蓝紫深蓝绿（无黄', value: 483 },
  { label: '7色-白红黄蓝紫深蓝绿（6.3高难）', value: 499 },
  { label: '6色-白红蓝紫深蓝绿粉（6.4高难）', value: 995 },
])

onMounted(() => {
  const LocalForm = getLocalForm()
  form.ProgressEfficiency = Number(LocalForm.ProgressEfficiency || 0)
  form.QualityEfficiency = Number(LocalForm.QualityEfficiency || 0)
  form.TotalCP = Number(LocalForm.TotalCP || 0)
  form.Red = Number(LocalForm.Red || 1.5)
  statusStore.setSetting(form)

  handleChage(recipe.value)
})

const handleChage = (value: number) => {
  const find = recipeOption.value.find((e) => e.value === value)
  if (find) {
    form.TotalDurability = find.TotalDurability
    form.TotalProgress = find.TotalProgress
    form.TotalQuality = find.TotalQuality
    form.ProgressDivider = find.ProgressDivider
    form.QualityDivider = find.QualityDivider
    form.ProgressModifier = find.ProgressModifier
    form.QualityModifier = find.QualityModifier
    form.Mode = find.Mode

    statusStore.setSetting(form)
  }
}

function handlePostStatus() {
  postStatus(progressStore.uid, form)
  statusStore.init()
}

function setLocalForm() {
  window.localStorage.setItem('form', JSON.stringify(form))
}

function getLocalForm() {
  return JSON.parse(window.localStorage.getItem('form') || '0')
}

watch(
  () => progressStore.uid,
  (count, prevCount) => {
    handlePostStatus()
    setLocalForm()
  }
)
</script>
