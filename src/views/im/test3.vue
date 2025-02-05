<template>
  <div class="chatAppBody">
    <div class="chatBox">

      <div v-for="elem in messages">
        <div class="chatRow" v-if="elem.name != own">
          <div v-if="elem.name == 'system'">
            <el-avatar class="chatAvatar" :size="30" src="https://goflychat.oss-cn-hangzhou.aliyuncs.com/static/upload/avator/2022June/32a988a3c2f8700119fa1f5da1b6a4bd.png"></el-avatar>
          </div>
          <div v-if="elem.name != 'system'">
            <el-avatar class="chatAvatar" :size="30" src="http://192.168.101.65:9000/mediafiles/test/code-wallpaper-18.png?imageView2/1/w/80/h/80"></el-avatar>
          </div>
          <div class="chatMsgContent">
            <div class="chatUsername">{{elem.name}}</div>
            <div class="chatContent">{{elem.message}}</div>
          </div>
        </div>
        <div class="chatRow chatRowMe" v-if="elem.name == own">
          <div class="chatContent">{{elem.message}}</div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(message, index) in messages" :key="index">
        <p>{{ message.sender }}: {{ message.content }}</p>
      </div>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入聊天内容"
        v-model="messageInput"
      ></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          name: 'admin',
          message: 'tesst'
        },
        {
          name: 'admin2',
          message: 'tesst'
        },
        {
          name: 'system',
          message: 'tesst消息'
        }
      ],
      messageInput: '',
      ws: null,
      own: '用户3'
    };
  },
  created() {
    this.connectWebSocket();
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  },
  methods: {
    connectWebSocket() {
      this.ws = new WebSocket('ws://localhost:63010/im/wv5');
      this.ws.onopen = () => {
        this.$message({
          type: 'success',
          message: '接入及时通信成功'
        })
      };
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.messages.push(data);
      };
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    },
    sendMessage() {
      if (!this.messageInput) return;
      this.ws.send(this.messageInput);
      this.messageInput = '';
    },
  },
};
</script>

<style lang="scss">
.chatAppBody{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f1f5f8;
}
.chatTitle{
  background: #fff;
}
.chatBox{
  flex: 1;
  padding: 0 5px;
}
.chatBottom{
  background: #fff;
}
.chatRow{
  display: flex;
  align-items: flex-end;
  margin: 5px 0px;
}
.chatAvatar{
  margin-right: 5px;
  flex-shrink: 0;
}
.chatUsername {
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  margin-bottom: 2px;
}
.chatContent{
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  background-color: rgb(255,255,255);
  box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
  font-size: 14px;
  word-break: break-all;
  line-height: 21px;
}
.chatRowMe{
  justify-content: flex-end;
}
.chatRowMe .chatContent{
  border-radius: 10px 10px 0px 10px;
}
</style>
