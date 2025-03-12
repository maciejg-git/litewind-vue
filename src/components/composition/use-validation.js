import { globalValidators } from "./validators.js";
export { validationMessages, globalValidators } from "./validators.js"

export default function useValidation(input, updateValidation) {
  let {
    name = "input",
    value,
    dirty = false,
    touched = false,
    validated = false,
    stateChanged = false,
    rules = [],
    mode = "blur-silent",
    messages: validationMessages = {},
  } = input;

  let [validateOn, validateMode] = [
    "blur-silent",
    "blur-eager",
    "form-silent",
    "form-eager",
    "immediate-eager",
  ].includes(mode)
    ? mode.split("-")
    : ["blur", "silent"];

  let isOptional = (value) => {
    return (
      !rules.includes("required") &&
      (value === "" ||
        value === false ||
        (Array.isArray(value) && value.length === 0))
    );
  };

  let validate = (value) => {
    let status = {};
    let messages = {};

    status.valid = rules.reduce((valid, i) => {
      let [rule, ruleValue] =
        typeof i === "string" ? [i, null] : Object.entries(i)[0];

      let validator =
        (typeof ruleValue === "function" && ruleValue) ||
        globalValidators[rule];

      if (!validator) return valid;

      status[rule] = false;

      let res = validator(value, ruleValue);

      if (res === true) {
        status[rule] = true;
      } else {
        messages[rule] =
          validationMessages[rule]?.replace("%d", ruleValue) || res;
      }

      return valid && status[rule];
    }, true);

    status.optional = isOptional(value);

    return { status, messages };
  };

  let on = (event, updatedValue) => {
    value = updatedValue !== undefined ? updatedValue : value;
    let res = validate(value);

    touched = touched || event === "touch";
    validated = validated || event === "formValidate";
    dirty = dirty || !!(value && !!value.length);

    res.status = { ...res.status, touched, validated, dirty };
    res.state = updateState(res.status);

    stateChanged = stateChanged || res.state !== "";

    updateValidation(res);
  };

  let updateState = (status) => {
    let { optional, valid } = status;

    // optional input (not required and empty) cannot be valid or invalid,
    // return defalut state
    if (optional) {
      return "";
    }

    // input has not been yet interacted in any way, return current state
    if (!dirty && !touched && !validated) {
      return "";
    }

    // input is validated manually, return current state
    if (validateOn === "form" && !validated) {
      return "";
    }

    // input is validated on blur, return current state
    if (validateOn === "blur" && !touched && !validated) {
      return "";
    }

    // input is validated immediately, has been touched or validated manually
    // and can change state
    // for invalid inputs always return invalid state
    if (!valid) {
      return "invalid";
    }

    // for valid inputs return valid only in eager mode or when changing
    // from non default state
    if (validateMode === "eager" || stateChanged) {
      return "valid";
    }

    // return default state
    return "";
  };

  // reset

  let reset = () => {
    dirty = false;
    touched = false;
    validated = false;
    stateChanged = false;
    updateValidation({ status: {}, messages: {}, state: "" });
  };

  return {
    name,
    touch: () => on("touch"),
    formValidate: () => on("formValidate"),
    updateValue: (value) => on("valueUpdate", value),
    reset,
  };
}
