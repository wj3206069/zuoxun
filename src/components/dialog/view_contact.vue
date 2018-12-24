<template>
    <div role="dialog" class="el-message-box__wrapper" style="font-size: 14px;" v-show="show"> 
        <div class="el-message-box" >
            <div class="contact-header">
                <i class="el-icon-tickets"></i>
                <span>查看联系人</span>
            </div>
            <div class="contact-body">
                <div class="contact-search">
                    <el-input size="mini"  placeholder="搜索成员、部门" style="border-color:#b4bec8;">                      
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
             <div class="project-list" v-for="item in contactsLit" :key="item.name" >
                <div style="height: 180px;">
                    <div class="contact-list">
                        <span>{{item.contactname}}</span>
                        <span>{{item.duty}}</span>
                        <span>{{item.phone}}</span>
                    </div>
                </div>   
            </div>                          
                <div class="table-footer">
                    客户联系单位名称{{contactsLit[0].contactsLit}}.共  <span style="color:#e4630d;">{{contactsLit.length}}</span>  人
                </div>
            </div>
            <div class="contact-footer">
                <el-button type="primary" @click="closeDialog" >确定</el-button>
                <el-button type="primary" @click="closeDialog">取消</el-button>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name:'viewcontact',
    data(){
        return{
            contactsLit:"",
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeDialog() {
            this.$emit("close", false);
        },
        //加载联系人
        getContacts(){
            this.$axios.get('/proxyapi/pm/getContacts').then(res => {
                console.log(res)
            this.contactsLit = res;
                });
        }
    },
    created() {
            this.getContacts();
        },
}
</script>
<style lang="less" scoped> 
    .view-contact-dialog {
        position: absolute;
    }
    .el-message-box{
        width: 550px;
        height:374px;
        padding: 0;
        border: 0;
        border-radius: 0;
    }
    .el-message-box .contact-header{
        height: 44px;
        background-color: #3283c8;
        color: white;
        line-height: 44px;
        padding: 0 15px;
        font-size:14px;
    }
    .contact-body .contact-search{
        width: 45%;
        padding: 20px;
    }
    .contact-body .contact-list{
        padding: 5px 20px;
        font-size: 14px;
    }
    .contact-body .contact-list:hover{
        background-color:#f5f7fa;
    }
    .contact-body .contact-list span{
        display: inline-block;
        width: 32%;
    }
    .contact-body .contact-list span:last-child{
        text-align: right;
    }
    .contact-body .table-footer{
        font-size: 14px;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #d8d8d8;
    }
    .contact-footer{
        padding-top: 10px;
        font-size: 14px;
        text-align: center;
    }
    .contact-footer button{
        padding: 8px 20px;
        border-radius: 0;
        border: 0;
    }
    .contact-footer button:first-child{
        background-color: #2e79d6;
    }
    .contact-footer button:last-child{
        background-color: #cccccc;
    }
</style>

