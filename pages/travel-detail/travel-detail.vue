<template>
	<view class="content">
		<h3 class="title">运输单详情</h3>
		<view class="context">
			<view class="context-name">运输编码</view>
			<view class="context-value">{{detail.carTravelCode}}</view>
		</view>
		<view class="context">
			<view class="context-name">发货方</view>
			<view class="context-value">{{detail.shipperName}}</view>
		</view>
		<view class="context">
			<view class="context-name">收货方</view>
			<view class="context-value">{{detail.receiverName}}</view>
		</view>
		<view class="context">
			<view class="context-name">承运单位</view>
			<view class="context-value">{{detail.carrierName}}</view>
		</view>
		<view class="context">
			<view class="context-name">货品</view>
			<view class="context-value">{{detail.goodsName}}</view>
		</view>
		<view class="context">
			<view class="context-name">车牌</view>
			<view class="context-value">{{detail.carInfoName}}</view>
		</view>
		<view class="context">
			<view class="context-name">驾驶员</view>
			<view class="context-value">{{detail.driverName}}</view>
		</view>
		<view class="context">
			<view class="context-name">收货日期</view>
			<view class="context-value">{{detail.receiveDate}}</view>
		</view>
		<view class="context">
			<view class="context-name">毛重</view>
			<view class="context-value">{{detail.grossWeight}}</view>
		</view>
		<view class="context">
			<view class="context-name">皮重</view>
			<view class="context-value">{{detail.tareWeight}}</view>
		</view>
		<view class="context">
			<view class="context-name">净重</view>
			<view class="context-value">{{detail.netWeight}}</view>
		</view>
		<view class="context">
			<view class="context-name">计量单位</view>
			<view class="context-value">{{detail.measurementName}}</view>
		</view>
		<view class="context">
			<view class="context-name">发货方日期</view>
			<view class="context-value">{{detail.deliveryDate}}</view>
		</view>
		<view class="context">
			<view class="context-name">发货方净重</view>
			<view class="context-value">{{detail.deliveryNetWeight}}</view>
		</view>
		<view class="context">
			<view class="context-name">路线</view>
			<view class="context-value">{{detail.loadingPointName}}</view>
		</view>
		<view class="context">
			<view class="context-name">运输编码</view>
			<view class="context-value">{{detail.carTravelCode}}</view>
		</view>
		<view class="context">
			<view class="context-name">装车费</view>
			<view class="context-value">{{detail.loadingFee}}</view>
		</view>
		<view class="context">
			<view class="context-name">过磅费</view>
			<view class="context-value">{{detail.weighingFee}}</view>
		</view>
		<view class="context">
			<view class="context-name">是否入库</view>
			<view class="context-value">{{detail.isStorage}}</view>
		</view>
		<view class="context">
			<view class="context-name">是否出库</view>
			<view class="context-value">{{detail.isOutbound == 1 ? '是' : '否'}}</view>
		</view>
		<view class="context">
			<view class="context-name">是否核对</view>
			<view class="context-value">{{detail.isCheck == 1 ? '是' : '否'}}</view>
		</view>
		<view class="context">
			<view class="context-name">创建人</view>
			<view class="context-value">{{detail.createrName == 1 ? '是' : '否'}}</view>
		</view>
		<view class="context">
			<view class="context-name">备注</view>
			<view class="context-value">{{detail.note}}</view>
		</view>
		<view class="context">
			<view class="context-name">创建时间</view>
			<view class="context-value">{{detail.createtime}}</view>
		</view>
		<view class="context">
			<view class="context-name">修改操作人</view>
			<view class="context-value">{{detail.reviserName}}</view>
		</view>
		<view class="context">
			<view class="context-name">修改操作时间</view>
			<view class="context-value">{{detail.revisetime}}</view>
		</view>
		<view class="context">
			<view class="context-name">核对操作人</view>
			<view class="context-value">{{detail.checkerName}}</view>
		</view>
		<view class="context">
			<view class="context-name">核对操作时间</view>
			<view class="context-value">{{detail.checktime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(event) {
			let haveToken = this.haveToken();
			if(haveToken){
				try {
					this.detail = JSON.parse(decodeURIComponent(event.detail));
				} catch (error) {
					this.detail = JSON.parse(event.detail);
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		width: 100%;
	}
	.title{
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		border-bottom: #CCCCCC solid 1px;
	}
	.context{
		width: 90%;
		margin-left: 5%;
		height: 40px;
		line-height: 40px;
		position: relative;
		border-bottom: #CCCCCC solid 1px;
	}
	.context-name{
		float:left;
		color: #8F8F94;
	}
	.context-value{
		float:right;
	}
</style>
