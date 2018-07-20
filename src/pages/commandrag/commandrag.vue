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
        <div class="contentover" style="display:flex;flex-wrap:nowrap;flex-direction:column;">
          <div class="row-overarea">
            <div class="overarea" style="flex-grow:1;">
                <span class="area-close">&times;</span>
                <div class="area" id="area_1" draggable="true"></div>
            </div>
            <div class="draglines"></div>
            <div class="overarea" style="flex-grow:1;">
                <span class="area-close">&times;</span>
                <div class="area" id="area_2" draggable="true"></div>
            </div>
          </div>
          <div class="draglineshorvation" type="horizontal"></div>
          <div class="row-overarea">
            <div class="overarea" style="flex-grow:1;">
                <span class="area-close">&times;</span>
                <div class="area" id="area_3" draggable="true"></div>
            </div>
            <div class="draglines"></div>
            <div class="overarea" style="flex-grow:1;">
                <span class="area-close">&times;</span>
                <div class="area" id="area_4" draggable="true"></div>
            </div>
          </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  created: function() {
    var that = this;
    jQuery(function($) {

      function echartsresize(self){
          let hasechartsid=[]
          self.prev().find(".area").each(function(index,value){
            if(value.getAttribute("type")){
              hasechartsid.push(value.getAttribute("id"))
            }
          })
          self.next().find(".area").each(function(index,value){
            if(value.getAttribute("type")){
              hasechartsid.push(value.getAttribute("id"))
            }
          })
          for(let i=0;i<hasechartsid.length;i++){
              var myChart = that.$echarts.init(document.getElementById(hasechartsid[i]));
              myChart.resize({width:$("#"+hasechartsid[i]).width(),height:$("#"+hasechartsid[i]).height()})
          }
      }

      function calculteposition(self,dom,event,isMove){
          // let isMove = isMove;
          let totalheight=dom.height();
          debugger
          let maxLeft = self.parent().width() - self.width();
          //  上边距最大值
          let maxTop = self.parent().height() - self.height();
      
          let disX = event.clientX - self[0].offsetLeft;
          let disY = event.clientY - self[0].offsetTop;
          $(document).on("mousemove",function(e) {
              e.preventDefault();
              let l = e.clientX - disX;
              let t = e.clientY - disY;
              console.log(isMove)
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
                self.css({ left:l + "px", top: t + "px" });
                // let w = e.clientY-self.prev()[0].offsetTop
                // // console.log(e.clientX)
                // // console.log((w/totalheight*100).toFixed(2)+"%")
                // let prevheight = ((w/totalheight*100).toFixed(2)+"%")
                // let nextheight = ((100-(w/totalheight*100).toFixed(2))+"%")
                // self.prev().css("height",prevheight)
                // self.next().css("height",nextheight)
              }
            })
            $(document).on("mouseup",function() {
              isMove = false;
              $(document).off("mousemove")
              $(document).off("mouseup")
            });
      }

      $(".draglineshorvation").on("mousedown",function(e) {
          let isMove = true;
          let self=$(this);
          // calculteposition(self,$(".contentover"),e,isMove)
          var totalheight=$(".contentover").height();
          let maxLeft = $(this).parent().width() - $(this).width();
          //  上边距最大值
          let maxTop = $(this).parent().height() - $(this).height();
      
          let disX = e.clientX - $(this)[0].offsetLeft;
          let disY = e.clientY - $(this)[0].offsetTop;
          var div_x = e.pageX - $(".area").offset().left;
          var div_y = e.pageY - $(".area").offset().top;
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
                self.css({ left:l + "px", top: t + "px" });
                let w = e.clientY-self.prev()[0].offsetTop
                // console.log(e.clientX)
                console.log((w/totalheight*100).toFixed(2)+"%")
                self.prev().css("height",((w/totalheight*100).toFixed(2)+"%"))
                self.next().css("height",((100-(w/totalheight*100).toFixed(2))+"%"))

                //计算echarts动态改变大小
                echartsresize(self)
              }
            })
            $(document).on("mouseup",function() {
              isMove = false;
              $(document).off("mousemove")
              $(document).off("mouseup")
            });
        });
        $(".draglines").on("mousedown",function(e) {
            let isMove = true;
            let self=$(this);
            //  calculteposition(self,$(".contentover"),e,isMove)
            var totalwidth=$(".contentover").width();
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
                  self.css({ left:l + "px", top: t + "px" });
                  let w = e.clientX-self.prev()[0].offsetLeft
                  // console.log(e.clientX)
                  self.prev().css("width",((w/totalwidth*100).toFixed(2)+"%"))
                  self.next().css("width",((100-(w/totalwidth*100).toFixed(2))+"%"))


                  //计算echarts动态改变大小
                  echartsresize(self)
                }
              })
              $(document).on("mouseup",function() {
                isMove = false;
                $(document).off("mousemove")
                $(document).off("mouseup")
              });
          });

      //将空间拖拽到图形内容显示中
      $(".drag").on("dragstart", function(event) {
        event.originalEvent.dataTransfer.setData("obj_id", event.target.id);
      });
      $(".area").on("dragover", function(event) {
        event.preventDefault();
      });
      $(".area").on("drop", function(event) {
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
          $(this).attr("type", id);
          that.initechart(id, $(this)[0].id); //初始化拖拽后的图形
        }
      });

      //在图形内容显示中互相拖拽
      $(".area").on("dragstart", function(event) {
        //   console.log(111)
        event.originalEvent.dataTransfer.setData(
          "obj_type",
          $(this).attr("type")
        );
        event.originalEvent.dataTransfer.setData("pre_id", $(this).attr("id")); //保存拖拽之前的图形
      });
      $(".area").on("dragover", function(event) {
        //   console.log(222)
        event.preventDefault();
      });

      $(".area-close").on("click", function(event) {
        that.$echarts.dispose(
          document.getElementById(
            $(this)
              .next()
              .attr("id")
          )
        );
        let id = $(this)
          .next()
          .attr("id");
        that.filterstoretype(id);
      });
    });
  },
  data() {
    return {
      storetype: []
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
      this.$echarts.dispose(document.getElementById(id));
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
  // directives: {
  //   drag: {
  //     // 指令的定义
  //     inserted: function(el, binding) {
  //       let oDiv = el;
  //       //  左边距最大值
  //       let maxLeft = el.parentNode.clientWidth - el.clientWidth;
  //       //  上边距最大值
  //       let maxTop = el.parentNode.clientHeight - el.clientHeight;
  //       oDiv.onmousedown = function(e) {
  //         //  鼠标按下，计算当前元素距离可视区的距离
  //         let disX = e.clientX - oDiv.offsetLeft;
  //         let disY = e.clientY - oDiv.offsetTop;
  //         document.onmousemove = function(e) {
  //           //  获取到鼠标拖拽后的横向位移(距离父级元素)
  //           let l = e.clientX - disX;
  //           //  获取到鼠标拖拽后的纵向位移(距离父级元素)
  //           let t = e.clientY - disY;

  //           debugger

  //           oDiv.style.left = l + "px";
  //           oDiv.style.top = t + "px";

  //           if (e.clientX - disX <= 0) {
  //             oDiv.style.left = 0 + "px";
  //           }

  //           if (e.clientY - disY <= 0) {
  //             oDiv.style.top = 0 + "px";
  //           }

  //           if (e.clientX - disX >= maxLeft) {
  //             oDiv.style.left = maxLeft + "px";
  //           }

  //           if (e.clientY - disY >= maxTop) {
  //             oDiv.style.top = maxTop + "px";
  //           }
  //           //     将此时的位置传出去
  //           // binding.value({ x: oDiv.style.left, y: oDiv.style.top });
  //         };
  //         //     松开事件后，移除事件
  //         document.onmouseup = function(e) {
  //           document.onmousemove = null;
  //           document.onmouseup = null;
  //         };
  //       };
  //     }
  //   }
  // },
  components: {}
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
}
.overarea {
  float: left;
  width: 50%;
  border: 1px solid;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.area {
  width: 100%;
  height: 100%;
}
.area-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
}
.draglines{
/* position: absolute;
    right: 0;
    top: 0;
    bottom: 0; */
    width: 10px;
    background: #ddd;
}
.draglineshorvation{
  width: 100%;
  height: 10px;
    background: #ddd;
}
.row-overarea{
display:flex;
width:100%;
height:calc((100% - 10px) / 2);
}
</style>
