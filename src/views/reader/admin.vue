<template>
    <div class="app-container">
      管理员列表
      <!--顶部查询表单-->
      <el-card class="operate-container" shadow="never">
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="管理员名称">
          <el-input v-model="searchObj.name" placeholder="管理员名" /> 
        </el-form-item>

        <el-form-item label="管理员账号">
          <el-input v-model="searchObj.account" placeholder="管理员账号" /> 
        </el-form-item>

        <el-form-item label="管理员电话号">
          <el-input v-model="searchObj.phone" placeholder="管理员电话号" /> 
        </el-form-item>

  
          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
      </el-card>

      <!-- 表格 -->  <!--下面第一个就是复选框-->
      <el-table
        :data="list"
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
        <el-table-column prop="name" label="名称" width="260" />
        <el-table-column prop="account" label="账号" width="260" />
        <el-table-column prop="phone" label="电话号" width="400" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="empty()">无法对管理员进行操作</el-button>
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
  import teacherApi from '@/api/admin'  // 这个引入方式是框架定义的，js文件的后缀js可省略。
  export default {
    // 定义数据模型
    data() { // 1、变量和初始值
      return {
        list: [], // 列表
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
    methods: {   // 3、定义方法
      fetchData() {
          // 调用api
          teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
          debugger
          this.list = response.data.records
          this.total = response.data.total
        })
      },
      empty() {
          // 不进行任何操作
      }
      // 这个框架的  request.js  自带一个响应拦截器，当code不是20000时，会自动进行错误处理，所以不需要写catch。
    }
  }
  </script>
  