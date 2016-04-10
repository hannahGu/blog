 /*把整个过程分为3步：按照执行逆序：第一步给出链接，索引（将军）
 *                           第二步实现的大概脉络（将军和前锋和大尉，将军在调兵遣将）
 *                           第三步很多处小细节处理（大尉在管辖各自的兵力）
 *                           
 *                           此处为第二步
 *                           可以学习如何require一个模块
 *                           而且此处是主模块
 */
define(function(require,exports,module){
    var jQuery = require('{{ site.baseurl }}/_posts/base/tjs/moduleJS/seaJS/simpleCase/jquery');//index.html中虽然有定义（你也说了是定义而
                                   //已），但是实际用到的时候还是要require
    var mysea2 = require('{{ site.baseurl }}/_posts/base/tjs/moduleJS/seaJS/simpleCase/mysea2');
    console.log(mysea2.show()+'jquery version '+$().jquery);
});


