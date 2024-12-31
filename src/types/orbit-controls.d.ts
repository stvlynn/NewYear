declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, WebGLRenderer } from 'three'

  export class OrbitControls {
    constructor(camera: Camera, domElement?: HTMLElement)
    
    enableDamping: boolean
    dampingFactor: number
    enablePan: boolean
    minDistance: number
    maxDistance: number
    rotateSpeed: number
    zoomSpeed: number
    autoRotate: boolean
    autoRotateSpeed: number
    minPolarAngle: number
    maxPolarAngle: number
    update(): void
    dispose(): void
  }
}
