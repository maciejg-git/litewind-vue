let dropdown = {
  item: {
    classes: `
      w-full
      text-left
      text-sm
      focus:outline-none
      pr-4
      px-6
      py-3
      my-1
    `,
    variant: {
      default: `
        text-text-800
        focus:text-white
        hover:bg-secondary-100
        focus:bg-primary-500
        dark:text-text-300
        dark:focus:text-white
        dark:hover:bg-dark-700
        dark:focus:bg-primary-500
      `,
      active: `
        text-white
        bg-primary-500
        hover:bg-primary-600
        dark:text-white
        dark:bg-primary-500
        dark:hover:bg-primary-600
      `
    }
  },
  header: {
    classes: `
      text-left
      font-semibold
      text-sm
      uppercase
      px-6
      py-2
      opacity-70
      text-text-800/80
      dark:text-text-300
    `
  }
}

let relaxedDropdown = {
  item: {
    classes: `
      w-11/12
      focus:outline-none
      rounded
      text-sm
      text-left
      px-4 
      py-4
      my-1
    `,
    variant: {
      default: `
        text-text-800
        focus:text-white
        hover:bg-secondary-100
        focus:bg-primary-500
        dark:text-text-300
        dark:focus:text-white
        dark:hover:bg-dark-700
        dark:focus:bg-primary-500;
      `,
      active: `
        text-white
        bg-primary-500
        hover:bg-primary-600
        dark:text-white
        dark:bg-primary-500
        dark:hover:bg-primary-600
      `
    }
  },
  header: {
    classes: `
      w-11/12
      text-left
      font-semibold
      text-sm
      uppercase
      px-4
      py-4
      my-1
      opacity-70
      text-text-800/80
      dark:text-text-300
    `
  }
}

let cssVariables = {
  "--dropdown-transition-duration": "0.2s",
  "--dropdown-transition-slide": "-15px",
  "--dropdown-transition-scale": "0.2",
}

export default {
  dropdown,
  relaxedDropdown,
  cssVariables,
}
