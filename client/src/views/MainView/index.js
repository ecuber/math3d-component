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

type OwnProps = {|
  dehydrated?: any,
  drawer?: boolean,
  dev?: boolean,
  width?: String,
  height?: String,
  fullscreen?: boolean
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
  
  useLayoutEffect(() => {
    if (props.dehydrated) {
      // props.loadGraphFromDb(props.graphId)
      props.loadGraphFromDb(props.dehydrated)
    }
    props.setLastSavedState()
  } )

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [window] )

  const showButton = (props.drawer || props.dev) ?? false

  return <FlexContainer ref={containerRef} style={ { overflow: 'hidden', flexDirection: 'column' } }>
    <Header dehydrated={props.dehydrated} showButton={showButton} />
    <FlexContainer>
      <UserControls fullscreen={props.fullscreen} dev={props.dev} drawer={props.drawer} />
      <Scene
        componentRef={containerRef}
        drawer={props.drawer}
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
