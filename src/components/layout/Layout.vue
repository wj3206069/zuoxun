<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <div class="content">
      <el-container>
        <navbar></navbar>
        <app-main></app-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './index'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {}
}
</script>

<style>

</style>
