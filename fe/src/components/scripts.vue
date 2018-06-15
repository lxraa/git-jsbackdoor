<template>
<el-container>

<el-row :span="24">
<el-col>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>管理</span>
  </div>
  <el-button @click="getScripts()">刷新</el-button>
  <el-button @click="clearScripts()">清空</el-button>
  <el-button @click="initScripts()">初始化</el-button>
</el-card>
</el-col>
<el-col>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>添加脚本</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="addScript()">添加！</el-button>
  </div>
  <el-input
	type="textarea"
	v-model="new_script">
	</el-input>
</el-card>
</el-col>
<el-col>
<div v-for="script in scripts">
  <el-input
  value="script.script"
  type="textarea"
  v-model="script.script">
</el-input>
</div>
</el-col>
</el-row>

</el-container>
</template>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 80%;
  }
  .el-row {
    width: 90%;
  }
  .el-col {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
<script>
import axios from "axios"
import config from "../../../config"

// function getScripts(){
// 	return axios.post({
// 		method:"post",
// 		url : config.server_origin) + "/getScripts"
// 	});
// }

// axios.all([getScripts()]).then();



// function getScripts(){
//   axios({
//     method:"post",
//     url : config.server_origin + "/admin/getScripts"
//   }).then(function(res){
//     console.log(this);
//     _this.scripts = res.data;
//   }.bind(_this));
// }
// getScripts();


export default {
  data() {
    return {
      new_script: (function(){
        return "";
      })(),
      scripts : (function(){
        return [];
      }.bind(this))(),
      addScript : function(){

        var new_scripts = [];
        if(!this.new_script){
          return ;
        }
        new_scripts.push({script:this.new_script});

        axios({
          withCredentials:true,
          headers:{
              "Content-Type":"application/json"
            },
          method : "post",
          url : config.server_origin + "/script/addScripts",
          data : JSON.stringify({scripts:new_scripts})
        }).then(function(res){
          if(res.data == "ok"){
            this.getScripts();
          }
        }.bind(this));
      },
      clearScripts : function(){
        this.$confirm("（＞д＜）该操作将清空默认脚本，是否继续？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{
          axios({
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
              },
              method:"post",
              url : config.server_origin + "/script/clearScripts"
          }).then((res)=>{
            this.getScripts();
          });
        }).catch(()=>{

        });
        
      },
      getScripts : function(){
          axios({
            withCredentials:true,
            headers:{
              "Content-Type":"application/json"
            },
            method:"post",
            url : config.server_origin + "/script/getScripts"
          }).then(function(res){
            this.scripts = res.data;
          }.bind(this));
        }
    }
  }
}

</script>