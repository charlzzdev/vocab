const state = {
  data: {
    email: 'Guest',
    gamesPlayed: 0,
    points: {
      byWord: {},
      overall: 0
    },
    secondsSpent: 0,
    accuracy: 0,
    timeSpent: '00:00:00',
    recentlyMistakenWords: []
  }
};

const mutations = {
  setState: (state, newState) => {
    state.data = { ...state.data, ...newState };
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
