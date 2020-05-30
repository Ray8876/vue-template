<template>
  <!--    截图显示-->
  <el-dialog title="头像选择" :visible="visible" :width="width" @close="close" class="a">
    <el-divider></el-divider>

    <div class="cut">
      <vue-cropper
          ref="cropper"
          :img="image"
          :output-size="option.size"
          :output-type="option.outputType"
          :original="true"
          :info="true"
          :centerBox="true"
          :full="true"
          :can-move="true"
          :canMoveBox="false"
          :fixed-box="true"
          :auto-crop="true"
          :auto-crop-width="CropWidth"
          :auto-crop-height="CropHeight"></vue-cropper>
    </div>

    <div class="button-div" style="margin-bottom: 20px;">
      <el-button class="button-size" type="primary" icon="el-icon-zoom-in" circle @click="changeScale(1)"></el-button>
      <el-button class="button-size" type="primary" icon="el-icon-zoom-out" circle
                 @click="changeScale(-1)"></el-button>
      <el-button class="button-size" type="primary" icon="el-icon-refresh-left" circle
                 @click="rotateLeft"></el-button>
      <el-button class="button-size" type="primary" icon="el-icon-refresh-right" circle
                 @click="rotateRight"></el-button>
    </div>
    <el-divider></el-divider>
    <template v-slot:footer>
      <div class="button-div">
        <el-button type="primary" round @click="finish">提交</el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script>
    import { VueCropper } from 'vue-cropper';

    export default {
        name: 'Cropper',
        components: {
            VueCropper
        },
        props: {
            //控制是否显示
            visible: false,
            //控制el-dialog的宽度
            width: {
                type: String,
                default: '30%'
            },
            //控制传入的文件（支持URL、base64、blob）
            image: '',
            // 只有自动截图开启 宽度高度才生效
            //截图框的宽高
            CropWidth: {
                type: Number,
                default: 150
            },
            CropHeight: {
                type: Number,
                default: 150
            }
        },
        data() {
            return {

                img: {},

                option: {
                    size: 1,
                    outputType: 'png'
                }
            };
        },
        methods: {
            //图片剪切
            finish() {
                this.$refs.cropper.getCropData((data) => {
                    this.img = this.dataURLtoFile(data);
                    this.$emit('image', this.img);
                });
            },
            //关闭的回调
            close() {
                this.$emit('close');
            },

            //图片放大缩小
            changeScale(num) {
                num = num || 1;
                this.$refs.cropper.changeScale(num);
            },
            //图片左转
            rotateLeft() {
                this.$refs.cropper.rotateLeft();
            },
            //图片右转
            rotateRight() {
                this.$refs.cropper.rotateRight();
            },

            //base64转file（img）
            dataURLtoFile(dataUrl, filename = 'file') {
                let arr = dataUrl.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let suffix = mime.split('/')[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], `${filename}.${suffix}`, {
                    type: mime
                });
            }
        }
    };
</script>

<style scoped>
  .a /deep/.el-divider--horizontal {
    margin: 0;
  }

  .a /deep/ .el-dialog__body {
    padding: 0;
  }

  .cut {
    height: 500px;
    margin: 20px 10px 5px;
  }

  .button-div {
    text-align: center;
  }

  .button-size {
    padding: 8px !important;
  }

  .show-info h2 {
    line-height: 50px;
  }

  @keyframes slide {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>