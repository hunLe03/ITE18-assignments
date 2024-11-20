// John Napoleon Cortes   ITE18 - AD1

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap';
import * as dat from 'lil-gui'


//________________________________________________________________________
// Canvas
//________________________________________________________________________
const canvas = document.querySelector('canvas.webgl')

//________________________________________________________________________
// Scene
//________________________________________________________________________
const scene = new THREE.Scene();

//________________________________________________________________________
// Textures
//________________________________________________________________________
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/12.png')


//________________________________________________________________________
// Text
//________________________________________________________________________
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry('Go LiVE', {
            font: font,
            size: .5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });
        textGeometry.center();

        const text = new THREE.Mesh(textGeometry, texture);
        scene.add(text);
    }
)

//________________________________________________________________________
//Size
//________________________________________________________________________
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//________________________________________________________________________
// Renderrer
//________________________________________________________________________
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height)

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//________________________________________________________________________
// Camera
//________________________________________________________________________
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(1, 0, 15);


//________________________________________________________________________
// Orbit Controls
//________________________________________________________________________
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//________________________________________________________________________
// Object
//________________________________________________________________________

const texture = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

const geometry = new THREE.BoxGeometry(0.1, 1, 0.1);
for (let i = 0; i < 100; i++) {
    const lines = new THREE.Mesh(geometry, texture);
    lines.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    const scale = Math.random();
    lines.scale.set(scale, scale, scale);
    scene.add(lines);
}

for (let i = 0; i < 100; i++) {

    const points = [];
    points.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10));
    points.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10));

    const vector = new THREE.BufferGeometry().setFromPoints(points);
    const vectors = new THREE.Line(vector, texture);
    vectors.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    const scale = Math.random();
    vectors.scale.set(scale, scale, scale);
    scene.add(vectors);
}



const cube = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xd0d0d0, opacity: 1, transparent: true })

for (let i = 0; i < 100; i++) {
    const cubes = new THREE.Mesh(cube, material)
    cubes.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    cubes.rotation.x = Math.random() * Math.PI
    cubes.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    cubes.scale.set(scale, scale, scale)

    scene.add(cubes)
}

const cubes = new THREE.Mesh(cube, material)

//________________________________________________________________________
// Debug 
//________________________________________________________________________
const parameters = {
    color: 0xd0d0d0,
    textureIndex: 0,
    spin: () => {
        gsap.to(cubes.rotation, 1, { y: cubes.rotation.y + Math.PI * 2 })
    }
}

const gui = new dat.GUI()
gui.add(cubes, 'visible')
gui.add(material, 'wireframe')

window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        if (gui._hidden)
            gui.show()
        else
            gui.hide()
    }
})

gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    })
    .name('Cubes\' Color')

gui.add(material, 'opacity')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Cubes\' opacity')



const matcapTextures = [
    textureLoader.load('textures/matcaps/12.png'),
    textureLoader.load('textures/matcaps/1.png'),
    textureLoader.load('textures/matcaps/2.png'),
    textureLoader.load('textures/matcaps/3.png'),
    textureLoader.load('textures/matcaps/4.png'),
    textureLoader.load('textures/matcaps/5.png'),
    textureLoader.load('textures/matcaps/6.png'),
    textureLoader.load('textures/matcaps/7.png'),
    textureLoader.load('textures/matcaps/8.png'),
    textureLoader.load('textures/matcaps/9.png'),
    textureLoader.load('textures/matcaps/10.png'),
    textureLoader.load('textures/matcaps/11.png')
];

parameters.textureIndex = 0;

gui.add(parameters, 'textureIndex', 0, matcapTextures.length - 1, 1)
    .onChange(() => { texture.matcap = matcapTextures[parameters.textureIndex]; })
    .name("Texture");

gui.add(parameters, 'spin').name('Spin');


// gui.add(parameters, 'textureIndex', 0, matcapTextures.length - 1, 1) // Slider for selecting textures
//     .onChange(() => {
//         material.matcap = matcapTextures[Math.floor(parameters.textureIndex)];
//         material.needsUpdate = true; // Ensure the material updates with the new texture
//     })
//     .name("Texture");



//________________________________________________________________________
// Animation
//________________________________________________________________________
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()