declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, WebGLRenderer, Vector3 } from 'three'

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
    target: Vector3
    update(): void
    dispose(): void
  }
}
