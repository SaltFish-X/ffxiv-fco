import { defineStore } from "pinia";
import { getStatus } from "@/https/api";
import type { statusApiView } from "@/interface/api";

export const useStatusStore = defineStore("status", {
  state: (): statusApiView => ({
    CurrentProgress: 0,
    CurrentQuality: 0,
    CurrentCP: 0,
    CurrentDurability: 0,
    Buffs: [],
    InnerQuiet: 0,
  }),
  actions: {
    getStatus(uid: number) {
      getStatus(uid).then((res) => {
        this.CurrentProgress = res.data.CurrentDurability;
        this.CurrentQuality = res.data.CurrentQuality;
        this.CurrentCP = res.data.CurrentCP;
        this.CurrentDurability = res.data.CurrentDurability;
        this.Buffs = res.data.Buffs;
        this.InnerQuiet = res.data.InnerQuiet;
      });
    },
  },
});
