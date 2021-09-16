<template>
	<div>
		<div class="user-info">
			<van-cell-group :border="false">
				<van-cell title="单元格" value="内容">
					<template #title>
						<div class="info">
							<div class="icons">
								<img src="../../assets/ruibite.png">
							</div>
							<span>{{user.username}}</span>
						</div>
					</template>
					<template #default>
						<div class="setting">
							<router-link to='user-edit'><van-icon name="setting-o" size="24" /></router-link>
						</div>
					</template>
				</van-cell>
			</van-cell-group>
			<van-grid :column-num="3" :border="false">
				<van-grid-item>
					<template #default>
						<div class="text-warp">
							<div class="num"> 3 </div>
							<div class="text">文章</div>
						</div>
					</template>
				</van-grid-item>
				<van-grid-item>
					<template #default>
						<div class="text-warp">
							<div class="num"> 66 </div>
							<div class="text">点赞</div>
						</div>
					</template>
				</van-grid-item>
				<van-grid-item>
					<template #default>
						<div class="text-warp">
							<div class="num"> 5 </div>
							<div class="text">收藏</div>
						</div>
					</template>
				</van-grid-item>
			</van-grid>
		</div>
		<div class="list">
			<van-grid :column-num="2" >
				<van-grid-item>
					<template #default>
						<div class="text-warp">
							<div class="text" style="font-size: 18px">关注</div>
						</div>
					</template>
				</van-grid-item>
				<van-grid-item>
					<template #default>
						<div class="text-warp">
							<div class="text" style="font-size: 18px">收藏</div>
						</div>
					</template>
				</van-grid-item>
			</van-grid>
		</div>
		<div class="op">
			<van-cell  title="修改密码" is-link />
			<van-cell  title="联系我们" is-link />
			<van-cell  title="关于我们" is-link />
		</div>
		<div class="logout">
			<van-cell title="退出登录" @click="logout"/>
		</div>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item icon="add-o">发布</van-tabbar-item>
			<van-tabbar-item icon="manager-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				user:{}
			}
		},
		methods:{
			logout(){
				this.$store.commit('logout' );
				this.$router.push("/login")
			}
		},
		created(){
		    // console.log(this.$store.getters.getToken);
			// console.log(111);
			this.axios.post('/user/getuserInfo',{token:this.$store.getters.getToken}).then(res=>{
				console.log(res);
				this.user=res.data.userInfo;
			})
		}
	}
</script>

<style lang="less">
	.user-info {
		background:linear-gradient(#00aaff,#49b6ff,#acddff);
		padding: 15px 0;
		.van-cell-group{
			background-color: transparent;
			.van-cell{
				background-color: transparent;
			}
		} 
		.van-grid-item__content{
			background-color: transparent;
			 
		}
		.info {
			display: flex;
			align-items: center; //交叉
			color: #fff;
			font-size: 18px;
			font-weight: bold;
			.icons {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				background-color: #FFF;
				text-align: center;
				margin-right: 10px;
				 
				img {
					width: 50px;
					margin-top: 5px;
				}
			}
		}

		.setting {
			height: 60px;
			line-height: 60px;
			color: #6e6e6e;
		}

	}

	.list {
		margin: 15px 10px;
		border-radius: 7px;
		overflow: hidden;
		.van-grid-item__content{
			padding: 17px 0;
		}
	}

	.op {
		margin: 15px 10px;
		border-radius: 7px;
		overflow: hidden;
	}

	.logout {
		margin: 15px 10px;
		border-radius: 7px;
		text-align: center;
		overflow: hidden;
	}
	.text-warp{
		text-align: center;
		.num{
			margin-bottom: 5px;
			font-size: 19px;
		}
		.text{
			font-size: 14px;
			color: #555555;
		}
	}
</style>
