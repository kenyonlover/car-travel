<template>
	<view class="content">
		<h3 class="content-tittle">新建运输单</h3>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">发货方</view>
					<picker @change="shipperPickerChange" :range="shipperNameArray">
						<view class="uni-input">{{dataForm.shipperName}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">收货方</view>
					<picker @change="receiverPickerChange" :range="receiverNameArray">
						<view class="uni-input">{{dataForm.receiverName}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">承运单位</view>
					<picker @change="carrierPickerChange" :range="carrierNameArray">
						<view class="uni-input">{{dataForm.carrierName}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">货品</view>
					<picker @change="goodsPickerChange" :range="goodsNameArray">
						<view class="uni-input">{{dataForm.goodsName}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">车牌</view>
					<picker @change="carInfoPickerChange" :range="carInfoNameArray">
						<view class="uni-input">{{dataForm.carInfoName}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">收货日期</view>
					<picker mode="date" @change="receiveDatePickerChange">
						<view class="uni-input">{{dataForm.receiveDate}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">毛重</view>
					<input class="uni-input" type="number" @input="onWeightInput" v-model="dataForm.grossWeight" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">皮重</view>
					<input class="uni-input" type="number" @input="onWeightInput" v-model="dataForm.tareWeight" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">净重</view>
					<input class="uni-input" type="number" v-model="dataForm.netWeight" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">计量单位</view>
					<picker @change="measurementPickerChange" :range="measurementNameArray">
						<view class="uni-input">{{dataForm.measurementName}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">发货方日期</view>
					<picker mode="date" @change="deliveryDatePickerChange">
						<view class="uni-input">{{dataForm.deliveryDate}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">发货方净重</view>
					<input class="uni-input" type="number" v-model="dataForm.deliveryNetWeight" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">路线</view>
					<input class="uni-input" v-model="dataForm.loadingPointName" @click="routeClick" />
					<!-- <picker @change="loadingPointPickerChange" :range="loadingPointNameArray">
						<view class="uni-input">{{dataForm.loadingPointName}}</view>
					</picker> -->
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">装车费/元</view>
					<input class="uni-input" type="number" v-model="dataForm.loadingFee" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">过磅费/元</view>
					<input class="uni-input" type="number" v-model="dataForm.weighingFee" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">是否入库</view>
					<radio-group v-model="dataForm.isStorage">
						<label>
							<radio value="1" /><text>是</text>
						</label>
						<label>
							<radio value="0" checked="true" /><text>否</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">是否出库</view>
					<radio-group v-model="dataForm.isOutbound">
						<label>
							<radio value="1" /><text>是</text>
						</label>
						<label>
							<radio value="0" checked="true" /><text>否</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">备注</view>
					<input class="uni-input" v-model="dataForm.note" />
				</view>
				<view class="uni-btn-v submit-box">
					<button form-type="submit" class="submitbtn">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				shipperIdArray: [],
				shipperNameArray: [],
				receiverIdArray: [],
				receiverNameArray: [],
				carrierIdArray: [],
				carrierNameArray: [],
				goodsIdArray: [],
				goodsNameArray: [],
				carInfoIdArray: [],
				carInfoNameArray: [],
				measurementIdArray: [],
				measurementNameArray: [],
				dataForm: {
					shipperId: "",
					shipperName: "",
					receiverId: "",
					receiverName: "",
					carrierId: "",
					carrierName: "",
					goodsId: "",
					goodsName: "",
					carInfoId: "",
					carInfoName: "",
					receiveDate: "",
					grossWeight: '',
					tareWeight: '',
					netWeight: '',
					measurementId: "",
					measurementName: "",
					deliveryDate: "",
					deliveryNetWeight: '',
					loadingPoint: "",
					loadingPointName: "",
					dischargePoint: "",
					loadingFee: '',
					weighingFee: '',
					isStorage: 0,
					isOutbound: 0,
					note: ""
				}
			}
		},
		onLoad() {
			let haveToken = this.haveToken();
			if (haveToken) {
				/**
				 * 发货方选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/shipperSelect',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let shipper = res.data.list;
							for (let g in shipper) {
								this.shipperIdArray.push(shipper[g].travellingTraderId);
								this.shipperNameArray.push(shipper[g].traderName);
							}
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
				/**
				 * 收货方选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/receiverSelect',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let receiver = res.data.list;
							for (let g in receiver) {
								this.receiverIdArray.push(receiver[g].travellingTraderId);
								this.receiverNameArray.push(receiver[g].traderName);
							}
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
				/**
				 * 承运单位选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/carrierSelect',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let carrier = res.data.list;
							for (let g in carrier) {
								this.carrierIdArray.push(carrier[g].travellingTraderId);
								this.carrierNameArray.push(carrier[g].traderName);
							}
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
				/**
				 * 货品选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/goodsSelect',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let goods = res.data.list;
							for (let g in goods) {
								this.goodsIdArray.push(goods[g].goodsId);
								this.goodsNameArray.push(goods[g].goodsName);
							}
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
				/**
				 * 车辆选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/carInfoSelect',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let carInfo = res.data.list;
							for (let g in carInfo) {
								this.carInfoIdArray.push(carInfo[g].carInfoId);
								this.carInfoNameArray.push(carInfo[g].carNumber);
							}
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
				/**
				 * 计量单位选择器初始化
				 */
				uni.request({
					url: this.baseUrl + '/h5/measurementSelect',
					data: {},
					header: {
						'token': this.getCookie('token')
					},
					success: res => {
						if (res && res.data && res.data.code == 0) {
							let measurement = res.data.list;
							for (let g in measurement) {
								this.measurementIdArray.push(measurement[g].measurementId);
								this.measurementNameArray.push(measurement[g].measurementName);
							}
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
			goodsPickerChange: function(e) {
				this.dataForm.goodsId = this.goodsIdArray[e.target.value];
				this.dataForm.goodsName = this.goodsNameArray[e.target.value];
			},
			carInfoPickerChange: function(e) {
				this.dataForm.carInfoId = this.carInfoIdArray[e.target.value];
				this.dataForm.carInfoName = this.carInfoNameArray[e.target.value];
			},
			receiveDatePickerChange: function(e) {
				this.dataForm.receiveDate = e.detail.value
			},
			deliveryDatePickerChange: function(e) {
				this.dataForm.deliveryDate = e.detail.value
			},
			onWeightInput: function(event) {
				if (this.dataForm.grossWeight && this.dataForm.tareWeight) {
					this.dataForm.netWeight = this.dataForm.grossWeight - this.dataForm.tareWeight
				}
			},
			measurementPickerChange: function(e) {
				this.dataForm.measurementId = this.measurementIdArray[e.target.value];
				this.dataForm.measurementName = this.measurementNameArray[e.target.value];
			},
			shipperPickerChange: function(e) {
				this.dataForm.shipperId = this.shipperIdArray[e.target.value];
				this.dataForm.shipperName = this.shipperNameArray[e.target.value];
			},
			receiverPickerChange: function(e) {
				this.dataForm.receiverId = this.receiverIdArray[e.target.value];
				this.dataForm.receiverName = this.receiverNameArray[e.target.value];
			},
			carrierPickerChange: function(e) {
				this.dataForm.carrierId = this.carrierIdArray[e.target.value];
				this.dataForm.carrierName = this.carrierNameArray[e.target.value];
			},
			routeClick: function(e) {
				let goodsId = this.dataForm.goodsId;
				if (goodsId) {
					uni.navigateTo({
						url: '../release-detail-route/release-detail-route?goodsId=' + goodsId
					});
				} else {
					uni.showToast({
						title: '请先选择货品再选择路线',
						icon: "none"
					});
					return
				}
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "shipperId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择发货方"
					},
					{
						name: "receiverId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择收货方"
					},
					{
						name: "carrierId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择承运单位"
					},
					{
						name: "goodsId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择货品"
					},
					{
						name: "carInfoId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择车辆"
					},
					{
						name: "receiveDate",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择收货日期"
					},
					{
						name: "grossWeight",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择毛重"
					},
					{
						name: "tareWeight",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择皮重"
					},
					{
						name: "measurementId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择计量单位"
					},
					{
						name: "deliveryDate",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择发货方日期"
					},
					{
						name: "deliveryNetWeight",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择发货方净重"
					},
					{
						name: "loadingPoint",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择路线"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(this.dataForm, rule);
				if (checkRes) {
					uni.request({
						url: this.baseUrl + '/h5/saveCarTravel',
						method: 'POST',
						data: {
							shipperId: this.dataForm.shipperId,
							shipperName: this.dataForm.shipperName,
							receiverId: this.dataForm.receiverId,
							receiverName: this.dataForm.receiverName,
							carrierId: this.dataForm.carrierId,
							carrierName: this.dataForm.carrierName,
							goodsId: this.dataForm.goodsId,
							goodsName: this.dataForm.goodsName,
							carInfoId: this.dataForm.carInfoId,
							carInfoName: this.dataForm.carInfoName,
							receiveDate: this.dataForm.receiveDate,
							grossWeight: this.dataForm.grossWeight,
							tareWeight: this.dataForm.tareWeight,
							netWeight: this.dataForm.netWeight,
							measurementId: this.dataForm.measurementId,
							measurementName: this.dataForm.measurementName,
							deliveryDate: this.dataForm.deliveryDate,
							deliveryNetWeight: this.dataForm.deliveryNetWeight,
							loadingPoint: this.dataForm.loadingPoint,
							loadingPointName: this.dataForm.loadingPointName,
							dischargePoint: this.dataForm.dischargePoint,
							loadingFee: this.dataForm.loadingFee,
							weighingFee: this.dataForm.weighingFee,
							isStorage: this.dataForm.isStorage,
							isOutbound: this.dataForm.isOutbound,
							note: this.dataForm.note
						},
						header: {
							'token': this.getCookie('token'),
							'content-type': 'application/json'
						},
						success: res => {
							if (res && res.data && res.data.code == 0) {
								uni.showToast({
									title: '提交成功',
									icon: "none"
								});
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
						fail: (res, code) => {
							uni.showToast({
								title: JSON.stringify(res),
								icon: "none"
							});
						}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style>
	.content {
		width: 90%;
		margin-left: 5%;
	}

	.content-tittle {
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		border-bottom: #CCCCCC solid 1px;
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.uni-input {
		border: #CCCCCC solid 1px;
		border-radius: 5px;
		height: 25px;
		line-height: 25px;
		padding-left: 5px;
	}

	.submit-box {
		margin-top: 50px;
		width: 50%;
		margin-left: 25%;
		margin-bottom: 20px;
	}

	.submitbtn {
		color: #f33e54;
	}
</style>
