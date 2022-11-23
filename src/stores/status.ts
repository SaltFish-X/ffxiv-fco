import { defineStore } from "pinia";
import { getStatus } from "@/https/api";
import type { statusApiView, initApiView } from "@/interface/api";

export const useStatusStore = defineStore("status", {
  state: () => ({
    Current: <statusApiView>{
      CurrentProgress: 0,
      CurrentQuality: 0,
      CurrentCP: 0,
      CurrentDurability: 0,
      CurrentStatus: "normal",
      Buffs: {},
      InnerQuiet: 0,
    },
    Setting: <initApiView>{},
  }),
  actions: {
    getStatus(uid: number) {
      getStatus(uid).then((res) => {
        this.Current = res.data;
      });
    },

    setSetting(data: initApiView) {
      this.Setting = data;
    },

    init() {
      this.Current.CurrentCP = this.Setting.TotalCP;
      this.Current.CurrentDurability = this.Setting.TotalDurability;
      this.Current.CurrentProgress = 0;
      this.Current.CurrentQuality = 0;
      this.Current.CurrentStatus = "normal";
      this.Current.Buffs = {
        "Heart And Soul": 0
      }
      this.Current.InnerQuiet = 0
    },
  },
});
