<template>
    <el-dialog title="提示" :visible.sync="show" width="30%" :before-close="closeDialog">
        <span>确认删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
  export default {
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
        
        };
    },
    methods: {    
        closeDialog() {
            this.$emit("close", false);
        },
        confirm(){
            this.$emit("confirmDel");
        }
    }
  };
</script>