/* 
 * alert
 */
define(function(require,exports){
    var funCreate = require('elementCreate'),
        //funAjax = require('ajax'),
        overlay = require('overlay');
    
    var eleWin = funCreate.create("div",{
        styles:{
            display:"none",
//            position:"fixed",
            position:"relative",
//            left:"50%",
            zIndex:2
        }
    }),
        eleBar = funCreate.create("div",{
            class:"bar",
            styles:{
                fontSize:"12px",
                padding:"8px",
                backgroundColor:"#eee"
            }
        }),
        eleClose = funCreate.create("a",{
            href:"javascript:;",
            styles:{
                fontSize:"12px",
                color:"#34538b",
                textDecoration:"none",
                position:"absolute",
                margin:"-22px 0 0 85%"
            }
        }),
        eleBody = funCreate.create("div",{
            styles:{
                backgroundColor:"#fff",
                borderTop:"1px solid #ddd",
                textAlign:'center'
            }
        }),
        eleOverlay = overlay.overlay;
        
    eleWin.appendChild(eleBar);
    eleWin.appendChild(eleClose);
    eleWin.appendChild(eleBody);
    
    document.body.appendChild(eleWin);
    eleBar.innerHTML = "ALERT";
    eleClose.innerHTML = '[CLOSE]';
    eleClose.onclick = function(){
        flbox.close();
        return false;
    };
    
    var flbox = {
        loading:function(){
            eleBody.innerHTML = '<div style="width:200px;height:100px;padding:10px;">loading....</div>'
            this.position();
        },
        open:function(url){
            var self = flbox;
            eleBody.innerHTML = '<img src='+url+'/>';
            self.position();
//            funAjax.get(url,function(html){
//                //console.log(html);
//                //eleBody.innerHTML = html;
//                self.position();
//            });
        },
        position:function(){
            eleWin.style.display = "block";
            eleOverlay.show();
            var widthWin = eleWin.offsetWidth;
            var heightWin = eleWin.clientHeight;
            eleWin.style.marginLeft = "-" + widthWin/2 + "px";
            
            eleWin.style.top = (screen.availHeight-heightWin-100)/2 + "px";
        },
        close:function(){
            eleOverlay.hide();
            eleWin.style.display = "none";
            eleBody.innerHTML = "";
        }
    };
    exports.open = flbox.open;
});


