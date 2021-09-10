<template>
  <div
    id="coronaFace"
    @click="hide"
  >
    <div class="container">
      <div
        v-if="pc"
        class="face"
      >
        <div class="eyes">
          <span class="eye" />
          <span class="eye" />
        </div>
      </div>


      <div class="face">
        <div class="eyes">
          <span class="eye" />
          <span class="eye" />
        </div>
      </div>


      <div
        v-if="pc"
        class="face"
      >
        <div class="eyes">
          <span class="eye" />
          <span class="eye" />
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import gsap from "gsap/all";
export default {
    components: {},
  data() {
    return {
      pc: true,
    };
  },
  // props: ['faceCount'],
  // props: {faceCount: Number},
  created(){
    this.resize()
      window.addEventListener('resize',()=>{
      this.resize()
    })
  },
  async mounted() {
    await this.registEyeMoveFunction();

    await this.setTime();
  
    
    const coronaPage = document.querySelector("#coronaFace")
    coronaPage.addEventListener('mousedown',()=>{
      this.hide();
      this.hide=()=>null;
    })
  },
  beforeDestroy(){
      window['eyeball']=null;
      this.resize=()=>null;
  },
  methods:{
    resize(){
    const w = window.innerWidth;
    w > 980  ? this.pc=true : this.pc=false;
  },
    registEyeMoveFunction(){
      return new Promise (resolve=>{
        
        const coronaPage = document.querySelector("#coronaFace")

        window['eyeball']=()=>{
          const eye = document.querySelectorAll('.eye')
          eye.forEach(function(eye){
              const x= (eye.getBoundingClientRect().left)+(eye.clientWidth/2)
              const y= (eye.getBoundingClientRect().top)+(eye.clientHeight/2)
              const radian = Math.atan2(event.pageX-x, event.pageY-y);
              const rot = (radian * (180/ Math.PI)*-1)+270
              eye.style.transform = 'rotate('+rot+"deg)"
            })
        }

        // coronaPage.addEventListener('mousemove',window['eyeball'])
        coronaPage.addEventListener('pointermove',window['eyeball'])
        coronaPage.addEventListener('touchstart',window['eyeball'])
        coronaPage.addEventListener('touchmove',console.log(`move_touch`))
        resolve();
      })
    },
    setTime(){
      return new Promise (resolve=>{
        const coronaPage = document.querySelector("#coronaFace");
        
        const currentHours = (new Date().getHours() + 24)%12;
        // const currentHours = 8;
        

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let startBgColor = ''
        let bgColor = ''
        if(currentHours >= 8 && currentHours < 12){
          startBgColor= '#150e5c';
          // bgColor= '#a9f1f6';
          bgColor= '#e9d5a1';
        }
        if(currentHours >= 12 && currentHours < 18){
          // startBgColor= '#a9f1f6';
          startBgColor= '#e9d5a1';
          bgColor= '#fbbe00';
        }
        if(currentHours >= 18 && currentHours < 20){
          startBgColor= '#fbbe00';
          bgColor= '#ff8d00';
        }
        if(currentHours >= 20 && currentHours < 25){
          startBgColor= '#ff8d00';
          bgColor= '#341358';
        }
        if(currentHours >= 0 && currentHours < 8){
          startBgColor= '#341358';
          bgColor= '#150e5c';
        }
        console.log(`%c ${currentHours}시` , `background: ${startBgColor};color: ${bgColor}`)
        const bgChange = gsap.timeline({})
        bgChange.to(coronaPage,{background: startBgColor,duration:0.5})
        bgChange.to(coronaPage,{background: bgColor,duration:0.5})
        .eventCallback('onComplete',()=>{
          resolve()
        })
      })
    },
    hide(){
      const coronaPage = document.querySelector("#coronaFace")
      gsap.to(coronaPage,{minHeight:0,height:0,duration:1})
    }
  }
};
</script>

<style lang="scss" scoped>
#coronaFace {
  overflow: hidden;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width:100%;
  min-height:100%;
  background: #251801;
  cursor: url('http://hkbvc1222.cafe24.com/img/logo.png'), pointer;
  z-index: 3;
  .container{
    position: relative;
    display: flex;
    justify-content: center;
  align-items: center;
  .face{
    position: relative;
    width: 300px;
    height:300px;
    border-radius: 50%;
    background-color: #ffcd00;
    box-shadow: rgba(0,0,0,0.5) 0 14px 10px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    &:before{
      content: '';
      position: absolute;
      top:180px;
      width: 150px;
      height: 70px;
      border-bottom-left-radius: 70px;
      border-bottom-right-radius: 70px;
      background: #b57700;
      transition:0.25s ;
    }
    &:hover:before{
      top:210px;
      width:150px;
      height:60px;
      border-bottom-left-radius:0px;
      border-bottom-right-radius:0px;
      border-radius:50%;
      border-top: 20px #9d0b00 solid;
      background: none;
      /* background: #9d0b00; */
    }
    &:hover{
      background: linear-gradient(180deg, #f44336, #f44336, #ffcd00)
    }
    .eyes{
      position: relative;
      top:-40px;
      display: flex;
      flex-wrap: wrap;
      .eye{
        position: relative;
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 15px;
        background: #fff;
        border-radius: 50%;
        &:before{
          content: '';
          position: absolute;
          top:50%;
          left:25px;
          transform: translate(-50%,-50%);
          width: 40px;
          height:40px;
          background: #333;
          border-radius: 50%;;
        }
      }
    }
  }
  }
}

</style>
