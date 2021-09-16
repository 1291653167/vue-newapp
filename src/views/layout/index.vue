<template>
	<div>
		 <router-view> </router-view>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
			<van-tabbar-item icon="add-o" to='/publish'>发布</van-tabbar-item>
			<van-tabbar-item icon="manager-o" to='/user'>我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	 export default{
		 data(){
			 return{
				 active:0
			 }
		 }
	 }
</script>

<style>
</style>
