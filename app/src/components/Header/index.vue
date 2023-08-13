<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>ICE SHOP 欢迎您！</p>
                    <p>
                        <span>请&nbsp;</span>
                        <!-- <a href="###">登录</a> -->
                        <router-link to="/login">登录</router-link> |
                        <!-- <a href="###" class="register">免费注册</a> -->
                        <router-link to="/register">注册</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <a href="###">我的购物车</a>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                    <img src="./images/logo.png" alt="">
                </a> -->
                <router-link to="/home" class="logo">
                    <img src="./images/logo.png">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm" @click="goSearch">
                    <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>



<script>
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        };
    },

    methods: {
        goSearch() {
            this.$router.push(
                {
                    name: "search",
                    params: { keyword: this.keyword || undefined },
                    query: { k: this.keyword.toUpperCase() }
                }
            )
        }
    },
    mounted() {
    },
};
</script>


<style lang="less" scoped>
.header {
    &>.top {
        background-color: #6be0ed;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #000000;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b5efe8;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    // width: 175px;
                    height: 100px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #68d2e7;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #68d2e7;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
