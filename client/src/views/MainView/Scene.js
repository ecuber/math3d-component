//@flow
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MathBoxContainer from 'containers/MathBoxContainer';
import MathBoxScene from 'containers/MathBoxScene';
import styled from 'styled-components'

const SceneBoundary = styled.div`
  display:flex;
  height:100%;
  width:100%;
  overflow: hidden;
  flex: 1;
`

type Props = {
  height?: String,
  width?: String,
  containerWidth?: { current: any },
  drawer: boolean,
  mathbox: any,
  mathboxElement: any
}

export default class Math3dScene extends PureComponent<Props> {

  render() {
    console.log('mathbox - Scene.js', this.props.mathbox)
    console.log('mathbox element - Scene.js',this.props.mathboxElement)
    return (
      <SceneBoundary>
        <MathBoxContainer {...this.props}>
          <MathBoxScene {...this.props}/>
        </MathBoxContainer>
      </SceneBoundary>
    )
  }

}
