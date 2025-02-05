<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="图书名称">
        <el-input v-model="book.name" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="book.author" />
      </el-form-item>
      <el-form-item label="图书数量">
        <el-input-number v-model="book.num" :min="0"/>
      </el-form-item>
      <el-form-item label="图书类型">
        <el-select v-model="book.type">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="0" label="文学类"/>
          <el-option :value="1" label="理工类"/>
        </el-select>
      </el-form-item>
      <el-form-item label="图书描述">
        <el-input v-model="book.detail" :rows="5" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="图书图片">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
          :action="BASE_API+'/system/upload'"
          class="avatar-uploader">
          <img v-if="book.img" :src="book.img">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import teacherApi from '@/api/book'
  export default {
    data() {
      return {
        BASE_API: 'http://localhost:8087',
        // 初始化讲师默认数据
        book: { // 前面输入框绑定的teacher属性不一定要在这里定义
          type: 0, // 这里有定义的只是需要定义默认值的
          num: 1
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
        if (this.book.id) { 
    	    this.updateData()
          return
  	    }
        teacherApi.save(this.book).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({path:'/book/list'})
        })
      },
      fetchDataById(id) {
        teacherApi.getById(id).then(response => {
          this.book = response.data
        })
      },
      // 根据id更新记录
      updateData() {
        // teacher数据的获取
        teacherApi.updateById(this.book).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/book/list' })
        })
      },
      // 上传成功回调
      handleAvatarSuccess(res, file) {
        if (res.code==20000) {
          this.book.img = res.data
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
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
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