<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.title" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'el-icon-zt-home',
          index: 'dashboard',
          title: '系统首页'
        },

        {
          icon: 'el-icon-magic-stick',
          index: 'kuList',
          title: '库存查询',
          subs: [
            {
              index: 'buList',
              title: '布匹列表'
            }
          ]
        },
        {
          icon: 'el-icon-magic-stick',
          index: 'kehuOrcaigou',
          title: '客户/采购方管理',
          subs: [
            {
              index: 'kehuList',
              title: '客户列表'
            },
            {
              index: 'caigouList',
              title: '采购方列表'
            }
          ]
        },
        {
          icon: 'el-icon-magic-stick',
          index: 'ku',
          title: '出入库订单',
          subs: [
            {
              index: 'chuku',
              title: '出库'
            },
            {
              index: 'ruku',
              title: '入库'
            }
          ]
        },
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
