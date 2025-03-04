<template>
  <div class="w-full md:w-1/2">
    <v-textarea
      v-model="example.model"
      :label="example.label"
      :validationState="example.validationState"
      placeholder="Type something..."
      class="h-[120px]"
    />
  </div>

  <p class="my-6">Alternative style textarea</p>

  <div class="w-full md:w-1/2">
    <v-textarea
      v-model="example.model"
      base="underlinedTextarea"
      :label="example.label"
      :state="example.state"
      placeholder="Type something..."
      class="h-[120px]"
    />
  </div>
  <!-- CUT START -->
  <v-tabs
    base="materialTabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="mt-5 flex flex-col gap-y-2">
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
          update-animation="scale-up"
          :update-key="events.length"
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
  model: "",
  label: "Textarea label",
});

let events = ref([]);
</script>
