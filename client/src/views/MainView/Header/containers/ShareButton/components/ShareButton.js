// @flow
import React, { PureComponent } from 'react'
import { Button, Icon, Input } from 'antd'
import PopModal from 'components/PopModal';
import { saveGraph } from 'services/api';
import { dehydrate } from 'store/hydration';
import randomstring from 'randomstring'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import typeof { setProperty as SetProperty } from 'containers/MathObjects/actions';
import typeof { setCreationDate as SetCreationDate } from 'services/metadata/actions';
import getCameraData from 'services/getCameraData';
import { CAMERA } from 'containers/MathObjects';
import styled, { keyframes } from 'styled-components'

const SharePopoverContainer = styled.div`
  max-width: 300px;
  display: flex;
  align-items: center;
  flex-direction:column;
`

const HStack = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-content: center;
`

const IdLabel = styled.p`
  white-space: nowrap;
  flex-grow: 1;
  line-height: 100%;
  height: 100%
  margin: 0;
  margin-right: 0.5rem;
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
  visible: Boolean,
  setProperty: SetProperty,
  setCreationDate: SetCreationDate,
  dehydrated: any,
  mathbox: any,
  save?: (dehydrated: any) => void
}
type State = {
  id: ?string,
  isSaved: boolean
}

export default class ShareButton extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      id: this.props?.dehydrated?.metadata?.id ?? this.getId(),
      isSaved: false,
      showWarning: true
    }
  }

  dehydratedJson: ?string

  getId() {
    return randomstring.generate(8)
  }

  // Saves camera data in parent state
  saveCameraData = () => {
    const { position, lookAt } = getCameraData(this.props.mathbox)
    const id = 'camera'
    const type = CAMERA
    this.props.setProperty(id, type, 'relativePosition', position)
    this.props.setProperty(id, type, 'relativeLookAt', lookAt)
  }

  saveGraph = () => {
    this.saveCameraData()
    let state = this.props.getState() // loads scene state from parent (including newly updated camera stuff)
    const dehydrated = dehydrate(state)
    const withMetadata = {
      ...dehydrated,
      metadata: { id: this.state.id, ...dehydrated.metadata }
    }

    console.log('withMetadata', withMetadata)

    if (this.props.save) {
      this.props.save(withMetadata)
    }

    this.dehydratedJson = JSON.stringify(dehydrated)
  }

  onVisibleChange = (visible: boolean) => {
    if (!visible) {
    }
  }

  renderContent() {
    // const url = this.state.id && `${URL_FRONT}/${this.state.id}`
    console.log(this.props.save)
    console.log(this.props.save ? true : false)
    return (<>
        <SaveStatus isVisible={true}>
          {
            this.props.save
            ? <><strong>Graph saved.</strong> (scene ID: {this.state.id})</>
            : <><strong>You haven&apos;t set a save function.</strong> (scene ID: {this.state.id})</>
          }
        </SaveStatus>
        <CopyToClipboard text={this.dehydratedJson}>
          <Button type='danger'>Copy Dehydrated State (Dev Only)</Button>
        </CopyToClipboard>
      </>
    )
  }

  render() {
    return (
      <HStack>
        <IdLabel>Graph ID: {this.state.id}</IdLabel>
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
      </HStack>
    )
  }

}
