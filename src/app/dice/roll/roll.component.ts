import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as CANNON from 'cannon';
import * as THREE from 'three';
import { Stats } from 'three-stats';
import { DiceD6, DiceManager } from 'threejs-dice';

declare const require: (moduleId: string) => any;
const OrbitControls = require('three-orbit-controls')(THREE);

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef;
  private _world: CANNON.World;
  private _dice: DiceD6[] = [];
  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.PerspectiveCamera;
  private _controls: any;
  private _stats: any;
  private readonly WIDTH = window.innerWidth - 48;
  private readonly HEIGHT = window.innerHeight - 10;
  private readonly VIEW_ANGLE = 45;
  private readonly NEAR = 0.01;
  private readonly FAR = 20000;
  private readonly ASPECT = this.WIDTH / this.HEIGHT;

  constructor(private _self: ElementRef) { }

  ngOnInit() {
    this._scene = new THREE.Scene();

    // CAMERA
    this._camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
    this._scene.add(this._camera);
    this._camera.position.set(0, 30, 30);

    // RENDERER
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(this.WIDTH, this.HEIGHT);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // CONTAINER
    const container = this.canvasWrapper.nativeElement;
    container.appendChild(this._renderer.domElement);

    // CONTROLS
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);

    // STATS
    this._stats = new Stats();
    this._stats.domElement.style.position = 'absolute';
    this._stats.domElement.style.top = '84px';
    this._stats.domElement.style.left = '24px';
    this._stats.domElement.style.zIndex = 100;
    container.appendChild(this._stats.domElement);

    const ambient = new THREE.AmbientLight('#ffffff', 0.3);
    this._scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 1000;
    directionalLight.position.z = 1000;
    this._scene.add(directionalLight);

    const light = new THREE.SpotLight(0xefdfd5, 1.3);
    light.position.y = 100;
    light.castShadow = true;
    light.shadow.camera.near = 50;
    light.shadow.camera.far = 110;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this._scene.add(light);

    // FLOOR
    const floorMaterial = new THREE.MeshPhongMaterial({ color: '#222222', side: THREE.DoubleSide });
    const floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2;
    this._scene.add(floor);

    // SKYBOX/FOG
    const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBoxMaterial = new THREE.MeshPhongMaterial({ color: 0x9999ff, side: THREE.BackSide });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    // scene.add(skyBox);
    this._scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

    ////////////
    // CUSTOM //
    ////////////
    this._world = new CANNON.World();
    this._world.gravity.set(0, -9.82 * 20, 0);
    this._world.broadphase = new CANNON.NaiveBroadphase();
    this._world.solver.iterations = 16;

    DiceManager.setWorld(this._world);

    // Floor
    const floorBody = new CANNON.Body({ mass: 0, material: DiceManager.floorBodyMaterial });
    floorBody.addShape(new CANNON.Plane());
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this._world.addBody(floorBody);

    // Walls
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'];
    for (let i = 0; i < 5; i++) {
      const die = new DiceD6({ size: 1.5, backColor: colors[i] });
      this._scene.add(die.getObject());
      this._dice.push(die);
    }

    setInterval(() => this.randomDiceThrow(), 3000);
    this.randomDiceThrow();
    requestAnimationFrame(() => this.animate());
  }

  private randomDiceThrow() {
    const diceValues = [];

    for (let i = 0; i < this._dice.length; i++) {
      const yRand = Math.random() * 20;
      this._dice[i].getObject().position.x = -15 - (i % 3) * 1.5;
      this._dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
      this._dice[i].getObject().position.z = -15 + (i % 3) * 1.5;
      this._dice[i].getObject().quaternion.x = (Math.random() * 90 - 45) * Math.PI / 180;
      this._dice[i].getObject().quaternion.z = (Math.random() * 90 - 45) * Math.PI / 180;
      this._dice[i].updateBodyFromMesh();
      const rand = Math.random() * 5;
      this._dice[i].getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
      this._dice[i].getObject().body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);
      diceValues.push({ dice: this._dice[i], value: i + 1 });
    }
    DiceManager.prepareValues(diceValues);
  }

  private animate() {
    this.updatePhysics();
    this.render();
    this.update();
    requestAnimationFrame(() => this.animate());
  }

  private updatePhysics() {
    this._world.step(1.0 / 60.0);
    // tslint:disable-next-line:prefer-const
    for (let i in this._dice) {
      if (this._dice.hasOwnProperty(i)) {
        this._dice[i].updateMeshFromBody();
      }
    }
  }

  private update() {
    this._controls.update();
    this._stats.update();
  }

  private render() {
    this._renderer.render(this._scene, this._camera);
  }

}
