<!--
This is some example code that demonstrights parent child communicaion via objects
1) passing a dynamic object as a prop from parent to child
2) returning object from child to parent
3) Also, ordinal time stamp and dynamic lable change via a function

Three different ways of getting info back
1) getting on change of a child text field back in parent
2) getting every keystroke from a text field back in parent
3) getting field values via a button "submit" in parent

use:
<template>
  <div class="contact">
    <p>Contact</p>
    <ExampleParent/>
  </div>
</template>

<script>
import ExampleParent from "@/components/ExampleParent.vue";

export default {
  name: "exampleParent",
  components: {
    ExampleParent
  }
};

-->
<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-6">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Good Example Parent</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <p>
              Reply from child:
              <br />
              {{ this.sendMsgObject.replyMsg1 }}
              <br />
              {{ this.sendMsgObject.replyMsg2 }}
            </p>
            <p>
              <ExampleChild
                :msgObject="sendMsgObject"
                @childUpdated="handleChildUpdated"
              />
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ExampleChild from "@/components/ExampleChild.vue";

export default {
  name: "exampleParent",
  props: {},
  data() {
    return {
      counter: 1,
      fullMessage: "Do your home work",
      sendMsgObject: {
        to: "PaulChild",
        from: "MargoParent",
        sentMsg: "Please do your chores",
        replyMsg1: null,
        replyMsg2: null
      }
    };
  },
  methods: {
    handleChildUpdated: function(sendMsgObject, submited) {
      this.sendMsgObject = sendMsgObject;

      if (submited) {
        this.counter = this.counter + 1;

        const ordinal = this.$ordinal.toOrdinal(this.counter);

        this.fullMessage =
          "Do your homework, it's " +
          this.$moment().format("HH:mm:ss") +
          " and the " +
          ordinal +
          " time of asking";
        this.sendMsgObject.sentMsg = this.fullMessage;
      }
    }
  },
  components: {
    ExampleChild
  }
};
</script>

<style scoped lang="scss"></style>
