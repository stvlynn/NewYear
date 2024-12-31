import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    countdown: {
      title: 'New Year Countdown',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      newYear: 'Happy New Year 2025!'
    }
  },
  zh: {
    countdown: {
      title: '新年倒计时',
      days: '天',
      hours: '时',
      minutes: '分',
      seconds: '秒',
      newYear: '2025年新年快乐！'
    }
  },
  ja: {
    countdown: {
      title: '新年カウントダウン',
      days: '日',
      hours: '時間',
      minutes: '分',
      seconds: '秒',
      newYear: '2025年明けましておめでとう！'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.split('-')[0] || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n