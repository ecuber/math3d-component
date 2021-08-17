// @flow
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import FlexContainer from 'components/FlexContainer';
import UserControls from './UserControls'
import Scene from './Scene'
import Examples from './Examples'
import Header from './Header'
import { loadGraphFromDb } from './actions'
import { loadDehydratedState } from 'store/actions';
import initialState from 'store/initialState';
import { connect } from 'react-redux'
import { setLastSavedState } from 'services/lastSavedState/actions';
import { Modal } from 'antd'

type OwnProps = {|
  dehydrated?: any,
  drawer?: boolean,
  dev?: boolean,
  width?: String,
  height?: String,
  fullscreen?: boolean,
  mathbox: any,
  domElement: any,
  style?: any,
  storeRef: any,
  save?: (dehydrated: any) => void
|}

type DispatchProps = {|
  // loadGraphFromDb: (id: string) => Function,
  loadGraphFromDb: (dehydrated: any) => Function,
  setLastSavedState: typeof setLastSavedState,
  loadDehydratedState: (dehydrated: {} ) => void
|}

type Props = {|
  ...DispatchProps,
  ...OwnProps
|}

function MainView(props: Props) {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  
  const { drawer, dev, fullscreen, dehydrated, save, storeRef, mathbox, domElement } = props
  const showButton = dev ?? false

  useLayoutEffect(() => {
    if (dehydrated) {
      // props.loadGraphFromDb(props.graphId)
      props.loadGraphFromDb(dehydrated)
    }
    props.setLastSavedState()
  } )

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [window] )

  const containerStyle = {
    overflow: 'hidden',
    flexDirection: 'column'
  }

  // console.log('mathbox - MainView/index.js', props.mathbox)
  // console.log('mathbox element - MainView/index.js',props.domElement)

  return <FlexContainer ref={containerRef} style={containerStyle}>
    {
      showButton &&
      <Header save={save} storeRef={storeRef} mathbox={mathbox} dehydrated={dehydrated} showButton={showButton} />
    }
    <FlexContainer>
      <UserControls domElement={domElement} mathbox={mathbox} fullscreen={fullscreen} dev={dev} drawer={drawer || dev} />
      <Scene
        mathboxElement={domElement}
        mathbox={mathbox}
        componentRef={containerRef}
        drawer={drawer}
        height={props.height}
        width={props.width}/>
      <Examples />
    </FlexContainer>
  </FlexContainer>
}

const mapDispatchToProps = {
  loadGraphFromDb,
  loadDehydratedState,
  setLastSavedState
}

export default connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(MainView)
