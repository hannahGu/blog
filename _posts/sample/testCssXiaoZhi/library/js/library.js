var g_page_val = {};
var curDate = getDatetime(0); 

$(document).ready(function(){
    getBookInfo();
    funAllEvent();
});


function getBookInfo(){
    
    $.ajax({
        url: 'sql_operate.php',
        type:'POST',
        data:{'function_name':'ShowBookInfo'},
        success:function(data){
            var res = extraHttpResult(data);
            var trList = [];
            for(var uuid in res){
                var tdList = [];
                var info = res[uuid];
                tdList.push(info['name']);
                tdList.push(info['writer']);
                tdList.push(info['status']);
                tdList.push(info['num']);
                tdList.push(info['time']);


                tdList.push('<i uuid="' + uuid + '" class="edit_info fun_a_style fa fa-pencil" ></i>' 
                        + '<i uuid="' + uuid + '" class="delete_info fun_a_style fa fa-times"></i>');
                trList.push(tdList);
            }
            var aoColumns = [];
            aoColumns.push({"sTitle": "Name", 'sWidth': '20%'});
            aoColumns.push({"sTitle": "Writer", 'sWidth': '20%'});
            aoColumns.push({"sTitle": "Status", 'sWidth': '10%',"bSortable": false,'sClass': 'tcenter'});
            aoColumns.push({"sTitle": "Num", 'sWidth': '10%',"bSortable": false,'sClass': 'tcenter'});
            aoColumns.push({"sTitle": "ModyTime", 'sWidth': '15%',"bSortable": false,'sClass': 'tcenter'});
            aoColumns.push({"sTitle": "Operation", 'sWidth': '20%',"bSortable": false,'sClass': 'tcenter'});

            $('#book_record').dataTable({
                "aaData": trList, 
                "iDisplayLength": 10,
                "aoColumns": aoColumns,
                "bDestroy": true,
                "bProcessing": false,
                "bLengthChange": false,
                "bFilter": false,
                "sPaginationType": "bootstrap",
//                "sPaginationType": "two_button",
                //"aaSorting": [[ 4, "desc" ]],
                "fnDrawCallback": function(oSettings) {
                    $(".edit_info").click(function(){
                        var uuid = $(this).attr('uuid');
                        g_page_val = {0:{name:res[uuid].name,uuid:uuid,writer:res[uuid].writer,num:res[uuid].num,time:res[uuid].time}};
                        addBook();
                        $('#book_uuid').val(uuid);
                        $('#add_btn_div').html('');
                        $('#page_move ul').html('');
                        $('#add_book_dialog .modal-title').text( "Edit book");
                        $("#add_book_dialog").modal({backdrop:"static"});
                    });

                    $(".delete_info").click(function(){
                        var uuid = $(this).attr('uuid');
                        if(!confirm("Are you sure to delete it?")){
                        return;
                        }
                        $.ajax({
                            url: 'sql_operate.php',
                            type:'POST',
                            data:{'function_name':'delete_book','uuid':uuid},
                            success:function(data){
                                var res = extraHttpResult(data);
                                if (!res || !res.status || res.status !== 'success'){
                                    showResponse(res.text, 0);
                                    return;
                                }
                                showResponse('Delete successfully', 1); 
                                getBookInfo();
                            }
                        });
                    });
                }
            }); 
        }
    });   
}

function funAllEvent(){
    $("#add_new").click(function(){
        g_page_val = {};
        $('#add_btn_div').html('');
        $('#add_btn_div').html('<button class="btn btn-primary" id="add_book">Add</button></div>');
        $('#page_move ul').html('');
        
        addBook();
        $('#add_book_dialog .modal-title').text( "Add new books");
        $("#add_book_dialog").modal({backdrop:"static"});
        
        $('#add_book').click(function(){
            addBook();
        });
    });
    

    $('#save_popup_btn').click(function(){
        $.ajax({
            url: 'sql_operate.php',
            type:'POST',
            data:{
                'function_name': 'save_new_book',
                'books':JSON.stringify(g_page_val)
            },
            success:function(data){
                var res = extraHttpResult(data);

                if (!res || !res.status || res.status !== 'success'){
                    var str = 'Update failed' + '<br/>';
                    if (res && res.text) {
                        str = res.text;
                    }
                    showResponse(str, 0);
                    return;
                }
                showResponse("Save successfully",1);
                $('#add_book_dialog').modal('hide');
                getBookInfo();
            }
        });
    });
    
     $('.del_sche_btn').click(function(){

        var page = parseInt($('#page_move .active').text());
        delete g_page_val[page];
        page = 1;

        if($('#page_move .active').next().length){
            $('#page_move .active').next().addClass('active');
            $('#page_move .active').first().remove();
            page = parseInt($('#page_move .active').text());
        }
        else if($('#page_move .active').prev().length){
            $('#page_move .active').prev().addClass('active');
            $('#page_move .active').last().remove();
            page = parseInt($('#page_move .active').text());
        }
        else{
            $('#page_move ul').html('');
            g_page_val[1]={name:'',writer:'',num:'',time:curDate};
        }
        
        $('.name_msg').val(g_page_val[page].name);
        $('.writer_msg').val(g_page_val[page].writer);
        $('.num_msg').val(g_page_val[page].num);
        $('.sche_time').children('input').val(g_page_val[page].time);
        $('.sche_time').data("DateTimePicker").date(g_page_val[page].time);
    });
}

function addBook(){
    if(g_page_val[0]&&g_page_val[0].uuid){
        var page = 0;
    } 
    else{
        var page = 1;
        var str = '';
        if($('#page_move ul li').length>0){
            page = parseInt($('#page_move ul li').last().text()) + 1;
        }
        g_page_val[page]={name:'',uuid:'',writer:'',num:'',time:curDate};
        str += '<li>'+ page + '</li>';
        $('#page_move ul').append(str);
        $('#page_move ul li').removeClass('active');
        $('#page_move ul li').last().addClass('active');
    }

    $('.name_msg').val(g_page_val[page].name);
    $('.writer_msg').val(g_page_val[page].writer);
    $('.num_msg').val(g_page_val[page].num);
    $('.sche_time').children('input').val(g_page_val[page].time);
    //$('.sche_time').data("DateTimePicker").date(curDate);
    
    $('.name_msg').keyup(function(){
        var num = parseInt($('#page_move .active').text());
        num = num ? num: 0;
        g_page_val[num].name = $(this).val();
    });
    $('.writer_msg').keyup(function(){
        var num = parseInt($('#page_move .active').text());
        num = num ? num: 0;
        g_page_val[num].writer = $(this).val();
    });
    $('.num_msg').keyup(function(){
        var num = parseInt($('#page_move .active').text())
        num = num ? num: 0;
        g_page_val[num].num = $(this).val();
    });

    $('#page_move ul li').last().click(function(){
        var num = parseInt($('#page_move .active').text())
        
        num = num ? num: 0;
        g_page_val[num].time = $.trim($('.sche_time input').val());
        $('#page_move li').removeClass("active");
        $(this).addClass("active");

        var page = parseInt($(this).text());

        $('.name_msg').val(g_page_val[page].name);
        $('.writer_msg').val(g_page_val[page].writer);
        $('.num_msg').val(g_page_val[page].num);
        $('.sche_time').children('input').val(g_page_val[page].time);
        $('.sche_time').data("DateTimePicker").date(g_page_val[page].time);
    });
    

    var tmp_dp = $('.sche_time').datetimepicker({
        'format': 'YYYY-MM-DD HH:mm:ss',
        'sideBySide': true,
        'ignoreReadonly':true
    }); 
    return tmp_dp;
}
