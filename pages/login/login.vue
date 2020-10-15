<template>
	<view>
		<view class="content">
			<h3 class="page-tittle">用户登录</h3>
			<form @submit="formSubmit">
				<view class="form-box">
					<view class="form-box-title">用户</view>
					<input class="form-box-input" name="username" placeholder="请输入用户编码" />
				</view>
				<view class="form-box">
					<view class="form-box-title">密码</view>
					<input class="form-box-input " name="password" password="true" placeholder="请输入密码" />
				</view>
				<view class="button-box">
					<button form-type="submit">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			formSubmit: function(e) {
				var formdata = e.detail.value;
				if(!formdata.username){
					uni.showToast({
						title: '用户不能为空',
						icon: "none"
					});
					return;
				}
				if(!formdata.password){
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					});
					return;
				}
				uni.request({
					url: this.baseUrl + '/h5/login',
					method: 'POST',
					data: formdata,
					success: res => {
						if (res && res.data && res.data.code === 0) {
							this.setCookie('token', res.data.token, res.data.expire)
							uni.switchTab({
								url: '/pages/index/index',
								success: function(e) {
									var page = getCurrentPages().pop();
									if (page == undefined || page == null) 
										return; 
									page.getList(); 
								}
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	.content{
		width: 90%;
		margin-left: 5%;
	}
	.page-tittle{
		height: 160px;
		line-height: 160px;
		text-align: center;
		margin-bottom: 50px;
	}
	.form-box{
		width: 100%;
		position: relative;
		margin-bottom: 20px;
	}
	.form-box-title {
		width: 100rpx;
		float: left;
		height: 40px;
		line-height: 40px;
	}
	.form-box-input{
		height: 40px;
		line-height: 40px;
		border: #C0C0C0 solid 1px;
		border-radius: 10px;
		padding-left: 10px;
	}
	.button-box{
		width: 50%;
		margin-top: 50px;
		margin-left: 25%;
	}
</style>
