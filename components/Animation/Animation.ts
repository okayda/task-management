// Was used in add task form component
export const ShowStatusAnimated = {
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
    display: "block",
  },

  exit: {
    y: -5,
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const ScaleAnimated = {
  hidden: {
    scale: 0,
    opacity: 0,
  },

  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },

  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Used in overlay component
export const Fade = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
