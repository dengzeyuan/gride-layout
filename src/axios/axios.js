import axios from 'axios';
import qs from 'qs';

// function getUrlParam(sessionId) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return decodeURIComponent(r[2].split("#")[0]);
//     return null;
// }

axios.defaults.withCredentials = true;
var reg = new RegExp("(^|&)sessionId=([^&]*)(&|$|#)");
var urls = window.location.search.substr(1).match(reg);
var url = '';
if (urls != null) {
    url = decodeURIComponent(urls[2].split("#")[0]);
} else {
    url = '4c944608b74c45f8994dadb66590ccc7'
}
sessionStorage.setItem('sessionId', url);

var $axios = axios.create({
    baseURL: 'http://10.0.0.128:8112/njxs-backend',
    // timeout: 5000,
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        // 'Authorization':'wn-jnq_user_session_idd2239db2-d01d-47b6-bf55-8c24aae4101c'
        // "sessionId": url
    }
});

//POST传参序列化
$axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

export default $axios
