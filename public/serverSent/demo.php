<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$time = date('r');
//推送的信息格式必须为”data:内容\n\n“
//The server time is: Tue, 29 Mar 2016 15:57:48 +0800
//t.html:19 The server time is: Tue, 29 Mar 2016 15:57:51 +0800
//t.html:19 The server time is: Tue, 29 Mar 2016 15:57:54 +0800
echo "data: The server time is: {$time}\n\n";
flush();