<?php
$dbConfig["server"] = 'localhost';
$dbConfig["database"] = 'testlibrary';
$dbConfig["username"] = 'root';
$dbConfig["password"] = '123456';

$dsn = 'mysql:host='.$dbConfig["server"].';dbname='.$dbConfig["database"].'';
        
try {
    $dbh = new PDO($dsn,$dbConfig["username"],$dbConfig["password"]);
    $dbh->query("SET NAMES 'utf8'");
} catch (PDOException $e) {
    echo "CoctToDaseFaed";
    die();
}

$datetime = new DateTime();
$curDatetime = $datetime->format('Y-m-d H:i:s');

$funName = htmlspecialchars($_POST['function_name']);
if(isset($funName)){
    $res = call_user_func($funName);
    echo 'f3e42f70-0b19-11df-8a39-0800200c9a66';
    echo $res;
    echo '12b6f680-0b1a-11df-8a39-0800200c9a66';
}

function ShowBookInfo(){
    global $dbh;
    $sql = 'SELECT * FROM book_info';
    $res = $dbh->query($sql);
    
    $res_data = array();
    
    if (FALSE != $res) {
        foreach ($res AS $row) {
            $res_data[$row['bi_uuid']] = array(
                'name' => $row['bi_name'],
                'writer' => $row['bi_writer'],
                'status' => $row['bi_status'],
                'time' => $row['bi_update_time'] ,
                'num' => $row['bi_num']
            );
        }
    }
    return json_encode($res_data);
    
}


function delete_book(){
    global $dbh;
    $uuid = trim($_POST['uuid']);
    $retStatus = 'success';
    $retTxt = '';
    $sql = 'DELETE FROM book_info where bi_uuid="'.$uuid.'"';
    try{
       $dbh->exec($sql); 
    }catch(PDOException $e){
        $retStatus = 'failed';
        $retTxt = "Delete failed, ". $e->getMessage();
        return;
    }
    
    $myArr = array(
        'status' => $retStatus,
        'text' => $retTxt
    );     
    return json_encode($myArr);    
}



function save_new_book(){
    global $dbh;
    $retStatus = 'success';
    $retTxt = '';
    $books = trim($_POST['books']);
    $books = json_decode($books);
    $books = (array)$books;
    print_r($books);
    
    $sql = 'INSERT INTO `book_info` (`bi_uuid`, `bi_name`, `bi_writer`,'
        . ' `bi_num`, `bi_update_time`) VALUES ';
    $vals = '';

    foreach ($books as $book) {
        if($book->uuid){
            $uuid = $book->uuid;
        }
        else{
            $uuid = GenUUID();
        }
            $vals .= '("'.$uuid.'","'.$book->name.'","'.$book->writer.'","'.$book->num.'","'.$book->time.'"),';
        }
    if($vals){
        $vals = substr($vals, 0, strlen($vals) - 1);
    }
    $sql .= $vals;

    try{
        $dbh->exec($sql); 
    }catch(PDOException $e){
        $retStatus = 'failed';
        $retTxt = "Save failed: ". $e->getMessage();
    }
    
    $myArr = array(
        'status' => $retStatus,
        'text' => $retTxt
    );     
    return json_encode($myArr);
}


class  Random
{
    function  nextLong()
    {
        $tmp  =  rand(0,1)?'-':'';
        return  $tmp.rand(1000,  9999).rand(1000,  9999).rand(1000,  9999).rand(100,  999).rand(100,  999);
    }
}

class  Guid
{
    var  $valueBeforeMD5;
    var  $valueAfterMD5;
       
    function  Guid()
    {
        $this->getGuid();
    }
       
    function  getGuid()
    {
        $address  =  NetAddress::getLocalHost();
        $this->valueBeforeMD5  =  $address->toString().':'.System::currentTimeMillis().':'.Random::nextLong();
        $this->valueAfterMD5  =  md5($this->valueBeforeMD5);
    }
    function  newGuid()
    {
        $Guid  =  new  Guid();
        return  $Guid;
    }
    function  toString()
    {
       $raw  =  strtoupper($this->valueAfterMD5);
       return  substr($raw,0,8).substr($raw,8,4).substr($raw,12,4).substr($raw,16,4).substr($raw,20);
    }
}

function GenUUID()
{
    $guid = new Guid;
    $uuid = $guid->toString();
    return $uuid;
}

class  System
{
    function  currentTimeMillis()
    {
        list($usec,$sec) =explode(" ",microtime());
        $ret = $sec.substr($usec,  2,  3);
        return  $ret;
    }
}

class  NetAddress
{
    var  $Name  =  'localhost';
    var  $IP  =  '127.0.0.1';
    static function  getLocalHost()  //  static
    {
        $address  =  new  NetAddress();
        if( isset( $_ENV['COMPUTERNAME'] )  )
        {           
            $address->Name  =  $_ENV['COMPUTERNAME'];
        } else {        
            $address->Name = 'FUNTORO_CMS_SERVER';
        }
        $address->IP  =  GetIP();
        return  $address;
    }
    function  toString()
    {
        return  strtolower($this->Name.'/'.$this->IP);
    }
}

function GetIP()
{
    if (getenv('HTTP_CLIENT_IP'))
        $ip = getenv('HTTP_CLIENT_IP');
    else if (getenv('HTTP_X_FORWARDED_FOR'))
        $ip = getenv('HTTP_X_FORWARDED_FOR');
    else if (getenv('REMOTE_ADDR'))
        $ip = getenv('REMOTE_ADDR');
    else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
        $ip = $_SERVER['REMOTE_ADDR'];
    else
        $ip = "";
    return $ip;
}