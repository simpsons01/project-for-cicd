<template>
  <div id="app">
    Main page in production {{ stag }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
const stag = process.env.VUE_APP_STAG
export default defineComponent({
  setup() {
    const a = 1
    
    
    return {
      stag: ref(stag),
    }
  },
})
</script>
