// @flow
export default function(mathbox: { three: any } ) {
  const position: Array<number> = mathbox.three.camera.position.toArray()
  const lookAt: Array<number> = mathbox.three.controls.center.toArray()
  return { position, lookAt }
}
