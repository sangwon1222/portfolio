<template>
  <div id="app">
    <topMenu @gameListOn="showGameList" />
    <!-- <coronaFace :faceCount= "screen"/> -->
    <canvas id='canvas'/>
    <component
      v-if="startPortfolio"
      :is="currentPage"
      :ref="currentPage"
      @gameListOn="showGameList"
    />

    <!-- <bottomMenu /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import homePage from "@/pages/home.vue";
import topMenu from "@/components/topMenu.vue";
import bottomMenu from "@/components/bottomMenu.vue";
import coronaFace from "@/components/coronaFace.vue";

import { Application } from "./threeEngine/app";
import gsap from "gsap/all";

@Component({
  components: {
    homePage,
    topMenu,
    // bottomMenu,
    coronaFace
  },
})
export default class App extends Vue {
  private currentPage = "homePage";
  private startPortfolio = false;
  
  private backupY: number;
  async mounted() {
    this.resize()
    window.addEventListener('resize',()=>{
        this.resize()
      })

    const app = document.getElementById('app') as HTMLDivElement;
    const hours = new Date().getHours();
    if(hours > 7 && hours < 18){      
      // 낮
      // app.setAttribute('style',"background: #1f1f1f")
      app.setAttribute('style',"background: #cce0ff")
      // gsap.to(app,{background: 0xcce0ff,duration:1}).delay(1)
    }else{
      // 밤
      // app.setAttribute('style',"background: #cce0ff")
      app.setAttribute('style',"background: #1f1f1f")
      // gsap.to(app,{background: 0x1f1f1f,duration:1})
    }
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const threeMap = new Application();
    threeMap.closeApp=()=>{
      app.removeChild(canvas);
      this.startPortfolio = true;
      //
    }
    threeMap.start(canvas)

    threeMap.fullscreen = () => {
      console.log(document.fullscreenElement)
      if (!document.fullscreenElement) {
        const canvas = document.getElementById('canvas');
        if (canvas.requestFullscreen) {
          canvas.requestFullscreen(); // W3C spec
        } else if ((canvas as any).mozRequestFullScreen) {
          (canvas as any).mozRequestFullScreen(); // Firefox
        } else if ((canvas as any).webkitRequestFullscreen) {
          (canvas as any).webkitRequestFullscreen(); // Safari
        } else if ((canvas as any).msRequestFullscreen) {
          (canvas as any).msRequestFullscreen(); // IE/Edge
        }
      }
    }
  }
  resize(){
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const app = document.getElementById('app') as HTMLDivElement;
    const w = window.innerWidth; 
    const h = window.innerHeight; 


    if (w/h > 1.7){
      canvas.setAttribute('style',`width: ${h*1.7}px;height: ${h}px;`);
    } else {
      canvas.setAttribute('style',`width: ${w}px;height: ${w/1.7}px;`);
    }
    app.setAttribute('style',`width: ${w}px;height: ${h}px;`);
  }
  showGameList(flag: boolean) {
    if (!(this.$refs.homePage as any)) {
      return;
    }
    if (flag) {
      (this.$refs.homePage as any).gameListFlag = flag;
      this.backupY = window.pageYOffset;
      window.setTimeout(function() {
        window.scrollTo(0, 0);
      }, 500);
    } else {
      (this.$refs.homePage as any).gameListFlag = flag;
      window.scrollTo(0, this.backupY);
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  overflow: hidden;
  /* padding: 6rem 0 14rem; */
  /* padding: 0 ; */
  padding: 6rem 0 ;
  min-height: 800px;
  /* background-color: #cce0ff; */
  #canvas {
    position: fixed;
    top:100px;
    left:50%;
    transform: translate(-50%, 0);
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
