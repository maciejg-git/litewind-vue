<template>
  <v-navbar
    position="fixed"
    class="flex w-full items-center border-b px-4 py-2 dark:border-dark-700 dark:text-text-300"
  >
    <!-- mobile menu trigger -->

    <v-trigger
      for="sidepanel"
      v-slot="{ onTrigger }"
    >
      <v-button
        mod-button="preset:plain"
        class="mr-2 block lg:hidden"
        v-on="onTrigger"
      >
        <v-icon
          name="b-list"
          class="h-7 w-7"
        ></v-icon>
      </v-button>
    </v-trigger>

    <!-- logo -->

    <span class="text-lg font-bold">
      <a href="/documentation/installation">
        Litewind-vue
      </a>
    </span>

    <!-- nav menu -->

    <div class="ml-10 inline-block font-semibold">
      <a href="/documentation/installation" class="py-1">Docs</a>
    </div>

    <!-- github -->

    <a
      href="https://github.com/maciejg-git/vue-litewind"
      class="ml-auto mr-4 !p-0"
    >
      <v-icon
        name="b-github"
        class="h-6 w-6 text-dark-800 dark:text-dark-400"
      ></v-icon>
    </a>

    <!-- dark mode -->

    <v-button
      class="mr-2"
      mod-button="preset:plain"
      @click="emit('update:dark-mode')"
    >
      <transition name="fade">
        <v-icon
          :name="darkMode ? 'b-sun' : 'b-moon'"
          class="h-6 w-6 text-dark-800 dark:text-dark-400"
        ></v-icon>
      </transition>
    </v-button>
  </v-navbar>
</template>

<script setup>
let props = defineProps({
  darkMode: {
    type: Boolean,
    default: undefined,
  },
});

let emit = defineEmits(["update:dark-mode"]);
</script>

<style scoped>
a.active {
  @apply inline-block text-black dark:text-white;
}
a {
  @apply inline-block;
}
a:hover {
  @apply text-black dark:text-white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
