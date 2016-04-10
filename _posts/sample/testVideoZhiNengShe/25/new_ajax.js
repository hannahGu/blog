function ajax(url,fnSuc,fnFaild){
    var oAjax = new XMLHttpRequest();
    oAjax.open("GET",url,true);
    oAjax.send();
    oAjax.onreadystatechange = function(){
        if(oAjax.readyState == 4){
            if(oAjax.status == 200){
                fnSuc(oAjax.responseText);
            }else{
                if(fnFaild){
                    fnFaild(oAjax.status);
                }
            }
        }
    }
}


