<template>
  <label
    v-if="label"
    :for="id"
    :class="classes.label.value"
  >
    <!-- @slot label -->
    <slot
      name="label"
      :label="label"
    >
      {{ label }}
    </slot>
  </label>

  <div
    :class="wrapperClasses"
    :style="{ width: width + 'px' }"
    @mousedown="handleMousedown"
    @click="handleClickWrapper"
  >
    <div
      ref="wrapperRef"
      :class="getInputClasses"
      :role="role"
      data-testid="wrapper"
    >
      <!-- @slot icon -->
      <slot name="icon">
        <div
          v-if="icon"
          @click="handleClickIcon"
          class="mr-2"
          role="button"
        >
          <v-icon
            :name="icon"
            :class="classes.icon.value"
          ></v-icon>
        </div>
      </slot>

      <!-- @slot prepend -->
      <slot name="prepend"></slot>

      <div class="flex flex-1 flex-wrap">
        <!-- @slot input-extra -->
        <slot name="input-extra"></slot>
        <input
          v-model="localModel"
          ref="inputRef"
          :id="id"
          type="text"
          v-bind="$attrs"
          class="min-w-0 flex-1 border-0 bg-transparent p-0 outline-none focus:min-w-[64px] focus:outline-none"
          @blur="handleBlur"
        />
      </div>

      <!-- @slot append -->
      <slot name="append"></slot>

      <div class="flex items-center">
        <v-spinner
          v-if="useLoader"
          :class="{ visible: isLoading, invisible: !isLoading }"
          type="svg"
          mod-spinner="size:small"
          v-bind="spinner"
          class="mx-0.5"
        />
        <div
          v-if="clearable || customClearable"
          :class="classes.closeButtonWrapper.value"
        >
          <v-close-button
            v-bind="closeButton"
            aria-label="Close"
            class="ml-2"
            @click.stop="handleClickClearButton"
          ></v-close-button>
        </div>
        <!-- @slot input-control-extra -->
        <slot name="input-control-extra"></slot>
      </div>
    </div>
  </div>

  <v-form-text
    v-if="!noMessages && Object.keys(messages).length"
    :messages="messages"
    :state="state"
    :single-line-message="singleLineMessage"
    v-bind="formText"
    data-testid="error-messages"
  >
    <template
      v-for="(_, slot) of $slots"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="slotProps"
      ></slot>
    </template>
  </v-form-text>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, inject, useAttrs, toRef, nextTick, watch } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import vFormText from "./vFormText.vue";
import vCloseButton from "./vCloseButton.vue";
import vSpinner from "./vSpinner.vue";
import vIcon from "./vIcon.vue";
import {
  sharedProps,
  sharedModProps,
  sharedValidationProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("input", [
    "Input", "Icon", "CloseButtonWrapper", "Label",
  ]),
  ...sharedFormProps("input", { icon: true, clearable: true }),
  ...sharedValidationProps("input", {
    validateMode: "blur-silent",
  }),
  modelValue: {
    type: [String, Number, Array, Boolean, Number],
    default: "",
  },
  externalModel: {
    type: [String, Number, Array, Boolean, Number],
    default: undefined,
  },
  inline: {
    type: Boolean,
    default: defaultProps("input", "inline", false),
  },
  useLoader: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  singleLineMessage: {
    type: Boolean,
    default: defaultProps("input", "singleLineMessage", false),
  },
  width: {
    type: String,
    default: defaultProps("input", "width", ""),
  },
  label: {
    type: String,
    default: "",
  },
  noMessages: {
    type: Boolean,
    default: false,
  },
  spinner: {
    type: Object,
    default: defaultProps("input", "spinner", {}),
  },
  closeButton: {
    type: Object,
    default: defaultProps("input", "closeButton", {}),
  },
  formText: {
    type: Object,
    default: defaultProps("input", "formText", { class: "absolute" }),
  },
  customClearable: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:messages",
  "validation:state",
  "click:clear-button",
  "click:icon",
  "click:indicator",
]);

let attrs = useAttrs();

let { input } = inject("mods", {})

let elements = {
  input: null,
  icon: null,
  label: {
    fixed: "inline-block"
  },
  closeButtonWrapper: null,
}

let { classes, setState } = useTailwindStyles(props, input, elements)

let getInputClasses = computed(() => {
  return [
    "form-input flex items-center flex-1",
    classes.input.value,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
});

let wrapperClasses = computed(() => {
  return props.inline ? "inline-block align-middle group" : "flex flex-1 group";
});

let id = useUid("input", attrs);

let inputRef = ref(null);

let wrapperRef = ref(null);

let focus = () => {
  inputRef.value.focus();
};

let blur = () => {
  inputRef.value.blur();
};

let selectInputText = () => {
  inputRef.value.setSelectionRange(0, localModel.value.length);
};

let localModel = useLocalModel(props, emit);

// handle v-form

let form = inject("_form", {});

// validate

let emitValidationStatus = () => {
  emit("validation:status", status.value);
  emit("validation:state", state.value);
  emit("validation:messages", messages.value);
};

let externalModel = toRef(props, "externalModel");

let { rules, validateMode } = props;

let currentValidationModel =
  externalModel.value !== undefined ? externalModel : localModel;

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

watch(currentValidationModel, (value) => {
  validation.updateValue(value)
}, { immediate: true })

watch(state, (value) => {
  setState(value)
})

if (form.addToForm) {
  form.addToForm({...validation, status, messages, state})
}

// handle template events

let handleBlur = () => {
  nextTick(() => {
    validation.touch();
  });
};

let handleClickWrapper = () => {
  inputRef.value.focus();
};

let handleClickIcon = (ev) => {
  emit("click:icon", ev);
};

// prevent focus but allow inputRef to allow selection
let handleMousedown = (ev) => {
  if (ev.target === inputRef.value) {
    return;
  }
  ev.preventDefault();
};

let handleClickClearButton = () => {
  if (props.customClearable) {
    emit("click:clear-button");
    return;
  }

  if (localModel.value.length) {
    localModel.value = "";
  }
};

defineExpose({
  focus,
  blur,
  inputRef,
  selectInputText,
  reference: wrapperRef,
});
</script>

<style></style>
