var swParams = domainSplice(window.location.host);
function initInstall(){
  	var url = '';
  	var data = null;
	if(swParams){
	    url = 'https://'+ swParams.siteDomain + '.' + swParams.siteName + '.com/api/v1/push/swswitch';
	}
    ajax({
     	url: url,              //请求地址
	    type: "get",                       //请求方式
	    dataType: "json",
	    success: function (response, xml) {
	        registerSW(response.data);
	    },
	    fail: function (status) {
	        // 此处放失败后执行的代码
	    }
	});
}

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(options.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText , xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}


function registerSW(res){
	if ('serviceWorker' in navigator) {
		if(res){
			window.addEventListener('load', function() {
		  	var domain = 'https://' + window.location.host + '/sw.js';
		    navigator.serviceWorker.register(domain).then(function(registration) {
		      // Registration was successful
		      console.log('ServiceWorker registration successful with scope: ', registration.scope);
		    }).catch(function(err) {
		      // registration failed :(
		      console.log('ServiceWorker registration failed: ', err);
		    });
		  });
		}else{
			navigator.serviceWorker.getRegistration().then(
                function (registration) {
                    if (registration) {
                        registration.unregister().then(function (boolean) {//注销
                            if (boolean == true) {
                                console.log('ServiceWorker Cancellation of success！');
                            }
                    });
                }
            });
		}
	}
}

initInstall();

var config = {
	messagingSenderId: "911386884695"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.requestPermission()
	.then(function() {
		return messaging.getToken();
	})
	.then(function(token) {
		console.log('send token to server');
		//send token to server
		var obj = token;
		var url = '';
		var data = null;
		if(swParams) {
			url = 'https://' + swParams.siteDomain + '.' + swParams.siteName + '.com/api/v1/push/savetoken';
			data = {
				'siteId': swParams.siteId,
				"token": obj
			};
		}
		ajax({
	        url: url,              
	        type: "POST",                   
	        data: data,        
	        dataType: "json",
	        success: function (response, xml) {
	            if(response.ret == 1) {
					console.log("Save token successful!");
				} else {
					console.log("Save token failure!");
				}
	        },
	        fail: function (status) {
	            // 此处放失败后执行的代码
	        }
    	});
		// $.ajax({
		// 	type: 'post',
		// 	url: url, //push/get
		// 	dataType: 'json',
		// 	data: data,
	 //        xhrFields: {
	 //            withCredentials: true
	 //        },
	 //        crossDomain: true,
		// 	success: function(data) {
		// 		if(data.ret == 1) {
		// 			console.log("Save token successful!");
		// 		} else {
		// 			console.log("Save token failure!");
		// 		}
		// 	}
		// });
	})
	.catch(function(err) {});

messaging.onTokenRefresh(function() {
	messaging.getToken()
		.then(function(refreshedToken) {
		    console.log('refreshedToken');
			// Indicate that the new Instance ID token has not yet been sent to the
			// app server.
			setTokenSentToServer(false);
			// Send Instance ID token to app server.
			sendTokenToServer(refreshedToken);
			// ...
		})
		.catch(function(err) {
			showToken('Unable to retrieve refreshed token ', err);
		});
});

function domainSplice(value) {
	var obj = {};
	var value = value ? value : '';
	if(value) {
		var arr = value.split('.');
		if(arr[0].indexOf('m') > -1) {
			obj.siteId = 2;
			obj.siteDomain = arr[0];
		} else {
			obj.siteId = 1;
			if(arr[0].indexOf('www') > -1) {
				obj.siteDomain = 'm';
			} else {
				obj.siteDomain = 'm' + arr[0];
			}
		}
		obj.siteName = arr[1];
		return obj;
	} else {
		return false;
	}
}