<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
    import '../../../static/ueditor/ueditor.config.js'
    import '../../../static/ueditor/ueditor.all.js'
    import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
    import '../../../static/ueditor/ueditor.parse.js'

    export default {
        name: "UEditor",
        props: {
            content: {
                type: String,
                default:''
            },
            id: {
                type: String
            },
            config: {
                type: Object
            }
        },
        data() {
            return {
                editor: null,
                user:null,
                defaultConfig:{
                    UEDITOR_HOME_URL : "/static/ueditor/",
                }
            }
        },
        mounted() {
            let href = window.document.location.href;
            let prefixpath = href.split("#")[0];
            this.defaultConfig.UEDITOR_HOME_URL = prefixpath + "static/ueditor/";

            this.getUserInfo();
            UE.delEditor("editor");
            //初始化UE
            Object.assign(this.config,this.defaultConfig);
            console.log(this.config,'this.config');
            let editor  = UE.getEditor('editor',this.config);
            let access_token = sessionStorage.getItem('access_token');

             editor.ready(()=>{
                 editor.execCommand('serverparam', {
                    'access_token':access_token,
                     'userid':this.user.userid,
                     'username':this.user.username,
                     'proxyPrefix': '/proxyapiUeditor'
                })
            });
            this.editor = editor;

        },
        destoryed() {
            this.editor.destory();
        },
        methods:{
            getUEContent: function(){
                return this.editor.getContent();
            },

            getContentTxt: function(){
                return this.editor.getContentTxt();
            },
            setContent(content){
                this.editor.setContent(content);
            },
            //获取用户信息
            getUserInfo(){
                this.user = JSON.parse(sessionStorage.getItem("user"));
                console.log(this.user,"this.user")
            },
        }
    }
</script>
