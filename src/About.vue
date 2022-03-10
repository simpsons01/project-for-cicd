<template>
  <div id="app">
     test about page in {{ stag }}
     123
     bar
     bar
     foo
     alice
     george
     frank
     lisa
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
const stag = process.env.VUE_APP_STAG
export default defineComponent({
  setup() {
    return {
      stag: ref(stag)
    }
  },
})
</script>
