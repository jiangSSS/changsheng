<template>
  <div v-if="isDrag">
    <div class="drag">
      <div class="title">
        <div class="tip">
          <span>微信信息</span>
          <a class="close" href="javascript:;" title="关闭">X</a>
        </div>
      </div>
      <div class="resizeL"></div>
      <div class="resizeT"></div>
      <div class="resizeR"></div>
      <div class="resizeB"></div>
      <div class="resizeLT"></div>
      <div class="resizeRT"></div>
      <div class="resizeRB"></div>
      <div class="resizeLB"></div>
      <slot>
        <div class="content" id="drag">
          <div class="dragData" v-if="!nodata">
            <div>
              <span>出险人姓名：</span>
              {{dragData.name}}
            </div>
            <div>
              <span>证件类型：</span>
              {{dragData.idtype}}
            </div>
            <div>
              <span>证件号码：</span>
              {{dragData.idno}}
            </div>
            <div>
              <span>手机号：</span>
              {{dragData.mobile}}
            </div>
            <div>
              <span>地址：</span>
              {{dragData.address}}
            </div>
            <div>
              <span>开户省：</span>
              {{dragData.accprovince}}
            </div>
            <div>
              <span>开户市：</span>
              {{dragData.acccity}}
            </div>
            <div>
              <span>开户银行：</span>
              {{dragData.accbankcode}}
            </div>
            <div>
              <span>账户号：</span>
              {{dragData.accno}}
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { post, service } from "../utils/request.js";
export default {
  props: {
    rgtobj: String
  },
  data() {
    return {
      dragData: {},
      isDrag: true,
      nodata: false
    };
  },
  mounted() {
    this.realconsole();
    this.nodata = false;
    this.queryRegisterRelation();
  },
  methods: {
    queryRegisterRelation() {
      post(service.queryRegisterRelation, {
        bodys: {
          transno: this.rgtobj
        }
      }).then(res => {
        this.dragData = res.data.bodys;
      });
    },
    realconsole() {
      var dragMinWidth = 400;
      var dragMinHeight = 300;
      var oDrag = document.querySelector(".drag");
      var oTitle = document.querySelector(".drag .title");
      var close = document.querySelector(".close");
      var resizeL = document.querySelector(".resizeL");
      var resizeB = document.querySelector(".resizeB");
      var resizeR = document.querySelector(".resizeR");
      var resizeT = document.querySelector(".resizeT");
      var resizeLT = document.querySelector(".resizeLT");
      var resizeLB = document.querySelector(".resizeLB");
      var resizeRT = document.querySelector(".resizeRT");
      var resizeRB = document.querySelector(".resizeRB");
      //拖拉函数
      function drag(oDrag, handle) {
        var disX = 0;
        var disY = 0;
        handle = handle || oDrag;
        handle.style.cursor = "move";
        handle.onmousedown = function(e) {
          e = e || event;
          e.preventDefault();
          disX = e.clientX - oDrag.offsetLeft;
          disY = e.clientY - oDrag.offsetTop;
          document.onmousemove = function(e) {
            e = e || event;
            var Left = e.clientX - disX;
            var Top = e.clientY - disY;
            var maxleft =
              document.documentElement.offsetWidth - oDrag.offsetWidth;
            var maxtop =
              document.documentElement.clientHeight - oDrag.offsetHeight;
            if (Left < 0) {
              Left = 0;
            } else if (Left > maxleft) {
              Left = maxleft;
            }
            if (Top < 0) {
              Top = 0;
            } else if (Top > maxtop) {
              Top = maxtop;
            }
            oDrag.style.left = Left + "px";
            oDrag.style.top = Top + "px";
          };
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
        //最小化按钮和关闭
        close.onclick = function() {
          oDrag.style.display = "none";
        };
      }
      //改变大小函数
      function resize(oparent, handle, isleft, istop, lookx, looky) {
        var disX = 0;
        var disY = 0;
        handle = handle || oDrag;

        handle.onmousedown = function(e) {
          e = e || event;
          e.preventDefault();
          disX = e.clientX - this.offsetLeft;
          disY = e.clientY - this.offsetTop;
          var iparenttop = oparent.offsetTop;
          var iparentleft = oparent.offsetLeft;
          var iparentwidth = oparent.offsetWidth;
          var iparentheight = oparent.offsetHeight;

          document.onmousemove = function(e) {
            e = e || event;
            var iL = e.clientX - disX;
            var iT = e.clientY - disY;
            var maxw =
              document.documentElement.clientWidth - oparent.offsetLeft - 2;
            var maxh =
              document.documentElement.clientHeight - oparent.offsetTop - 2;
            var iw = isleft ? iparentwidth - iL : handle.offsetWidth + iL;
            var ih = istop ? iparentheight - iT : handle.offsetHeight + iT;
            if (isleft) {
              oparent.style.left = iparentleft + iL + "px";
            }
            if (istop) {
              oparent.style.top = iparenttop + iT + "px";
            }
            if (iw < dragMinWidth) {
              iw = dragMinWidth;
            } else if (iw > maxw) {
              iw = maxw;
            }
            if (lookx) {
              oparent.style.width = iw + "px";
            }
            if (ih < dragMinHeight) {
              ih = dragMinHeight;
            } else if (ih > maxh) {
              ih = maxh;
            }
            if (looky) {
              oparent.style.height = ih + "px";
            }
            if (
              (isleft && iw == dragMinWidth) ||
              (istop && ih == dragMinHeight)
            ) {
              document.onmousemove = null;
            }
            return false;
          };
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
      //调用
      (function() {
        drag(oDrag, oTitle);
        //四边变大
        resize(oDrag, resizeB, false, false, false, true);
        resize(oDrag, resizeR, false, false, true, false);
        resize(oDrag, resizeT, false, true, false, true);
        resize(oDrag, resizeL, true, false, true, false);
        //四角变大
        resize(oDrag, resizeRB, false, false, true, true);
        resize(oDrag, resizeRT, false, true, true, true);
        resize(oDrag, resizeLT, true, true, true, true);
        resize(oDrag, resizeLB, true, false, true, true);
      })();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">
.drag {
  width: 400px;
  height: auto !important;
  position: absolute;
  top: 100px;
  left: 40%;
  font-size: 14px;
  box-shadow: 2px 2px 5px gray;
  background: #fff;
  z-index: 4000;
}
.title {
  // height: 35px;
  width: 100%;
  background: #0673ff !important;
  color: #fff !important;
  font-size: 16px;
  span {
    display: inline-block;
    padding: 5px 10px;
  }
}
.close {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 5px;
  right: 10px;
  color: #fff;
}

.resizeB {
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  cursor: n-resize;
}
.resizeL {
  width: 10px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: w-resize;
}
.resizeT {
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  cursor: n-resize;
}
.resizeR {
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  cursor: w-resize;
}

.resizeLT {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: nw-resize;
}
.resizeLB {
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  cursor: ne-resize;
}
.resizeRT {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: ne-resize;
}
.resizeRB {
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  cursor: nw-resize;
}
.content {
  margin: 10px;
  font-size: 15px;
}
</style>

