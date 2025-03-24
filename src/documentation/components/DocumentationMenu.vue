<template>
  <!-- general -->

  <h6>
    Introduction
  </h6>
  <ul class="list-unstyled">
    <li>
      <router-link
        to="/documentation/installation"
        active-class="active"
        class="transition-all"
      >
        Installation
      </router-link>
    </li>
    <li>
      <router-link
        to="/documentation/styling"
        active-class="active"
        class="transition-all"
      >
        Styling
      </router-link>
    </li>
  </ul>

  <!-- components -->

  <h6>
    Components
  </h6>
  <ul class="list-unstyled">
    <li
      v-for="(c, i) in components"
      :key="i"
    >
      <router-link
        :to="'/documentation/' + c.name"
        active-class="active"
        class="transition-all"
      >
        {{ c.label }}
      </router-link>
    </li>
  </ul>

  <!-- form components -->

  <h6>
    Form Components
  </h6>
  <ul class="list-unstyled">
    <li
      v-for="(c, i) in formComponents"
      :key="i"
    >
      <router-link
        :to="'/documentation/' + c.name"
        active-class="active"
        class="transition-all"
      >
        {{ c.label }}
      </router-link>
    </li>
    <li>
      <router-link
        to="/documentation/form-validation"
        active-class="active"
        class="transition-all"
      >
        Form Validation
      </router-link>
    </li>
  </ul>

  <!-- directives -->

  <h6>Directives</h6>
  <ul class="list-unstyled">
    <li>
      <router-link
        to="/documentation/tooltip"
        active-class="active"
        class="transition-all"
      >
        Tooltip
      </router-link>
    </li>
  </ul>
  <div class="min-h-[100px]"></div>
</template>

<script setup>
import { components, formComponents } from "../Components.js";
</script>

<style scoped>
h3 {
  @apply mt-4 text-3xl font-semibold;
}
h4 {
  @apply mt-4 text-2xl font-semibold;
}
h5 {
  @apply mt-4 text-xl font-semibold;
}
h6 {
  @apply mb-4 mt-6 text-lg font-semibold pl-2 py-1 pl-2 pr-4;
}

a.active {
  @apply inline-block py-1 pr-4 text-primary-500 dark:text-white;
}
a {
  @apply inline-block py-1 pl-2 pr-4;
}
a:hover {
  @apply text-black dark:text-white;
}

.sidebar {
  height: calc(100vh - 4rem);
}
.sidebar::-webkit-scrollbar {
  width: 0.5em;
}
.sidebar::-webkit-scrollbar-track {
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
