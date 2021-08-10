import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const MathBoxOuterDiv = styled.div`
  width: 100%;
  min-height: 100%;
  transform: translateX(${props => props.leftOffset});
  transition-duration: 0.7s;
  & ${props => !props.isAnimating && css`
    transition-duration: 0s;
  `}
`

/**
 * This is a wrapper around the MathBox div with a few props to influence
 * positioning.
 *
 * @type {PureComponent}
 */

const MathBoxContainer = (props) => {

  const [offset, setOffset] = useState(0)

  const containerRef = useRef(null)

  useEffect(() => {
    const { mathboxElement } = props
    mathboxElement.parentNode.removeChild(mathboxElement) // removes mathbox element from wherever it was before
    containerRef?.current?.appendChild(mathboxElement) // adds it to this container

    // const ratio = props.componentRef.current?.clientWidth / window.innerWidth
    
    window.addEventListener('resize', () => {
      setOffset(props.leftOffset - Math.abs(window.innerWidth - props.componentRef.current?.clientWidth) / 2)
    } )
    
    setOffset(props.leftOffset - Math.abs(window.innerWidth - props.componentRef.current?.clientWidth) / 2)
    
    // have to manually trigger resize event to force the other resize manager to vertically
    // scale the graph (didn't really feel like changing that part of the state myself)
    window.dispatchEvent(new Event('resize'))

    // cleanup on unmount
    return () => {
      window.removeEventListener('resize', () => {} )
    }
  }, [window] )

  // console.log('offset', props.leftOffset)

  // when the left offset changes, update the state
  useEffect(() => {
    setOffset(props.leftOffset - Math.abs(window.innerWidth - props.componentRef.current?.clientWidth) / 2)
  }, [props.leftOffset] )

  return (
    <MathBoxOuterDiv
      // offset is 0 if the div is 100%
      // leftOffset is width of the bar if it is open, 0 if it is not
      leftOffset={`${offset}px`}
      ref={containerRef}>
      {props.children}
    </MathBoxOuterDiv>
  )

}

MathBoxContainer.propTypes = {
  leftOffset: PropTypes.number,
  mathboxElement: PropTypes.instanceOf(Element),
  children: PropTypes.oneOfType( [
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ] ),
  width: PropTypes.string,
  height: PropTypes.string,
  componentRef: PropTypes.oneOfType( [
    PropTypes.func,
    PropTypes.shape( { current: PropTypes.instanceOf(Element) } )
  ] ),
  drawer: PropTypes.bool
}

export default MathBoxContainer
