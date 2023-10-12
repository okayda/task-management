// Used in DropStatus Component
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

// Used in SubInput Component
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

// Used in Overlay Component
export const FadeAnimated = {
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

// Used in all forms & modals with buttons
export const ClickAnimated = {
  scale: [1, 1.25, 1],
  transition: {
    duration: 0.3,
  },
};

// Used in all modals & forms components
export const OpenAnimated = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    transition: {
      duration: 0.15,
    },
  },

  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};
