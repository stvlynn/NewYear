<template>
  <div id="globe-container" class="fixed top-0 left-0 w-full h-full -z-10" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ThreeGlobe from 'three-globe'
import { 
  WebGLRenderer, 
  Scene, 
  PerspectiveCamera, 
  AmbientLight, 
  DirectionalLight, 
  Color, 
  Fog, 
  PointLight,
  BackSide,
  ShaderMaterial,
  Mesh,
  AdditiveBlending,
  Vector3
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import countries from '../assets/globe-data/globe-data-min.json'
import places from '../assets/globe-data/places.json'

let renderer: WebGLRenderer
let camera: PerspectiveCamera
let scene: Scene
let controls: OrbitControls
let globe: any
let mouseX = 0
let mouseY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

// 生成随机弧线数据
const generateArcs = () => {
  const arcs = []
  const cityPlaces = places.places
  const numArcs = Math.floor(Math.random() * 3) + 1 // 每次生成1-3条弧线
  
  for (let i = 0; i < numArcs; i++) {
    const startIdx = Math.floor(Math.random() * cityPlaces.length)
    let endIdx = Math.floor(Math.random() * cityPlaces.length)
    while (endIdx === startIdx) {
      endIdx = Math.floor(Math.random() * cityPlaces.length)
    }
    
    arcs.push({
      startLat: cityPlaces[startIdx].lat,
      startLng: cityPlaces[startIdx].lng,
      endLat: cityPlaces[endIdx].lat,
      endLng: cityPlaces[endIdx].lng,
      color: Math.random() > 0.5 ? '#47EAE2' : '#7420FF'
    })
  }
  return arcs
}

// 自定义发光效果的着色器
const createGlowMaterial = () => {
  return new ShaderMaterial({
    uniforms: {
      'c': { value: 0.4 },
      'p': { value: 4.5 },
      glowColor: { value: new Color(0x3a228a) }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float c;
      uniform float p;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
        gl_FragColor = vec4(glowColor, intensity);
      }
    `,
    side: BackSide,
    blending: AdditiveBlending,
    transparent: true
  })
}

const init = () => {
  // Initialize renderer
  renderer = new WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  document.getElementById('globe-container')?.appendChild(renderer.domElement)

  // Initialize scene, light
  scene = new Scene()
  scene.add(new AmbientLight(0xbbbbbb, 0.3))
  scene.background = null

  // Initialize camera, light
  camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  const dLight = new DirectionalLight(0xffffff, 1.2)
  dLight.position.set(-800, 2000, 400)
  camera.add(dLight)

  const dLight1 = new DirectionalLight(0x7982f6, 1.5)
  dLight1.position.set(-200, 500, 200)
  camera.add(dLight1)

  const dLight2 = new PointLight(0x8566cc, 0.8)
  dLight2.position.set(-200, 500, 200)
  camera.add(dLight2)

  camera.position.z = 260
  camera.position.x = 0
  camera.position.y = 0

  scene.add(camera)

  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000)

  // Initialize controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dynamicDampingFactor = 0.01
  controls.enablePan = false
  controls.minDistance = 220
  controls.maxDistance = 350
  controls.rotateSpeed = 0.8
  controls.zoomSpeed = 1
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5

  controls.minPolarAngle = Math.PI / 3.5
  controls.maxPolarAngle = Math.PI - Math.PI / 3

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onMouseMove)
}

const initGlobe = () => {
  // Initialize the Globe
  globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.3)
    .hexPolygonColor(() => {
      return 'rgba(255,255,255, 0.9)'
    })

  // Add glow effect
  const globeMaterial = globe.globeMaterial()
  globeMaterial.color = new Color(0x3a228a)
  globeMaterial.emissive = new Color(0x220038)
  globeMaterial.emissiveIntensity = 0.15
  globeMaterial.shininess = 0.9

  // Add custom glow
  const glowGeometry = globe.globeMaterial().geometry
  const glowMesh = new Mesh(glowGeometry, createGlowMaterial())
  glowMesh.scale.multiplyScalar(1.2)
  globe.add(glowMesh)

  // Custom globe material
  const globeCustomMaterial = globe.globeMaterial()
  globeCustomMaterial.bumpScale = 12
  globeCustomMaterial.specular = new Color(0x666666)
  globeCustomMaterial.shininess = 7

  // 配置弧线动画
  globe
    .arcsData(generateArcs())
    .arcColor('color')
    .arcDashLength(0.6)
    .arcDashGap(2)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(1500)
    .arcsTransitionDuration(1000)
    .arcStroke(0.8)

  // 定期更新弧线
  setInterval(() => {
    globe.arcsData(generateArcs())
  }, 3000)

  globe.rotateY(-Math.PI * (5 / 9))
  globe.rotateZ(-Math.PI / 6)

  scene.add(globe)
}

const onMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  windowHalfX = window.innerWidth / 1.5
  windowHalfY = window.innerHeight / 1.5
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
  camera.position.x +=
    Math.abs(mouseX) <= windowHalfX / 2
      ? (mouseX / 2 - camera.position.x) * 0.005
      : 0
  camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005
  camera.lookAt(scene.position)
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

onMounted(() => {
  init()
  initGlobe()
  onWindowResize()
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  document.removeEventListener('mousemove', onMouseMove)
  scene.remove(globe)
  renderer.dispose()
})
</script>

<style scoped>
#globe-container {
  pointer-events: none;
}

#globe-container canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
