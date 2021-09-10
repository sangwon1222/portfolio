<template>
  <div id="home_page">
    <h2 class="hidden">
      home_page
    </h2>
    <div class="guide">
      <h2 class="hidden">
        guide
      </h2>
      <p
        id="guideText"
        @click="gameListOn(true)"
      >
        Activity List
      </p>
    </div>

    <div
      v-if="gameListFlag"
      class="list_wrap"
    >
      <h2 class="hidden">
        game_list
      </h2>
      <button
        class="closeList"
        @click="gameListOn(false)"
      />
      <ul class="list">
        <li
          v-for="(v, i) in gameList"
          :key="i"
          @click="goLink(v.link, i)"
        >
          <p class="label">
            {{ v.label }}
          </p>
          <img
            :src="require(`@/assets/images/${v.img}`)"
            :alt="`썸네일${v.label}`"
          />
        </li>
      </ul>
    </div>

    <div class="pc">
      <h2 class="hidden">
        pc
      </h2>
      <swiper
        class="swiper"
        :options="swiperOption"
      >
        <swiper-slide
          v-for="(v, i) in gameList"
          :key="i"
          class="swiper-wrap"
        >
          <div
            class="wrap"
            @click="goLink(v.link, i)"
          >
            <p class="label">
              {{ v.label }}
            </p>
            <div class="imgBox">
              <img
                class="thumnail"
                :src="require(`@/assets/images/${v.img}`)"
                :alt="`썸네일${v.label}`"
              />
            </div>
          </div>
        </swiper-slide>
        <div
          slot="pagination"
          class="swiper-pagination"
        />
      </swiper>
    </div>

    <div class="mobile">
      <h2 class="hidden">
        mobile
      </h2>
      <swiper
        class="swiper"
        :options="swiperOptionMobile"
      >
        <swiper-slide
          v-for="(v, i) in gameList"
          :key="i"
          class="swiper-wrap"
        >
          <div
            class="wrap"
            @click="goLink(v.link, i)"
          >
            <p class="label">
              {{ v.label }}
            </p>
            <div class="imgBox">
              <img
                class="thumnail"
                :src="require(`@/assets/images/${v.img}`)"
                :alt="`썸네일${v.label}`"
              />
            </div>
          </div>
        </swiper-slide>
        <div
          slot="pagination"
          class="swiper-pagination"
        />
      </swiper>
    </div>
  </div>
</template>

<script scoped>
import "@/assets/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import gsap from "gsap/gsap-core";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        sensitivity: 0.1,
        slidesPerColumn: 1,
        loop: true,
        // centeredSlides: true,
        // freeMode: true,

        // effect: "coverflow",
        // grabCursor: true,
        // centeredSlides: true,
        // slidesPerView: 3,
        // loop: true,
        // coverflowEffect: {
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true,
        // },
        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },
        speed: 800,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      swiperOptionMobile: {
        slidesPerView: "auto",
        autoHeight: true,
        spaceBetween: 80,
        // slidesPerView: 2,
        // freeMode: true,
        // direction: "vertical",

        // effect: "cube",
        // grabCursor: true,
        speed: 800,
        loop: true,
        // cubeEffect: {
        //   shadow: true,
        //   slideShadows: true,
        //   shadowOffset: 20,
        //   shadowScale: 0.94,
        // },

        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },

      gameListFlag: false,
      gameList: [
        {
          label: "MEW",
          img: "thumnail_mew.png",
          link: "http://imestudy.smartdoodle.net:1222",
        },
        {
          label: "LG",
          img: "thumnail_lg.png",
          link: "https://imestudy.smartdoodle.net/lg",
        },
        {
          label: "하루 한글",
          img: "thumnail_hangul.png",
          link: "https://imestudy.smartdoodle.net/hangul",
        },
        {
          label: "milkT",
          img: "thumnail_milk.png",
          link: "https://imestudy.smartdoodle.net/milk",
        },
        {
          label: "ic_phonics",
          img: "thumnail_phonics.png",
          link: "https://imestudy.smartdoodle.net/ic_phonics",
        },
        {
          label: "ic_alphabet",
          img: "thumnail_ic_al.png",
          link: "https://imestudy.smartdoodle.net/ictest_al",
        },
        {
          label: "ic_phonicsReading",
          img: "thumnail_ic_pr.png",
          link: "https://imestudy.smartdoodle.net/ictest_pr",
        },
        {
          label: "ic_siteWord",
          img: "thumnail_ic_sw.png",
          link: "https://imestudy.smartdoodle.net/ictest_sw",
        },
        {
          label: "wooden_cube",
          img: "thumnail_cube.png",
          link: "https://imestudy.smartdoodle.net/3d/wooden_cube",
        },
      ],
    };
  },
  created() {
    window["clickSnd"] = new Audio();
    window[
      "clickSnd"
    ].src = `https://imestudy.smartdoodle.net/rsc/common/sounds/com_button_click.mp3`;
  },
  mounted() {
    const hours = new Date().getHours();
    const text = document.getElementById('guideText');
    
    if(hours > 7 && hours < 18){      
      // 낮
      text.setAttribute('style',"color: #cce0ff")
    }else{
      // 밤
      text.setAttribute('style',"color: #ffffff")
    }
    
    // const currentPage = sessionStorage.getItem("page");
    // if (currentPage) this.$refs.pcSwiper.swiper.slideTo(currentPage);
  },
  methods: {
    goLink(link, i) {
      window["clickSnd"].play();
      const page = Math.floor(i / 4) + 1;

      sessionStorage.setItem("page", page);
      gsap.delayedCall(0.3, () => {
        location.href = `${link}`;
      });
    },
    gameListOn(flag) {
      this.$emit("gameListOn", flag);
    },
  },
};
</script>

<style lang="scss" scoped>
#home_page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .guide {
    position: relative;
    display: block;
    padding: 40px 0;
    margin: 40px 0 40px -6rem;
    font-weight: bold;
    font-size: 32px;
    text-align: center;

    #guideText {
      position: relative;
      display: inline-block;
      margin-left: 60px;
      cursor: pointer;
      &:hover &::before {
        opacity: 0;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        display: block;
      }
      &::before {
        right: -60px;
        bottom: 0;
        width: 30px;
        height: 10px;
        transform: skewX(40deg);
        border-right: 2px #f26740 solid;
        border-bottom: 2px #f26740 solid;
      }
      &::after {
        content: "더보기";
        bottom: 4px;
        right: -50px;
        font-size: 10px;
      }
    }
  }

  .pc {
    overflow: hidden;
    margin: 20px auto;
    width: 100%;
    max-width: 1400px;
    padding: 60px 0 100px;
    .swiper {
      overflow: hidden;
      padding: 60px 0;
    }
    .swiper-wrap {
      float: left;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      .thumnail {
        margin: 10px auto;
        width: 100%;
      }
    }
  }

  .mobile {
    overflow: hidden;
    height: auto;
    box-sizing: border-box;
    .swiper {
      overflow: hidden;
      padding: 80px;
      height: auto;
      box-sizing: border-box;
    }
    .swiper-wrap {
      overflow: hidden;
      box-sizing: border-box;
      cursor: pointer;
      .thumnail {
        margin: 10px auto;
        width: 100%;
      }
    }
  }

  .list_wrap {
    overflow: hidden;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    z-index: 20;
    animation: opacity 0.5s forwards;
    .list {
      overflow: scroll;
      margin: auto;

      width: 80%;
      min-height: 300px;
      max-height: 100%;

      box-sizing: border-box;
      li {
        float: left;
        overflow: hidden;
        margin: 40px;

        box-sizing: border-box;
        width: 200px;
        height: auto;
        opacity: 0;
        animation: opacity 0.5s 0.5s forwards;
        img {
          width: 100%;
        }
      }
    }

    .closeList {
      position: absolute;
      top: 20px;
      right: 40px;
      width: 60px;
      height: 60px;
      cursor: pointer;
      opacity: 0;
      animation: opacity 0.5s 0.5s forwards;
      &:hover {
        &:before {
          background: #f26740;
          animation: before 0.5s forwards;
          transition: all 0.5;
        }
        &:after {
          background: #f26740;
          animation: after 0.5s forwards;
          transition: all 0.5;
        }
      }

      @keyframes before {
        to {
          transform: rotate(-45deg);
        }
      }
      @keyframes after {
        to {
          transform: rotate(45deg);
        }
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 4px;
        height: 2rem;
        top: 0;
        left: 50%;
        background: #fff;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .imgBox {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .label {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }

  .wrap {
    position: relative;
  }
  /* pc */
  @media screen and (min-width: 801px) {
    .pc {
      display: block;
    }
    .mobile {
      display: none;
    }
  }

  /* mobile */
  @media screen and (max-width: 800px) {
    .pc {
      display: none;
    }
    .mobile {
      display: block;
    }

    .list {
      padding: 80px 0;
    }
  }
}
</style>
