import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
const Math3D = loadable(() => import('math3d-component'))

export default Math3D = props => {
  const { dehydrated } = props
  const [component, setComponent] = useState(<div>loading...</div>)
  useEffect(() => {
    setComponent(<Math3D dehydrated={dehydrated}/>)
  }, [window])
  return component
}