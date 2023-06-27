<template>
  <div class="countdown-timer">
    <v-progress-circular
      v-if="countdownTime > 0 && currentCountdown > 0"
      :size="80"
      :width="10"
      :value="currentCountdown"
      color="primary"
      indeterminate
    >
      {{ currentCountdown }}
    </v-progress-circular>
    <div v-else class="countdown-complete">Fim!</div>
  </div>
</template>

<script>
export default {
  props: {
    countdownTime: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentCountdown: this.countdownTime,
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const interval = setInterval(() => {
        if (this.currentCountdown === 0) {
          clearInterval(interval);
        } else {
          this.currentCountdown--;
        }
      }, 1000);
    },
  },
  watch: {
    currentCountdown(newCountdown) {
      if (newCountdown === 0) {
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<style scoped>
.countdown-timer {
  height: 200px;
  font-size: 24px;
}

.countdown-complete {
  font-size: 24px;
  color: green;
  font-weight: bold;
}
</style>
