import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getInitiate } from "@/https/api";
export const useProgressStore = defineStore("progress", {
  state: () => ({
    start: 0,
    uid: -1,
  }),
  actions: {
    handleStart() {
      return getInitiate().then(
        (res) => {
          console.log(res)
          this.uid = res.data.uid;
          this.start = 1;
        },
        (err) => {
          
        }
      );
    },
    handleEnd() {
      this.start = 0;
    },
  },
});
