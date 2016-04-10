require.config({
    paths:{
        "a":'lib/a',
        "b":'lib/b',
        "c":'other/c',
    }
});

require(['a','b','c'],function(a,b,c){
    //window.onload = function()....开始的地方
    a.hello();
    b.hello();
    c.hello();
});
