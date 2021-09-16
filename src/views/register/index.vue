<template>
	<div class="page">
		<van-nav-bar title="注册" left-arrow class="login-bar" @click-left="ClickBack" >
			
		</van-nav-bar>
		<div class="logo">
			<img src="../../assets/ruibite.png">
		</div>
		<van-form class="register-box">
			<van-field placeholder="请输入手机号" v-model="mobile" />
			<van-field placeholder="请输入密码" type="password" v-model="password"/>
			<van-field placeholder="请输入验证码" v-model="vercode">
				<template #button>
					<van-button size="small" type="primary" @click="sendSms">
						{{getSmsMsg}}
					</van-button>
				</template>
			</van-field>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit" @click="submit()">注册</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import { Dialog } from 'vant';
	export default {
		data() {
			return {

				wait: -1,
				timer: {},
				mobile: '',
				password:'',
				vercode:''
			}
		},
		computed: {
			getSmsMsg: function() {
				return this.wait == -1 ? '发送验证码' : '重新发送(' + this.wait + 's)'
			}
		},
 
		methods: {
			 ClickBack(){
			        this.$router.go(-1);
			  },
			sendSms() {
				if (this.wait <= 0) {
					this.wait = 60;
					this.timer = setInterval(() => {
						this.wait--;
					}, 1000);


					this.axios.post('/user/sendSms', {
						mobile: this.mobile,
						type:"register"
					}).then(res => {
						console.log(res);
					})
				}

			},
			submit(){
				this.axios.post('/user/reg',{username:this.mobile,password:this.password,vercode:this.vercode}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						Dialog.alert({thtle: '提示信息',	message:res.data.msg,})
						this.$router.push('/login')
					}else{
						Dialog.alert({thtle: '提示信息',	message:res.data.msg,})
					}
				})
			}
		},
		watch: {
			wait: function(val) {
				if (val <= 0) {
					clearInterval(this.timer);
				}
			}
		}
	}
</script>

<style lang="less">
	.login-bar {
		.van-icon {
			color: #333;
			font-size: 18px;
		}
	}

	.logo {
		text-align: center;
		width: 100px;
		height: 100px;
		margin: 30px auto;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.van-cell {
		background-color: #fff;
		margin: 15px 0;
		border-radius: 7px;

	}

	.register-box {
		margin: 0 20px;
	}
</style>
