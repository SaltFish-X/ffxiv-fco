export interface actionApiView {
  action_name:string
  id:number
}

export interface initiateApiView {
  uid:number
}

export interface initApiView {
  ProgressEfficiency: number,
  QualityEfficiency: number,
  TotalCP: number,
  TotalDurability: number,
  TotalProgress: number,
  TotalQuality: number,
  ProgressDifficulty: number,
  QualityDifficulty: number,
  ProgressLevel: number,
  QualityLevel: number,
  Mode: number
}

export interface stutasApiView {
  CurrentProgress: number,
  CurrentQuality: number,
  CurrentCP: number,
  CurrentDurability: number,
  Buffs: number[]
}

export interface actionApiView {
  action_name:string
  id:number
}