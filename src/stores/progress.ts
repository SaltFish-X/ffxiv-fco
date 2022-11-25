import { defineStore } from "pinia";
import { getInitiate } from "@/https/api";
import { useStatusStore } from "@/stores/status";

export const useProgressStore = defineStore("progress", {
  state: () => ({
    start: 0,
    uid: -1,
    count:{
      allTurn: 0,
      successTurn: 0,
      rapidAll:0,
      rapidSuccess:0,
      rapidAllTurn:0,
      rapidSuccessTurn:0
    }

  }),
  actions: {
    handleStart() {
      return getInitiate().then((res) => {
        this.uid = res.data.uid;
        this.start = 1;
        this.count.allTurn += 1;

        this.count.rapidAll += this.count.rapidAllTurn
        this.count.rapidSuccess += this.count.rapidSuccessTurn
        this.count.rapidAllTurn = 0
        this.count.rapidSuccessTurn = 0
      });
    },
    handleEnd() {
      this.start = 0;
      const statusStore = useStatusStore();
      statusStore.init();
    },
  },
});
