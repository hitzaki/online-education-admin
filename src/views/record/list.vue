<template>
    <div class="app-container">
      借书记录列表
      <!--顶部查询表单-->
      <el-card class="operate-container" shadow="never">
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="读者账号">
          <el-input v-model="searchObj.rname" placeholder="读者账号" /> 
        </el-form-item>

        <el-form-item label="图书名称">
          <el-input v-model="searchObj.bname" placeholder="图书名" /> 
        </el-form-item>
  
          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
      </el-card>
      <!-- 工具按钮 -->
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets" style="margin-top: 5px"></i>
        <span style="margin-top: 5px">借书记录列表</span>
        <el-button class="btn-add" @click="add()" style="margin-left: 10px;">添加</el-button>
        <el-button class="btn-add" @click="batchRemove()" >批量删除</el-button>
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
        <el-table-column prop="rname" label="读者账号" width="160" />
        <el-table-column prop="bname" label="图书名称" width="160" />
        <el-table-column prop="returnTime" label="借书时间" width="160" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="removeById(scope.row.id)">删除</el-button>
            <router-link :to="'/editRecord2/'+scope.row.id">
              <el-button type="text" size="mini">修改</el-button>
            </router-link>
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
  import teacherApi from '@/api/record'  // 这个引入方式是框架定义的，js文件的后缀js可省略。
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
      // 根据id删除数据
      removeById(id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return teacherApi.removeById(id)
        }).then((response) => {
          this.fetchData()
          this.$message.success(response.message)
        })
      }, // 如果想在取消的时候也有提示，在catch中写。
  
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
      add(){ // 点击add跳转到添加页面
        this.$router.push({ path: '/record/add' })
      },
  
      // 批量删除
      batchRemove() {
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请选择要删除的记录！')
          return
        }
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定，远程调用ajax
          // 遍历selection，将id取出放入id列表
          var idList = []
          this.multipleSelection.forEach(item => {
            idList.push(item.id)
          })
          // 调用api
          return teacherApi.batchRemove(idList)
        }).then((response) => {
          this.fetchData()
          this.$message.success(response.message)
        }).catch(error => {
          if (error === 'cancel') {
            this.$message.info('取消删除')
          }
        })
      },
      
      fetchData() {
          // 调用api
          teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
          debugger
          this.list = response.data.records
          this.total = response.data.total
        })
      }// 这个框架的  request.js  自带一个响应拦截器，当code不是20000时，会自动进行错误处理，所以不需要写catch。
    }
  }
  </script>
  