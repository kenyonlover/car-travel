import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'

Vue.config.productionTip = false

Vue.prototype.baseUrl = 'http://192.168.0.2:8088/car'

/**
 * 检测是否需要登录，需要则跳转登录页，不需要则返回一个true
 */
Vue.prototype.haveToken = function() {
	let token = this.getCookie('token');
	let noToken = token=='';
	if(noToken){
		uni.redirectTo({
			url: '../login/login'
		});
	}else {
		return !noToken;
	}
}

/**
 * 设置cookie
 * @param {Object} key
 * @param {Object} value
 * @param {Object} expiretimes
 */
Vue.prototype.setCookie = function(key, value, expiretimes) {
	var exdate = new Date();
	exdate.setTime(exdate.getTime() + expiretimes * 60 * 1000 * 60);
	document.cookie = key + "=" + escape(value) + ((expiretimes == null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * 取回cookie
 * @param {Object} key
 */
Vue.prototype.getCookie = function(key) {
	let c_start = null;
	let c_end = null;
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(key + "=");
		if (c_start != -1) {
			c_start = c_start + key.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

//清除所有cookie
Vue.prototype.clearCookie = function() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }


Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
