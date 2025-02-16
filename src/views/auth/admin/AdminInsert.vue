<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--TODO 头像-->
      <el-form-item label="昵称">
        <el-input v-model="admin.nickName" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="admin.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="admin.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="admin.comparePassword" />
      </el-form-item>
      <el-radio-group style="margin-left: 50px; margin-bottom: 30px" v-model="admin.typeText" size="large">
        <el-radio-button label="管理员" value="0" />
        <el-radio-button label="业务员" value="1" />
      </el-radio-group>
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
      admin: {
      },
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  },
  // 页面渲染成功
  created() {
  },
  methods: {
    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      if (this.admin.typeText = '管理员') {
        this.admin.type = 0
      }
      if (this.admin.typeText = '业务员 ') {
        this.admin.type = 1
      }
      this.admin.avatar = 'https://avatars.githubusercontent.com/u/89912002?v=4'
      authApi.adminInsert(this.admin).then(response => {
        this.$message({
          type: 'success',
          message: '创建管理员成功'
        })
        this.$router.push({path:'/auth/adminManage'})
      })
    }
    /*,
    fetchDataById(id) {
      teacherApi.getById(id).then(response => {
        this.goods = response.data
      })
    },
    // 根据id更新记录
    updateData() {
      // teacher数据的获取
      teacherApi.updateById(this.goods).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/goods/list' })
      })
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      if (res.code==20000) {
        this.goods.goodsImg = res.data
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败 （非0）')
      }
    },

    // 错误处理
    handleAvatarError() {
      this.$message.error('上传失败（http失败）')
    },

    // 上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }*/
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
