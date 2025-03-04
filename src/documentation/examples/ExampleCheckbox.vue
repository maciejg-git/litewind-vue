<template>
  <v-checkbox
    v-model="example.model"
    :validationState="example.validationState"
    :label="example.label"
  />
  <!-- CUT START -->
  <v-tabs
    base="materialTabs"
    class="mt-10"
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
        <div>
          <label for="label">label:</label>
          <v-input
            type="text"
            id="label"
            inline
            v-model="example.label"
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
  model: true,
  label: "Example checkbox",
});

let events = ref([]);
</script>
