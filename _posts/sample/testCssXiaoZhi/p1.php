<?php

$funName = htmlspecialchars($_POST['function_name']);
if(isset($funName)){
    $res = call_user_func($funName);
}

function Save(){
    $ss = array("red"=>"Joe",'yellow'=>"Han");
    //echo $ss;
    $ss = json_encode($ss);
    echo $ss;
}