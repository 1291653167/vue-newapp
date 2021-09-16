<template>
	<div class="page">
		<van-nav-bar title="文章详情" left-arrow  @click-left="ClickBack"/>
		<div class="acticle-detail">
			<h1 class="van-multi-ellipsis--l2">
				{{article.title}}
			</h1>
			<van-cell>
				<template #icon>
					<van-image width='50' height="50" :src="require('../../assets/ruibite.png')" />
				</template>
				<template #title>
					<div>作者:{{article.author}}</div>
				</template>
				<template #label>
					<div>日期:{{article.time| showTime}}</div>
				</template>
				<van-button type="default" icon="plus" size="small" round @click="Favs">
					<span v-if="article.fav">已关注</span>
					<span v-else>未关注</span>
				</van-button>
			</van-cell>
			<div class="detail" v-html="article.content">
				<!-- {{article.content}} -->
			</div>
			<div class="like" @click="likes">
				<van-icon name="thumb-circle-o" size="20" color="#ee291f" />
				<span class="count">{{article.like}}</span>
			</div>

			<div class="comment-list">
				<van-cell v-for="item in commentLists" :key="item._id">
					<template #icon>
						<van-image width='40' height="40" :src="require('../../assets/ruibite.png')" />
					</template>
					<template #title>
						<div class="author">
							<div class="reply-name">
								小张
							</div>

						</div>
						<div class="van-multi-ellipsis--l3">
							{{item.content}}
						</div>
						<div class="date">
							<span>
								{{item.create_time | showTime}}
							</span>
							<van-badge :content="item.reply_num+'个回复'" />
						</div>
					</template>

				</van-cell>
			</div>

		</div>
		<div class="acticle-bottom">
			<van-button class="btn" type="default" round size="small" @click="show=true">点击评论</van-button>
			<van-icon name="comment-o" />
			<van-icon name="star" color="#ee291f" />
			<van-icon name="thumb-circle-o" />
			<van-icon name="share" />

		</div>
		<van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
			<van-form>
				<van-field type="textarea" rows="4" maxlength="50" show-word-limit v-model="comment">

				</van-field>
				<van-button round size="large" type="info" @click="save">
					保存
				</van-button>
			</van-form>
		</van-popup>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				article: {},
				commentLists: [],
				comment: "",
				like: false,
				fav: false
			}
		},
		filters: {
			showTime(value) {
				let date = new Date(value);
				//console.log(date.getFullYear());
				return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '号';
			},

		},
		methods: {
			ClickBack(){
			       this.$router.go(-1);
			 },
			Favs() {
				if (!this.article.fav) {

					this.axios.post("/api/add_fav", {
						user_id: this.$store.getters.getUid,
						article_id: this.$route.params.id
					}).then(res => {
						// console.log(res)
						this.$set(this.article,"fav",++this.article.fav)
					})
				} else {

					this.axios.post("/api/remove_fav", {
						user_id: this.$store.getters.getUid,
						article_id: this.$route.params.id
					}).then(res => {
						// console.log(res)
						// this.fav = true;
						this.$set(this.article,"fav",--this.article.fav)
					})
				}
			},
			likes() {
				if (this.like) {
					this.axios.post("/api/unlike", {
						user_id: this.$store.getters.getUid,
						article_id: this.$route.params.id
					}).then(res => {
						// consle.log(res);
						this.$set(this.article, "like", --this.article.like);
						this.like = false
					})
				} else {
					this.axios.post("/api/like", {
						user_id: this.$store.getters.getUid,
						article_id: this.$route.params.id
					}).then(res => {
						// consle.log(res);
						this.$set(this.article, "like", ++this.article.like);
						this.like = true
					})
				}

			},
			save() {
				let obj = {
					user_id: this.$store.getters.getUid,
					article_id: this.$route.params.id,
					comment_type: 0,
					content: this.comment
				}
				this.axios.post("/api/add_comment", obj).then(res => {
					console.log(res);
					this.show = false;
					this.get_comment_list()
				})
			},
			get_comment_list() {
				this.axios.post("/api/get_comment_list", {
					article_id: this.$route.params.id
				}).then(res => {

					this.commentLists = res.data.data
				})
			}
		},
		created() {
			// console.log(this.$route.params.id);
			this.axios.post("/api/get_article_detail", {
				article_id: this.$route.params.id,
			}).then(res => {
				console.log(res);
				this.article = res.data.data;
			})
			this.get_comment_list()
		}
	}
</script>

<style lang="less">
	.van-nav-bar__left {
		.van-icon {
			color: #fff;

		}
	}

	.van-nav-bar__content {
		background-color: #03aaff;
	}

	.acticle-detail {
		background-color: #fff;

		padding-top: 20px;

		h1 {
			font-size: 24px;

			padding: 0 15px;
		}
	}

	.like {
		display: flex;
		justify-content: flex-end;
		margin-right: 20px;
	}

	.author {
		display: flex;
		justify-content: space-between; //两端对齐


	}

	.detail {
		padding: 15px;
	}

	.acticle-bottom {
		height: 40px;
		background-color: #fff;
		border-top: 1px solid #eee;
		display: flex;
		align-items: center;

		.btn {
			width: 200px;
			margin: 0 10px;
			margin-right: 20px;
		}

		.van-icon {
			flex: 1;
			font-size: 24px;
		}
	}
</style>
