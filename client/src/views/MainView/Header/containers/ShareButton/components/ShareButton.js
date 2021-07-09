// @flow
import React, { PureComponent } from 'react'
import { Button, Icon, Input } from 'antd'
import PopModal from '../../../../../../components/PopModal'
import { saveGraph } from '../../../../../../services/api'
import { dehydrate } from '../../../../../../store/hydration'
import randomstring from 'randomstring'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import typeof { setProperty as SetProperty } from '../../../../../../containers/MathObjects/actions'
import typeof { setCreationDate as SetCreationDate } from '../../../../../../services/metadata/actions'
import getCameraData from '../../../../../../services/getCameraData'
import { CAMERA } from '../../../../../../containers/MathObjects'
import styled, { keyframes } from 'styled-components'

const SharePopoverContainer = styled.div`
  max-width: 300px;
  display: flex;
  align-items: center;
  flex-direction:column;
`

const CopyContainer = styled.div`
  display: flex;
  align-items: center;
`

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`
const SaveStatus = styled.div`
  font-size: 100%;
  width: 100%;
  margin: 5px;
  color: ${props => props.theme.primary[4]};
  font-weight: strong;
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  animation: ${props => props.isVisible ? fadeIn : ''} 100ms linear;
`

const copyButtonStyle = { margin: '10px' }

type Props = {
  onClick: () => void,
  // We need access to state, but no need to rerender on ever state change.
  // So pass getState instead.
  getState: () => {},
  setProperty: SetProperty,
  setCreationDate: SetCreationDate
}
type State = {
  id: ?string,
  isSaved: boolean
}

export default class ShareButton extends PureComponent<Props, State> {

  state = {
    id: null,
    isSaved: false
  }

  dehydratedJson: ?string

  getId() {
    return randomstring.generate(8)
  }

  // Saves camera data in parent state
  saveCameraData = () => {
    const { position, lookAt } = getCameraData()
    const id = 'camera'
    const type = CAMERA
    this.props.setProperty(id, type, 'relativePosition', position)
    this.props.setProperty(id, type, 'relativeLookAt', lookAt)
  }

  saveGraph = () => {
    this.saveCameraData()
    const state = this.props.getState() // loads scene state from parent (including newly updated camera stuff)
    const dehydrated = dehydrate(state)
    const lastUpdated = new Date()
    const id = this.state.id || this.getId()
    const body = { id, dehydrated, lastUpdated }

    fetch('dev/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    } )

    this.dehydratedJson = JSON.stringify(dehydrated)
    this.setState( { id } )
    // post to localhost webserver??
  }

  onVisibleChange = (visible: boolean) => {
    if (!visible) {
    }
  }

  renderContent() {
    // const url = this.state.id && `${URL_FRONT}/${this.state.id}`
    return (<>
        <SaveStatus isVisible={true}>
          <strong>Graph saved.</strong> (scene ID: {this.state.id})
        </SaveStatus>
        {
          process.env.NODE_ENV === 'development' && (
            <CopyToClipboard text={this.dehydratedJson}>
              <Button type='danger'>Copy Dehydrated State (Dev Only)</Button>
            </CopyToClipboard>
          )
        }
      </>
    )
  }

  render() {
    return (
      <PopModal
        // TODO: add "last saved at hh:mm indicator?"
        onVisibleChange={this.onVisibleChange}
        source={
          <Button
            style={{ padding:'6px 6px 6px 8px', width:'100%', height:'100%' }}
            onPointerDown={this.saveCameraData}
            onClick={this.saveGraph}
          >
            <Icon type='save' style={ { paddingRight: '4px'  } } />
            Save Graph
          </Button>
        }
      >
        {this.renderContent()}
      </PopModal>
    )
  }

}
