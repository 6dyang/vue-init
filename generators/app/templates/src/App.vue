<!--
  - Copyright © 2020-present LiuDanYang. All rights Reserved.
  -->

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
const TokenKey = "store";

export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    //在页面加载时读取Cookies里的状态信息
    if (sessionStorage.getItem(TokenKey)) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem(TokenKey))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到Cookies里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(TokenKey, JSON.stringify(this.$store.state));
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
