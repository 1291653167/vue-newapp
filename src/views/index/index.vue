<template>
	<div class="page">
		<van-nav-bar class="index-bar">
			<template #title>
				<van-search class="search" placeholder="输入搜索关键字" />
			</template>
			<template #left>
				<van-icon name="apps-o" size="30" color="#FFF" />
			</template>
			<template #right>
				<van-button color="#0095df" size="small"  @click='submit'>登陆</van-button>
			</template>
		</van-nav-bar>
		<div class="lists">
			<van-tabs v-model="active" @change="change">
				<van-tab :title="data.name" v-for=' data in lists' :key='data._id'>
					<van-list>
						<router-link :to="{path:'/detail/'+item._id}" v-for="item in data.list" :key='item._id'>
						<van-cell ><!-- @click="navToDetail " -->
							<template #title>
								<div class="van-multi-ellipsis--l2">
									 {{item.title}}
								</div>
							</template>
							<template #label>
								<van-grid :column-num="2" :border="false">
									<van-grid-item v-for="(img,index) in item.imageSrc" :key="index">
										<van-image class="ac-img" :src="img" />
									</van-grid-item>

								</van-grid>
								<div class="author">
									<span>{{item.title}}</span>
									<span>{{item.comment}} 评论</span>
									<span>{{item.time | showTime}}</span>
								</div>
							</template>
						</van-cell>
						</router-link>
					</van-list>
				</van-tab>
				 
				<template #nav-right>
					<div class="nav-wrap">
						<van-icon name="wap-nav" />
					</div>
				</template>
			</van-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				lists:[]
			} 
		},
		filters:{
			showTime(value){
				let date = new Date(value);
				//console.log(date.getFullYear());
				return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'号';
			}
		},
	 
		methods:{
		 submit() {
		 	 
		 			//	this.setToken()
		 				this.$router.push('/user');
		 				
		 	 
		 	 
		 },
			change(i){ //i下标  v标题
				// console.log(this.lists[i]);
				this.axios.post('/api/get_article_list',{cate_id:this.lists[i]._id}).then(res=>{
					// console.log(res.data.data)
					this.lists[i].list = res.data.data;//不能监听对象属性改变
					this.$set(this.lists,i,this.lists[i]);
				})
			}
		},
		created() {
			this.axios.post('/api/get_cate_list').then(res=>{
				//console.log(res.data.data);
				this.lists=res.data.data;
				//console.log(this.lists[this.active])
				this.axios.post('/api/get_article_list',{cate_id:this.lists[this.active]._id,skip:0,limit:10}).then(res=>{
				//console.log(res.data.data);
				//this.lists[this.active].list=res.data.data;
				this.lists[this.active].list=res.data.data;
				this.$set(this.lists,this.active,this.lists[this.active]);
				//console.log(this.lists);
				})
			})
		}
	};
</script>

<style lang="less">
	.index-bar {
		background-color: #03aaff;

		.van-search {
			height: 34px;
			border-radius: 20px;
		}
	}

	.lists {
		.van-tabs__line {
			background-color: #03aaff;
		}

		//padding-right: 20px;
	}

	.nav-wrap {
		position: fixed;
		right: 0;
		top: 50px;
		width: 35px;
		font-size: 24px;
		background: #fff;
		text-align: center;
		line-height: 40px;
		border-left: 1px solid #f8f8f8;
	}

	.tabs {
		.van-tab {
			border-right: 1px solid #f8f8f8;
		}


	}

	.author {
		span {
			margin: 0 7px;
		}
	}
	.ac-img{
		height:130px;
		width: 150px;
	}
</style>
