import AjaxApiService from "../../services/AjaxApiService";

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    insert(state, payload) {
      state.items.push(payload);
    },
    update(state, payload) {
      state.items = state.items.map(item => {
        if (item.id === payload.id) {
          item = { ...item, ...payload.sets };
        }
        return item;
      });
    }
  },
  actions: {
    async insert({ dispatch, commit, state }, payload) {
      const res = await AjaxApiService.post("/api/v2/leads/insert", {
        sets: payload
      });
      commit("insert", res.lead);
      return res.lead;
    },
    async update({ dispatch, commit, state }, payload) {
      await AjaxApiService.post("/api/v1/leads/update", {
        id: payload.id,
        sets: payload.sets
      });
      commit("update", payload);
    }
  }
};
