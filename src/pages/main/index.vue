<template>
<div style="width:100%;height:100%;display:flex;flex-direction:column;">
    <div class="handle">
        <span>立即预览</span>
        <span>编辑操作 </span>
    </div>

    <div class="page">
      <div class="slidedrag">
          <div class="drag" id="pie" type="pie" draggable="true" @mouseover="overwidge('pie')">饼图</div>
          <div class="drag" id="line" type="line" draggable="true" @mouseover="overwidge('line')">线图</div>
          <div class="drag" id="bar" type="bar" draggable="true" @mouseover="overwidge('bar')">柱形图</div>
      </div>
      <grid-layout
        :layout="layout"
        :auto-size="false"
        :col-num="6"
        :row-height="100"
        :max-rows="50"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"    
        :margin="[10, 10]"
        :use-css-transforms="false"
        @layout-updated="layoutUpdatedEvent"
      >
        <grid-item 
        v-for="item in layout" :key="item.i"
            :item="watchitem(item)"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :id="item.i"
            :is-draggable="true"
            @resize="resizeEvent"
            @move="moveEvent"
            @resized="resizedEvent"
            @moved="movedEvent"
        >
        <header class="header" @mouseout="outheader">|||</header>
        <a class="nodrapcontent">{{item.i}}</a>
        </grid-item>
      </grid-layout>
    </div>
</div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import Header from "../../components/Header.vue";
var testLayout = [
  // { x: 0, y: 0, w: 1, h: 1, i: "0",},
  // { x: 0, y: 1, w: 1, h: 1, i: "1",},
  // { x: 0, y: 2, w: 1, h: 1, i: "2" },
  // { x: 0, y: 3, w: 1, h: 1, i: "3" },
  // { x: 1, y: 0, w: 1, h: 1, i: "4" },
  // { x: 1, y: 1, w: 1, h: 1, i: "5" },
  // { x: 1, y: 2, w: 1, h: 1, i: "6" },
  // { x: 1, y: 3, w: 1, h: 1, i: "7" },
  // { x: 2, y: 0, w: 1, h: 1, i: "8" },
  // { x: 2, y: 1, w: 1, h: 1, i: "9" },
  // { x: 2, y: 2, w: 1, h: 1, i: "10" },
  // { x: 2, y: 3, w: 1, h: 1, i: "11" },
  // { x: 3, y: 0, w: 1, h: 1, i: "12" },
  // { x: 3, y: 1, w: 1, h: 1, i: "13" },
  // { x: 3, y: 2, w: 1, h: 1, i: "14" },
  // { x: 3, y: 3, w: 1, h: 1, i: "15" },
  // { x: 4, y: 0, w: 1, h: 1, i: "16" },
  // { x: 4, y: 1, w: 1, h: 1, i: "17" },
  // { x: 4, y: 2, w: 1, h: 1, i: "18" },
  // { x: 4, y: 3, w: 1, h: 1, i: "19" }
];

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
var ResponsiveGridLayout = VueGridLayout.ResponsiveGridLayout;
// var draggable = true;
export default {
  // name: "Layout",
  data() {
    return {
      layout: testLayout,
      num: 0,
      newX: 0,
      newY: 0,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: ""
      // itemshowflag: true, //grid-layout是否显示
      // layoutflag
      // itemstyle: {
      //   left: "0",
      //   top: "0",
      //   opacity: "0",
      //   "maxWidth": $(".slidedrag").width() + "px",
      //   "maxHeight": "30px"
      // }
    };
  },
  components: {
    ResponsiveGridLayout,
    GridLayout,
    GridItem
  },
  mounted() {
    jQuery(function($) {
      // var pro=true;
      // function inset(disY){
      //     if(!pro){
      //       return;
      //     }
      //     var col = parseInt(disY/100);
      //     testLayout.push({ x: 0, y: col, w: 1, h: 1, i: "20" })
      //     pro=false;
      // }
      //允许放入
      // console.log(this)
      // $(".vue-grid-layout").on("dragover", function(e) {
      //   e.originalEvent.preventDefault();
      //   let disX = e.clientX - $(".vue-grid-layout")[0].offsetLeft;
      //   let disY = e.clientY - $(".vue-grid-layout")[0].offsetTop;
      //   inset(disY);
      // $("#pie")
      //   .css("left", disX + "px")
      //   .css("top", disY + "px");
      // $("html")[0].style.cursor = "move";
      // $(".vue-grid-item").each(function(index, value) {
      //   if($(this).css("display") ==  "none"){
      //     $(this).attr("id","bg")
      //   }
      // });
      // $("#bg").css({"z-index":"1","display":"block","width":"122px","height":"100px","background":"green","left":disX+"px","top":disY+"px"})
      //  console.log(disX)
      // $(".vue-grid-item").css("transform","translate3d("+disX+","+disY+", 0px) !important").css("display","block")
      // });
      // 拖放开始
      // $(".tuo").on("dragstart", function(e) {
      // // testLayout.push({ x: "", y: "", w: 1, h: 1, i: "pie" });
      // e.originalEvent.dataTransfer.setData("obj_add", e.target.id);
      // $("#pie").css({ position: "absolute", left: e.clientX + "px" });
      // });
      //放下事件
      // $(".vue-grid-layout").on("drop", function(e) {
      // e.originalEvent.preventDefault;
      // $("#"+ this.crossid).css("opacity","1")
      // var id = e.originalEvent.dataTransfer.getData("obj_add");
      // $(this).append($("#"+id));
      // testLayout.push({ x: 4, y: 3, w: 1, h: 1, i: "20" })
      //给新加入的元素添加拖放事件
      // $("#"+id).on("dragstart",function(e){
      //   console.log("chchchchchchchchc")
      // 	e.originalEvent.dataTransfer.setData("obj_remove",e.target.id);
      // });
      // });
    });
    // var that=this;
    // this.layout.push({ x: 2, y: 2, w: 1, h: 1, i: "20" })
    // transform: translate3d(537px, 450px, 0px)
    // console.log($(".drager"));
  },
  methods: {
    overwidge: function(id) {
      console.log("overwidge");
      let that = this;
      // debugger
      that.i = id + "_" + that.num;
      let item = {
        x: that.x-2 ,
        y: that.y-2 ,
        w: that.w,
        h: that.h,
        i: that.i
        // resizable: false
      };
      that.layout.push(item);
      that.num++;

      let left=$("#" + id)[0].offsetLeft - $(".vue-grid-layout")[0].offsetLeft;
      let top = $("#" + id)[0].offsetTop - $(".vue-grid-layout")[0].offsetTop;

      $(".vue-grid-item").each(function(value, index){
        if ($(this).attr("layoutflag") == "false") {
          let self = $(this);
          that.layout.forEach((obj, index) => {
            if (obj.i == self.attr("id")) {
              that.layout.splice(index, 1);
            }
          });
        }
      });

      setTimeout(() => {
        $("#" + that.i).css({
          left: left,
          top: top,
          opacity: "0",
          "max-width": $(".slidedrag").width() + "px",
          "max-height": "30px"
        });
        $("#" + that.i).attr("layoutflag", false);
        $("#" + that.i)
          .find("a")
          .css("display", "none");
        $("#" + that.i)
          .find("span")
          .css("display", "none");
      }, 0);
    },
    outheader: function() {
      console.log("outheader");
      let that = this;
                           // debugger
      $(".vue-grid-item").each(function(value, index){
        if ($(this).attr("layoutflag") == "false") {
          let self = $(this);
          that.layout.forEach((obj, index) => {
            if (obj.i == self.attr("id")) {
              that.layout.splice(index, 1);
            }
          });
        }
      });

      console.log($(".vue-grid-item").length);
      console.log(that.layout);
      if ($("#" + that.i).attr("layoutflag") == "false") {
        that.layout.pop();
      }
    },
    // overgraphe: function(id) {
    //   this.togglegraph = false;
    //   var self = this;
    //   if (id !== this.i.split("_")[0]) {
    //     this.i = id + "_" + 0;
    //   }
    //   // this.crossid = this.i;
    //   var item = {
    //     x: this.x - 2,
    //     y: this.y,
    //     w: this.w,
    //     h: this.h,
    //     i: this.i,
    //     resizable: false
    //   };
    //   this.layout.push(item);
    //   console.log(this.layout);
    //   var left =
    //     $("." + id)[0].offsetLeft - $(".vue-grid-layout")[0].offsetLeft;
    //   var top = $("." + id)[0].offsetTop - $(".vue-grid-layout")[0].offsetTop;
    //   setTimeout(() => {
    //     $("#" + self.i)
    //       .find("span.vue-resizable-handle")
    //       .css({
    //         display: "inline-block",
    //         width: "0",
    //         height: "0",
    //         overflow: "hidden"
    //       });
    //     $("#" + self.i)
    //       .find("a")
    //       .css({
    //         display: "inline-block",
    //         width: "0",
    //         height: "0",
    //         overflow: "hidden"
    //       });
    //     $("#" + self.i).css({
    //       left: left,
    //       top: top,
    //       opacity: "0.2",
    //       "max-width": "52px",
    //       "max-height": "22px"
    //     });
    //   }, 0);
    // },

    //  removeItem: function(item) {
    //         //console.log("### REMOVE " + item.i);
    //         this.layout.splice(this.layout.indexOf(item), 1);
    //     },
    //     addItem: function() {
    //         var self = this;
    //         //console.log("### LENGTH: " + this.layout.length);
    //         var item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
    //         this.index++;
    //         this.layout.push(item);
    //     },
    layoutUpdatedEvent: function(newLayout) {
      let that = this;
      // that.itemchildren = true;
      $("#" + that.i).css({
        opacity: "1",
        "max-width": "none",
        "max-height": "none"
      });
      $("#" + that.i).attr("layoutflag", "true");
      // // console.log(this.i)
      // $("#" + this.i).css({
      //   opacity: "1",
      //   "max-width": "none",
      //   "max-height": "none"
      // });
      // $("#" + this.i)
      //   .find("span.vue-resizable-handle")
      //   .css({
      //     display: "inline-block",
      //     width: "auto",
      //     height: "auto",
      //     overflow: "inherit"
      //   });
      // $("#" + this.i)
      //   .find("a")
      //   .css({
      //     display: "inline-block",
      //     width: "auto",
      //     height: "auto",
      //     overflow: "inherit"
      //   });
      // this.i = this.i.split("_")[0] + "_" + (this.i.split("_")[1] - 0 + 1);
      // // this.y = this.y + 1;
      // // if (this.y > 2) {
      // //   this.y = 0;
      // //   this.x = this.x + 1;
      // // }
      // console.log("Updated layout: ", newLayout);
    },
    watchitem: function(item) {
      // console.log("watch");
      // console.log(item);
      // this.crossid = item.i
      // this.i = this.crossid;
      // if(item.y>y_max ||item.x>x_max){
      //     item.y=
      //     item.x=
      // }
      // return item
    },
    moveEvent: function(i, newX, newY, e) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent: function(i, newH, newW) {
      //console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW);
    },
    movedEvent: function(i, newX, newY, e) {
      //console.log(e)
      console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx) {
      //console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    }
  },
  directives: {
    drag: {
      // 指令的定义
      inserted: function(el, binding) {
        // console.log(binding)
        //  console.log(this)
        let oDiv = el;
        // var that=this;
        //  左边距最大值
        let maxLeft = el.parentNode.clientWidth - el.clientWidth;
        //  上边距最大值
        let maxTop = el.parentNode.clientHeight - el.clientHeight;
        oDiv.onmousedown = function(e) {
          //  draggable=true
          //  鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;
          // debugger;
          // oDiv.parentNode.
          document.onmousemove = function(e) {
            //  获取到鼠标拖拽后的横向位移(距离父级元素)
            let l = e.clientX - disX;
            //  获取到鼠标拖拽后的纵向位移(距离父级元素)
            let t = e.clientY - disY;

            //新位置计算方法为元素的上次位置加上新的位移量
            // var left = disX + Math.round((e.pageX - disX) / 20) * 20;
            // var top = disY + Math.round((e.pageY - disY) / 20) * 20;

            // oDiv.style.position = "absolute";
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";

            // if (e.clientX - disX <= 0) {
            //   oDiv.style.left = 0 + "px";
            // }

            // if (e.clientY - disY <= 0) {
            //   oDiv.style.top = 0 + "px";
            // }

            // if (e.clientX - disX >= maxLeft) {
            //   oDiv.style.left = maxLeft + "px";
            // }

            // if (e.clientY - disY >= maxTop) {
            //   oDiv.style.top = maxTop + "px";
            // }
            //     将此时的位置传出去
            // binding.value({ x: oDiv.style.left, y: oDiv.style.top });
          };
          //     松开事件后，移除事件
          document.onmouseup = function(e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  }
};
</script>

<style scoped lang="less">
.pie,
.line {
  width: 50px;
  height: 50px;
  border: 1px solid black;
}
// .header {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 80px;
// }
// .header:hover {
//   background: greenyellow;
// }
.nodrapcontent {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.drager {
  cursor: pointer;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  position: absolute;
  // top: 0px;
  // left: 0px;
  // z-index: 10;
}

.vue-grid-layout {
  position: relative;
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
}
.vue-grid-layout > div {
  position: absolute;
  background: indianred;
}

.page {
  display: flex;
  width: 100%;
  height: 100%;
}
.slidedrag {
  border: 1px solid;
  border-radius: 4px;
  padding: 10px;
  width: 10%;
  min-width: 80px;
  flex-shrink: 0;
}
.drag {
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.handle {
  margin-bottom: 10px;
  span {
    cursor: pointer;
    border: 1px solid;
    padding: 5px 10px;
    display: inline-block;
  }
}
.header {
  height: 100%;
  width: 100%;
}
</style>

