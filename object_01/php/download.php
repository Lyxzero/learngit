<?php
$file=$_GET["fileN"];
$arr = array("D:/xampp/htdocs/two/object_01/upload/a","D:/xampp/htdocs/two/object_01/upload/b","D:/xampp/htdocs/two/object_01/upload/c","D:/xampp/htdocs/two/object_01/upload/d","D:/xampp/htdocs/two/object_01/upload/e","D:/xampp/htdocs/two/object_01/upload/f");
$filedown = array();
    //1、首先先读取文件夹
    $temp=scandir($arr[$file]);
    //遍历文件夹
    foreach($temp as $v){

        $path=$arr[$file].'/'.$v;
        if(is_dir($path)){//如果是文件夹则执行

            if($v=='.' || $v=='..'){//判断是否为系统隐藏的文件.和..  如果是则跳过否则就继续往下走，防止无限循环再这里。
                continue;
            }
            //echo "<font color='red'>$path</font>","<br/>"; //把文件夹红名输出

            list_file($path);//因为是文件夹所以再次调用自己这个函数，把这个文件夹下的文件遍历出来
        }else{
            $name = pathinfo($path, PATHINFO_FILENAME);
            //echo  pathinfo($path, PATHINFO_FILENAME), '<br/>';   //文件名称
            $type = pathinfo($path, PATHINFO_EXTENSION);
            //echo  pathinfo($path, PATHINFO_EXTENSION), '<br/>';   //文件后缀

            $a=filemtime($path);
            $time = date("Y-m-d ",$a);
            //echo date("Y-m-d ",$a) ;   //修改时间

            $arr2 = array($name,$type,$time,$path);
            array_push($filedown,$arr2);

        }

    }
    echo json_encode($filedown);
