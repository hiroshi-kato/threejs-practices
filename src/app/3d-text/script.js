import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const urlParams = new URLSearchParams(window.location.search)
const debugObject = {}
let gui;
if (urlParams.has('debug')) {
  debugObject.width = 400
  gui = new dat.GUI(debugObject)
}

// Canvas
const canvas = document.querySelector('canvas#webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Hello Three.js',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    )
    textGeometry.center()
    const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    const text = new THREE.Mesh(textGeometry, material)
    scene.add(text)

    // donutとtextの当たり判定
    const donutHitText = (donut) => {
      const donutBox = new THREE.Box3().setFromObject(donut)
      const textBox = new THREE.Box3().setFromObject(text)
      return donutBox.intersectsBox(textBox)
    }

    // donutの当たり判定がtrueになるまで再帰
    const donutRandomPosition = (donut) => {
      donut.position.x = (Math.random() - 0.5) * 10
      donut.position.y = (Math.random() - 0.5) * 10
      donut.position.z = (Math.random() - 0.5) * 10
      donut.rotation.x = Math.random() * Math.PI
      donut.rotation.y = Math.random() * Math.PI
      const scale = Math.random()
      donut.scale.set(scale, scale, scale)
      if (donutHitText(donut)) {
        return donutRandomPosition(donut)
      }
    }

    // ドーナツオブジェクトを100個追加
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    for (let i = 0; i < 100; i++) {
      const donut = new THREE.Mesh(donutGeometry, material)
      scene.add(donut)
      donutRandomPosition(donut)
    }
  }
)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
