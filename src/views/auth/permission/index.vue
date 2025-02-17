<template>
  <div class="app-container">
    权限列表
    <!--顶部查询表单-->
    <el-card class="operate-container" shadow="never">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="权限名">
          <el-input v-model="searchObj.name" placeholder="权限名"/>
        </el-form-item>

        <el-form-item label="权限code">
          <el-input v-model="searchObj.code" placeholder="权限code" />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
    </el-card>

    <!-- 工具按钮 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">权限列表</span>
      <el-button class="btn-add" @click="insertPermission()" style="margin-left: 10px;">添加</el-button>
    </el-card>
    <!-- 表格 -->  <!--下面第一个就是复选框-->
    <el-table
      :data="searchList"
      border
      stripe
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="权限名" width="240" />
      <el-table-column prop="code" label="权限code" width="240" />
      <el-table-column prop="createTime" label="创建时间" width="240" :formatter="dateFormat" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="deletePermission(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>

<script>
import authApi from '@/api/auth'
import {buildPageData, dateFormat} from '@/utils/format'  // 这个引入方式是框架定义的，js文件的后缀js可省略。
export default {
  // 定义数据模型
  data() { // 1、变量和初始值
    return {
      searchList: [
      ], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询条件
      multipleSelection: []// 批量删除选中的记录列表
    }
  },
  created() {  // 2、页面渲染之前执行。调用fetchData
    this.fetchData()
  },
  methods: {
    dateFormat,
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

    // 每页记录数改变，size：回调参数，表示当前选中的“每页条数”
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },

    // 改变页码，page：回调参数，表示当前选中的“页码”
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },

    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    insertPermission(){ // 点击add跳转到添加页面
      this.$router.push({ path: '/auth/permissionInsert' })
    },

    // 批量删除
    deletePermission(id) {
      this.$confirm('此操作将无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用api
        return authApi.permissionDelete({ permissionId: id })
      }).then((response) => {
        this.fetchData()
        this.$message.success(response.msg)
      }).catch()
    },

    fetchData() {
      authApi.permissionPage(buildPageData(this.searchObj, this.page, this.limit)).then(response => {
        debugger
        this.searchList = response.items
        this.total = response.counts
        this.page = response.page
        this.limit = response.pageSize
      })
    }
  }
}
</script>
