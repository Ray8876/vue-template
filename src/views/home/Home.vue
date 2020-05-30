<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box">
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
    import vHead from '../../components/common/Header.vue';
    import vSidebar from '../../components/common/Sidebar.vue';

    export default {
        components: {
            vHead,
            vSidebar
        }
    };
</script>
