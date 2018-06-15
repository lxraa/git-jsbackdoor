import webrequest from "./modules/webrequest"
import config from "../config"
//webrequest.filters.urls.push(config.server_origin+"/*");
webrequest.redirect_url = config.server_origin + "/proxy";
webrequest.filters.headers.push({referer : config.server_origin+"/*"});


webrequest.setHook();