<template>
	<div class="page">
		<van-nav-bar left-arrow title="个人信息" class="login-bar" @click-left="ClickBack"></van-nav-bar>
		<van-cell-group class="info">
			<van-cell title="头像" value="1" is-link />
			<van-cell title="昵称" is-link :value='nickname' @click="showNick=true">
				<van-field v-model="nickname" placeholder="请输入昵称" v-if='showNick' />
			</van-cell>

			<van-cell title="性别" is-link :value='sex' @click='showSex=true' />
			<van-popup  v-model="showSex" position="bottom" round>
				<div class="box">
					<van-radio-group v-model="sex" direction="horizontal">
						<van-radio name="男">男</van-radio>
						<van-radio name="女">女</van-radio>
					</van-radio-group>
				</div>
			</van-popup>
			<van-cell title="生日" is-link :value='brirthday' @click="show=true" />
			<van-popup v-model="show" position="bottom" round>
				<van-datetime-picker v-model='currentDate' type="date" title='选择年月日' :min-date='minDate'
					:max-date='maxDate' @cancel="show=false" @confirm='confirmBir' />
			</van-popup>
		</van-cell-group>
		<van-button type="primary" size="small" @click="save">保存</van-button>
	</div>
</template>

<script>
	import {
		Dialog
	} from 'vant';
	export default {
		data() {
			return {
				sex: '男',
				brirthday: '2000.1.1',
				nickname: '呜呼1',
				show: false,
				minDate: new Date(1999, 0, 1), //月份0-11
				maxDate: new Date(2025, 12, 31),
				currentDate: new Date,
				showSex: false,
				showNick:false
			}
		},
		methods: {
			ClickBack(){
			       this.$router.go(-1);
			 },
			save() {
				let obj = {
					nickname: this.nickname,
					brirthday: this.brirthday,
					sex: this.sex,
					uid: this.$store.getters.getUid
				}
				this.axios.post('/user/editUserInfo', obj).then(res => {
					console.log(res);
					Dialog.alert({
						title: '提示信息',
						message: '保存成功',
					})
				})
			},
			confirmBir(value) {
				value.getFullYear()
				value.getMonth() + 1
				value.getDate()
				this.brirthday = value.getFullYear() + '.' + (value.getMonth() + 1) + '.' + value.getDate()
				this.show = false;

			}
		},
		created() {
			let obj = {
				token: this.$store.getters.getToken
			}
			this.axios.post('/user/getuserInfo', obj).then(res => {
				console.log(res)
				this.sex = !res.data.userInfo.sex ? this.sex : res.data.userInfo.sex;
				this.brirthday = !res.data.userInfo.brirthday ? this.brirthday : res.data.userInfo.brirthday;
				this.nickname = !res.data.userInfo.nickname ? this.nickname : res.data.userInfo.nickname;
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.login-bar {
		.van-icon {
			color: #333;
			font-size: 18px;
		}
	}

	.info {
		margin: 15px 10px 10px;
		border-radius: 7px;
		overflow: hidden;
	}

	.van-button {
		left: 81%;
		padding: 0 20px;
	}

	.box {
		margin: 30px;
	}
	.van-field{
		padding: 0;
	}
</style>
