<template>
    <div class="app-container">
      短链接列表
      <!--顶部查询表单-->
      <el-card class="operate-container" shadow="never">
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="短链接">
          <el-input v-model="searchObj.name" placeholder="短链接" />
        </el-form-item>

        <el-form-item label="源链接">
          <el-input v-model="searchObj.account" placeholder="源链接" />
        </el-form-item>



          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
      </el-card>
      <!-- 工具按钮 -->
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets" style="margin-top: 5px"></i>
        <span style="margin-top: 5px">短链接列表</span>
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
        <el-table-column prop="shortUri" label="短链接" width="160" />
        <el-table-column prop="originUrl" label="源链接" width="200" />
        <el-table-column label="是否启用" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enableStatus === 1" type="success" size="mini">未启用</el-tag>
            <el-tag v-if="scope.row.enableStatus === 0" size="mini">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalPv" label="总访问量" width="160" />
        <el-table-column prop="describe" label="描述" width="400" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="disable(scope.row.shortUri)">改变启用状态</el-button>
            <el-button type="text" size="mini" @click="rout(scope.row.shortUri)">访问</el-button>
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
  import linkApi from '@/api/link'
  export default {
    // 定义数据模型
    data() { // 1、变量和初始值
      return {
        list: [
          {
            short: "slXaac",
            src: "http://www.baidu.com",
            desc: "百度生成短链接",
            open: "启用",
            time: "-"
      },
          {
            short: "axHUJc",
            src: "http://www.google.com",
            desc: "谷歌",
            open: "启用",
            time: "2024-09-22"
          },
    ], // 列表
      total: 0, // 总记录数
        page
    :
      1, // 页码
        limit
    :
      5, // 每页记录数
        searchObj
    :
      {
      }
    , // 查询条件
      multipleSelection: []// 批量删除选中的记录列表
    }
    },
    created() {  // 2、页面渲染之前执行。调用fetchData
      this.fetchData()
    },
    methods: {   // 3、定义方法
      // 根据id删除数据
      rout(shortUri) {
        this.$confirm('此操作将跳转到其他页面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = 'http://localhost:63010/link/' + shortUri
        })
      }, // 如果想在取消的时候也有提示，在catch中写。

      disable(id) {
        this.$confirm('此操作将改变短链接启用状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return linkApi.disable(id)
        }).then((response) => {
          this.$message({
            type: 'success',
            message: '操作者成功'
          })
          this.fetchData()
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
        this.$router.push({ path: '/reader/add' })
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
          linkApi.pageList().then(response => {
          debugger
          this.list = response.items
          this.total = response.counts
          this.page = response.page
          this.limit = response.pageSize
        })
      }// 这个框架的  request.js  自带一个响应拦截器，当code不是20000时，会自动进行错误处理，所以不需要写catch。
    }
  }
  </script>
