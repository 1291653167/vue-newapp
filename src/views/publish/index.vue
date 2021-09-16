<template>
	<div class="page">
		<van-nav-bar title="发布文章"  />
		<div class="publish-divider">
			<van-divider>请填写发布内容</van-divider>
		</div>
		<van-form>
			<div class="login-box">
				<van-cell title='请填写发布内容' />
				<van-popup v-model="showPopup" position='bottom' round>
					<van-picker show-toolbar :columns="columns" @cancel="showPopup = false" @confirm="selected" />
				</van-popup>
				<van-field label="新闻分类" readonly clickable :value="cateName" @click="showPopup=true" />
				<van-field placeholder="请输入标题" v-model="title" />
				<van-field type="textarea" rows="3" placeholder="请输入内容" v-model="content" />
			</div>
			<div style="margin:16px 40px;">
				<van-button round block type='info' @click="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import {
		Dialog
	} from 'vant';
	export default {
		data() {
			return {
				showPopup: false,
				columns: [],
				cateName: "",
				catelists: [],
				title: '',
				content: '',
				cateId: "",
			}
		},
		methods: {
			selected(value, index) {
				//console.log(value)
				//console.log(index)
				this.showPopup = false
				this.cateName = value;
				//console.log(this.catelists[index]);
				this.cateId = this.catelists[index]._id;
			},
		 
			submit() {

				let obj = {
					title: this.title,
					content: this.content,
					cate_name: this.cateName,
					cate_id: this.cateId,
					author: this.$store.getters.getUserName,
					author_id: this.$store.getters.getUid,
				}
				console.log(obj);
				this.axios.post("/api/add_article", obj).then(res => {
					//	console.log(res);
					if (res.data.code == 0) {
						Dialog.alert({
							message: '文章发布成功,继续发布'
						})
					}
				})
			},

		},
		created() {
			this.axios.post('/api/get_cate_list').then(res => {
				//console.log(res);
				this.catelists = res.data.data;
				this.catelists.forEach(value => {
					//value.name;
					this.columns.push(value.name)
				})
			})
		},

	}
</script>

<style lang="less">
	.van-nav-bar__left {
		.van-icon {
			color: #fff;
		}

		.van-nav-bar__text {
			color: #fff;
			padding-top: 3px;
		}
	}

	.van-nav-bar__content {
		background-color: #03aaff;
	}

	.publish-divider {
		background-color: #fff;
		padding: 5px 0;
		margin: 15px 10px;
		border-radius: 7px;
	}

	.van-divider {
		border-style: none;
	}

	.login-box {
		margin: 0 10px;
		border-radius: 7px;
		overflow: hidden;
	}
</style>
