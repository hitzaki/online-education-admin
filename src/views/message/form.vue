<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="message.title" />
      </el-form-item>
      <el-form-item label="接收方">
        <el-input v-model="message.to" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="message.text" :rows="20" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate()">发送邮件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import messageApi from '@/api/message'
  export default {
    data() {
      return {
        BASE_API: 'http://localhost:63010',
        // 初始化讲师默认数据
        message: { // 前面输入框绑定的teacher属性不一定要在这里定义
          goodsNum: 1,
          text: ''
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
        if (this.message.id) {
    	    this.updateData()
          return
  	    }
        messageApi.send(this.message).then(response => {
          this.$message({
            type: 'success',
            message: '发送成功'
          })
        })
      }
      /*
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
