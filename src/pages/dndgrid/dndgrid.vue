<template>
    <div class="container-fluid" style="display:flex;">
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
        <!-- <h1>DEMO dnd-grid Vue.js Component</h1> -->
        <div class="slide">
            <div class="drag" id="pie" draggable="true"  ref="pie">饼图</div>
            <div class="drag" id="line" draggable="true"  ref="line">线图</div>
            <div class="drag" id="bar" draggable="true" ref="bar">柱图</div>
        </div>
        <dnd-grid-container
            :layout.sync="layout"
            :cellSize="cellSize"
            :maxColumnCount="maxColumnCount"
            :maxRowCount="maxRowCount"
            :margin="margin"
            :bubbleUp="bubbleUp"
            @newLayout="onLayoutUpdate"
        >
            <!-- <dnd-grid-box
                boxId="settings"
                dragSelector="div.card-header"
            > -->
                <!-- <div class="card demo-box"> -->
                    <!-- <div class="card-header">
                        Settings
                    </div> -->
                    <!-- <div class="card-body"> -->
                        <!-- <div class="form-group row">
                            <label for="settings-margin-input" class="col-sm-4 col-form-label">Margin</label>
                            <div class="col-sm-8">
                                <input class="form-control" type="number" v-model.number="margin" id="settings-margin-input">
                            </div>
                        </div> -->
                        <!-- <div class="form-group row">
                            <label for="settings-grid-size-w-input" class="col-sm-4 col-form-label">Cell Size</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="number" v-model.number="cellSize.w" id="settings-grid-size-w-input">
                            </div>
                            <div class="col-sm-4">
                                <input class="form-control" type="number" v-model.number="cellSize.h">
                            </div>
                        </div> -->
                        <!-- <div class="form-group row">
                            <label for="settings-bubble-up-input" class="col-sm-4 col-form-label">Bubble Up</label>
                            <div class="col-sm-8">
                                <input type="checkbox" v-model="bubbleUp" id="settings-bubble-up-input">
                            </div>
                        </div> -->
                        <!-- <button class="btn btn-success" @click="boxCount++">Add Box</button>
                        <button class="btn btn-danger" @click="boxCount = Math.max(0, boxCount-1)">Remove Box</button> -->
                    <!-- </div> -->
                <!-- </div> -->
            <!-- </dnd-grid-box> -->
            <dnd-grid-box
                v-for="number in boxCount"
                :boxId="number.id"
                :key="number.id"
                :id="number.id"
                dragSelector="div.card-header"
                @dragStart="start"
                @dragEnd="end"
                @dragUpdate="update"
            >
                <div class="card demo-box" :id="number.id">
                    <div class="card-header">
                         {{ number.id }}
                    </div>
                </div>
            </dnd-grid-box>
        </dnd-grid-container>
    </div>
</template>

<style>
    .demo-box {
        width: 100%;
        height: 100%;
    }
</style>

<script>
  // import Container and Box components
import { Container, Box } from '@dattn/dnd-grid'
// minimal css for the components to work properly
import '@dattn/dnd-grid/dist/dnd-grid.css'
    export default {
        mounted:function(){
            let self=this;
            for(let key in self.$refs){
                self.number++;
                self.boxCount.push({"id":key+"_"+self.number});
                self.layout.push({
                    id: key+"_"+self.number,
                    hidden: false,
                    pinned: false,
                    position: {
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 1
                    }
                })
            }
            jQuery(function($) {
                setTimeout(() => {
                     for(let i=0;i<self.boxCount.length;i++){
                        //计算拖拽元素位置
                        let key=self.boxCount[i].id.split("_")[0];
                        self.originleft = self.$refs[key].offsetLeft - $(".dnd-grid-container")[0].offsetLeft
                        self.origintop = self.$refs[key].offsetTop - $(".dnd-grid-container")[0].offsetTop

                        $("#"+self.boxCount[i].id).css({
                            "transform":"none",
                            "position":"absolute",
                            "left":self.originleft,
                            "top":self.origintop,
                            "opacity":"0.5",
                            "display":"block"
                        })
                        $(".card-header").attr("draggable",true)
                        $(".card-header").on("dropstart", function(event) {
                            console.log("drip")
                        });
                    }
                }, 0);
                // $(".drag").on("dragstart", function(event) {
                    // console.log("111")
                    // self.boxCount++
                    // $(".dnd-grid-box:last-child").trigger("dragstart");
                    // $(".dnd-grid-box:last-child").trigger("mousedown");
                    // $(".dnd-grid-box:last-child").trigger("mouseover");
                    // $(".dnd-grid-box:last-child").prev().trigger("mousedown");
                    // $(".dnd-grid-box:last-child").prev().trigger("dragstart");
                    // $(".dnd-grid-box:last-child").prev().trigger("mouseover");
                    // $(document).trigger("mouseover")
                    // event.originalEvent.dataTransfer.setData("obj_id", event.target.id);
                // });
                // $(".dnd-grid-container").on("dragover", function(e) {
                    //  disX = e.clientX - $(this)[0].offsetLeft;
                    //  disY = e.clientY - $(this)[0].offsetTop;
                    //  debugger
                    // console.log(disX)
                    // $(".dnd-grid-box:last-child").css({
                    //     "transform":"translate("+disX+"px,"+disY+"px)",
                    //     "display":"block",
                    //     "width":"200px",
                    //     "height":"200px",
                    //     })
                    // $(".dnd-grid-box:last-child").prev().css({
                    //     "transform":"translate("+disX+"px,"+disY+"px)",
                    //     "display":"block",
                    //     "width":"200px",
                    //     "height":"200px",
                    //     })
                        // debugger
                    // $(".dnd-grid-box:last-child").trigger("mousedown");
                    // console.log(self.layout)
                    // event.preventDefault();
                // });
            })
        },
        // updated:function(){
            // let self = this;
            // console.log(self.boxCount)
            // console.log(self.layout)
            //插入拖拽元素覆盖
            // for(let i=0;i<self.boxCount.length;i++){
            //     //计算拖拽元素位置
            //     let key=self.boxCount[i].id.split("_")[0];
            //     self.originleft = self.$refs[key].offsetLeft - $(".dnd-grid-container")[0].offsetLeft
            //     self.origintop = self.$refs[key].offsetTop - $(".dnd-grid-container")[0].offsetTop

            //     $("#"+self.boxCount[i].id).css({
            //         "transform":"none",
            //         "position":"absolute",
            //         "left":self.originleft,
            //         "top":self.origintop,
            //         "opacity":"0.5",
            //         "display":"block"
            //     })
            //     $("#"+self.boxCount[i].id).attr("draggable",true)
            //     $(".dnd-grid-container").on("drop", function(event) {
            //         console.log("drip")
            //     });
            // }
            // debugger
            // let self = this;
            // for(let key in this.$refs){

            //     //给拖拽元素定义id
            //     self.number++;
            //     self.boxCount.push({"id":"pie_"+self.number});

            //     //计算拖拽元素位置
            //     self.originleft = self.$refs[key].offsetLeft - $(".dnd-grid-container")[0].offsetLeft
            //     self.origintop = self.$refs[key].offsetTop - $(".dnd-grid-container")[0].offsetTop

            //     //插入拖拽元素覆盖
            //      for(let i=0;i<self.boxCount.length;i++){debugger
            //         $("#"+self.boxCount[i].id).css({
            //             "transform":"none",
            //             "position":"absolute",
            //             "left":self.originleft,
            //             "top":self.origintop,
            //             "opacity":"0.5"
            //         })
            //     }
            
            // }

        // },
        components: {
            DndGridContainer: Container,
            DndGridBox: Box
        },
        data () {
            return {
                dragoverflag:false,
                originleft:0,
                origintop:0,
                cellSize: {
                    w: 200,
                    h: 200
                },
                maxColumnCount: 5,
                // maxRowCount: Infinity,
                maxRowCount: 10,
                bubbleUp: false,
                margin: 10,
                number:0,
                boxCount: [],
                layout: [
                    // {
                    //     id: 'settings',
                    //     hidden: false,
                    //     pinned: false,
                    //     position: {
                    //         x: 0,
                    //         y: 0,
                    //         w: 1,
                    //         h: 1
                    //     }
                    // },
                    // {
                    //     id: 1,
                    //     hidden: false,
                    //     pinned: false,
                    //     position: {
                    //         x: 1,
                    //         y: 0,
                    //         w: 1,
                    //         h: 1
                    //     }
                    // },
                    // {
                    //     id: 2,
                    //     hidden: false,
                    //     pinned: false,
                    //     position: {
                    //         x: 3,
                    //         y: 0,
                    //         w: 1,
                    //         h: 1
                    //     }
                    // },
                ]
            }
        },
        computed: {
            layoutWithoutSettings () {
                debugger
                return this.layout.filter((box) => {debugger
                    return box.id !== 'settings'
                })
            }
        },
        methods: {
            onLayoutUpdate (evt) {
                // debugger
                this.layout = evt.layout
            },
            start(message){
                // console.log(message)
                // debugger
            },
            end(message){
                // console.log(message)
                // debugger
            },
            update(message){
                debugger
                console.log(message)
            }
            // overgraphic(){
            //     let self=this;
            //     self.boxCount ++;
            //     // console.log(self.layout)
            //     setTimeout(() => {
            //         let el= $(".dnd-grid-box:last-child").prev()
            //         el.css({
            //             "transform":"none",
            //             "position":"absolute",
            //             "left":self.originleft,
            //             "top":self.origintop,
            //             "opacity":"0.5"
            //         })
            //         el.find(".demo-box").on("mouseout",function(){
            //             self.boxCount = Math.max(0, self.boxCount-1)
            //             console.log(self.layout)
            //             // $(".demo-box").off("mouseout")
            //         })
            //     }, 0);
            // },
            // outheader(){

            // },
            // overframe(){
            //     console.log("进进进进进进进进进进进")
            // },
            // outframe(){
            //     console.log("出出出出出出出出出出出出")
            // },
            // moveframe(){
            //     console.log("动动动动动动动动动动动动")
            // }
        }

    }
</script>
<style scoped>
.card{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}
    .card-header{
    border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
    }
    .drag{
        border:1px solid;
        padding:5px;
    }
    .slide{
        border:1px solid;
        padding:10px;
    }
    .dnd-grid-container{
        border:1px solid;
        flex-grow: 1;
    }
</style>
