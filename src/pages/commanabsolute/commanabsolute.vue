<template>
<div style="width:100%;height:100%;display:flex;flex-direction:column;">
    <div style="margin-bottom:10px;">
        <span style="cursor:pointer;border:1px solid;" @click="preview">立即预览</span>
        <span style="cursor:pointer;border:1px solid;" @click="editview">编辑操作 </span>
    </div>
    <div class="page">
        <div class="slidedrag">
            <div class="drag" id="pie"  draggable="true">饼图</div>
            <div class="drag" id="line" draggable="true">线图</div>
            <div class="drag" id="bar" draggable="true">柱形图</div>
        </div>
        <div class="contentover">
            <!-- <div class="overarea">
                <span class="area-close">&times;</span>
                <div class="area" id="area_1" draggable="true"></div>
            </div>
            <div class="overarea">
                <span class="area-close">&times;</span>
                <div class="area" id="area_2" draggable="true"></div>
            </div>
            <div class="overarea">
                <span class="area-close">&times;</span>
                <div class="area" id="area_3" draggable="true"></div>
            </div>
            <div class="overarea">
                <span class="area-close">&times;</span>
                <div class="area" id="area_4" draggable="true"></div>
            </div> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
  created: function() {
    var that = this;
    jQuery(function($) {
      //将空间拖拽到图形内容显示中
      $(".drag").on("dragstart", function(event) {
        event.originalEvent.dataTransfer.setData("obj_id", event.target.id);
      });
      $(".contentover").on("dragover", function(event) {
        event.preventDefault();
      });
      $(".contentover").on("drop", function(event) {
        var type = event.originalEvent.dataTransfer.getData("obj_type");
        if (type !== "") {
          if ($(this).html() !== "") {
            alert("请先清空已有的图形");
            return;
          } else {
            //拖动之前的元素
            let id = event.originalEvent.dataTransfer.getData("pre_id");
            $("#" + id).attr("type", "");
            that.$echarts.dispose(document.getElementById(id));
            that.filterstoretype(id);

            //拖动目标元素
            $(this).attr("type", type);
            that.initechart(type, $(this)[0].id); //初始化拖拽后的图形
          }
        } else {
          var id = event.originalEvent.dataTransfer.getData("obj_id");
          // var html =
          //   "<div id='area_" +
          //   that.num +
          //   "' class='area' type=" +
          //   id +
          //   " style='position:absolute;top:" +
          //   event.offsetY +
          //   "px;left:" +
          //   event.offsetX +
          //   "px;border:1px solid;width:" +
          //   $(".contentover").width() / 2 +
          //   "px;height:100px;'></div>";
            var html='<div class="overarea" style="position:absolute;top:'+event.offsetY+'px;left:'+event.offsetX+'px;border:1px solid;width:'+Math.round($(".contentover").width() / 3)+'px;height:100px;">'+
                '<span class="area-close" style="position:absolute;top:0;right:0;z-index:10;cursor:pointer;">&times;</span>'+
                '<div class="area" id="area_' +that.num +'" type='+id+'  draggable='+true+' style="width:100%;height:100%;"></div>'+
            '</div>'
          $(this).append(html);
          that.initechart(id, "area_" + that.num); //初始化拖拽后的图形

          $(".overarea").on("mousedown",function(e) {
            var isMove = true;
            var self=$(this);
            let maxLeft = $(this).parent().width() - $(this).width();
            //  上边距最大值
            let maxTop = $(this).parent().height() - $(this).height();
        
            let disX = e.clientX - $(this)[0].offsetLeft;
            let disY = e.clientY - $(this)[0].offsetTop;
            // var div_x = e.pageX - $(".area").offset().left;
            // var div_y = e.pageY - $(".area").offset().top;
            $(document).on("mousemove",function(e) {
                e.preventDefault();
                let l = e.clientX - disX;
                let t = e.clientY - disY;
                if (isMove) {
                    if (e.clientX - disX <= 0) {
                      l = 0 + "px";
                    }
                    if (e.clientY - disY <= 0) {
                      t = 0 + "px";
                    }
                    if (e.clientX - disX >= maxLeft) {
                      l = maxLeft + "px";
                    }
                    if (e.clientY - disY >= maxTop) {
                      t = maxTop + "px";
                    }

                    if(l%5 == 0){
                        self.css({left:l + "px"});
                    }
                    if(t%5 == 0){
                        self.css({top:t + "px"});
                    }

                  // self.css({ left:l + "px", top: t + "px" });
                }
              })
              $(document).on("mouseup",function() {
                isMove = false;
                $(document).off("mousemove")
                $(document).off("mouseup")
              });
          });
        }
      });

      //在图形内容显示中互相拖拽
      // $(".area").on("dragstart", function(event) {
      //   //   console.log(111)
      //   event.originalEvent.dataTransfer.setData(
      //     "obj_type",
      //     $(this).attr("type")
      //   );
      //   event.originalEvent.dataTransfer.setData("pre_id", $(this).attr("id")); //保存拖拽之前的图形
      // });
      // $(".area").on("dragover", function(event) {
      //   //   console.log(222)
      //   event.preventDefault();
      // });

      // $(".area-close").on("click", function(event) {
      //   that.$echarts.dispose(
      //     document.getElementById(
      //       $(this)
      //         .next()
      //         .attr("id")
      //     )
      //   );
      //   let id = $(this)
      //     .next()
      //     .attr("id");
      //   that.filterstoretype(id);
      // });
    });
  },
  data() {
    return {
      storetype: [],
      num: 0
    };
  },
  methods: {
    filterstoretype: function(id) {
      let that = this;
      this.storetype.forEach(function(v, i) {
        if (v.id == id) {
          that.storetype.splice(i, 1);
        }
      });
    },
    editview: function() {
      $(".slidedrag").css("display", "block");
      let that = this,
        array = this.storetype;
      this.storetype = [];
      array.forEach(function(obj) {
        that.initechart(obj.type, obj.id);
      });
    },
    preview: function() {
      let that = this,
        array = this.storetype;
      $(".slidedrag").css("display", "none");
      this.storetype = [];
      array.forEach(function(obj) {
        that.initechart(obj.type, obj.id);
      });
    },
    initechart: function(type, id) {
      let that = this;
      // this.$echarts.dispose(document.getElementById(id));
      this.filterstoretype(id);
      this.storetype.push({ type: type, id: id }); //保存拖拽之后的type和id
      console.log(this.storetype);
      switch (type) {
        case "pie":
          this.pie(id);
          break;
        case "line":
          this.line(id);
          break;
        case "bar":
          this.bar(id);
          break;
      }
      that.num++;
    },
    pie: function(id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.resize({
        width: document.getElementById(id).offsetWidth,
        height: document.getElementById(id).offsetHeight
      });
      // 绘制图表
      var option = {
        backgroundColor:"#ffffff",
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    line: function(id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.resize({
        width: document.getElementById(id).offsetWidth,
        height: document.getElementById(id).offsetHeight
      });
      var option = {
         backgroundColor:"#ffffff",
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
      myChart.setOption(option);
    },
    bar: function(id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.resize({
        width: document.getElementById(id).offsetWidth,
        height: document.getElementById(id).offsetHeight
      });
      var option = {
         backgroundColor:"#ffffff",
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  components: {},
  directives: {
    drag: {
      // 指令的定义
      inserted: function(el, binding) {
        debugger;
        // console.log(binding)
        //  console.log(this)
        let oDiv = el;
        // var that=this;
        //  左边距最大值
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

<style scoped >
.page {
  display: flex;
  width: 100%;
  height: 100%;
}
.slidedrag {
  border: 1px solid;
  padding: 10px;
  width: 10%;
  min-width: 80px;
  flex-shrink: 0;
}
.drag {
  border: 1px solid;
  cursor: pointer;
  margin-bottom: 10px;
}
.contentover {
  flex-grow: 1;
  /* width:90%; */
  border: 1px solid;
  overflow: hidden;
  position: relative;
}
.overarea {
  float: left;
  width: 50%;
  border: 1px solid;
  height: 200px;
  box-sizing: border-box;
  position: relative;
}
/* .area-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
} */
</style>
