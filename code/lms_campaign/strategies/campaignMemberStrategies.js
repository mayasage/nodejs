const strategies = {
  course: {
    create: () => Promise.resolve(),
    undoCreate: () => Promise.resolve(),
  },

  quiz: {
    create: () => Promise.resolve(),
    undoCreate: () => Promise.resolve(),
  },
}

export default strategies
