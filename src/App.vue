<template>
  <router-view/>
</template>

<script>
import { provide } from "vue"
import * as styles from "./styles/components"

export default {
  setup() {
    document.title = "Litewind-vue documentation"

    provide("mods", styles)
  },
}
</script>

<style>
body {
  @apply dark:bg-[#191919]
}
</style>
