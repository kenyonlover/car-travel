<template>
	<view class="content">
		<view class="uni-list">
			<block v-for="(value, index) in listData" :key="index">
				<view class="uni-list-cell info-box" hover-class="uni-list-cell-hover" @click="selectValue(value)">
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top info-box-tittle">{{ value.routeCode }}</view>
							<view class="info-box-context">
								<view class="info-box-context-name">货品</view>
								<view class="info-box-context-value">{{value.goodsName}}</view>
							</view>
							<view class="info-box-context">
								<view class="info-box-context-name">路线</view>
								<view class="info-box-context-value">{{value.routeName}}</view>
							</view>
							<view class="uni-media-list-text-bottom">
								<text class="info-box-bottom">备注</text>
								<text class="info-box-bottom">{{ value.note }}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
			}
		},
		onLoad(event) {
			let haveToken = this.haveToken();
			if(haveToken){
				/**
				 * 货品选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/routeSelect/' + event.goodsId,
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							this.listData = res.data.list;
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
			selectValue: function(event) {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1];   //当前页面
				var prevPage = pages[pages.length - 2];  //上一个页面
				//将前一页的address和address_id修改为当前选中的
				prevPage._data.dataForm.loadingPoint = event.routeId;
				prevPage._data.dataForm.loadingPointName = event.routeName;
				//因为修改的是data里面的绑定数据，所以返回后页面数据会直接显示修改后的
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.content{
		width: 96%;
		margin-left: 2%;
	}
	.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
	}
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	.uni-media-list-text-top {
		height: 74rpx;
		overflow: hidden;
	}
	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.info-box{
		margin: 10px;
		border: #CCCCCC solid 1px;
		border-radius: 10px;
		padding: 10px;
	}
	.info-box-tittle{
		width: 100%;
		color: #f33e54;
		height: 30px;
		line-height: 30px;
		border-bottom: #CCCCCC solid 1px;
		font-size: 16px;
	}
	.info-box-context{
		border-bottom: #CCCCCC solid 1px;
		position: relative;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
	}
	.info-box-context-name{
		float:left;
		color: #8F8F94;
		margin-left: 10px;
	}
	.info-box-context-value{
		float:right;
		margin-right: 10px;
	}
	.info-box-bottom{
		margin-top: 5px;
		height: 15px;
		line-height: 15px;
		color: #CCCCCC;
		font-size: 10px;
	}
</style>
