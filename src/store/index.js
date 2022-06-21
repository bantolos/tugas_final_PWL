import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    keranjang: []
  },
  getters: {
    user: (state) => state.user,
    keranjang: (state) => state.keranjang,
  },
  actions: {
    setUser({commit}, data) {
      commit("setUser", data);
    },
    tambahItemKeKeranjang({commit}, item) {
      commit("tambahItemKeKeranjang", item);
    },
    tambahJumlahItemKeranjang({commit}, id) {
      commit("tambahJumlahItemKeranjang", id);
    },
    kurangiJumlahItemKeranjang({commit}, id) {
      commit("kurangiJumlahItemKeranjang", id);
    },
    hapusItemDariKeranjang({commit}, id) {
      commit("hapusItemDariKeranjang", id);
    },
    kosongkanKeranjang({commit}) {
      commit("kosongkanKeranjang");
    },
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    tambahItemKeKeranjang(state, item) {
      const addedItem = state.keranjang.find(produk => produk.id === item.id);
      if (addedItem) {
        addedItem.jumlah++;
      } else {
        state.keranjang.push({...item, jumlah: 1});
      }
    },
    tambahJumlahItemKeranjang(state, id) {
      const currentItem = state.keranjang.find(produk => produk.id === id);
      currentItem.jumlah++;
    },
    kurangiJumlahItemKeranjang(state, id) {
      const currentItem = state.keranjang.find(produk => produk.id === id);
      if(currentItem.jumlah > 1) {
        currentItem.jumlah--;
      } else {
        state.keranjang = state.keranjang.filter((produk) => produk.id !== id);
      }
    },
    hapusItemDariKeranjang(state, id) {
      state.keranjang = state.keranjang.filter((produk) => produk.id !== id);
    },
    kosongkanKeranjang(state) {
      state.keranjang = [];
    },
  },
  modules: {
  },
})
