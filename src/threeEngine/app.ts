import * as THREE from "three";
import gsap from "gsap";
// import { Cube } from "./Cube";
// import { Car } from "./Car";
import { Map } from "./map";
// import { Light } from "./Light";
import { Camera } from "./camera";
import { CompressedPixelFormat } from "three";

let gApp: Application = null;

function _mainLoop() {
  if (gApp) {
    gApp.mainloop();
  }
  requestAnimationFrame(_mainLoop);
}

export class Application {
  private mScene: THREE.Scene;
  private mCamera: Camera;
  private mRenderer: THREE.Renderer;
  private mCube: THREE.Mesh;

  private mLight: THREE.DirectionalLight;

  constructor() {
  
    gApp = this;

    // window.addEventListener("mousewheel", (delta: WheelEvent) => {
    //   if (delta.deltaY > 0) {
    //     /**마우스 휠 위에서 아래로 */
    //     // this.mCamera.changeFov(-1);
    //     this.mCamera.position.z -= 1;
    //     this.mCamera.position.z < 10 ? 
    //         this.mCamera.position.z = 10 
    //       : (this.mCamera.position.z -= 1);
    //   } else {
    //     /**마우스 휠 아래서 위로 */
    //     // this.mCamera.changeFov(1);
    //     this.mCamera.position.z += 1;
    //     this.mCamera.position.z > 34 ? 
    //     this.mCamera.position.z = 34 
    //       : (this.mCamera.position.z += 1);
    //   }
    //   this.mCamera.lookAt(new THREE.Vector3(this.mCube.position.x,this.mCube.position.y,this.mCube.position.z));
    // });

    let rotationFlag = false;
    let pos = [0, 0];
    window.addEventListener("mousedown", (delta: PointerEvent) => {
      pos = [delta.clientX, delta.clientY];
      rotationFlag = true;
    });

    window.addEventListener("mousemove", (delta: PointerEvent) => {
      if (!rotationFlag || !this.mCamera) {
        return;
      }
      const moveXValue =
        this.mCamera.position.x - (delta.clientX - pos[0]) * 0.01;

      const moveYValue =
        this.mCamera.position.y - (delta.clientX - pos[1]) * 0.01;

      const cameraX = this.mCamera.position.x
      
      if (cameraX > 38) {
        this.mCamera.position.x = 38;
        pos = [delta.clientX, delta.clientY];
        return;
      } else if (cameraX < -30) {
        this.mCamera.position.x = -30;
        pos = [delta.clientX, delta.clientY];
        return;
      }
       else if(cameraX >= -30 && cameraX <= 38 ) {
        this.mCamera.position.x -= (delta.clientX - pos[0]) * 0.1;
      }

      const cameraY = this.mCamera.position.y
      if (cameraY > 30) {
        this.mCamera.position.y = 30;
        pos = [delta.clientX, delta.clientY];
        return;
      } else if (cameraY < -36) {
        this.mCamera.position.y = -36;
        pos = [delta.clientX, delta.clientY];
        return;
      } else if(cameraY >= -36 && cameraY <= 30 ) {
        this.mCamera.position.y -= (delta.clientY - pos[1]) * 0.1;
      }

      // this.mCamera.position.x -= (delta.clientX - pos[0]) * 0.1;
      // this.mCamera.position.y -= (delta.clientY - pos[1]) * 0.1;


      pos = [delta.clientX, delta.clientY];
      // this.mCamera.position.y -= (delta.clientY - pos[1]) * 0.01;

      // this.mCamera.lookAt(new THREE.Vector3(0, 3, 0));
      this.mCamera.lookAt(new THREE.Vector3(
        this.mCube.position.x,
        this.mCube.position.y,
        10
        // this.mCube.position.z
        ));
    });

    window.addEventListener("mouseup", (delta: PointerEvent) => {
      pos = [delta.clientX, delta.clientY];
      rotationFlag = false;
    });

    window.addEventListener("touchstart", (delta: TouchEvent) => {
      this.fullscreen();
      pos = [delta.changedTouches[0].pageX, delta.changedTouches[0].pageY];
      rotationFlag = true;
    });

    window.addEventListener("touchmove", (delta: TouchEvent) => {
      if (!rotationFlag || !this.mCamera) {
        return;
      }
      const eventX = delta.changedTouches[0].pageX
      const eventY = delta.changedTouches[0].pageY

      const cameraX = this.mCamera.position.x
      
      if (cameraX > 13) {
        this.mCamera.position.x = 13;
        pos = [eventX, eventY];
        return;
      } else if (cameraX < -20) {
        this.mCamera.position.x = -20;
        pos = [eventX, eventY];
        return;
      }
       else if(cameraX >= -20 && cameraX <= 13 ) {
        this.mCamera.position.x -= (eventX - pos[0]) * 0.1;
      }

      const cameraY = this.mCamera.position.y
      if (cameraY > 8) {
        this.mCamera.position.y = 8;
        pos = [eventX, eventY];
        return;
      } else if (cameraY < -90) {
        this.mCamera.position.y = -90;
        pos = [eventX, eventY];
        return;
      } else if(cameraY >= -90 && cameraY <= 8 ) {
        this.mCamera.position.y -= (eventY - pos[1]) * 0.1;
      }
      

      pos = [eventX, eventY];
      this.mCamera.lookAt(new THREE.Vector3(
        this.mCube.position.x,
        this.mCube.position.y,
        this.mCube.position.z
        ));
    });

    window.addEventListener("touchend", (delta: TouchEvent) => {
      const eventX = delta.changedTouches[0].pageX
      const eventY = delta.changedTouches[0].pageY
      pos = [eventX, eventY];
      rotationFlag = false;
    });

  }

  updateProc() {
    // if (this.mCube) {
    //   for (let i = 0; i < this.mCube.length; i++) {
    //     this.mCube[i].rotation.x += 0.01;
    //     this.mCube[i].rotation.y += 0.01;
    //     if (this.mItemAry.length !== 0) {
    //       for (const item of this.mItemAry) {
    //         if (item.move) {
    //           item.move();
    //         }
    //       }
    //     }
    //   }
    //   this.checkKey();
      // this.collisionCheck();
    // }
  }

  renderProc() {
    if (this.mRenderer && this.mScene && this.mCamera)
      this.mRenderer.render(this.mScene, this.mCamera);
  }

  mainloop() {
    this.updateProc();
    this.renderProc();
  }

  fullscreen(){
    //
  }

  start(canvas: HTMLCanvasElement) {

    this.mScene = new THREE.Scene();
    const hours = new Date().getHours();
    if(hours > 7 && hours < 18){      
      // 낮
      this.mScene.background = new THREE.Color(0xcce0ff);
    }else{
      // 밤
      this.mScene.background = new THREE.Color(0x1f1f1f);
    }

    this.mLight = new THREE.DirectionalLight(0xffd399, 0.5);
    this.mLight.position.set(10, -10, 20);
    this.mLight.position.multiplyScalar(0.8);
    this.mLight.castShadow = true;

    this.mLight.shadow.mapSize.width = 1280;
    this.mLight.shadow.mapSize.height = 1280;

    const d = 10;
    this.mLight.shadow.camera.left = -d;
    this.mLight.shadow.camera.right = d;
    this.mLight.shadow.camera.top = d;
    this.mLight.shadow.camera.bottom = -d;

    this.mLight.shadow.camera.far = 100;

    this.mScene.add(this.mLight);

    const light1 = new THREE.DirectionalLight(0xffd399, 0.5);
    light1.position.set(-20, 0, -40);
    light1.position.multiplyScalar(0.8);
    const light2 = new THREE.DirectionalLight(0xffd399, 0.4);
    light2.position.set(20, 0, 0);
    light2.position.multiplyScalar(0.8);
    const light3 = new THREE.DirectionalLight(0xffd399, 0.5);
    light3.position.set(0, -10, 0);
    light3.position.multiplyScalar(0.8);

    this.mScene.add(light1, light2, light3);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.mRenderer = renderer;
    // this.mRenderer.setSize(window.innerWidth, window.innerHeight);
    this.mRenderer.setSize(1280, 720);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.setClearColor(0xcccccc);

    this.mCamera = new Camera();

    this.mCamera.position.set(0,-50,40)
    // this.mCamera.position.y = -10;
    // this.mCamera.position.z = 10;
    this.mCamera.lookAt(new THREE.Vector3(0, 3, 10));

    // const mapTile = new Map(25, 0xffffff);
    // this.mScene.add(mapTile);
    // const loadManager = new THREE.LoadingManager();
    // const loader = new THREE.TextureLoader(loadManager);
    // // const materials = [
    //   // new THREE.MeshBasicMaterial({map: loader.load('/src/assets/images/thumnail_lg.png')}),
    //   // new THREE.MeshBasicMaterial({map: loader.load('/src/assets/images/thumnail_lg.png')}),
    //   // new THREE.MeshBasicMaterial({map: loader.load('/src/assets/images/thumnail_lg.png')}),
    //   // new THREE.MeshBasicMaterial({map: loader.load('/src/assets/images/thumnail_lg.png')}),
    //   // new THREE.MeshBasicMaterial({map: loader.load('/src/assets/images/thumnail_lg.png')}),
    //   // new THREE.MeshBasicMaterial({map: loader.load('/src/assets/images/thumnail_lg.png')}),
    // // ];
    // const materials = new THREE.MeshBasicMaterial({
    //   map: loader.load('../assets/images/thumnail_lg.png'),
    // });

    // const boxWidth = 4;
    // const boxHeight = 8;
    // const boxDepth = 4;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // loadManager.onLoad = () => {
    //   // loadingElem.style.display = 'none';
    //   // const cube = new THREE.Mesh(geometry, materials);
    //   // cubes.push(cube);  // add to our list of cubes to rotate
    //   this.mCube = new THREE.Mesh(geometry , materials )
    //   this.mCube.position.set(0,1,6);
    //   this.mCube.castShadow = true;
    //   this.mScene.add(this.mCube);
    // };

    let geometry= new THREE.SphereGeometry();
    let materials = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    if(hours > 7 && hours < 18){      
      // 낮
      geometry = new THREE.SphereGeometry(4, 40, 16);
      materials = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    }else{
      // 밤
      geometry = new THREE.SphereGeometry(4, 40, 4,4,4,2,1.5);
      materials = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    }
    this.mCube = new THREE.Mesh(geometry , materials );
    this.mCube.position.set(-100,60,-40);
    this.mScene.add(this.mCube);
    
    if(hours > 7 && hours < 18){      
      // 낮
      light1.position.z= 0;

      const moon = new THREE.Mesh();
      moon.geometry = new THREE.SphereGeometry(4, 40, 4,4,4,2,1.5);
      moon.material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
      // moon.geometry = new THREE.SphereGeometry(4, 40, 16);
      // moon.material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      moon.position.set(0,60,10);
      this.mScene.add(moon);
      gsap.to(moon.position,{x: 100,z:-20,duration:1}).delay(1)
      .eventCallback('onComplete',()=>{
        this.mScene.remove(moon);
        gsap.to(light1.position,{z:30,duration:1}).delay(0.5);
        gsap.to(this.mCube.position,{x:0,duration:1});
        gsap.to(this.mCube.position,{z:10,duration:1})
        .eventCallback('onComplete',()=>{
          this.closeApp();
        });
      });
    }else{
      // 밤
      const sun = new THREE.Mesh();
      sun.geometry = new THREE.SphereGeometry(4, 40, 16);
      sun.material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      sun.position.set(0,60,10);
      this.mScene.add(sun);
      
      light1.position.z= 30;
      gsap.to(light1.position,{z:-10,duration:1}).delay(1);
      gsap.to(sun.position,{x: 100,z:-20,duration:1}).delay(1)
      .eventCallback('onComplete',()=>{
        this.mScene.remove(sun);
        gsap.to(this.mCube.position,{x:0,duration:1});
        gsap.to(this.mCube.position,{z:10,duration:1})
        .eventCallback('onComplete',()=>{
          this.closeApp();
        });
      });
    }

    const scale = 100;
    const bottom = new THREE.Mesh();
    bottom.geometry = new THREE.BoxGeometry(scale, scale, 0.1, scale, scale);
    bottom.material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    bottom.receiveShadow = true;
    bottom.castShadow = true;
    bottom.rotation.z = THREE.MathUtils.DEG2RAD * -90;
    bottom.position.set(0, 0, -10);
    this.mScene.add(bottom);

    _mainLoop();
  }

  closeApp(){
    //
  }

  // collisionCheck() {
  //   const carBound = new THREE.Box3().setFromObject(this.mCar);
  //   for (let i = 0; i < this.mCube.length; i++) {
  //     const cubeBound = new THREE.Box3().setFromObject(this.mCube[i]);
  //     if (carBound.intersectsBox(cubeBound)) {
  //       this.mClearBoxCnt += 1;

  //       this.mCube[i].visible = false;

  //       this.mCube[i].position.set(this.randomPos().x, this.randomPos().y, 1);
  //       if (this.mClearBoxCnt % 5 == 0) {
  //         const item = new Item(0.3);
  //         item.position.set(this.randomPos().x, this.randomPos().y, 10);
  //         gsap.to(item.position, {
  //           x: this.randomPos().x,
  //           y: this.randomPos().y,
  //           z: 1,
  //           duration: 1,
  //         });
  //         if (this.mClearBoxCnt % 10 == 0) {
  //           item.setScale = Math.floor(this.mClearBoxCnt / 10) + 1;
  //         }
  //         this.mScene.add(item);
  //         this.mItemAry.push(item);
  //       }
  //       const delay = Math.ceil(Math.random() * 5);
  //       gsap.delayedCall(delay, () => {
  //         this.mCube[i].visible = true;
  //       });
  //     }
  //   }
  //   if (this.mItemAry.length > 0) {
  //     for (const item of this.mItemAry) {
  //       const itemBound = new THREE.Box3().setFromObject(item);
  //       if (carBound.intersectsBox(itemBound)) {
  //         this.mItemAry.splice(this.mItemAry.indexOf(item), 1);
  //         this.mScene.remove(item);
  //         if (item.skill == "speedUp") {
  //           // this.mSpeed > 2 ? null : (this.mSpeed += 0.02);
  //           this.mSpeed += 0.04;
  //         } else if (item.skill == "speedDown") {
  //           this.mSpeed <= 0.1 ? null : (this.mSpeed -= 0.08);
  //           // this.mSpeed -= 0.02;
  //         }
  //       }
  //     }
  //   }
  // }
}
