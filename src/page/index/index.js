require('./index.css')

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

//选择数据集
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

        //image
        var image=document.getElementById('img_train');

        //random
        if(randomBtn.checked){
            /**
             * $.ajax({
                type        :"GET",
                url         :"http://101.34.37.235:8000/trainingresult/",
                success     :function(data){
                    console.log(data)
                }
            });
             */
            $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/rf/training/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data);
                    image.src=data.result_url;
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
                }
            });
        }
        //dnn
        else if(dnnBtn.checked){

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
        var knnBtn=document.getElementById('dnn_predict');
        var dnnBtn=document.getElementById('knn_predict');

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
                }
            });
        }
        //dnn
        else if(dnnBtn.checked){

        }

    })
})