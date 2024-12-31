<script setup lang="ts">
import CountdownTimer from './components/CountdownTimer.vue'
import GlobeBackground from './components/GlobeBackground.vue'
</script>

<template>
  <div class="relative min-h-screen">
    <GlobeBackground />
    <CountdownTimer />
    <footer class="fixed bottom-4 w-full flex justify-center items-center gap-4">
      <a href="https://github.com/stvlynn/NewYear" target="_blank" rel="noopener noreferrer">
        <img alt="GitHub" src="https://img.shields.io/github/stars/stvlynn/NewYear?style=social" />
      </a>
      <a href="https://kanji.twi.am" target="_blank" rel="noopener noreferrer">
        <img alt="Test your yearly Kanji" src="https://img.shields.io/badge/Test_your_yearly_Kanji-black?logo=x&style=flat-square" />
      </a>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000;
}
</style>