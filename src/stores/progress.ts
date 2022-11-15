import { defineStore } from "pinia";
import { getInitiate } from "@/https/api";
import { useStatusStore } from "@/stores/status";

export const useProgressStore = defineStore("progress", {
  state: () => ({
    start: 0,
    uid: -1,
  }),
  actions: {
    handleStart() {
      return getInitiate().then((res) => {
        this.uid = res.data.uid;
        this.start = 1;
        const statusStore = useStatusStore();
        statusStore.init();
      });
    },
    handleEnd() {
      this.start = 0;
    },
  },
});
