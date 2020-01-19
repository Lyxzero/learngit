<?php
header("Content-Type: application/json;charset=utf-8");

        $file=$_GET["fileN"];
        $kemu=$_GET["kemu"];
        $arr = array(
            "0"=>array("0"=>array("w","we","00"),"1"=>array("w","we","01"),"2"=>array("w","we","02")),
            "1"=>array("0"=>array("w","we","10"),"1"=>array("w","we","11"),"2"=>array("w","we","12")),
            "2"=>array("0"=>array("w","we","20"),"1"=>array("w","we","21"),"2"=>array("w","we","22")),
            "3"=>array("0"=>array("w","we","30"),"1"=>array("w","we","31"),"2"=>array("w","we","32")),
            "4"=>array("0"=>array("w","we","40"),"1"=>array("w","we","41"),"2"=>array("w","we","42")),
            "5"=>array("0"=>array("w","we","50"),"1"=>array("w","we","51"),"2"=>array("w","we","52"))
        );
        echo json_encode($arr[$file]);



//        $file="https://linyx.top/files";
//        //1、首先先读取文件夹
//        $temp=scandir($file);
//        //遍历文件夹
//        foreach($temp as $v){
//            $a=$file.'/'.$v;
//            if(is_dir($a)){//如果是文件夹则执行
//                if($v=='.' || $v=='..'){//判断是否为系统隐藏的文件.和..  如果是则跳过否则就继续往下走，防止无限循环再这里。
//                    continue;
//                }
//                //echo "<font color='red'>$a</font>"."<br/>"; //把文件夹红名输出
//                list_file($a);//因为是文件夹所以再次调用自己这个函数，把这个文件夹下的文件遍历出来
//            }else{
//                //echo $a."<br/>";
//                array_push($arr,(string)$v);
//            }
//        }
//        //print_r($temp);
//        //echo  "<br/>";
//        //print_r($arr);
//        //print_r($res);





?>
