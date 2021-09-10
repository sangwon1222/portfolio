<template>
  <div id="bottomMenu">
    <h2 class="hidden">
      bottomMenu
    </h2>
    <img
      class="logo"
      src="@/assets/logo.png"
      alt="logo"
    />
  </div>
</template>

<script scoped>
import gsap from "gsap/all";
export default {
  components: {},
  data() {
    return {
      //
    };
  },
  created() {
    //
  },
  mounted() {
    // console.log(document.documentElement.scrollTop);
    window.onscroll = async () => {
      await this.scrollScreen();
    };
    // window.addEventListener("resize", async () => {
    //   await this.resetSize();
    // });
  },
  methods: {
    scrollScreen() {
      return new Promise((resolve) => {
        const w = window.innerWidth;
        const bottomMenu = document.getElementById("bottomMenu");
        this.currentY = document.documentElement.scrollTop;
        if (window.pageYOffset > 20) {
          // 스크롤 내려갈때
          if (w > 800) {
            //
          } else {
            // 
          }
        } else {
          // 스크롤 올라갈때
          if (w > 800) {
            //
          } else {
            //
          }
        }
        gsap.delayedCall(0.5, () => {
          resolve();
        });
      });
    },
    // resetSize() {
    //   return new Promise((resolve) => {
    //     const bottomMenu = document.querySelector("#bottomMenu");
    //     const w = window.innerWidth;
    //     if (w > 800) {
    //       gsap.to(bottomMenu, { height: "20rem", padding: "1.5rem 0", duration: 0.5 });
    //     } else {
    //       gsap.to(bottomMenu, { height: "10rem", padding: "1rem 0", duration: 0.5 });
    //     }
    //     gsap.delayedCall(0.5, () => {
    //       resolve();
    //     });
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
#bottomMenu {
  position:absolute;
  left:0;
  bottom:0;
  margin: 4rem 0 0 ;
  padding: 1rem 0  ;
  width: 100%;
  background-color: rgba(0,0,0,0.8);
  box-sizing: border-box;
}

// pc
@media screen and (min-width: 801px) {
 .logo{
    margin: 6rem 1rem 1rem;
    width: 100px;
  }
}

// mobile
@media screen and (max-width: 800px) {
.logo{
    margin-top: 20px ;
    width: 100px;
  }
}
</style>
