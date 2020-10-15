<!--
  - Copyright © 2020-present LiuDanYang. All rights Reserved.
  -->

<template>
  <div class="home">
    <img alt="Vue logo" src="@a/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @c is an alias to /src/components
import HelloWorld from "@c/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("home-example/login", this.loginForm)
        .then(res => {
          console.log("登录", res);
        })
        .catch(err => {
          console.error("获取验证码", err);
        });
    }
  }
};
</script>
