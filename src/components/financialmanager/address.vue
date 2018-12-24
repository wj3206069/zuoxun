<template>
  <div>
    <el-cascader
      placeholder="请选择地址"
      :props="defaultProps"
    ></el-cascader>
    <!-- <el-select class="address-select" v-model="address.province" @change="provinceChange" placeholder="省级区域">
        <el-option v-for="item in init_arr" :label="item.name" :value="item.name" :key="item.index"></el-option>
    </el-select>
    <el-select class="address-select" v-model="address.city" @change="cityChange" placeholder="市级区域">
        <el-option v-for="item in init_cityArr" :label="item.name" :value="item.name" :key="item.index">
        </el-option>
    </el-select>
    <el-select class="address-select" v-model="address.county" @change="countyChange" placeholder="区级区域">
        <el-option v-for="item in init_region" :label="item.name" :value="item.name" :key="item.index">
        </el-option>
    </el-select> -->
  </div>
</template>

<script>
import addressjson from "~/assets/utils/address.js"

export default {
  data () {
    return {
      address: {
        province: '',
        city: '',
        county: ''
      },
      defaultProps: {
        value: 'text',
        children: 'children'
      }
    }
  },
  props: {
    
  },
  getters: {
    getProvince() {

    }
  },
  methods: {
    provinceChange() {

    },
    cityChange() {

    },
    countyChange() {

    }
  },
  created() {

  }
}
</script>

<style>

</style>
