<template>
  <div class="countdown-timer">
    <v-progress-circular
      v-if="countdownTime > 0"
      :size="80"
      :width="10"
      :value="countdownTime"
      color="primary"
      indeterminate
    >
      {{ countdownTime }}
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
