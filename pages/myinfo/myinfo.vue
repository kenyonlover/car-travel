<template>
	<view>
		<view class="context">
			<image class="userimage" mode="widthFix" src="../../static/img/avatar.png" />
			<view class="usertext">{{user.nickname}}</view>
			<view class="usertext">{{user.mobile}}</view>
			<view class="usertext">{{user.email}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			let haveToken = this.haveToken();
			if(haveToken){
				uni.request({
					url: this.baseUrl + '/h5/userInfo',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							this.user = res.data.user;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: (res, code) => {
						uni.showToast({
							title: JSON.stringify(res),
							icon: "none"
						});
					}
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.context{
		text-align: center;
		position: relative;
		padding-top: 300rpx;
	}
	.userimage{
		margin-bottom: 10rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
	}
	.usertext{
		height: 40px;
		line-height: 40px;
	}
</style>
