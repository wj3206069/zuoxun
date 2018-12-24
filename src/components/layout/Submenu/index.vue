<template>
   <el-main class="app-ruanshili">
    <el-container>
      <el-aside v-if="treeExpand"
        :class="['cus-ruanshili-aside', {'expanded': !treeExpand}]"
        width="200px"
        class="aside_tree_css1">
        <h3 class="tree-title">{{nav}}</h3>
        <!-- <h3 class="tree-title">{{navTitle.title}}</h3> -->
        <!--:class="['cus-ruanshili-tree', {'coutt_f':coutt_f}]"-->
        <el-tree  class="cus-ruanshili-tree"
              :data="resturantName.val"
              @node-click="handleNodeClick"
              :props="defaultProps"
              node-key="menuid"
              highlight-current
        ></el-tree>
      </el-aside>
      <el-main class="cus-ruanshili-main">
        <button @click="treeTrigger"
          :class="['btn-trigger', {'expanded': !treeExpand}]">
          <span :class="['zxicon', 'zx-xiala', {'zxicon-rotate': !treeExpand}]"></span>
        </button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'submenu',
  data () {
    return {
      treeExpand: true,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['navTitle', 'resturantName']),
    nav() {
      console.log(this.navTitle, 'navTitle')
      console.log(this.resturantName, 'resturantName')
      return this.navTitle.title
    }
  },
  methods: {
    treeTrigger() {
      this.treeExpand = !this.treeExpand
    },
    handleNodeClick(data) {
      if (!!data.path) {
        this.$router.push({path: data.path});
      }
    },
  }
}
</script>

<style>

</style>
