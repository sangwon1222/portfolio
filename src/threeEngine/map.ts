import * as THREE from "three";

export class Map extends THREE.Mesh {
  constructor(scale: number, mapColor: number) {
    super();

    const wall = new THREE.Mesh();
    wall.geometry = new THREE.BoxGeometry(scale, scale, 0.1, scale, scale);
    wall.material = new THREE.MeshPhongMaterial({ color: mapColor });
    wall.receiveShadow = true;
    wall.castShadow = true;
    wall.rotation.x = THREE.MathUtils.DEG2RAD * -90;
    wall.position.set(0, scale/2, scale/2);

    const bottom = new THREE.Mesh();
    bottom.geometry = new THREE.BoxGeometry(scale, scale, 0.1, scale, scale);
    bottom.material = new THREE.MeshPhongMaterial({ color: mapColor });
    bottom.receiveShadow = true;
    bottom.castShadow = true;
    bottom.position.set(0, 0, 0);

    const left = new THREE.Mesh();
    left.geometry = new THREE.BoxGeometry(scale, scale, 0.1, scale, scale);
    left.material = new THREE.MeshPhongMaterial({ color: mapColor });
    left.receiveShadow = true;
    left.castShadow = true;
    left.rotation.y = THREE.MathUtils.DEG2RAD * -90;
    left.position.set(-scale/2, 0, scale/2);

    const right = new THREE.Mesh();
    right.geometry = new THREE.BoxGeometry(scale, scale, 0.1, scale, scale);
    right.material = new THREE.MeshPhongMaterial({ color: mapColor });
    right.receiveShadow = true;
    // right.castShadow = true;
    right.rotation.y = THREE.MathUtils.DEG2RAD * -90;
    right.position.set(scale/2, 0, scale/2);

    this.add(wall, bottom, left, right);
  }
}
