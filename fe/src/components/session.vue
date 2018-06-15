<template>
	<el-table
			:data="table_data"
			style="width: 100%"
      stripe
      border>
      <el-table-column
        prop="key"
        label="key">
      </el-table-column>
			<el-table-column
				prop="time"
				label="连接时间">
			</el-table-column>
			<el-table-column
				prop="origin"
				label="origin">
			</el-table-column>
			<el-table-column
				prop="out_ip"
				label="out_ip">
			</el-table-column>
      <el-table-column
        label="查看触发页">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="showSession(scope.$index, table_data)"
            type="text"
            size="small">
            查看
          </el-button>
      </template>
      </el-table-column>

		</el-table>
</template>



<script>
	// import server_config from '../../../config';

 //	async function getData(origin){
 //		var data = await fetch(origin + "/sessions");
 //		console.log(data);
 //		return [];
 //	}

import axios from "axios"
import config from "../../../config"
function getTime(time){
	var d = new Date(time);
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var year = d.getFullYear();
	var hour = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();

	return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`;
}


		export default {
			data() {
				return {
					table_data: (function(){
						var table_data = []
						axios({
							method : "get",
							url : config.server_origin + "/session/getSessions",
						}).then(function(res){
							console.log(res.data);
							for(var i = 0;i<res.data.length;i++){
								var column = {
									key : res.data[i].key,
                  time : getTime(res.data[i].req.time),
									origin : res.data[i].req.origin,
									out_ip : res.data[i].req.out_ip
								};
								table_data.push(column);
							}

						}.bind(this));
						
						return table_data;
					})(),
          showSession : function(index,table_data){
            var key = table_data[index].key;
            var url = config.server_origin + "/session/showSession?id=" + key;
            window.open(url,"_blank");
          }

				}
			}
		}
	</script>