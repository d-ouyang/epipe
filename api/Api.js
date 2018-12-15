// import Vue from 'vue';
import axios from "axios";
import {
	PUBLIC
} from "@/consts";
import * as request from "./RequestClient";
import {
	BASE_API_HOST
} from "@/env";
const AMAP_KEY = "e8496e8ac4b0f01100b98da5bde96597";

export default {
	install(Vue, pluginOptions = {}) {
		let storeInfo = JSON.parse(localStorage.getItem("store"));
		console.log(storeInfo)
		let requestClient = new request.Client({
			baseURL: BASE_API_HOST,
			// baseURL:process.env.ADMIN_SERVER,
		}, {
			tokenGetter: () => {
				let store = localStorage.getItem("store");
				let token = null;
				if (store != null) {
					store = JSON.parse(store);
					if (store.userInfo.accessToken) {
						token = store.userInfo.accessToken;
					}
				}
				return token;
			},
			globalErrorHandler: error => {
				Vue.prototype.loadingClose()
				console.log(error)
				if (error.message) {
					Vue.prototype.toasts(error.message)
				}
				return Promise.reject(error);
			},
			errCode: res => {
				Vue.prototype.loadingClose()
				console.log(res)
				if (res.data.msg) {
					Vue.prototype.toasts(res.data.msg)
				}
				return Promise.reject(res);
			},
		});
		Vue.prototype.Api = {
			mapAutoComplete(keywords) {
				return axios.get(
					"http://restapi.amap.com/v3/place/text?", {
						params: {
							key: AMAP_KEY,
							keywords: keywords,
							city: '310000',
							children: '1',
							page: 1,
							offset: 20,
							extensions: 'all'
						}
					}
				);
			},
			geoCode(lng, lat) {
				return axios.get(
					"http://restapi.amap.com/v3/geocode/regeo?parameters", {
						params: {
							key: AMAP_KEY,
							location: `${lng},${lat}`
						}
					}
				);
			},
			distance(origins, destination) {
				return axios.get(
					"https://restapi.amap.com/v3/distance?", {
						params: {
							key: AMAP_KEY,
							origins: origins,
							destination: destination,
							type: 1,
						}
					}
				);
			},
			//查询附近包月
			ranglrList(info, options = {}) {
				return requestClient.fetch(
					request.METHOD_POST,
					`pro/getNearLongRentList`, {
						currentPage: info.pageNo,
						pageSize: info.pageSize,
						radius: info.radius,
						longitude: info.longitude,
						latitude: info.latitude,

					},
					options
				)
			},
			//查询附近错峰
			rangeStagList(info, options = {}) {
				return requestClient.fetch(
					request.METHOD_POST,
					`pro/getNearStaProList`, {
						currentPage: info.pageNo,
						pageSize: info.pageSize,
						channel: info.radius,
						longitude: info.longitude,
						latitude: info.latitude,

					},
					options
				)
			},
			//根据错峰产品ID查询产品详情
			getStaProDetail(id) {
				return requestClient.fetch(
					request.METHOD_POST,
					`pro/getStaProDetail`, {
						productId: id

					},
				)
			},
			//根据包月产品ID查询产品详情
			getProductDetail(id) {
				return requestClient.fetch(
					request.METHOD_POST,
					`pro/getProductDetail`, {
						productId: id

					},
				)
            },
            //查询已购包月
			longRentRecordList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`pro/longRentRecordList`, {
						currentPage: info.currentPage,
						pageSize: info.pageSize,
						phoneNum: info.phoneNum

					},
				)
			},
			//查询已购买错峰
			staggeringParkingRecordList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`pro/staggeringParkingRecordList`, {
						currentPage: info.currentPage,
						pageSize: info.pageSize,
						phoneNum: info.phoneNum

					},
				)
			},
			//附近停车场列表
			parkList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`parking/getNearParkList`, {
						currentPage: info.currentPage,
						pageSize: info.pageSize,
						longitude: info.latlng.longitude,
						latitude: info.latlng.latitude,
					},
				)
			},
			//获取验证码
			sendValidateCode(phone) {
				return requestClient.fetch(
					request.METHOD_GET,
					`member/anon/prelogin/verificationCode`, {
						// accessToken: '1714f8c6-5607-45e6-9b16-a81327e83642',
						phoneNum: phone
					},
				);
			},
			//验证码登录
			checkValidateCode(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`auth/memberPhone/login`, {
						phoneNum: info.phone,
						vcode: info.vcode,
						channel: info.channel
					},
				)
			},
			//获取车牌
			carList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`member/getCarsByPhone`, {
						phoneNum: info,
					},
				)
			},
			//添加车牌号
			append(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`member/bindCarToThird`, {
						phoneNum: info.phoneNum,
						datas: info.datas
					}
				)
			},
			//解绑车牌
			unbindCar(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`member/unbindCar`, {
						carNo: info.phoneNum,
					}
				)
            },
            //默认车牌
			default (info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`member/setDefaultCar`, {
						carNo: info.carNo
					}
				)
			},
			//获取订单费用
			getOrderCost(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`payment/order/getOrderByLpn`, {
						plateId: info,
					},
				)
			},
			//支付宝支付
			aliPay(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`payment/pay/tradeCreate`, {
						buyer: info.buyer,
						code: info.code,
						type: info.type,
						orderType: info.orderType,
						orderId: info.orderId,
						startTime: info.startTime,
						lpn: info.lpn,
						endTime: info.endTime,
						couponId: info.couponId,
						charge: info.charge,
						come: 1,
					},
				)
            },
            //查询已领取优惠券
			activelist(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`discount/getUserDiscountList`, {
						currentPage: info.currentPage,
						pageSize: info.pageSize,
						status: '1',
						category: '',
						phone: info.phone,
						channelName: '3'
					},
				)
            },
            
			//获取可开票停车场
			invoiceParkList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`invoice/invoiceParkList`, {
						currentPage: info.currentPage,
						pageSize: info.pageSize,
					},
				)
			},
			//根据停车场活动可开票订单
			getChargeList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`invoice/getChargeList`, {
						userid: info.userid,
                        parkCode: info.parkCode,
                        billSign: false,
                        page: info.page,
                        pageSize:info.pageSize
					}
				)
			},
            //开票
            createInvoice() { 
                return requestClient.fetch(
					request.METHOD_POST,
					`invoice/createInvoice`, {
						userid: info.userid,
						parkCode: info.parkCode
					}
				)
                
            },

		
		








		};
	}
};

// longitude: 121.43246
// latitude: 31.18543
