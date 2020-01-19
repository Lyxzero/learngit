var fileName = "0";
var kemu = "0";
query();
$(".tab-content li").click(function(){
    var index = $(this).index();
    if(index==0){
        $("#lujing").attr("action", "upload_file.php");
        fileName = index;
        query();
    }else if(index==1){
        $("#lujing").attr("action", "upload_file1.php");
        fileName = index;
        query();
    }else if(index==2){
        $("#lujing").attr("action", "upload_file2.php");
        fileName = index;
        query();
    }
    else if(index==3){
        $("#lujing").attr("action", "upload_file3.php");
        fileName = index;
        query();
    }
    else if(index==4){
        $("#lujing").attr("action", "upload_file4.php");
        fileName = index;
        query();
    }
    else if(index==5){
        $("#lujing").attr("action", "upload_file5.php");
        fileName = index;
        query();
    }
})

function query() {
    $.ajax({
        url: "php/download.php" ,
        type: "get",
        dataType: "json",
        data:{"fileN":fileName},
        success:function(res){
            console.log(res);
            d_update(res);
            u_update(res);
        },
        error:function(){
            alert("请求失败");
        }
    });

}

function d_update(shuju){
    clear();
    for (x = 0; x < shuju.length; x++) {
            var insert = `<tr><td>`+shuju[x][0]+`</td><td>`+shuju[x][2]+`</td><td></td><td>`+shuju[x][1]+`</td><td  class="text-center"><button class="btn btn-link" type="button"><a href="`+shuju[x][3]+`">下载</a></button></td></tr>`;
            $("#download thead").append(insert);// 追加新元素
    }
}
function u_update(shuju){
    for (x = 0; x < shuju.length; x++) {
        var insert = `<tr><td>`+shuju[x][0]+`</td><td></td><td></td><td>`+shuju[x][1]+`</td><td class="text-center">`+shuju[x][2]+`</td></tr>`;
        $("#upload thead").append(insert);// 追加新元素
    }

}
function clear(){
    $("thead td").remove();
}

function showFilename(file){
    $("#filename_label").html(file.name);
}

function upload(index) {

}







