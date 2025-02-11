<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">

      <!-- 讲师头像 -->
      <el-form-item label="上传文件">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
          :action="BASE_API+'/os/upload/file'"
          class="avatar-uploader">
          <img v-if="goods.goodsImg" :src="goods.goodsImg">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
<!--
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<script>
  import AuthApi from '@/api/auth'
  export default {
    data() {
      return {
        BASE_API: 'http://localhost:63010',
        // 初始化讲师默认数据
        goods: { // 前面输入框绑定的teacher属性不一定要在这里定义
          goodsTypeId: 1, // 这里有定义的只是需要定义默认值的
          goodsPrice: 1,
          goodsNum: 1
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
        if (this.goods.id) {
    	    this.updateData()
          return
  	    }
        teacherApi.save(this.goods).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$message({
            type: 'success',
            message: '执行成功'
          })
          this.$router.push({path:'/goods/list'})
        })
      },
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
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        this.$router.push('/os/list');
      },

      // 错误处理
      handleAvatarError() {
        this.$message.error('上传失败（http失败）')
      },

      // 上传校验
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
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
