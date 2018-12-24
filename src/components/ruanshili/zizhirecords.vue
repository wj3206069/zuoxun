<template>
    <div class="zi-zhi-records">
        <div class="zi-zhi__title">
            <h5>
                <span class="zxicon zx-yiban"></span>
                <span>待办任务</span>
            </h5>
            <div class="zi-zhi__toolbar">
                <button class="btn-tool btn-shenqing" @click="create">
                    <span class="zxicon zx-zengjia1"></span>
                    <span>申请</span>
                </button>
                <div class="search__toolbar_css">
                    <el-input size="mini" v-model="input5" placeholder="请输入关键字" >
                        <el-select v-model="select"  slot="prepend" placeholder="请选择" style="width:96px">
                            <el-option label="资质名称" value="1"></el-option>
                            <el-option label="资质类型" value="2"></el-option>
                        </el-select>
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="zi-zhi__table-box">
            <el-table :data="tableData" border class="table_css1">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="资质名称" prop="name" align="center"></el-table-column>
                <el-table-column label="资质类型" prop="type" align="center"></el-table-column>
                <el-table-column label="发证机关" prop="issuing_organ" align="center"></el-table-column>
                <el-table-column label="发证日期" prop="issuing_date" align="center"></el-table-column>
                <el-table-column label="到期日" prop="expiration_date" align="center"></el-table-column>
                <el-table-column label="复审时间" prop="retrial_date" align="center"></el-table-column>
                <el-table-column label="年审时间" prop="trial_date" align="center"></el-table-column>
                <el-table-column label="复审状态" prop="retrial_status" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini">修改</el-button>
                        <el-button size="mini">查看</el-button>
                        <el-button size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :current-page.sync="pagination.currentPage"
                :page-count="pagination.pageCount"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                :page-sizes="pagination.pageSizes">
            </el-pagination>
        </div>
    </div>
</template>

<style lang="less">
	
</style>


<script>
    import mixin from "~/assets/mixins";
    export default {
        name: "ziZhiRecords",
        mixins: [mixin],
        data() {
            return {
                select: '',
                input5: '',
                pagination: {
                    total: 10,
                    currentPage: 1,
                    pageCount: 5,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100]
                },
                tableData: [
                    {
                        name: "软件产品证书",
                        type: "著作权",
                        issuing_organ: "深圳市软件行业协会",
                        issuing_organ: "2017-05-26",
                        expiration_date: "2022-05-26",
                        retrial_date: "",
                        trial_date: "",
                        retrial_status: ""
                    }
                ]
            }
        },
        methods: {
            create() {
                this.$router.push({name: "zizhishenqing"});
            },
            getData() {
                this.$axios.get(this.proxyPath + this.gongsizizhi.zizhitable, {
                    params: {
                        pageNum: this.pagination.currentPage,
                        pageSize: this.pagination.pageSize
                    }
                }).then(res => {
                    console.log(res);
                    this.tableData = res.list;
                    this.pagination.total = res.total;
                })
            }
        },
        created() {
            // this.getData();
        }
    }
</script>