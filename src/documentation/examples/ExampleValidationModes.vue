<template>
  <div class="flex flex-col md:flex-row md:gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username"
        :rules="rules"
        validate-mode="blur-silent"
        @validation:status="(data) => (usernameStatus = data)"
      ></v-input>
    </div>

    <pre class="m-0 mt-[100px] md:mt-0">
      <ul class="font-semibold mb-5">
        <li>validate-on: "blur"</li>
        <li>validate-mode: "silent""</li>
      </ul>
      <code v-html="'model: ' + stringifyObject(username)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex flex-col md:flex-row md:gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username2"
        :rules="rules"
        validate-mode="blur-eager"
        @validation:status="(data) => (usernameStatus2 = data)"
      ></v-input>
    </div>

    <pre class="m-0 mt-[100px] md:mt-0">
      <ul class="font-semibold mb-5">
        <li>validate-on: "blur"</li>
        <li>validate-mode: "eager""</li>
      </ul>
      <code v-html="'model: ' + stringifyObject(username2)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus2, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex flex-col md:flex-row md:gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username4"
        :rules="rules"
        validate-mode="immediate-eager"
        @validation:status="(data) => (usernameStatus4 = data)"
      ></v-input>
    </div>

    <pre class="m-0 mt-[100px] md:mt-0">
      <ul class="font-semibold text-lg mb-5">
        <li>validate-on: "immediate"</li>
        <li>validate-mode: "eager""</li>
      </ul>
      <code v-html="'model: ' + stringifyObject(username4)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus4, true)"></code>
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { stringifyObject } from "../tools";

let username = ref("");
let username2 = ref("");
let username4 = ref("");

let rules = [
  "required",
  { minLength: 5 },
  "alphanumeric",
];

let usernameStatus = ref("");
let usernameStatus2 = ref("");
let usernameStatus4 = ref("");
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
