<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import confetti from 'canvas-confetti'

// 为window对象添加类型声明
declare global {
  interface Window {
    __DEBUG_FIREWORKS__: () => void;
    __STOP_FIREWORKS__: () => void;
  }
}

const { t } = useI18n()

const targetDate = dayjs('2025-01-01T00:00:00')
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const isNewYear = ref(false)

let timer: number
let fireworksInterval: ReturnType<typeof setInterval> | undefined = undefined

const calculateTimeLeft = () => {
  const now = dayjs()
  const diff = targetDate.diff(now, 'second')

  if (diff <= 0) {
    isNewYear.value = true
    clearInterval(timer)
    celebrateNewYear()
    return
  }

  days.value = Math.floor(diff / (24 * 60 * 60))
  hours.value = Math.floor((diff % (24 * 60 * 60)) / (60 * 60))
  minutes.value = Math.floor((diff % (60 * 60)) / 60)
  seconds.value = Math.floor(diff % 60)
}

const celebrateNewYear = () => {
  // 如果已经有烟花在放，先停止它
  if (fireworksInterval !== undefined) {
    clearInterval(fireworksInterval)
    fireworksInterval = undefined
  }

  const duration = Math.min(15 * 1000, 180 * 1000) // 最多3分钟
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  fireworksInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      clearInterval(fireworksInterval)
      fireworksInterval = undefined
      return
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}

// 添加停止烟花的方法
const stopFireworks = () => {
  if (fireworksInterval !== undefined) {
    clearInterval(fireworksInterval)
    fireworksInterval = undefined
    // 清除所有剩余的烟花粒子
    confetti.reset()
  }
}

// 添加调试方法
const debugFireworks = () => {
  celebrateNewYear()
}

// 将调试方法暴露到全局
onMounted(() => {
  calculateTimeLeft()
  timer = setInterval(calculateTimeLeft, 1000)
  
  // 添加到window对象，方便控制台调试
  window.__DEBUG_FIREWORKS__ = debugFireworks
  window.__STOP_FIREWORKS__ = stopFireworks
})

onUnmounted(() => {
  clearInterval(timer)
  if (fireworksInterval !== undefined) {
    clearInterval(fireworksInterval)
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center p-8">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-12">
        {{ isNewYear ? t('countdown.newYear') : t('countdown.title') }}
      </h1>
      
      <div v-if="!isNewYear" class="flex flex-wrap gap-4 justify-center">
        <div class="countdown-item">
          <span class="countdown-value">{{ days }}</span>
          <span class="countdown-label">{{ t('countdown.days') }}</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">{{ hours }}</span>
          <span class="countdown-label">{{ t('countdown.hours') }}</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">{{ minutes }}</span>
          <span class="countdown-label">{{ t('countdown.minutes') }}</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">{{ seconds }}</span>
          <span class="countdown-label">{{ t('countdown.seconds') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>