import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	 token:''||localStorage.getItem('token'),
	 tokenExpired:''||localStorage.getItem('tokenExpired'),
	 uid:""||localStorage.getItem('uid'),
	 username:''||localStorage.getItem('username'),
  },
  getters:{
	  getToken(state){
		  return state.token; 
	  },
	  getUid(state){
		  return state.uid;
	  },
	  getUserName(state){
		  return state.username;
	  }
  },
  mutations:{
	  setToken(state,data){
		  // console.log(state);
		  // console.log(data);
		  state.token=data.token;
		  state.tokenExpired=data.tokenExpired;
		  localStorage.setItem('token',data.token);
		  localStorage.setItem('tokenExpired',data.tokenExpired)
	  },
	  setUser(state,data){
		  state.uid=data.uid;
		  state.username=data.username;
		  localStorage.setItem('uid',data.uid);
		  localStorage.setItem('username',data.username)
	  },
	  logout(state ){
		  state.token='';
		  state.tokenExpired='';
		  localStorage.removeItem("token");
		  localStorage.removeItem("tokenExpired")
	  }
  },
  actions:{
	  setToken(ctx,data){
		  ctx.commit('setToken',data)
	  }
  },
  modules:{
	  
  }
})
