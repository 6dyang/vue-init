<!--
  - Copyright © 2020-present LiuDanYang. All rights Reserved.
  -->

<template>
  <div class="errPage-container">
    <div class="left-text">
      <h1 class="text-jumbo text-ginormous">
        401!
      </h1>
      <h2>你没有权限去该页面</h2>
      <h6>如有不满请联系你领导</h6>
      <ul class="list-unstyled">
        <li>或者你可以去</li>
        <li class="link-type">
          <button class="pan-back-btn" @click="back">
            返回
          </button>
        </li>
      </ul>
    </div>
    <img
      class="right-img"
      src="@a/401/401.gif"
      width="313"
      height="428"
      alt="Girl has dropped her ice cream."
    />
  </div>
</template>

<script>
export default {
  name: "Page401",
  data() {
    return {};
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .left-text {
    width: 60%;
    float: left;
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
  }
  .right-img {
    width: 40%;
    float: left;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
