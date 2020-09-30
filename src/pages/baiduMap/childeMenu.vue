<template>
  <div class="lateral-sliding" @mouseup="moveUp" @mousedown="moveDown">
    <div class="lateral-sliding-item" v-for="(item, index) in array" :key="index">
      <div class="each-img" @click="curDeviceInfo(item)">
          位置：{{item.address}}<br/>
          机器码：<br/>{{item.code2}}<br/>
          是否在线：{{item.isOnline ? '是' : '否'}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        list: {
            default: false
        },
        childWindowOpen: {
          type: Function,
          default: null
        }
    },
    data () {
        return {
            // items: 30
            array: [],
            move: 0
        }
    },
    mounted() {
        this.array = this.list;
        // this.$nextTick(() => {
        //   document.oncontextmenu = new Function('event.returnValue=false');
        //   document.onselectstart = new Function('event.returnValue=false');
        // });
    },
    watch: {
        list: {
            deep: true,
            handler() {
                // 因父组件异步传递数据，子组件需要监听到数据在进行赋值
                this.array = this.list;
            }
        }
    },
    methods: {
        curDeviceInfo(e) {
            this.childWindowOpen(e);
        },
        moveDown(e) {
          this.move = e.screenX;
        },
        moveUp(e) {
          if (this.move > e.screenX) {
            console.log(true)
          } else {
            console.log(false)
          }
        }
    }
}
</script>
 
<style scoped>
.lateral-sliding {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  margin:0 20px;
}
.lateral-sliding-item {
  display: flex;
  margin-right: 8px;
    border-radius: 3px;
  background-color: #888;
}
.each-img {
  width: 150px;
  height: 88px;
  font-size: 13px;
  padding: 8px;
  line-height: 18px;
  cursor: pointer;
  color: #fff;
}
 
</style>