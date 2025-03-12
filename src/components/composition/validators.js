export let validationMessages = {
  required: "This field is required",
  alpha: "Please enter only letters",
  numeric: "Please enter only numbers",
  alphanumeric: "Please enter only letters or numbers",
  minLength: "Please enter at least %d characters",
  maxLength: "Please enter up to %d characters",
  minElements: "Please select at least %d elements",
  maxElements: "Please select at least %d elements",
  minValue: "",
  maxValue: "",
  email: "Please enter valid email address",
  atLeastOneUppercase: "Please enter at least one uppercase character",
  atLeastOneLowercase: "Please enter at least one lowercase character",
  atLeastOneDigit: "Please enter at least one numeric character",
  atLeastOneSpecial: "Please enter at least one special character",
  sameAs: ""
};

export let globalValidators = {
  required: (value, isRequired) => {
    if (typeof value === "boolean") return value || validationMessages.required
    if (Array.isArray(value)) return !!value.length || validationMessages.required;
    return !!value && !!value.trim() || validationMessages.required;
  },
  minLength: (value, length) => {
    return value.length >= length || validationMessages.minLength.replace('%d', length);
  },
  maxLength: (value, length) => {
    return value.length <= length || validationMessages.maxLength.replace('%d', length);
  },
  minElements: (value, length) => {
    return value.length >= length || validationMessages.minLength.replace('%d', length);
  },
  maxElements: (value, length) => {
    return value.length <= length || validationMessages.maxLength.replace('%d', length);
  },
  alpha: (value) => {
    return /^[a-zA-Z]+$/.test(value) || validationMessages.alpha;
  },
  numeric: (value) => {
    return /^[0-9]+$/.test(value) || validationMessages.numeric;
  },
  alphanumeric: (value) => {
    return /^[a-zA-Z0-9]+$/.test(value) || validationMessages.alphanumeric;
  },
  maxValue: (value, max) => {
    return Number(value) <= max || validationMessages.maxValue.replace('%d', max);
  },
  minValue: (value, min) => {
    return Number(value) >= min || validationMessages.minValue.replace('%d', min);
  },
  email: (value) => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      value
    ) || validationMessages.email;
  },
  atLeastOneUppercase: (value) => {
    return /[A-Z]/.test(value) || validationMessages.atLeastOneUppercase;
  },
  atLeastOneLowercase: (value) => {
    return /[a-z]/.test(value) || validationMessages.atLeastOneLowercase;
  },
  atLeastOneSpecial: (value) => {
    return /[^a-zA-Z0-9]/.test(value) || validationMessages.atLeastOneSpecial;
  },
  atLeastOneDigit: (value) => {
    return /[0-9]/.test(value) || validationMessages.atLeastOneDigit;
  },
  sameAs: (value, value2) => {
    return value === value2 || validationMessages.sameAs;
  }
};
