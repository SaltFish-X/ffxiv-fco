import { defineStore } from "pinia";
import { getInitiate } from "@/https/api";
import { useStatusStore } from "@/stores/status";

export const useProgressStore = defineStore("progress", {
  state: () => ({
    start: 0,
    uid: -1,
    allTurn: 0,
    successTurn: 0,
  }),
  actions: {
    handleStart() {
      return getInitiate().then((res) => {
        this.uid = res.data.uid;
        this.start = 1;
        this.allTurn += 1;
      });
    },
    handleEnd() {
      this.start = 0;
      const statusStore = useStatusStore();
      statusStore.init();
    },
  },
});
