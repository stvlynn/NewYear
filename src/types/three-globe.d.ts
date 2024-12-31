declare module 'three-globe' {
  import { Object3D } from 'three'

  export default class ThreeGlobe extends Object3D {
    constructor(options?: any)
    
    hexPolygonsData(data: any[]): this
    hexPolygonResolution(resolution: number): this
    hexPolygonMargin(margin: number): this
    showAtmosphere(show: boolean): this
    atmosphereColor(color: string): this
    atmosphereAltitude(altitude: number): this
    hexPolygonColor(callback: (e: any) => string): this
    globeMaterial(): any
    arcsData(data: any[]): this
    arcColor(accessor: string): this
    arcDashLength(length: number): this
    arcDashGap(gap: number): this
    arcDashInitialGap(callback: () => number): this
    arcDashAnimateTime(time: number): this
    arcsTransitionDuration(duration: number): this
    arcStroke(stroke: number): this
  }
}
