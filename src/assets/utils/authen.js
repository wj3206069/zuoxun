import getHttpInstance, { getQueryString } from '../utils';
import config from '../config';

let http = getHttpInstance(config)

export default {
	beforeRouteEnter(to, from, next) {
		let meta = to.meta
		if(meta.requiresAuthen) {
			let userstr = sessionStorage.getItem('user');
			if(userstr!=null) {
				next();
			}else{
				var token=getQueryString('access_token');
				if(token!=null)
				{
					var token=getQueryString('access_token');
					sessionStorage.setItem("access_token",token);
					http.get('https://www.zxpaas.com/authen/user?access_token=' + token).then(res=>{
                        alert(res);
						 var obj={};
						 obj.username=res.name;
						 obj.token=token;
						 sessionStorage.setItem('user',JSON.stringify(obj));
						 next();
						 return;
					})
				}
				else
				{
					var allpath = window.location.href;				 
					var codeindex=allpath.indexOf('?code=');
					if(codeindex>-1)
					{
						var code=allpath.substring(codeindex+6,codeindex+12);
						var uri=allpath.substring(0,codeindex);					  
						http.post('https://www.zxpaas.com/authen/oauth/token?client_id=f293f3b273ef41b9b7a65739c6a68dad&client_secret=83186309&grant_type=authorization_code&code='+code+'&redirect_uri='+uri).then(res => {
						    // sessionStorage.setItem('user', JSON.stringify(res.user));
                http.get('https://www.zxpaas.com/authen/user?access_token=' + res.access_token).then(respone=>{
                    //console.log(respone)
                    //alert(JSON.stringify(respone));
                    let obj={};
                    obj.username=respone.principal.nickname;
                    obj.token=res.access_token;
                    obj.userid=respone.principal.userid;
                    obj.role=respone.principal.roles;
                    sessionStorage.setItem('user',JSON.stringify(obj));
                    sessionStorage.setItem('access_token', res.access_token);
                    sessionStorage.setItem('refresh_token', res.refresh_token);
                    window.location.href=uri;
                })
						});
						
					}
					else
					{
						var allpath = window.location.href;
						window.location.href='https://www.zxpaas.com/authen/oauth/authorize?client_id=f293f3b273ef41b9b7a65739c6a68dad&scope=read&response_type=code&redirect_uri='+allpath;	
					}
				}
			}
		}else{
			next();
		}
	}
}
