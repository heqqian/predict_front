require('./index.css')
require("page/common/index.js");

//加载File文件选择对象
function upload(){
    var fileObj=document.createElement('input');
    fileObj.setAttribute('id','file');
    fileObj.setAttribute('type','file');
    fileObj.setAttribute('name','file');
    fileObj.setAttribute('style','visibility:hidden');
    document.body.appendChild(fileObj);
    fileObj.value;
    fileObj.click();
    console.log(fileObj);
}
// 获取弹窗
var modal = document.getElementById('myModal');
 //调用图片函数
figureShow=function(resURL){
    //在页面中弹出图片
    //关键代码
    document.getElementById("image").src = resURL;//注入图片src
    modal.style.display = "block";
    modal.onclick = function() { 
        modal.style.display = "none";
     }
}

// 获取图片img_train
$(function(){
    $('#img_train').on('click',function(){
        modal.style.display = "block";
        document.getElementById("image").src = this.src;
        modal.onclick = function() { 
            modal.style.display = "none";
        }
    })
})
// 获取图片img_predict
$(function(){
    $('#img_predict').on('click',function(){
        modal.style.display = "block";
        document.getElementById("image").src = this.src;
        modal.onclick = function() { 
            modal.style.display = "none";
        }
    })
})


//选择数据集
$(function(){
    $('#fileChooseBtn1').on('click',function(){
        if(document.getElementById('file')){
            document.getElementById('file').remove();
        }
        upload();
        document.querySelector('#file').addEventListener('change',e=>{
            for(let entry of e.target.files){
                document.getElementById('filename1').value=entry.name;
                console.log(entry);//打印File对象
            }
        })
    })
    $('#fileChooseBtn2').on('click',function(){
        if(document.getElementById('file')){
            document.getElementById('file').remove();
        }
        upload();
        document.querySelector('#file').addEventListener('change',e=>{
            for(let entry of e.target.files){
                document.getElementById('filename2').value=entry.name;
                console.log(entry.name,entry.webkitRelativePath);
            }
        })
    })
})

//训练模型所得测试结果图
$(function(){
    $('#trainBtn').on('click',function(){

        var fileObj=$("#file")[0].files[0];//获取File对象
        console.log(fileObj);
        var formData=new FormData();//使用FormData格式传递
        formData.append("csv_file",fileObj);

        //radioButton
        var randomBtn=document.getElementById('random_train');
        var knnBtn=document.getElementById('knn_train');
        var dnnBtn=document.getElementById('dnn_train');
        var kmeansBtn=document.getElementById('kmeans_train');
        //image
        var image=document.getElementById('img_train');

        //random
        if(randomBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/rf/training/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src=data.result_url;
                    figureShow(image.src);
                }
            });
        }
        //knn
        else if(knnBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/knn/training/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src=data.result_url;
                    figureShow(image.src);
                }
            });
        }
        //dnn
        else if(dnnBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/dnn/training/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src=data.result_url;
                    figureShow(image.src);
                }
            });
        }
        //kmeans
        else if(kmeansBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/kmeans/training/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src=data.result_url;
                    figureShow(image.src);
                }
            });
        }

    })
})

//预测数据集的饼状图
$(function(){
    $('#predictBtn').on('click',function(){

        var fileObj=$("#file")[0].files[0];//获取File对象
        console.log(fileObj);
        var formData=new FormData();//使用FormData格式传递
        formData.append("csv_file",fileObj);

        //radioButton
        var randomBtn=document.getElementById('random_predict');
        var knnBtn=document.getElementById('knn_predict');
        var dnnBtn=document.getElementById('dnn_predict');
        var kmeansBtn=document.getElementById('kmeans_predict');

        //image
        var image=document.getElementById('img_predict');

        //random
        if(randomBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/rf/predict/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src="data:image/png;base64,"+data.base64str;
                    figureShow(image.src);
                }
            });
        }
        //knn
        else if(knnBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/knn/predict/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src="data:image/png;base64,"+data.base64str;
                    figureShow(image.src);
                }
            });
        }
        //dnn
        else if(dnnBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/dnn/predict/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src="data:image/png;base64,"+data.base64str;
                    figureShow(image.src);
                }
            });
        }
        //kmeans
        else if(kmeansBtn.checked){
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/kmeans/predict/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src="data:image/png;base64,"+data.base64str;
                    figureShow(image.src);
                }
            });
        }

    })
})

//获取训练结果列表
$(function(){
    $('#toResultList').on('click',function(){
        $.ajax({
            type        :"GET",
            url         :"http://101.34.37.235:8000/trainingresult/",
            success     :function(data){
                console.log(data);
    
                var str="";//声明str，防止产生undefined
                var type="";
               
                for(var i=0;i<data.length;i++){
    
                    if(data[i].type==="rf")
                        type="随机森林";
                    else if(data[i].type==="dnn")
                        type="深度学习";
                    else if(data[i].type==="knn")
                        type="K-近邻";
                    else if(data[i].type==="kmeans")
                        type="kmeans";
    
                    str+="<tr onclick='figureShow(\""+data[i].result_url+"\")' style='cursor:pointer'>"+
                        "<td>"+(i+1)+"</td>"+
                         "<td>"+type+"</td>"+
                         "<td>"+data[i].filename+"</td>"+
                         "<td>"+data[i].auc+"</td>"+
                         "<td>"+data[i].macro+"</td>"+
                         "<td>"+data[i].macro_recall+"</td>"+
                         "<td>"+data[i].weighted+"</td>"+
                         "<td>"+data[i].time+"</td>"+
                         +"</tr>";
                }
                testResult.innerHTML=str;//将数据写入html中
            },
            
        });
    })
})