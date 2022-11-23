export interface actionApiView {
  action_name: string;
  id: number;
}

export interface initiateApiView {
  uid: number;
}

export interface initApiView {
  // 制作精度
  ProgressEfficiency: number;
  // 加工精度
  QualityEfficiency: number;
  // 制作力
  TotalCP: number;
  // 配方总耐久
  TotalDurability: number;
  // 配方总进度
  TotalProgress: number;
  // 配方总品质
  TotalQuality: number;
  // 配方进度压制难度
  ProgressDivider: number;
  // 配方品质压制难度
  QualityDivider: number;
  // 配方进度等级
  ProgressModifier: number;
  // 配方品质等级
  QualityModifier: number;
  // 模式
  Mode: number;
}

export interface statusApiView {
  CurrentProgress: number;
  CurrentQuality: number;
  CurrentCP: number;
  CurrentDurability: number;
  CurrentStatus: string;
  Buffs: {
    "Heart And Soul": number;
  };
  InnerQuiet: number;
}

enum CurrentStatus {
  "nornal",
  "HQ",
  "Centered",
  "Malleable",
  "Sturdy",
  "Primed",
}
export interface actionApiView {
  action_name: string;
  id: number;
}

export interface actionResponseView {
  "Action Result"?: number;
}
