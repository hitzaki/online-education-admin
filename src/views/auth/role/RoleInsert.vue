<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="角色名">
        <el-input v-model="role.name" />
      </el-form-item>
      <el-form-item label="角色code">
        <el-input v-model="role.code" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import authApi from '@/api/auth'
export default {
  data() {
    return {
      BASE_API: 'http://8.146.200.93:8888',
      role: {
      },
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  },
  // 页面渲染成功
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      authApi.roleInsert(this.role).then(response => {
        this.$message({
          type: 'success',
          message: '创建权限成功'
        })
        this.$router.push({path:'/auth/roleManage'})
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader .avatar-uploader-icon:hover {
  border-color: #409EFF;
}
.avatar-uploader img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
