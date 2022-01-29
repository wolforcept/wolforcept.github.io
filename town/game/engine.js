import * as THREE from '../build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

const S = 100, S2 = 50;
const cameraSpeed = 30;

let camera, scene, renderer, controls;
let pointer, raycaster;

let hoverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
let keypoll = {};

const objects = [];

init();
render();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 30000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x224488);
    scene.fog = new THREE.Fog(scene.background, camera.far - 10000, camera.far);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    // hover mesh
    const rollOverGeo = new THREE.BoxGeometry(S, S, S);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    hoverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(hoverMesh);

    // geos and mats
    cubeGeo = new THREE.BoxGeometry(S, S, S);
    // cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x227733, opacity: 1, transparent: true });
    // cubeMaterial2 = new THREE.MeshLambertMaterial({ color: 0x773300, opacity: 1, transparent: true });
    cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xfeb74c, map: new THREE.TextureLoader().load('textures/square-outline-textured.png') });
    cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 10,
        specular: 0x111111
    });


    //
    // LIGHTS

    // ambient
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    // sun/moon
    const dirLight = new THREE.DirectionalLight(0xaabbff, 0.6);
    dirLight.position.x = 300;
    dirLight.position.y = 250;
    dirLight.position.z = - 500;
    // dirLight.shadow.radius = 80;
    scene.add(dirLight);

    //
    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // progressiveSurfacemap = new ProgressiveLightMap(renderer, 64);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10000;
    controls.maxPolarAngle = Math.PI / 2 * .9;
    controls.minPolarAngle = 0;
    controls.mouseButtons = {
        // MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE,
    }
    console.log(controls)

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('keyup', onDocumentKeyUp);

    window.addEventListener('resize', onWindowResize);

    setTimeout(() => {
        const initialScale = 64;
        for (let dx = 0; dx < 10; dx++) {
            for (let dz = 0; dz < 10; dz++) {
                addVoxel(new THREE.Vector3(dx * initialScale * S, -initialScale * S2, dz * initialScale * S), initialScale)
            }
        }
    }, 1000)

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
}

function onPointerDown(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    if (event.button === 0)
        voxelClicked();
}

//
//

function updateHoverMesh() {

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(objects, false);
    if (intersects.length > 0) {
        const intersect = intersects[0];

        if (keypoll['Shift']) {
            hoverMesh.position.copy(intersect.point).sub(intersect.face.normal);
            hoverMesh.position.divideScalar(S).floor().multiplyScalar(S).addScalar(S2);
            hoverMesh.scale.set(1.1, 1.1, 1.1)
        } else {
            hoverMesh.position.copy(intersect.point).add(intersect.face.normal);
            hoverMesh.position.divideScalar(S).floor().multiplyScalar(S).addScalar(S2);
            hoverMesh.scale.set(1, 1, 1)
        }
    } else {
        hoverMesh.scale.set(0, 0, 0);
    }
}


function voxelClicked() {
    if (hoverMesh.scale.x > 0) {
        if (keypoll['Shift']) {
            removeVoxelAtHover();
        } else {
            addVoxel(hoverMesh.position, 1, null, null, keypoll['Control']);
        }
    }
}

function addVoxel(position, scale, pointColliderException, voxelColliderException, light) {


    const pos = position.clone().divideScalar(S).floor().multiplyScalar(S).addScalar(S2);
    const voxel = new THREE.Mesh(cubeGeo.clone(), cubeMaterial.clone());
    voxel.castShadow = scale <= 4;
    voxel.receiveShadow = true;
    voxel.position.copy(pos);
    if (scale > 1)
        voxel.scale.multiplyScalar(scale);
    else
        voxel.scale.multiplyScalar(1.01)
    // if (face)
    voxel.position.divideScalar(S).floor().multiplyScalar(S);

    if (pointColliderException) {
        const box1 = new THREE.Box3().setFromObject(voxel);
        const collides = (scale > 1)
            ? box1.containsPoint(pointColliderException)
            : box1.intersectsBox(new THREE.Box3().setFromObject(voxelColliderException));
        if (collides) {
            if (scale > 1) {
                const scale = voxel.scale.x;
                const pos = voxel.position.clone().addScalar(-S2 * scale / 2);
                addSubVoxels(pos, scale, pointColliderException, voxelColliderException)
            }
            return;
        }
    }
    if (scale < 2)
        voxel.position.addScalar(S2)

    if (light) {

        const color = new THREE.Color(1, .6, 0);
        const light = new THREE.PointLight(color, 1, 3000, .8);
        light.position.set(0, 0, 0);
        light.castShadow = true;
        // light.shadow.radius = 1;
        // light.shadow.mapSize.width = 4; // default is 512
        // light.shadow.mapSize.height = 4; // default is 512
        // light.distance = 500;

        voxel.castShadow = false;
        console.log(voxel)
        voxel.material.emissive = color;

        objects.push(voxel);
        voxel.add(light)
        scene.add(voxel);
    } else {
        scene.add(voxel);
        objects.push(voxel);
    }
}

function removeVoxelAtHover() {

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(objects, false);
    if (intersects.length > 0) {
        const voxel = intersects[0].object;
        const collisionPoint = intersects[0].point;
        const scale = voxel.scale.x
        const pos = voxel.position.clone().addScalar(-S2 * scale / 2)

        // console.log(progressiveSurfacemap)
        scene.remove(voxel);
        objects.splice(objects.indexOf(voxel), 1);

        // hoverMesh.scale.multiplyScalar(.0006);
        addSubVoxels(pos, scale, collisionPoint, hoverMesh);
    }
}

function addSubVoxels(pos, scale, pointColliderException, voxelColliderException) {
    if (scale > 1) {
        for (let dx = 0; dx < 2; dx++) {
            for (let dy = 0; dy < 2; dy++) {
                for (let dz = 0; dz < 2; dz++) {
                    const newPos = new THREE.Vector3(dx * scale * S2, dy * scale * S2, dz * scale * S2);
                    addVoxel(pos.clone().add(newPos), scale / 2, pointColliderException, voxelColliderException)
                }
            }
        }
    }
}

function onDocumentKeyDown(event) {
    keypoll[event.key] = true;
}

function onDocumentKeyUp(event) {
    console.log(event.key)
    keypoll[event.key] = false;
}

function animate() {
    updateHoverMesh();
    requestAnimationFrame(animate);
    render();
}

function moveCamera(invert, sideways, moveTarget = true) {
    const up = new THREE.Vector3(0, 1, 0);
    let movement = camera.position.clone().sub(controls.target);
    let d = movement.length();
    movement.cross(up);
    if (!sideways)
        movement.cross(up);
    if (invert)
        movement.multiplyScalar(-1);
    // movement.normalize().multiplyScalar(keypoll['Shift'] ? 15 : 5);
    movement.normalize().multiplyScalar(cameraSpeed * d / 1000);
    camera.position.add(movement);
    if (moveTarget)
        controls.target.add(movement);
    controls.update()
}

function render() {

    // console.log(controls)
    if (keypoll['a'] === true)
        moveCamera(false, true)
    if (keypoll['d'] === true)
        moveCamera(true, true)
    if (keypoll['w'] === true)
        moveCamera(false, false)
    if (keypoll['s'] === true)
        moveCamera(true, false)
    if (keypoll['q'] === true)
        moveCamera(false, true, false)
    if (keypoll['e'] === true)
        moveCamera(true, true, false)

    // progressiveSurfacemap.update(camera, 100, true);
    renderer.render(scene, camera);

}
