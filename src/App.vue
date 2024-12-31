<script setup lang="ts">
import CountdownTimer from './components/CountdownTimer.vue'
import GlobeBackground from './components/GlobeBackground.vue'
</script>

<template>
  <GlobeBackground />
  <CountdownTimer />
</template>

<style>
body {
  margin: 0;
  background-color: #000000;
  overflow: hidden;
}
</style>