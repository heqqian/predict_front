require('./index.css')


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
            console.log(entry.name,entry.webkitRelativePath);
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