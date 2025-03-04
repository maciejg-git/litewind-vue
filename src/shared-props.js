import { correctPlacement } from "./const.js";
import { defaultProps } from "./defaultProps";

const sharedProps = () => {
  return {
    name: { type: String, default: "" },
  };
};

// popper props

const sharedFloatingUIProps = (component, defaults = {}) => {
  return {
    placement: {
      type: String,
      default: defaultProps(component, "placement", "bottom-start"),
      validator: function (v) {
        return correctPlacement.includes(v);
      },
    },
    offsetX: {
      type: Number,
      default: defaultProps(component, "offsetX", defaults.offsetX ?? 0),
    },
    offsetY: {
      type: Number,
      default: defaultProps(component, "offsetY", defaults.offsetY ?? 0),
    },
    flip: {
      type: Boolean,
      default: defaultProps(component, "flip", defaults.flip ?? true),
    },
    autoPlacement: {
      type: Boolean,
      default: defaultProps(component, "autoPlacement", false),
    },
  };
};

// style props

const sharedModProps = (component, elements = []) => {
  let props = elements.reduce((acc, element) => {
    let prop = "mod" + element

    return {
      ...acc,
      [prop]: {
        type: String,
        default: defaultProps(component, prop, "")
      }
    }
  }, {})

  return {
    ...props,
    base: {
      type: String,
      default: defaultProps(component, "base", component),
    },
    variant: {
      type: String,
      default: "",
    },
  };
};

const sharedValidationProps = (component, options) => {
  options = options || {};

  let props = {};

  if (options.validateMode) {
    props.validateMode = {
      type: String,
      default: options.validateMode || "blur-silent",
    };
  }

  return {
    ...props,
    rules: {
      type: Object,
      default: [],
    },
  };
};

// form props

const sharedFormProps = (component, options) => {
  options = options || {};

  let props = {};

  if (options.icon === true) {
    props.icon = {
      type: [String, Object],
      default: "",
    };
  }
  if (options.clearable === true) {
    props.clearable = {
      type: Boolean,
      default: defaultProps(component, "clearable", false),
    };
  }

  return props;
};

export {
  sharedProps,
  sharedFloatingUIProps,
  sharedModProps,
  sharedValidationProps,
  sharedFormProps,
};
