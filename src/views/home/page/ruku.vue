<template>
    <div>
        <!-- 面包屑 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-zt-calendar"></i> 出入库订单
                </el-breadcrumb-item>
                <el-breadcrumb-item>入库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--      功能搜索栏-->
        <div class="container">

            <el-button type="primary" @click="fromShow">入库</el-button>
            <!--      话题数据显示-->
            <el-table
                    :data="data"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <!--        选择框项-->
                <el-table-column prop="id" label="ID" align="center" ></el-table-column>
                <el-table-column prop="customerName" label="客户名" align="center" ></el-table-column>
                <el-table-column prop="clothName" label="布名" align="center" ></el-table-column>
                <el-table-column prop="length" label="购买长度" align="center" ></el-table-column>
                <el-table-column prop="totalPrice" label="总价" align="center" ></el-table-column>


                <!--                <el-table-column prop="createTime" label="创建时间" width="200" align="center"></el-table-column>-->
                <el-table-column label="操作" width="100" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)" />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!--            分页栏-->
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>

            <!--       话题的from对话框 -->
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="fromDialogVisible"
                    width="60%"
                    @close="fromDialogClosed"
                    ref="dialog"
            >
                <!-- 内容主体区域 -->
                <el-form
                        :model="form"
                        ref="formRef"
                        label-width="100px"
                        label-position="left"
                        :disabled="disabled"
                >
                    <el-row :gutter="4">
                        <el-col :span="12">
                            <el-form-item label="进货商" prop="customerName">
                                <el-select v-model="form.customerId" placeholder="选择进货商" @focus="getCustomerList">
                                    <div v-for="(item,index) in customerList" :key="index">
                                        <el-option :label=item.customerName :value=item.id ></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="4">
                        <el-col :span="12">
                            <el-form-item label="布名" prop="clothName">
                                <el-select v-model="form.clothId" placeholder="选择布类" @focus="getBuList">
                                    <div v-for="(item,index) in buList" :key="index">
                                        <el-option :label=item.clothName :value=item.id ></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="4">
                        <el-col :span="12">
                            <el-form-item label="购买长度" prop="customerAddress">
                                <el-input v-model="form.length" style="width: 300px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>



                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
          <el-button @click="fromDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('formRef')" :disabled="disabled">确 定</el-button>
        </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

  import {
    buList,
    ChuRuKuDelete,
    ChuRuKuDetail,
    ChuRuKuSaveAndUpdate,
    kehuList,
    RuKuList
  } from '../../../network/request';

  export default {
    data() {
      return {
        //详情时不可更改
        disabled: false,

        customerList: [],
        buList: [],

        query: {
          pageIndex: 1,
          pageSize: 10
        },

        data: [],

        //编辑的id
        editId: '',
        //添加修改的对象数据
        form: {
          id: '',
          customerId: '',
          clothId: '',
          length: '',
          state: 1,
        },

        //返回数据的数量
        pageTotal: 0,

        //添加Dialog是否显示的控制元素
        fromDialogVisible: false,

        //Dialog的title
        dialogTitle: ''
      };
    },
    computed: {},
    created() {
      this.getData();
    },
    methods: {


      //对话框提交事件
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.form);
            ChuRuKuSaveAndUpdate(this.form)
              .then(res => {
                if (res.code === 0) {
                  console.log(res);
                  this.$message.success('编辑成功 !');
                } else {
                  this.$message.error('编辑失败 !');
                }
                this.$loading().close();
                this.fromDialogVisible = false;
                this.getData();
              })
              .catch(err => {
                console.error(err);
                this.$message.error('编辑数据失败，重试或者联系我们');
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      async getCustomerList() {
        await kehuList({size: 999})
          .then(res => {
            // this.$message.success('获取成功');
            this.customerList = res.data['list'];
            console.log(this.customerList)
          })
          .catch(err => {
            console.error(err);
            this.$message.error('获取失败');
          });
      },

      async getBuList() {
        await buList({size: 999})
          .then(res => {
            // this.$message.success('获取成功');
            this.buList = res.data['list'];
          })
          .catch(err => {
            console.error(err);
            this.$message.error('获取失败');
          });
      },

      async handleDelete(row){
        await ChuRuKuDelete({ id: row.id })
          .then(res => {
            this.$message.success('删除成功');
          })
          .catch(err => {
            console.error(err);
            this.$message.error('删除失败');
          });
        this.getData();
      },

      // 编辑操作
      async handleEdit(row) {
        //当前只是直接显示
        this.dialogTitle = '编辑';
        this.fromDialogVisible = true;
        await this.$nextTick(() => {
          this.$loading();
        });
        await ChuRuKuDetail({ id: row.id })
          .then(res => {
            // console.log(res.data)
            this.editId = res.data.id;
            let data = res.data;
            this.$copyobj(this.form, data);
            // this.form.cover = data.cover;
          })
          .catch(err => {
            console.error(err);
            this.$message.error('获取数据失败，重试或者联系我们');
          });
        this.$loading().close();
      },


      // 分页导航
      handlePageChange(val) {
        this.query.pageIndex = val;
        this.getData();
      },

      // 监听添加编辑讲师对话框的关闭事件
      fromDialogClosed() {
        this.$refs.formRef.resetFields();
        this.disabled = false;
        this.editId = '';
      },
      fromShow() {
        this.form.id = '';
        this.fromDialogVisible = true;
        this.dialogTitle = '添加';
      },
      getData() {
        RuKuList({
          size: this.query.pageSize,
          current: this.query.pageIndex,
        })
          .then(res => {
            console.log(res.data);
            this.data = res.data.list;
            this.pageTotal = res.data.totalCount;
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

    }
  };
</script>

<style scoped>
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader /deep/ .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar-uploader /deep/ .el-upload--text {
        width: 178px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .table-td-cover {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .mr10 {
        margin-right: 5px;
    }

    .mt10 {
        margin-top: 5px;
    }
</style>