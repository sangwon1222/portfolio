import * as THREE from "three";

export class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super();

  }
  changeFov(changeValue: number) {
    this.fov += changeValue;
    console.log(this.fov);
  }
}
