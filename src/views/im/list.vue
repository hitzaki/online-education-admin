<template>
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
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      messageInput: '',
      ws: null,
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
      this.ws = new WebSocket('ws://localhost:63010/im/wv2');
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
      const message = {
        sender: 'Me',
        content: this.messageInput,
        // Add additional properties as needed, e.g., recipient for single chat
      };
      this.ws.send(JSON.stringify(message));
      this.messageInput = '';
    },
  },
};
</script>
