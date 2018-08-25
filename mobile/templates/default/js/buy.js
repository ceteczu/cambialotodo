; if (typeof (is_index) == 'undefined' && typeof (is_category) == 'undefined' && typeof (is_search) == 'undefined') {
    //ajax_prod();
}
$(window).scroll(function () {
    var scrollPos = $(this).scrollTop();
    var window_H = $(this).height();
    var dbHiht = $(document).height();
    if (typeof (is_index) != 'undefined' && scrollPos > 2 * window_H) {
        //
    } else {
        //
    }
    if (typeof (is_index) == 'undefined' && typeof (is_category) == 'undefined' && typeof (is_search) == 'undefined' && dbHiht - scrollPos - window_H < window_H / 3) {
        //ajax_prod();
    }
});
//check if function exists or not
function isExitsFunction(funcName) {
    try {
        if (typeof (eval(funcName)) == "function") {
            return true;
        }
    } catch (e) {
        //console.log(e);
    }
    return false;
};
function ajax_prod(parameters) {
    var parameters = parameters || {};
    if (typeof ($('.goods_hot_prod .prod_list').attr("page")) == "undefined") {
        $('.goods_hot_prod .prod_list').attr("page", 1);
        $('.goods_hot_prod .prod_list').attr("ajaxLoading", 0);
        parameters.page = 1;
    } else {
        parameters.page = parseInt($('.goods_hot_prod .prod_list').attr("page"));
        var totalPage = parseInt($('.goods_hot_prod .prod_list').attr("totalPage"));
        if (parameters.page > totalPage) { return false; }
    }
    if ($('.goods_hot_prod .prod_list').attr("ajaxLoading") == '1')
        return false;
    $('.goods_hot_prod .prod_list').attr("ajaxLoading", 1);
    if (typeof (is_index) != 'undefined' || typeof (is_category) != 'undefined' || typeof (is_search) != 'undefined') {
        $('.wrap .goods_hot_prod .viewmore a').html('<i></i>');
    } else {
        $('#publoading').show();
    }
    var fbViewContentPids = [];
    if (typeof (ajaxUrl) == 'undefined' || ajaxUrl == '') {
        return false;
    }
};






function Buygo() {
    $('.buy').unbind('click').click(function () {
        if ($(this).hasClass('not_buy')) {
            return false;
        }
        pid = $(this).parent().attr("pid");
        sku = $(this).parent().attr("sku");
        warehouse = $(this).parent().attr("warehouse");
        if (typeof warehouse == 'undefined') {
            warehouse = '1';
        }
        data = { "pid": pid }
        if ($('.msg_box span').hasClass('state')) {
            return false;
        } else {
            var msg = _LC_PROCESSING;
            var flag = 'state';
            showMsgBox(msg, flag, 10000);
        }
        if (ExistsiPhone() || ExistsiPad()) iNoBounce.enable();        
        $('.msg_box').remove();
        var ispresell = $(this).attr('ispresell');
        if (typeof ispresell != 'undefined' && ispresell == 1) {
            showPreSellBox(pid);
            return false;
        }        
        if (warehouse == ""){
            warehouse = "1";
        }
        productNewPanel(pid, sku, warehouse);
    });
}

Buygo();

function showPOABox(poaBox) {
    if (!poaBox) {
        return;
    }
    var $body = $('body');
    $('.msg_box').remove();
    $body.append(poaBox);
    $(".panel").animate({ top: '0%' });
    bindPanelClickEvent();
    $('html,body').addClass('no_scroll');
    ajax_box($body);
};

function ajax_box(ele) {
    var boxH = ele.find('.cont_box').outerHeight();
    if (boxH > $(window).height()) {
        ele.find('.cont_box').css('top', '50px');
        var surplusH = $(window).height() - $('.option_name').outerHeight(true) - $('.add_to_cart').outerHeight(true) - 50;
        $('.cont_box .option_box .option_type').css({ 'height': surplusH, 'overflow-y': 'scroll' });
    }
}

//save
function Save() {
    $('.operator .save').click(function (){
        var $save = $(this);
        pid = $save.parents('.operator').attr('pid');
        sku = $save.parents('.operator').attr('sku');
        if (typeof ($save.parents('.operator').attr("ajaxLoading")) == "undefined") {
            $save.parents('.operator').attr("ajaxLoading", 0);
        }
        if ($save.parents('.operator').attr("ajaxLoading") == 1) {
            return false;
        } else {
            $save.parents('.operator').attr("ajaxLoading", 1);
        }
        $.ajax({
            url: '/Home/AddWishList',
            type: 'GET',
            dataType: 'json',
            data: { 'sku': sku },
            success: function (data) {
                $save.parents('.operator').attr("ajaxLoading", 0);
                if (data.Status == "501") {
                    self.location.href = "/login.html?ReturnUrl=" + escape(self.location.href);
                }
                else if (data.Status == "200") {
                    $save.addClass('operator_off').siblings('.edit').removeClass('operator_off');
                }
                else {
                    showMsgBox(data.Msg, "error", 2500);
                }
            }
        })
    });
};
Save();

//edit
function Edit(){
    $('.operator .edit').click(function () {
        var $edit = $(this);
        pid = $edit.parents('.operator').attr('pid');
        sku = $edit.parents('.operator').attr('sku');
        if (typeof ($edit.parents('.operator').attr("ajaxLoading")) == "undefined") {
            $edit.parents('.operator').attr("ajaxLoading", 0);
        }
        if ($edit.parents('.operator').attr("ajaxLoading") == 1) {
            return false;
        } else {
            $edit.parents('.operator').attr("ajaxLoading", 1);
        }
        $.ajax({
            url: "/Home/RemoveWishList",
            data: {'sku':sku},
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $edit.parents('.operator').attr("ajaxLoading", 0);
                if (data.Status == "501"){
                    self.location.href = "/login.html?ReturnUrl=" + escape(self.location.href);
                }
                else if(data.Status == "200") {
                    $edit.addClass('operator_off').siblings('.save').removeClass('operator_off');
                }
                else{
                    showMsgBox(data.Msg, "error", 2500);
                }            
            }
         });
    });
};
Edit();

// {'pid':'92481','opt_value':'option_id1-opt_valueid1|option_id2-opt_valueid2','qty':'1','warehouse':'CN'}
function ajax_addtocart(data) {
    var data = data;
    dataParam = data;
}

function showPreSellBox(product_id) {
    $('.msg_box').remove();
    showMsgBox('', 'state', 6000);
}

function addPreSell(product_id, customer_email) {
    var pid = (typeof product_id == 'undefined') ? $('#cur_product').attr('products_id') : product_id;
    var email = (typeof customer_email == 'undefined') ? $('.email').val() : customer_email;

    function zValidate_email(email) {
        var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
    };
    if (zValidate_email(email) == false) {
        showMsgBox(_LD_PREORDER_INVALID_EMAIL_ADDRESS, 'error', 3000);
        return false;
    }
    var data = { 'pid': pid, 'email': email };
};