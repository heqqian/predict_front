#前端部署脚本
ID=$(pm2 list|grep "defect_predict"| awk '{ print $2 }')
if [ -z "$ID" ]
then
    echo '目前predict_defect不在运行中'
else
    #使用pm2管理项目
	echo '停止defect_predict fork'
	pm2 stop defect_predict > /dev/null

	echo '删除defect_predict fork'
	pm2 delete defect_predict > /dev/null
fi
echo '安装npm库' 
npm install > /dev/null

echo '打包dist'
npm run build > /dev/null

echo 'fork启动'
pm2 start npm --name defect_predict -- start