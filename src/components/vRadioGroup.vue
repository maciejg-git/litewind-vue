<template>
  <div>
    <!-- @slot default -->
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { ref, provide, inject, toRef, watch } from "vue";
import useValidation from "./composition/use-validation";
import { sharedValidationProps, sharedFormProps } from "../shared-props";

const props = defineProps({
  ...sharedFormProps("radio-group"),
  ...sharedValidationProps("input", {
    validateMode: "blur-silent",
  }),
  modelValue: {
    type: [String, Boolean],
    default: undefined,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:state",
  "validation:messages",
]);

let groupModel = ref(props.modelValue);

let form = inject("_form", {});

// validation

let emitValidationStatus = () => {
  emit("validation:status", status.value);
  emit("validation:state", state.value);
  emit("validation:messages", messages.value);
};

let { rules, validateMode } = props;

let status = ref({})
let messages = ref({})
let state = ref("")

let validation = useValidation({
  rules,
  mode: validateMode,
},
(res) => {
  status.value = res.status
  messages.value = res.messages
  state.value = res.state
  emitValidationStatus()
})

watch(groupModel, (value) => {
  validation.updateValue(value)
}, { immediate: true })

if (form.addToForm) {
  form.addToForm({...validation, status, messages, state})
}

provide("_radio-group-validation", validation);
provide("_validation-state", state)

let onUpdateGroupModel = (newValue) => {
  groupModel.value = newValue;
  emit("update:modelValue", groupModel.value);
};

provide("_radio-group", {
  groupModel,
  onUpdateGroupModel,
  isInGroup: true,
});

defineExpose({ validate: validation.formValidate, reset: validation.reset });
</script>
