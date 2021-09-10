<template>
  <div
    id="topMenu"
    @click="gameListOn(true)"
  >
    <h2 class="hidden">
      topMenu
    </h2>
    <div class="wrap">
      <img
        class="logo pc"
        src="@/assets/logo.png"
        alt="로고"
      />
      <img
        class="logo mobile"
        src="@/assets/logo.png"
        alt="로고"
      />
    </div>
  </div>
</template>

<script scoped>
import gsap from "gsap/all";
export default {
  components: {},
  data() {
    return {
      bgColor: 0xcce0ff,
    };
  },
  created() {
    //
  },
  mounted() {
    const hours = new Date().getHours();
    const topMenu = document.getElementById('topMenu');
    
    if(hours > 7 && hours < 18){      
      // 낮
      this.bgColor = 0xcce0ff;
      // topMenu.setAttribute('style',"background: #1f1f1f")
      topMenu.setAttribute('style',"background: #cce0ff")
      // gsap.to(topMenu,{background: 0x1f1f1f,duration:1}).delay(1)
    }else{
      // 밤
      this.bgColor = 0xb6b6b6;
      // topMenu.setAttribute('style',"background: #cce0ff")
      topMenu.setAttribute('style',"background: #1f1f1f")
      // gsap.to(topMenu,{background: 0x1f1f1f,duration:1}).delay(1)
    }
    
    // console.log(document.documentElement.scrollTop);
    window.addEventListener("scroll", async () => {
      const topM = document.getElementById("topMenu");
      const pcLogo = document.querySelector(".pc");
      const mobileLogo = document.querySelector(".mobile");

      const w = window.innerWidth;
      if (window.pageYOffset <= 10) {
        // 스크롤 위에 있을때 (헤더가 다 보일때)
        if (w > 800) {
          gsap.to(topM, { height: "6rem", duration: 0.5 });
          gsap.to(topM, { background: this.bgColor , duration: 0.5 });
          gsap.to(pcLogo, { left: "10%", duration: 0.5 });
        } else {
          gsap.to(topM, { height: "3rem", duration: 0.5 });
          gsap.to(topM, { background: this.bgColor, duration: 0.5 });
          gsap.to(mobileLogo, { left: "50%", duration: 0.5 });
        }
      } else {
        // 스크롤 아래 있을때 (헤더가 안 보일때)
        if (w > 800) {
          gsap.to(topM, { height: "3rem", duration: 0.5 });
          gsap.to(topM, { background: this.bgColor, duration: 0.5 });
          gsap.to(pcLogo, { left: "50%", duration: 0.5 });
        } else {
          gsap.to(topM, { height: "2rem", duration: 0.5 });
          gsap.to(topM, { background: this.bgColor, duration: 0.5 });
          gsap.to(mobileLogo, { left: "50%", duration: 0.5 });
        }
      }
    });
    window.addEventListener("resize", async () => {
      await this.resetSize();
    });
  },
  methods: {
    gameListOn(flag) {
      this.$emit("gameListOn", flag);
    },
    resetSize() {
      return new Promise((resolve) => {
        const topM = document.querySelector("#topMenu");
        const w = window.innerWidth;
        if (w > 800) {
          gsap.to(topM, { height: "6rem", padding: "1.5rem 0", duration: 0.5 });
        } else {
          gsap.to(topM, { height: "3rem", padding: "1rem 0", duration: 0.5 });
        }
        gsap.delayedCall(0.5, () => {
          resolve();
        });
      });
    },
  },
};
</script>

<style lang="scss">
#topMenu {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 2;
  .logo {
    height: 80%;
    position: absolute;
    top: 50%;
    left: 10%;
    margin: 0;
    transform: translate(-50%, -50%);
  }
}

// pc
@media screen and (min-width: 801px) {
  #topMenu {
    padding: 1.5rem 0;
    height: 6rem;
    /* border-bottom: 2px #eeeeee solid; */
    box-sizing: border-box;
    .wrap {
      width: 100%;
      max-width: 1400px;
      height: 100%;
      margin: 0 auto;

      .pc {
        display: block;
        left: 10%;
      }
      .mobile {
        display: none;
      }
    }
  }
}

// mobile
@media screen and (max-width: 800px) {
  #topMenu {
    padding: 1rem 0;
    width: 100%;
    height: 3rem;

    /* box-shadow: #f26740 0 0 4px; */
    box-shadow: #eeeeee 0 0 20px;
    .wrap {
      width: 100%;
      height: 100%;
      margin: 0 auto;

      .mobile {
        display: block;
        left: 50%;
      }
      .pc {
        display: none;
      }
    }
  }
}
</style>
