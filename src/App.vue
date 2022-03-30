<template>
  <div id="app">
    simpsons01
    simpsons02
    simpsons03
    simpsons04
    simpsons05
    simpsons06
    simpsons07
    simpsons08
    simpsons10
    simpsons11
    simpsons12
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
