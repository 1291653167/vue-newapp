<template>
	<div>
		<van-nav-bar title="手机快速登录" class="login-bar" left-text="注册" @click-left='goRegister'
		@click-right="goIndex">
			<!-- <template #left>
				<router-link to="/reg" class="to-reg">注册</router-link>
			</template> -->
			<template #right>
				<van-icon name="cross" size='24' color="#333" />
			</template>
		</van-nav-bar>
		<div class="form">
			<div class="logo">
				<img src="../../assets/ruibite.png">
			</div>
			<van-form>
				<div class="login-box">
					<van-field v-model="tel" placeholder="请输入手机号" />
					<van-field v-model="password" type="password" placeholder="请输入密码" />
				</div>
				<div style="margin:16px 40px;">
					<van-button round block type='info' native-type="submit" @click='submit'>登陆</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import { Dialog } from 'vant';
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				tel:'18339413550',
				password: '123456'
			}
		},
		components: {
			[Dialog.Component.name]: Dialog.Component,
		},
		methods: {
			submit() {
				if (this.tel == '' || this.Password == '') {
					
					Dialog.alert({thtle: '提示信息',	message: '请正确填写信息',}) 
				}else{
					this.axios.post('/user/login',{username:this.tel,password:this.password}).then(res=>{
						
						if(res.data.code!=0){
							Dialog.alert({message: res.data.msg})
						}else{
							console.log(res);
							//this.$store.token=res.data.token;
							  //this.$store.commit('setToken',res.data.token);
							this.$store.commit('setToken',{token:res.data.token,tokenExpired:res.data.tokenExpired});
							this.$store.commit('setUser',{uid:res.data.uid,username:res.data.username});
						//	this.setToken()
							this.$router.push('/user');
							
						}
					})
				}
			},
			goRegister() {
				this.$router.push("/register")
			},
			//...mapMutations(),
			goIndex(){
				this.$router.push("/")
			}
		}
	}
</script>

<style lang="less">
	.van-nav-bar__text {
		color: #666;
	}

	.form {
		margin: 0 auto;
		margin-top: 30px;

		.logo {
			text-align: center;
			width: 100px;
			height: 100px;
			margin: 0 auto;
			margin-bottom: 30px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.login-box {
			margin: 0 15px;
			border-radius: 7px;
			overflow: hidden;

			.van-field {
				height: 60px;

				input {
					line-height: 40px;
				}
			}
		}
	}
</style>
