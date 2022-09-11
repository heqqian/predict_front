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

//训练模型
$(function(){
    $('#trainBtn').on('click',function(){

        var fileObj=$("#file")[0].files[0];//获取File对象
        console.log(fileObj);
        var formData=new FormData();//使用FormData格式传递
        formData.append("csv_file",fileObj);
        console.log(formData);

        var randomBtn=document.getElementById('random_train');
        var knnBtn=document.getElementById('knn_train');
        var dnnBtn=document.getElementById('dnn_train');

        //random
        if(randomBtn.checked){
            /**
             * $.ajax({
                type        :"POST",
                url         :"http://101.34.37.235:8000/rf/training/",
                data        :formData, 
                contentType :false,
                processData :false,
                success     :function(data){
                    console.log(data)
                }
            });
             */
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                type        :"GET",
                url         :"http://101.34.37.235:8000/trainingresult/",
                success     :function(data){
                    console.log(data)
                }
            });
        }
        //knn
        else if(knnBtn.checked){

        }
        //dnn
        else if(dnnBtn.checked){

        }

    })
})
