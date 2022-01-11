import Vue from 'vue/types/index'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {}
} 