<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-6">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Bad Example Child</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <p>Message from {{ msgObject.from }}:</p>
            <p>"{{ msgObject.sentMsg }}"</p>
            <v-text-field
              name="replyMessage"
              :label="getReplyLable(1)"
              v-model="replyMessage"
              type="text"
              @keyup="onKeyup($event)"
            ></v-text-field>
            <v-text-field
              name="replyMessage2"
              :label="getReplyLable(2)"
              v-model="replyMessage2"
              type="text"
              @change="onChange($event)"
            ></v-text-field>
            <v-btn color="info" @click="handleButtonClick">Reply</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "child",
  props: {
    msgObject: Object
  },
  data() {
    return {
      replyMessage: "",
      replyMessage2: ""
    };
  },
  methods: {
    handleButtonClick: function() {
      this.syncDataToObj();
      const submit = true;
      this.$emit("childUpdated", this.msgObject, submit);
    },
    onChange: function(event) {
      this.syncDataToObj();
      this.$emit("childUpdated", this.msgObject);
    },
    onKeyup: function(event) {
      this.syncDataToObj();
      this.$emit("childUpdated", this.msgObject);
    },
    syncDataToObj: function() {
      this.msgObject.replyMsg1 = this.replyMessage;
      this.msgObject.replyMsg2 = this.replyMessage2;
    },
    getReplyLable: function(param) {
      return this.msgObject.to + " Reply Message" + param;
    }
  }
};
</script>
<style scoped lang="scss"></style>
