function showResponse(info, status) {
    var pinndimg = "";
    $('#reponse_panel .modal-header').show();
    if (status === 0 || status === "failed") {
        pinndimg = "<i class='fa fa-exclamation-triangle failed'></i>";
        $("#reponse_panel .modal-title").html("Warning");
    }
    else if (status === 1 || status === "success") {
        pinndimg = "<i class='fa fa-check success'></i>";
        $("#reponse_panel .modal-title").html("Information");
    }
    else if (status === 3) {
        pinndimg = '<i class="fa fa-spinner fa-spin wait"></i>';
        $('#reponse_panel .modal-header').hide();
    } else {
        pinndimg = "<i class='fa fa-exclamation-circle info'></i>";
        $("#reponse_panel .modal-title").html("Information");
    }

    var str = pinndimg + "<span id='reponse_span_info'>" + info + "</span>";

    $("#reponse_panel .info").html(str);
    $("#reponse_panel").modal('show');
    $('#reponse_panel').css('z-index', 99999);
}

function extraHttpResult(data) {
    if (!data) {
        return null;
    }
    data = data.replace(/[\r\n]+/gm, "");
    var regE = /f3e42f70-0b19-11df-8a39-0800200c9a66([\s\S]+)12b6f680-0b1a-11df-8a39-0800200c9a66/im;
    var subs = data.match(regE);
    if (subs) {
        if (subs.length && subs.length == 2) {
            var res = eval('(' + subs[1] + ')');
            return res;
        }
        else {
            var svresinval = "reseinvd26";
            alert(svresinval);
            return null;
        }
    }
    else {
        var svresinval2 = "reseinvd32";
        alert(svresinval2);
        return null;
    }
}

function getDatetime(day, mod){
    var now = new Date();
    day = parseInt(day);
    
    var utc = now.getTime();
    
    if(mod === '+'){
        utc = utc + day*24*60*60*1000;
    }else{
        utc = utc - day*24*60*60*1000;
    }
    var diff_rtime = new Date(utc);
    var yy1 = diff_rtime.getFullYear();
    var mm1 = diff_rtime.getMonth()+1;
    var dd1 = diff_rtime.getDate();
    var time = diff_rtime.toTimeString();
    time = time.substr(0,8);
    mm1 = (mm1 < 10 ? "0" + mm1:mm1);
    dd1 = (dd1 < 10 ? "0" + dd1:dd1);
    return yy1 + '-' + mm1 + '-' + dd1 + ' ' + time; 
}

