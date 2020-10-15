<template>
	<view class="content">
		<view class="uni-list">
			<block v-for="(value, index) in listData" :key="index">
				<view class="uni-list-cell info-box" hover-class="uni-list-cell-hover" @click="goDetail(value)">
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top info-box-tittle">{{ value.carTravelCode }}</view>
							<view class="info-box-context">
								<view class="info-box-context-name">货品</view>
								<view class="info-box-context-value">{{value.goodsName}}</view>
							</view>
							<view class="info-box-context">
								<view class="info-box-context-name">计量</view>
								<view class="info-box-context-value">{{value.netWeight + value.measurementName}}</view>
							</view>
							<view class="info-box-context">
								<view class="info-box-context-name">发货方</view>
								<view class="info-box-context-value">{{value.shipperName}}</view>
							</view>
							<view class="info-box-context">
								<view class="info-box-context-name">收货方</view>
								<view class="info-box-context-value">{{value.receiverName}}</view>
							</view>
							<view class="info-box-context">
								<view class="info-box-context-name">承运单位</view>
								<view class="info-box-context-value">{{value.carrierName}}</view>
							</view>
							<view class="uni-media-list-text-bottom">
								<text class="info-box-bottom">{{ value.createrName }}</text>
								<text class="info-box-bottom">{{ value.createtime }}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				listData: [],
				last_id: 0,
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		onLoad() {
			let haveToken = this.haveToken();
			if(haveToken){
				this.getList();
			}
		},
		onPullDownRefresh() {
			this.reload = true;
			this.getList();
		},
		onReachBottom() {
			this.status = 'more';
			this.getList();
		},
		methods: {
			getList() {
				var data = {};
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					if(this.reload){
						data.minId = 0;
					}else{
						data.minId = this.last_id;
					}
				}
				uni.request({
					url: this.baseUrl + '/h5/travelList',
					data: data,
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let list = res.data.list;
							this.listData = this.listData.concat(list);
							this.last_id = this.listData[this.listData.length - 1].carTravelId;
							this.reload = false;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
							this.status = 'noMore';
						}
					},
					fail: (res, code) => {
						uni.showToast({
							title: JSON.stringify(res),
							icon: "none"
						});
						this.status = 'noMore';
					}
				});
			},
			goDetail: function(event) {
				uni.navigateTo({
					url: '../travel-detail/travel-detail?detail=' + encodeURIComponent(JSON.stringify(event))
				});
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
		/* width: 90%;
		margin-left: 5%;
		height: 30px;
		line-height: 30;
		position: relative; */
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
