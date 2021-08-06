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
  style?: any
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
  
  const { drawer, dev, fullscreen, dehydrated } = props
  const showButton = dev ?? false

  // Dev mode modal state
  const [visible, setVisible] = useState(!fullscreen && dev)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Would you like to open the graph editor?')

  const handleOk = async () => {
    setModalText('Opening graph editor in a new tab...')
    setConfirmLoading(true)
    await fetch('dev/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( { dehydrated } )
    } )
    .then((res) => {
      if (res.ok) {
        setModalText('Graph editor opened in a new tab. Press the Launch Editor button again to reopen it.')
      }
    } )
  }

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
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      okText='Launch Editor'
      onCancel={() => setVisible(false)}
    >
      <p>{modalText}</p>
    </Modal>
    <Header mathbox={props.mathbox} dehydrated={dehydrated} showButton={showButton} />
    <FlexContainer>
      <UserControls domElement={props.domElement} mathbox={props.mathbox} fullscreen={fullscreen} dev={dev} drawer={drawer || dev} />
      <Scene
        mathboxElement={props.domElement}
        mathbox={props.mathbox}
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
