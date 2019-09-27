<template>
  <!-- 调用用法：
  fileInputID：文件选择元素的 id
  clickImageSrc：点击区域的图片 src
  clickText：点击区域的文本
  clickSample：点击 示例 的回调
  setData：将上传图片回传至引用该组件的页面  
  -->
  <!-- <cameras-albums
    fileInputID="upload_file"
    :click-image-src="require('@/assets/images/id_nationalEmblem.svg')"
    click-text="点击上传<span style='color: #ff665f;'>人像面</span>"
    @clickSample="clickSample"
    @setData="setData"
  ></cameras-albums>-->
  <div class="camerasAlbums">
    <a class="sample_link" href="javascript:void(0)" @click="handleSample">示例</a>
    <input
      :id="fileInputID"
      type="file"
      style="display: none;"
      accept="image/*"
      name="file"
      @change="fileChange($event)"
    />
    <div class="image-item space" @click="showActionSheet()">
      <div class="image-up"></div>
    </div>

    <!-- <div v-for="(item,index) in imgList" :key="index">
      <span @click="fileDel(index)">x</span>
      <img :src="item.file.src" style="display: inline-block;" />
    </div>-->
    <div class="clickArea" @click="fileClick()">
      <div class="img_wrap">
        <img :src="curImgSrc" class="img_click" />
      </div>
      <p v-html="clickText">
        <!-- 点击上传<span class="red">人像面</span> -->
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import $ from "jquery";
import imageConversion from "image-conversion";
import { async } from "q";

export default {
  name: "CamerasAlbums",
  props: {
    fileInputID: {
      type: String,
      default: "upload_file"
    },
    clickImageSrc: {
      type: String,
      default: require("@/assets/images/id_face.svg")
    },
    clickText: {
      type: String,
      default: "点击上传"
    },
    maxSize: {
      type: Number, // 返回图片的最大 size，单位是 M
      default: 500 / 1024
    }
  },
  data() {
    return {
      targetCanvas: "",
      curImgSrc: "",
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0 // 字节，单位是 B
    };
  },
  mounted() {
    this.curImgSrc = this.clickImageSrc;
  },
  watch: {
    imgList() {
      const _this = this;
      const _curFile = this.imgList[this.imgList.length - 1].file;
      this.curImgSrc = this.imgList[this.imgList.length - 1].file.src;
      //保证图片 size 小于 2M
      if (this.size / 1024 / 1024 > this.maxSize) {
        _this.compressImage(_this.curImgSrc, 0.9);
      } else {
        this.$emit("setData", this.curImgSrc);
      }
    }
  },
  methods: {
    compressImage(src, size) {
      const _this = this;
      _this.compressImageInner(src, size, function(data) {
        if (data.length / 1024 / 1024 > _this.maxSize) {
          //console.log(data);
          //console.log(data.length / 1024 / 1024);
          //console.log(size * 0.9);
          _this.compressImage(data, 0.9);
        } else {
          _this.curImgSrc = data;
          console.log(data);
          _this.$emit("setData", data);
        }
      });
    },
    //调用相册&相机
    fileClick() {
      $("#" + this.fileInputID).click();
    },
    //调用手机摄像头并拍照
    getImage() {
      let cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              compressImage(entry.toLocalURL(), entry.name);
            },
            function(e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(e) {
          plus.nativeUI.toast("拍照失败：" + e.message);
        },
        {
          filter: "image"
        }
      );
    },
    //从相册选择照片
    galleryImgs() {
      plus.gallery.pick(
        function(e) {
          let name = e.substr(e.lastIndexOf("/") + 1);
          compressImage(e, name);
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },
    //点击事件，弹出选择摄像头和相册的选项
    showActionSheet() {
      let bts = [
        {
          title: "拍照"
        },
        {
          title: "从相册选择"
        }
      ];
      plus.nativeUI.actionSheet(
        {
          cancel: "取消",
          buttons: bts
        },
        function(e) {
          if (e.index == 1) {
            this.getImage();
          } else if (e.index == 2) {
            this.galleryImgs();
          }
        }
      );
    },
    fileChange(el) {
      this.files = $("#" + this.fileInputID).get(0).files;
      for (let i = 0; i < this.files.length; i++) {
        this.datas.append("file", this.files[i]);
      }
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    fileAdd(file) {
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        file.src = "wenjian.png";
        this.imgList.push({
          file
        });
      } else {
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          this.vue.imgList.push({
            file
          });
        };
      }
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
    },
    // 计算选中个图片的 size
    bytesToSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1024, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    compressImageInner(src, size, callBack) {
      let _this = this;
      var img = new Image();
      img.src = src;
      img.onload = function() {
        var that = this;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let width = that.width * size;
        let height = that.height * size;
        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
        //进行最小压缩
        let ndata = canvas.toDataURL("image/jpeg", size);
        //console.log(ndata);
        //console.log(ndata.length);
        //console.log(ndata.length);
        //console.log(_this.bytesToSize(ndata.length));
        callBack(ndata);
        return ndata;
      };
    },
    // 点击示例
    handleSample() {
      this.$emit("clickSample");
    }
  }
};
</script>
<style lang="scss" scoped>
.camerasAlbums {
  position: relative;
  width: 100%;
  padding: 70px 115px 55px;
  background: #fff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  .sample_link {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .clickArea {
    .img_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 462px;
      height: 284px;
      border: 2px solid #d9d9d9;
      border-radius: 8px;
      .img_click {
        max-width: 458px;
        max-height: 280px;
      }
    }

    p {
      margin: 25px auto 0;
      font-size: 28px;
      text-align: center;
      color: #666;
      .red {
        color: #ff665f;
      }
    }
  }
}
</style>