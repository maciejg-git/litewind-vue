<template>
  <v-range
    v-model="example.model"
    :validationState="example.validationState"
    min="0"
    max="100"
    class="w-full"
  />
  <!-- CUT START -->
  <v-tabs
    base="materialTabs"
    class="mt-5"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label
            for="model"
            class="font-semibold"
          >
            v-model:
          </label>
          <v-input
            type="text"
            id="model"
            inline
            v-model="example.model"
          ></v-input>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge
          mod-badge="variant:secondary size:tiny"
          class="ml-2"
        >
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { ref, reactive } from "vue";

let example = reactive({
  model: 0,
});

let events = ref([]);
</script>
