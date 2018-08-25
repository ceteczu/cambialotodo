;function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
};
function ExistsiPhone() {
    var u = navigator.userAgent;
    if (u.indexOf('iPhone') > -1) {
        return true;
    }
    else {
        return false;
    }
};
function ExistsiPad() {
    var u = navigator.userAgent;
    if (u.indexOf('iPad') > -1) {
        return true;
    }
    else {
        return false;
    }
};
function scroll_top() {
    setTimeout(function () { $("html,body").animate({ scrollTop: 0 }, 0); }, 300);
};
if (!IsPC()) {
    $(document).on('touchend', '.scroll_top', function () { scroll_top(); });
} else {
    $('.scroll_top').click(function () { scroll_top(); });
};
function mTabs(tabTit, type) {
    $(document).on(type, tabTit, function () {
        $(this).addClass("active").siblings().removeClass("active").parent().next().children().eq($(this).index()).show().siblings().hide();
    });
};
function GetFormatUrl(str) {
    if (str == "") {
        return "";
    }
    var regS = new RegExp("[^a-zA-Z0-9]", "g");
    str = str.replace(regS, "-");
    var regS1 = new RegExp("[\-]+", "g");
    str = str.replace(regS1, "-");
    var regS2 = new RegExp("[\-]+$", "g");
    str = str.replace(regS2, "");
    var regS3 = new RegExp("^[\-]+", "g");
    str = str.replace(regS3, "");
    return str;
};
//appdownload click Event
$(document).on('click', '.appdownload .turn_off,.appdownload a', function () {
    $.cookie('android_downloaded', 1, { expires: 1000 });
    if ($(this).attr('class') == 'turn_off') {
        ga('send', 'event', 'click turn_off appdownload category', 'click turn_off appdownload action', 'click turn_off appdownload lable', 1);
    } else {
        ga('send', 'event', 'click appdownload category', 'click appdownload action', 'click appdownload lable', 1);
    }
});
//left slider bar 
$('.header .fl .menu').click(function () {
    var height = $(window).height();
    $('.menu_cate').parent().css('z-index', '1000');
    var $left = ($(window).width() - $('.header').outerWidth(true)) / 2;
    var $cate_list = $('.menu_cate .cate_list');
    if ($cate_list.is(':hidden')) {
        if (!$cate_list.is(':animated')) {
            $('.header').css('margin-top', '0px');
            $cate_list.show().animate({ 'left': $left });
        }
        if ($('.mask_box_1').length < 1) {
            maskOpen1();
        }
        $('html').addClass('no_scroll');
        $("body").css("height", height);
    } else {
        $cate_list.animate({ 'left': '-250px' }
            , 200,
            function () {
                $cate_list.hide();
                $('.mask_box_1').remove();
                $('html').removeClass('no_scroll');
                $("body").removeAttr("style");
            }
        );
    }

    $('.mask_box_1').on('click', function () {
        if (!$cate_list.is(':animated')) {
            $cate_list.animate({ 'left': '-250px' }
                , 200,
                function () {
                    $cate_list.hide();
                    $('.mask_box_1').remove();
                    $('html').removeClass('no_scroll');
                    $("body").removeAttr("style");
                }
            );
        }
    });
});

$(".edit_info label input").each(function () {
    $(this).keyup(function () {
        var value = $(this).val();
        if (value != "") {
            $(this).siblings("span").hide();
        } else {
            $(this).siblings("span").show();
        }
    }).blur(function () {
        var value = $(this).val();
        if (value != "") {
            $(this).siblings("span").hide();
        } else {
            $(this).siblings("span").show();
        }
    });
});
//true_click function
function true_click(true_dad, true_class) {
    $(true_dad).click(function () {
        $(this).addClass(true_class).siblings().removeClass(true_class);
    });
}
//categories
$('.cate_first').click(function () {
    var $drop_down_top = $(this).outerHeight(true) + $('.header').outerHeight(true);
    if ($(this).find('.arrow_3').hasClass('change_top')) {
        $(this).siblings('.cate').find(".drop_down").slideUp();
        $(this).find('.arrow_3').removeClass('change_top');
    } else {
        $(this).siblings('.cate').find('.drop_down').slideDown().css('top', $drop_down_top);
        $(this).find('.arrow_3').addClass('change_top');
    }
});

//popup box & mask layer
function maskOpen() {
    $("body").append('<div class="mask_box"></div>');
}
function maskOpen1() {
    $("body").append('<div class="mask_box_1"></div>');
}
function maskOpen2() {
    $("body").append('<div class="mask_box_2"></div>');
}
function maskLoadingOpen() {
    $("body").append('<div class="mask_box_loading"><img src="/templates/default/images/load-20.gif" /></div>');
}
function maskClose() {
    $('.mask_box').remove();
    $('.popup_box').hide();
}
function maskClose1() {
    $('.mask_box_1').remove();
    $('.edit_page').hide(200);
}
function maskLoadingClose() {
    $('.mask_box_loading').remove();
}
//set the popup box position
function popBoxPos(ele) {
    var boxH = ele.find('.p_cont_box').outerHeight();
    if (boxH < $(window).height()) {
        var marginT = ($(window).height() - boxH) / 2;
        ele.find('.p_cont_box').css('margin-top', marginT);
    }
}

//.topics_forum .forum_groups .groups_sub .groups_sub_name
$(".topics_forum .forum_groups .groups_sub .groups_sub_name").click(function () {
    if ($(this).siblings().is(":hidden")) {
        $(this).siblings().show();
    } else {
        $(this).siblings().hide();
    }
});

//Verify
$("form :input").blur(function () {
    var $parent = $(this).parent(".enter_info");
    $parent.find(".formtips").remove();
    //Verify username

    if ($(this).is(".username")) {
        if (!/^.{5,20}$/.test(this.value)) {
            var errorMsg = _LL_SIGNUP_USERNAME_5_20;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
    }
    //Verify e-mail
    if ($(this).is(".email")) {
        if (this.value == "") {
            var errorMsg = _LL_SIGNUP_YOUR_EMAIL;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        } else if (this.value != "" && !/^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,13}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test($.trim(this.value.replace(/(^\s*)|(\s*$)/g, "")))) {
            var errorMsg = _LL_SIGNUP_EMAIL_FORMAT;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
        if ($(this).parents('.form_signup').length > 0 && $(this).attr('id') == 'email') {                                    
            if ($(this).data('check-email') != this.value) {
                checkEmail(this.value);
                return;
            } else if ($(this).data('check-email-tips') != '') {
                $(this).addClass('error').parents('.enter_info').append('<span class="formtips onerror">' + $(this).data('check-email-tips') + '</span>');
            }
        }
    }
    //Verify number
    if ($(this).is(".number")) {
        if ((this.value == "" && $(this).hasClass('required')) || (this.value != "" && !/^\d{6,}$/.test(this.value))) {
            var errorMsg = _LL_SIGNUP_SIX_FIGURES;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
    }
    //Verify url
    if ($(this).is(".url")) {
        if ((this.value == "" && $(this).hasClass('required')) || (this.value != "" && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(this.value))) {
            var errorMsg = _LL_SIGNUP_CORRECT_LINK_ADDRESS;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
    }

    //Verify password
    if ($(this).is(".password")) {
        if (this.value == ""){
            var errorMsg = _LL_SIGNUP_PASSWORD_6_20;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
        if ($(this).is('.new_psw') && $('.reenter_psw').length > 0) {
            var new_psw = $('.new_psw').val();
            var re_psw = $('.reenter_psw').val();
            if (re_psw == new_psw) {
                $('.reenter_psw').removeClass('error').parents('.enter_info').find('.onerror').remove();
            } else if (re_psw.length > 0) {
                $('.reenter_psw').parents('.enter_info').find(".formtips").remove();
                $('.reenter_psw').addClass("error").parents('.enter_info').append('<span class="formtips onerror">' + _LL_SIGNUP_PASSWORD_INPUT_DIFFERENT + '</span>');
                return false;
            }
        }
    }
    if ($(this).is(".reenter_psw")) {
        var new_psw = $('.new_psw').val();
        var re_psw = $('.reenter_psw').val();
        if (re_psw != new_psw) {
            var errorMsg = _LL_SIGNUP_PASSWORD_INPUT_DIFFERENT;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
    }
    //Verify verification code
    if ($(this).is(".verify")) {
        $parent.find(".formtips").remove();
        if (this.value == '') {
            var errorMsg = _LL_SIGNUP_VERIFY_CODE;
            $parent.append('<span class="formtips onerror">' + errorMsg + '</span>');
            $parent.find('.required').addClass("error");
            return false;
        }
    }
    return true;

});
function checkEmail(email){
    $('#email').siblings('.onerror').remove();
    $.ajax({
        url: '/Home/IsExistsEmail',
        data: { 'Email': email },
        type: 'POST',
        dataType: 'json',
        success: function(data){
            $('#email').data('check-email', email);
            if (data.Status == '500') {
                $('#email').data('check-email-tips', data.Msg).addClass("error").parents('.enter_info').append('<span class="formtips onerror">' + data.Msg + '</span>');
            } else {
                $('#email').data('check-email-tips', '').removeClass("error");
            }
        }
    })
};
//common popup box	
$.fn.popup = function () {
    var element = this;
    this.each(function () {
        var obj = $(this);
        var $popupBox = $(obj.attr('popup'));
        $(obj).on('click', function () {
            maskClose();
            maskOpen();
            $popupBox.show();
            popBoxPos($popupBox);
            $('html,body').addClass('no_scroll');
            $popupBox.find('.popup_content').on('click', function (e) {
                $('html,body').removeClass('no_scroll');
                var $clicked = $(e.target);
                if (!$clicked.parents().hasClass("p_cont_box")) {
                    maskClose();
                }
            });
            return false;
        });
    });
};
$('.p_cont_box a.btn_cancel').click(function () {
    maskClose();
});
//popup message box
function showMsgBox(msg, flag, delay) {
    maskOpen();
    $('.msg_box').hide().remove;// remove pre box 
    var iconStatu = msgStr = '';

    var _delay = delay ? delay : '1000';
    switch (flag) {
        case 'succeed':
            iconStatu = "succeed";
            break;
        case 'error':
            iconStatu = "error";
            break;
        case 'state':
            msg = '';
            iconStatu = "state";
    }

    msg && (msgStr = '<p>' + msg + '</p>');

    $('body').append('<div class="msg_box"><div class="msg_box_son"><span class="' + iconStatu + '"></span>' + msgStr + '</div></div>');
    var $msgBox = $('.msg_box');
    var timer = null;
    if (flag != 'state') {
        clearTimeout(timer);
        timer = setTimeout(function () {
            hideMsgBox();
        }, _delay
        );
        $('.msg_box').click(function () {
            hideMsgBox();//remove
        });
    }


}
function hideMsgBox() {
    maskClose();
    $('.msg_box').remove();
}
//
function showMsgBox_1(msg_text, delay) {
    if ($('.msg_box_1').length < 1) {
        $('body').append('<div class="msg_box_1"><p>' + msg_text + '</p></div>');
        var $msgBox_1 = $('.msg_box_1');
        var _delay = delay ? delay : '2000';
        var msg_left = ($(window).width() - $msgBox_1.outerWidth(true)) / 2;
        $msgBox_1.css({ "left": msg_left });
        if (!$msgBox_1.is(':animated')) {
            $msgBox_1.animate({ 'bottom': '85px' });
        }

        var timer = null;
        clearTimeout(timer);
        timer = setTimeout(function () {
            $msgBox_1.remove();
        }, _delay
        );
    }
}

function showMsgBox_2(text, btn, callback) {
    var btn = btn || "ok",
        callback = callback || function () {
        },
        html = '<div class="showMsgBox_2"><div class="showMsgBox_2_bg"></div><div class="showMsgBox_2_main"><p>' + text + '</p><span class="showMsgBox_2_btn">' + btn + '</span></div><div>';

    $("body").append(html).addClass("no_scroll");
    $(".showMsgBox_2_main").css("top", ($(window).height() - $(".showMsgBox_2_main").outerHeight()) / 2);
    $(".showMsgBox_2_btn").click(function (e) {
        $(".showMsgBox_2").remove();
        callback();
        $("body").removeClass("no_scroll");
    })
    $(".showMsgBox_2_bg").click(function () {
        $(".showMsgBox_2").remove();
        $("body").removeClass("no_scroll");
    })
}
function showMsgBox_3(obj, title, btn, callback) {
    var title = title || "",
        btn = btn || "Cancel",
        callback = callback || function () {
        },
        html = "";

    html += '<div class="showMsgBox_3">' +
        '<div class="showMsgBox_3_bg"></div>' +
        '<div class="showMsgBox_3_main"><div class="title">' + title + '</div><ul>';
    for (var i in obj) {
        html += '<li><a href="' + obj[i].href + '">' + obj[i].name + '</a></li>';
    }
    html += '<li><a href="javascript:;" class="showMsgBox_3_btn">' + btn + '</a></li></ul></div></div>';

    $("body").append(html).addClass("no_scroll");
    $(".showMsgBox_3_main").css("top", ($(window).height() - $(".showMsgBox_3_main").outerHeight()) / 2);
    $(".showMsgBox_3_btn").click(function (e) {
        $(".showMsgBox_3").remove();
        callback();
        $("html").removeClass("no_scroll");
    })
    $(".showMsgBox_3_bg").click(function () {
        $(".showMsgBox_3").remove();
        $("body").removeClass("no_scroll");
    })
}

//goods_hot_prod prod_list operator(edit/save/buy)
//loading
function appendTop() {
    var windowH = $(window).height();
    var appendH = $('.goods_hot_prod .prod_list ul li.append').find('em').height();
    $('.goods_hot_prod .prod_list ul li.append').css({ 'position': 'fixed', 'top': ((windowH - appendH) / 2) });
}

$(document).ready(function () {
    loadHeadCart();
    //loadPageInfo();
});
function loadHeadCart() {
    var time = new Date();
    time = time.getTime();
    $.ajax({
        url: '/Shopping/GetCartQty?time=' + time,
        type: 'GET',
        dataType: 'text',
        success: function (cartQty) {
            if (cartQty > 0) {
                $('.shop_car,.i_cart').html('<em></em><i>' + cartQty + '</i>');
            } else {
                $('.shop_car,.i_cart').html('<em></em>');
            }
        }
    });
};

function loadPageInfo() {
    var time = new Date();
    time = time.getTime();
    if (typeof is_category != 'undefined' || typeof is_search != 'undefined') {
        fieldStr = '&fields[]=userName&fields[]=isLogin';
    } else {
        fieldStr = '';
    }    
};

function time_ago(time_map) {
    var now_time = new Date().getTime();
    var time_diff = (now_time / 1000) - time_map;

    var seconds = parseInt(time_diff);
    var minutes = parseInt(time_diff / 60);
    var hours = parseInt(time_diff / 3600);
    var days = parseInt(time_diff / 86400);
    var weeks = parseInt(time_diff / 604800);
    var months = parseInt(time_diff / 2419200);
    var years = parseInt(time_diff / 29030400);

    //Seconds
    var time = '';
    if (seconds <= 60) {
        time = seconds + " seconds ago";
        //Minutes    
    } else if (minutes <= 60) {
        if (minutes == 1) {
            time = "1 minute ago";
        } else {
            time = minutes + " minutes ago";
        }
        //Hours
    } else if (hours <= 24) {
        if (hours == 1) {
            time = "1 hour ago";
        } else {
            time = hours + " hours ago";
        }
        //Days 
    } else if (days <= 7) {
        if (days == 1) {
            time = "1 day ago";
        } else {
            time = days + " days ago";
        }
        //Weeks
    } else if (weeks <= 4) {
        if (weeks == 1) {
            time = "1 week ago";
        } else {
            time = weeks + " weeks ago";
        }
        //Months  
    } else if (months <= 12) {
        if (months == 1) {
            time = "1 month ago";
        } else {
            time = months + " months ago";
        }
        //Years 
    } else {
        if (years == 1) {
            time = "1 year ago";
        } else {
            time = years + " years ago";
        }
    }
    return time;
};

function toFullSite() {
    var options = {};
    options.expires = 1;
    options.domain = 'lightake.com';
    $.cookie('_mFullSite', 1, options);
};

//facebook track code
function fbTrack(trackCode, value, currency) {
    if (typeof fbq == 'undefined') {
        return '';
    }
    var track_code = "fbq.push('track', '" + trackCode + "', {'value':'" + value + "','currency':'" + currency + "'});";
    return track_code;
    //$('noscript:last').after(track_code);
};

//facebook track code function
function fbTrackFunc(data) {
    var data = data;
    if (typeof data.facebookTrack != 'undefined') {
        var track = data.facebookTrack.track;
        var value = data.facebookTrack.price;
        var currency = data.facebookTrack.currency;
        var code = '';
        for (var v in track) {
            code = fbTrack(track[v], value, currency);//call fbTrack
            $('noscript:last').after('<script type="text/javascript">' + code + '</script>');
        }
    }
};

// facebook tack add to cart
function fbTrackAddToCart(product_id, product_category) {
    if (typeof fbq == 'undefined') {
        return false;
    }
    if (document.domain == 'm.banggood.com') {
        fbq('track', 'AddToCart', {
            content_type: 'product',
            content_ids: [product_id],
            content_category: product_category
        });
    }
};

// remove xss 
function jsRemoveXss(str) {
    var RexStr = /[\&|â€™|â€|\â€™|\â€|\<|\>|\(|\)|\\]/g;
    return str.replace(RexStr, '');
};



function view_box(obj) {    
    showMsgBox('', 'state');    
    if ($(obj).hasClass('active') || $(obj).siblings().hasClass('active')) {
        var msg_text = _LC_VOTE_REVIEW_ERROR;
        $('.msg_box').remove();
        showMsgBox_1(msg_text);
        hideMsgBox();
        return false;
    }
    var field = 'good';
    if ($(obj).hasClass('dislike')) {
        field = 'bad';
    }
    var id = $(obj).parents('li').find('.info .name').attr('id');
    if (typeof id == 'undefined' || parseInt(id) < 1) {
        id = false;
    }
    var field_array = ['good', 'bad'];
    var index = $.inArray(field, field_array);
    if (index < 0) {
        field = 'good';
    }
};

(function ($) {
    var $popup_msg, $popup_msg_title, $popup_msg_content, $popup_msg_message, popup_msg_pos;
    $.ZSmsgBox = {
        verticalOffset: -75,
        horizontalOffset: 0,
        repositionOnResize: true,
        overlayOpacity: .3,
        overlayColor: '#000000',
        dialogClass: null,
        alertTitle: 'Alert',
        confirmTitle: 'Confirm',
        promptTitle: 'Prompt',

        gethtml: function (message, title, ok, cancel, callback) {
            if (title == null) title = $.ZSmsgBox.alertTitle;
            $.ZSmsgBox._show(title, message, null, 'html', ok, cancel, function (result) {
                if (callback) callback(result);
            });
        },
        alert: function (message, title, ok, cancel, callback) {
            if (title == null) title = $.ZSmsgBox.alertTitle;
            $.ZSmsgBox._show(title, message, null, 'alert', ok, cancel, function (result) {
                if (callback) callback(result);
            });
        },

        confirm: function (message, title, ok, cancel, callback) {
            if (title == null) title = $.ZSmsgBox.confirmTitle;
            $.ZSmsgBox._show(title, message, null, 'confirm', ok, cancel, function (result) {
                if (callback) callback(result);
            });
        },

        prompt: function (message, value, title, ok, cancel, callback) {
            if (title == null) title = $.ZSmsgBox.promptTitle;
            $.ZSmsgBox._show(title, message, value, 'prompt', ok, cancel, function (result) {
                if (callback) callback(result);
            });
        },

        _show: function (title, msg, value, type, ok, cancel, callback) {

            $.ZSmsgBox._hide();
            $.ZSmsgBox._overlay('show');

            $("body").append(
            '<div class="popup_msg">' +
                '<h1 class="popup_msg_title"></h1>' +
                '<div class="popup_msg_content">' +
                  '<div class="popup_msg_message bBor"></div>' +
                '</div>' +
            '</div>');

            $popup_msg = $(".popup_msg");
            $popup_msg_title = $(".popup_msg .popup_msg_title");
            $popup_msg_content = $(".popup_msg .popup_msg_content");
            $popup_msg_message = $(".popup_msg .popup_msg_message");

            if ($.ZSmsgBox.dialogClass) $popup_msg.addClass($.ZSmsgBox.dialogClass);

            // IE6 Fix
            var popup_msg_pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';

            $popup_msg.css({
                position: popup_msg_pos,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });

            $popup_msg_title.html(title).append('<s onclick="$.ZSmsgBox._hide();"></s>');
            $popup_msg_content.addClass(type);
            if (type == 'html') {
                $popup_msg_message.html(msg);
            } else {
                $popup_msg_message.html('<div class="msg">' + msg + '</div>');
            }

            $popup_msg.css({
                minWidth: $popup_msg_message.outerWidth(),
                maxWidth: $popup_msg_message.outerWidth()
            });

            $.ZSmsgBox._reposition();
            $.ZSmsgBox._maintainPosition(true);

            switch (type) {
                case 'html':
                    break;
                case 'alert':
                    $popup_msg_message.after('<div class="popup_msg_panel"><input type="button" value="' + ok + '" class="popup_btn_ok" /></div>');
                    $(".popup_btn_ok").click(function () {
                        $.ZSmsgBox._hide();
                        callback(true);
                    }).focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $(".popup_btn_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $popup_msg_message.after('<div class="popup_msg_panel rBor"><input type="button" value="' + cancel + '" class="popup_btn_cancel" /><input type="button" value="' + ok + '" class="popup_btn_ok" /></div>');
                    $(".popup_btn_ok").click(function () {
                        $.ZSmsgBox._hide();
                        if (callback) callback(true);
                    }).focus();
                    $(".popup_btn_cancel").click(function () {
                        $.ZSmsgBox._hide();
                        if (callback) callback(false);
                    });
                    $(".popup_btn_ok, .popup_btn_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $(".popup_btn_ok").trigger('click');
                        if (e.keyCode == 27) $(".popup_btn_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $popup_msg_message.append('<br /><input type="text" size="30" class="popup_msg_prompt" />').after('<div class="popup_msg_panel"><input type="button" value="' + ok + '" class="popup_btn_ok" /> <input type="button" value="' + cancel + '" class="popup_btn_cancel" /></div>');
                    $(".popup_msg_prompt").width($popup_msg_message.width());
                    $(".popup_btn_ok").click(function () {
                        $.ZSmsgBox._hide();
                        if (callback) callback($(".popup_msg_prompt").val());
                    });
                    $(".popup_btn_cancel").click(function () {
                        $.ZSmsgBox._hide();
                        if (callback) callback(null);
                    });
                    $(".popup_msg_prompt, .popup_btn_ok, .popup_btn_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $(".popup_btn_ok").trigger('click');
                        if (e.keyCode == 27) $(".popup_btn_cancel").trigger('click');
                    });
                    if (value) $(".popup_msg_prompt").val(value);
                    $(".popup_msg_prompt").focus().select();
                    break;
            }
        },

        _hide: function () {
            $popup_msg && $popup_msg.remove();
            $.ZSmsgBox._overlay('hide');
            $.ZSmsgBox._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.ZSmsgBox._overlay('hide');
                    $("body").append('<div class="popup_overlay"></div>');
                    $(".popup_overlay").css({
                        position: 'fixed',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: $.ZSmsgBox.overlayColor,
                        opacity: $.ZSmsgBox.overlayOpacity
                    }).click(function () {
                        $.ZSmsgBox._hide();
                    });

                    break;
                case 'hide':
                    $(".popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
            //var top = (($(window).height() / 2) - ($popup_msg.outerHeight() / 2)) + $.ZSmsgBox.verticalOffset;
            var top = (($(window).height() / 2) - ($popup_msg.outerHeight() / 2)) + $.ZSmsgBox.verticalOffset;
            var left = (($(window).width() / 2) - ($popup_msg.outerWidth() / 2)) + $.ZSmsgBox.horizontalOffset;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ('undefined' == typeof (document.body.style.maxHeight)) top = top + $(window).scrollTop();

            $popup_msg.css({
                top: top + 'px',
                left: left + 'px'
            });
            $(".popup_overlay").height($(document).height());
        },

        _maintainPosition: function (status) {
            if ($.ZSmsgBox.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', $.ZSmsgBox._reposition);
                        break;
                    case false:
                        $(window).unbind('resize', $.ZSmsgBox._reposition);
                        break;
                }
            }
        }
    }

    ZSAlert = function (message, title, ok, cancel, callback) {
        $.ZSmsgBox.alert(message, title, ok, cancel, callback);
    };

    ZSHtml = function (message, title, ok, cancel, callback) {
        $.ZSmsgBox.gethtml(message, title, ok, cancel, callback);
    };

    ZSConfirm = function (message, title, ok, cancel, callback) {
        $.ZSmsgBox.confirm(message, title, ok, cancel, callback);
    };

    ZSPrompt = function (message, value, title, ok, cancel, callback) {
        $.ZSmsgBox.prompt(message, value, title, ok, cancel, callback);
    };

})(jQuery);
function search_btn() {
    var hislines = '<li><a href="javascript:;" class="first_color">' + _LC_RECENT_SEARCHES + '</a></li>';
    var keywordString = $.cookie('search_keyword');
    if (keywordString != null) {
        var keywords = keywordString.split('^');
        for (var i in keywords) {
            var key = '';
            if (i < 10 && keywords[i] != '') {
                key = decodeURI(keywords[i].replace(/[\\]/, ''));
                hislines += '<li><a href="/index.php?com=search&t=showSearch&keyword=' + key + '">' + key + '</a></li>';
            }
        }
    }
    var $search_box = '<div class="wrap">' +
                        '<div class="search_box">' +
                        '<div class="header_text">' +
                        '<div class="fl"><em></em></div>' +
                        '<div class="search_warp">' +
                        '<div class="search"><em style="display: none">x</em>' +
                        '<input type="text" onkeydown="keydownEvent()" placeholder="' + _LC_SEARCH + '" autocomplete="off" value="">' +
                        '<i class="search_btn"><i></i></i></div></div></div>' +
                        '<div class="search_list">' +
                        '<ul>' +
                        hislines +
                        '</ul></div>' +
                        '<a href="javascript:;" class="clear_btn">' + _LC_CLEAR_HISTORY + '</a>' +
                        '</div> ' +
                        '</div>';
    $('body').append($search_box);

    var $cate_list = $('.menu_cate .cate_list');
    if (!$cate_list.is(':hidden')) {
        $cate_list.hide();
        $('.mask_box_1').remove();
        // $('html,body').removeClass('no_scroll');
    }
    keyword = $('.search_box .search input').val();
    //var search_list_height = $(window).height() - $('.search_box .header_text').outerHeight(true) - $('.search_box .clear_btn').outerHeight(true);
    //$('.search_box .search_list').css('height',search_list_height);

    search_operat();
    $('.search_box .search input').focus();
    $('body,html').addClass('no_scroll');
    function search_operat() {
        $('.search_box .search input').keyup(function () {
            //keyword = $('.search_box .search input').val();
            //if (keyword.length == 0) {
            //    var lines = '<li><a href="javascript:;" class="first_color">' + _LC_RECENT_SEARCHES + '</a></li>';
            //    var keywordString = $.cookie('search_keyword');
            //    if (keywordString != null || keywordString != "") {
            //        var keywords = keywordString.split('^');
            //        for (var i in keywords) {
            //            var key = '';
            //            if (i < 10 && keywords[i] != '') {
            //                key = decodeURI(keywords[i].replace(/[\\]/, ''));
            //                lines += '<li><a href="/index.php?com=search&t=showSearch&keyword=' + key + '&lang=' + $.cookie('_bgLang') + '">' + key + '</a></li>';
            //            }
            //        }
            //    }
            //    $('.search_list ul').html(lines);
            //    $('.clear_btn').show();
            //    $('.search em').hide();
            //    return;
            //} else {
            //    $('.search em').show();
            //    $('.clear_btn').hide();
            //}

            //$.ajax({
            //    url: '/index.php?com=search&t=getSearchKeyword',
            //    type: 'POST',
            //    dataType: 'json',
            //    data: { 'keyword': keyword },
            //    success: function (data) {
            //        var lines = '';
            //        if (data.code == '00') {
            //            arr = data.result;
            //            for (var i in arr) {
            //                lines += "<li><a href='/index.php?com=search&t=showSearch&keyword=" + arr[i] + "'>" + arr[i] + "</a></li>";
            //            }
            //        }
            //        $('.search_list ul').html(lines);
            //    },
            //});
        });

        $('.clear_btn').click(function () {
            $(this).siblings('.search_list').each(function () {
                if ($(this).find('li').length > 0) {
                    $.cookie("search_keyword", "", { 'path': '/' });
                    $(this).find('li').remove();
                    $('.search_list ul').html('<li><a href="javascript:;" class="first_color">' + _LC_RECENT_SEARCHES + '</a></li>');
                }
            });
        });
        $('.search_box .search em').click(function () {
            $(this).siblings('input').val('');
            $(this).siblings('input').focus();
            $(this).hide();
            var lines = '<li><a href="javascript:;" class="first_color">' + _LC_RECENT_SEARCHES + '</a></li>';
            var keywordString = $.cookie('search_keyword');
            if (keywordString != null && keywordString != '') {
                var keywords = keywordString.split('^');
                for (var i in keywords) {
                    var key = '';
                    if (i < 10 && keywords[i] != '') {
                        key = decodeURI(keywords[i].replace(/[\\]/, ''));
                        lines += '<li><a href="/index.php?com=search&t=showSearch&keyword=' + key + '">' + key + '</a></li>';
                    }
                }
            }
            $('.search_list ul').html(lines);
            $('.clear_btn').show();

        });

        $('.search_btn').click(function () {
            keyword = $('.search_box .search input').val(); if (keyword.length == 0) return;
            keyword = keyword.replace(/[\+]/g, '%2b');
            keyword = keyword.replace(/[&]/g, '');

            keyword = GetFormatUrl(keyword);
            if (keyword != "") {
                window.location.href = "/search/" + keyword + ".html";
            }


        });

    }
    function search_box_back() {
        $('.search_box').parent('.wrap').remove();
        $('html,body').removeClass('no_scroll');
    }
    $('.search_box .header_text .fl').click(function () { search_box_back() });
};
if (!IsPC()) {
    $(document).on('touchend, click', '.search_click', function (e) {
        if (window.event) {
            window.event.returnValue = false;
        } else {
            e.preventDefault();
        }
        search_btn();
    });
} else {
    $('.search_click').click(function () { search_btn(); });
}
function keydownEvent() {
    var e = window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        keyword = $('.search_box .search input').val(); if (keyword.length == 0) return;
        keyword = keyword.replace(/[\+]/g, '%2b');
        keyword = keyword.replace(/[&]/g, '');
        
        keyword = GetFormatUrl(keyword);
        if (keyword != "")
        {
            window.location.href = "/search/" + keyword + ".html";
        }
        
    }
};
productNewPanel = function (pid, psku, curWarehouse){
    if (!pid) return;
    if (!psku) return;
    var product = {
        pid: pid,
        sku: psku,
        wid: curWarehouse || 1,
        pstatus:0,                    //Product Status
        skustatus:0,                  //SKU status
        skuInStock:0,                 //SKU Stock
        price:0,                      //Product Price
        inputQty: 1,                  //Buy Qty
        limitQty: 9999,               //Limit Qty
        imagepath:"",                 //ImagePath
        countryCode:"US",             //Ship to country code
        countryName: "United States", //Ship to country name
        currencyCode: "USD",          //Current Currency Code
        isShowShipment: false,        //is show shipment
    };
    $.cookie('default_ship_country', product.countryCode);
    var webStorage = function () {
        try {
            window.localStorage.setItem('testkey', 'testValue');
            window.localStorage.removeItem('testkey');
            return window.localStorage;
        } catch (error) {
            return false;
        }
    }();
    init();
    function init() {
        getPanel();
    };
    function getPanel() {
        showMsgBox('', 'state', 20000);
        $.ajax({
            url: "/Product/GetProductPanel",
            data: { 'currencyCode': product.currencyCode, 'countryCode': product.countryCode, 'pid': pid, 'sku': psku, 'wid': curWarehouse },
            type: 'GET',
            dataType: 'json',
            success: function (data){
                if (data.Status == 200){
                    if (data.DataObj.LimitQty > 0)
                    {                 
                        product.limitQty = data.DataObj.LimitQty;
                    }                 
                    product.pstatus = data.DataObj.Status;
                    product.skustatus = data.DataObj.SKUStatus;
                    product.skuInStock = data.DataObj.SKUInStock;
                    product.price = data.DataObj.ShowPrice;
                    product.imagepath = data.DataObj.SmallImagePath;
                    renderPoaBox(data.DataHtml);
                }
                else {
                    $('html,body').removeClass('no_scroll');
                    hideMsgBox();
                }
                initStocksData();
                getShipmentslist();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('html,body').removeClass('no_scroll');
                hideMsgBox();
                if (textStatus === "timeout") {
                    showMsgBox('Server Connection Timeout', 'error', 2500);
                }
            }
        })
    };

    function getShipmentslist(){
        $.ajax({
            url: '/Home/GetShippingFeeList',
            data: { 'currencyCode': product.currencyCode, 'countryCode': product.countryCode, 'qty': product.inputQty, 'productID': product.pid },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                hideMsgBox();
                if (data.Status == '200') {
                    initShipmentData(data.DataHtml);

                } else {
                    showMsgBox_1('Server Error-500 shipment');
                }
            }
        })
    };

    function initShipmentData(shipment_list) {
        if (!shipment_list) return;
        $('#shipment_list_box').replaceWith(shipment_list);
        if (product.isShowShipment) {
            $('#shipment_list_box ul').show();
        }
        bindShipmentSelectEvent();
    };

    function bindShipmentSelectEvent() {
        $(".panel_content_free").unbind('click').click(function () {
            $(".panel_content_shipping_box .options_shipment_list").toggle();
            $(this).find('.arrow_3').toggleClass('rotated');
            product.isShowShipment = !product.isShowShipment;
        });
        $('#shipment_list_box .options_shipment_list li').unbind("click").click(function () {
            $('#shipment_list_box .options_shipment_list li .panel_content_shipping .checkthe').remove();
            $(this).find('.panel_content_shipping').append('<u class="checkthe"></u>');
            // sp = ship-price; ssn = ship-server-name; sc = ship-cost; sdd = ship-delivery-day
            var sp = $(this).attr('data-sp');
            var ssn = $(this).attr('data-ssn');
            var sc = $(this).attr('data-sc');
            var sdd = $(this).attr('data-sdd');
            if (sp > 0) {
                $('#sc').removeClass('green');
            } else {
                $('#sc').addClass('green');
            }
            $(this).hide().siblings().show().parent().hide();
            $(this).find('.arrow_3').toggleClass('rotated');
            product.isShowShipment = !product.isShowShipment;
            $('#ssn').html(ssn);
            $('#sc').html(sc);
            $('#sdd').html(sdd);
        })
    };

    function renderPoaBox(poaBox) {
        if (!poaBox) {
            return;
        }
        $('#panel_box').remove();
        var $body = $('body');
        hideMsgBox();
        $body.append(poaBox);
        $(".panel").animate({ top: '0%' });
        bindPanelClickEvent();
        $('html,body').addClass('no_scroll');
    }
   
    function panelClose() {
        if (ExistsiPhone() || ExistsiPad()) iNoBounce.disable();
        //if (browser.versions.iPhone || browser.versions.iPad) iNoBounce.disable();
        $(".panel").animate({ top: '100%' });
        $('html,body').removeClass('no_scroll');
        $('#panel_box').remove();
        maskClose();
    }

    function bindPanelClickEvent() {
        $(".panel_rolling").click(function () {
            $(".panel").animate({ top: '0%' });
        });
        $(".panel_rolling_return").click(function () {
            maskClose();
            panelClose();
        });
        $(".panel_content_ship").click(function () {
            $(".panel_country").animate({ left: '0%' }, 'fast');
            getCountriesList();
            $(".country_filter_btn").fadeIn(300);
        });
        $(".return").click(function () {
            $(".panel_country").animate({ left: '100%' }, 'fast');
            $(".country_filter_btn").fadeOut(300);
        });
    }

    function getCountriesList() {
        if ($("#country_list ul").length) {
            return false;
        }
        var countriesList = '';
        if (webStorage && webStorage.getItem('countriesListExpire') >= (new Date().getTime())) {
            countriesList = webStorage.getItem('countriesList');
        }
        if (countriesList) {
            renderCountriesList(countriesList);
            return;
        }
        $.ajax({
            url: '/Home/getCountryList',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                hideMsgBox();
                if (data.Status == '200') {
                    if (webStorage) {
                        webStorage.setItem('countriesList', data.DataHtml);
                        webStorage.setItem('countriesListExpire', new Date().getTime() + 3600000);
                    }
                    renderCountriesList(data.DataHtml);

                } else {
                    showMsgBox_1('Server Error-500');
                    hideMsgBox();
                }
            }
        })
    }

    function renderCountriesList(countriesList) {
        if (!countriesList) {
            console.log('Country List Error');
            return;
        }
        var default_ship_to = $.cookie('default_ship_country');
        $('#country_list').append(countriesList);
        $('#country_list ul li[cid=' + default_ship_to + ']').append('<i></i>');
        $('#country_list ul li:first-child').html(_LC_LIST_SORT1);
        $(".panel_country_content").css({ "marginTop": $(".country_filter_btn").outerHeight() });
        $(".panel_country_content ul").css({ "paddingBottom": $(".panel_country_header").outerHeight() + $(".country_filter_btn").outerHeight() });

        bindSelectShipCountry();
    };
    
    function bindSelectShipCountry() {
        $('#country_list ul li').unbind('click').click(function () {
            var countries_id = $(this).attr('cid');
            if ($.cookie('default_ship_country') != countries_id) {
                showMsgBox('', 'state', 20000);
                $.cookie('default_ship_country', countries_id);
                product.countryCode = countries_id;
                $('#country_list ul li i').remove();
                var countries_name = $('#country_list ul li[cid=' + countries_id + ']').html();
                $('#ship_to').html(countries_name);
                $('#country_list ul li[cid=' + countries_id + ']').append('<i></i>');
                $(".country_filter_btn").fadeOut(300);
                $(".panel_country").animate({ left: '100%' });

                getShipmentslist();

                //var requestField = ['stocks', 'warehouse_list', 'shipment_list']
                //$.ajax({
                //    url: requestUrl,
                //    data: { 'pid': product.pid, 'poa': product.actPoa, 'qty': product.inputQty, 'country': countries_id, 'requestField': requestField },
                //    type: 'GET',
                //    dataType: 'json',
                //    success: function (data) {
                //        hideMsgBox();
                //        if (data.code == '00' && data.result.warehouse_list) {
                //            product.curWarehouse = data.result.curWarehouse;
                //            renderWarehouseList(data.result.warehouse_list);
                //        }
                //        if (data.code == '00' && data.result.stocks) {
                //            initStocksData(data.result.stocks);
                //        }
                //        if (data.code == '00' && data.result.shipment_list) {
                //            initShipmentData(data.result.shipment_list);
                //        }
                //    }
                //});


            } else {
                $(".country_filter_btn").fadeOut(300);
                $(".panel_country").animate({ left: '100%' });
            }
        })
    };
    

    function initStocksData(stocks) {
        //if (!stocks) return;
        //product.hideBuy = stocks.hideBuy;
        //product.isPoaClear = stocks.poa_clear_stock;
        //product.isOversea = stocks.isOversea;
        //product.limitQty = parseInt(stocks.qtyLimit);
        //product.inputQty = product.inputQty > product.limitQty ? product.limitQty : product.inputQty;
        //product.inputQty = product.inputQty > 0 ? product.inputQty : 1;
        //product.isTimeDiscount = stocks.isTimeDiscount;
        //product.isPreorder = typeof (stocks.ispreOrder) == 'undefined' ? 0 : true;
        //product.isPresell = typeof (stocks.ispreSell) == 'undefined' ? 0 : true;

        //$("#stock_tips").html(stocks.msg);
        //$("#stock_price").html(stocks.format_poa_price);

        //product.inputQty < 2 ? $('#qty_box .minus').addClass('minus_off') : $('#qty_box .minus').removeClass('minus_off');
        //$('#qty_box .plus').removeClass('plus_off');
        //if ((product.isPoaClear || product.isOversea) && product.inputQty >= product.limitQty) {
        //    $('#qty_box .plus').addClass('plus_off');
        //    var n = product.limitQty > 0 ? product.limitQty : 1;
        //    $('#input_qty').val(n);
        //}

        //if (product.hideBuy) {
        //    $('#btn_buy,#btn_edit').addClass('button_gray');
        //    $('#qty_box .plus').addClass('plus_off');
        //    $('#qty_box .minus').addClass('minus_off');
        //}
        //else {
        //    $('#btn_buy,#btn_edit').removeClass('button_gray');
        //}

        bindAttrSelectEvent();
        
        //bindWarehouseSelect();
        bindInputQtyEvent();
        //bindActionsEvent();
        bindAddToCartStatus();
        //bindAddToCartEvent
        bindAddToCartEvent();
    };

    function bindAddToCartStatus() {
        if (product.pstatus == 2 && product.skustatus == 2 && product.skuInStock == 1) {
            $('#btn_buy,#btn_edit').removeClass('button_gray');
        }
        else {
            $('#btn_buy,#btn_edit').addClass('button_gray');
            $('#qty_box .plus').addClass('plus_off');
            $('#qty_box .minus').addClass('minus_off');
        }
    };

    function bindAttrSelectEvent() {
        $("#panel_box .panel_content .type_list li").unbind("click").click(function () {
            if (!$(this).hasClass('none') && !$(this).hasClass('noneimg')) {
                $(this).addClass('active').siblings('li').removeClass('active');
                product.sku = $(this).attr("sku");
                product.pstatus = $(this).attr("pstatus");
                product.skustatus = $(this).attr("skustatus");
                product.skuInStock = $(this).attr("skuinstock");
                product.price = $(this).attr("price");
                product.imagepath = $(this).attr("imagepath");

                if (parseInt($(this).attr("limitQty")) > 0) {
                    if (product.inputQty >= parseInt($(this).attr("limitQty"))) {
                        product.inputQty = parseInt($(this).attr("limitQty"));
                        if(!$("#qty_box .plus").hasClass('plus_off')){
                            $("#qty_box .plus").addClass("plus_off");
                        }
                        //$("#qty_box .plus").removeClass("plus_off");
                    }
                    product.limitQty = parseInt($(this).attr("limitQty"));
                }
                else {
                    product.limitQty = 9999;                 
                    if ($("#qty_box .plus").hasClass('plus_off')){
                        $("#qty_box .plus").removeClass("plus_off");
                    }
                }

                //qty
                $('#input_qty').val(product.inputQty);

                //bind proudct panel info
                bindPanelInfo();
                getShipmentslist();
                bindAddToCartStatus();

                //getProductStockInfo();
            }
        })
    };


    //Bind product panel Info
    function bindPanelInfo() {
        $(".panel_content .panel_content_title .panel_content_title_img img").attr("src", product.imagepath);
        $("#stock_price").html("US$" + product.price);
     
        if (product.pstatus == 2 && product.skustatus == 2 && product.skuInStock == 1) {
            $("#stock_tips").html("In stock, usually dispatched in 1 business day");
        }
        else {
            $("#stock_tips").html("Sold Out Currently!");
        }     
    };

    function bindInputQtyEvent() {
        var timer;
        $('#qty_box span').unbind('click').click(function () {
            if ($(this).hasClass('plus')) {
                if ($(this).hasClass('plus_off')) {
                    return false;
                }
                if (product.inputQty >= product.limitQty) {
                    product.inputQty = product.limitQty;
                    $(this).addClass('plus_off');
                }
                if (!$(this).hasClass('plus_off')) {
                    product.inputQty += 1;
                    $(this).parent().find('.minus').removeClass('minus_off');
                }
                if (product.inputQty >= product.limitQty) {
                    $(this).addClass('plus_off');
                }
            } else {
                if ($(this).hasClass('minus_off')) { return false; }
                if (product.inputQty > 1) {
                    product.inputQty -= 1;
                } else {
                    $(this).addClass('minus_off');
                }
                if (product.inputQty < product.limitQty) {
                    $(this).siblings('.plus').removeClass('plus_off');
                }
                if (product.inputQty < 2) { $(this).addClass('minus_off'); }
            }
            $('#input_qty').val(product.inputQty);
            clearTimeout(timer);
            timer = setTimeout(function () { getShipmentslist(); }, 500);
        });

        var timer1;
        $('#input_qty').unbind('onkeyup').keyup(function () {
            var $obj = $(this),
               //numObjMax = parseInt($obj.attr("max")),
               num = parseInt($obj.val()),
               minus = $obj.siblings(".minus"),
               plus = $obj.siblings(".plus");          
            $obj.val($obj.val() != '0' ? $obj.val().replace(/\D/g, '') : '1');
            if (num <= 1) {
                minus.addClass("minus_off");
                plus.removeClass("plus_off");
            } else if (num >= product.limitQty) {
                plus.addClass("plus_off");
                minus.removeClass("minus_off");
                $obj.val(product.limitQty);
            } else {
                minus.removeClass("minus_off");
                plus.removeClass("plus_off");
            }

            var tempQty = parseInt($obj.val());
            if (isNaN(tempQty)) {
                tempQty = 1;
            }
            product.inputQty = tempQty;

            clearTimeout(timer1);
            timer1 = setTimeout(function () { getShipmentslist(); }, 500);
        });
    };

    function bindAddToCartEvent(){
        //btn_buy        
        $("#btn_buy").unbind('click').click(function () {
            if(product.pstatus == 2 && product.skustatus == 2 && product.skuInStock == 1)
            {
                var url = "/shoppingcart.do/add."+product.sku+"~quantity." + product.inputQty;                
                if (product.wid == "2") {
                    url = "/shoppingcart.do/addwid."+product.sku+"~quantity."+product.inputQty+"~wid." + product.wid;
                }                
                window.location.href = url;
            }
        });
    };

};
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1,
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
$(document).on('change', '#lang_currency_box select,.menu_lang_currency select', function () {
    var eleId = $(this).attr('id');
    var changeVal = $(this).val();
    if (eleId == 'language_selector' || eleId == 'menu_language') {
        setLanguage(changeVal);
    } else if (eleId == 'currency_selector' || eleId == 'menu_currency') {
        setCurrency(changeVal);
    } else {
        console.log('Language & Currency Setting Function Occur Error!');
        return false;
    }
});
function setLanguage(val){  
}
function setCurrency(val) {
};

$('#subscribe_btn').click(function () {
    $('form[name="subscribe_form"]').submit();
});
$(window).scroll(function () {
    if ($(this).scrollTop() >= $(this).height() * 0.5) {
        $('.filter_contr').show();
    } else {
        $('.filter_contr').hide();
    }
});
$(document).on("click", ".top_title", function () {
    if ($(this).next().children().length > 0) {
        if ($(this).next().is(":visible")) {
            $(this).next().slideUp();
            $(this).find("span").removeClass("arrow_1").addClass("arrow_3")
        }
        else {
            $(this).next().slideDown();
            $(this).find("span").removeClass("arrow_3").addClass("arrow_1");
        }
    }
});
$(document).on("click", "#help>a", function () {
    $(".help_cont").stop(false, true).slideToggle();
    if ($(this).hasClass("active")) {
        $("#help em").addClass("arrow_3").removeClass("arrow_1");
        $(this).removeClass("active")
    } else {
        $("#help em").addClass("arrow_1").removeClass("arrow_3");
        $(this).addClass("active")
    }
});