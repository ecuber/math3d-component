// @flow
import * as React from 'react'
import { timeout } from '../../utils/functions'
import LoopManager from 'services/LoopManager';

type Props = {
  mathbox: any,
  mathboxElement: any,
  children: React.Node
}

export class MathBox extends React.PureComponent<Props> {

  loopManager: LoopManager
  updateSymbol = Symbol('update marker')

  componentDidMount() {
    this.loopManager = new LoopManager(this.props.mathbox.three)
  }

  componentWillUnmount() {
    this.loopManager.unbindEventListeners()
  }

  // handles entering/exiting slow mode
  async componentDidUpdate() {
    const updateSymbol = Symbol('update marker')
    this.updateSymbol = updateSymbol
    this.loopManager.exitSlowMode()

    await timeout(100)
    if (this.updateSymbol === updateSymbol) {
      this.loopManager.enterSlowMode()
    }

  }

  render() {
    if (!this.props.children) {
      return null
    }
    console.log(this.props.mathbox)
    return React.Children.map(
      this.props.children,
      child => React.cloneElement(child, {
        mathboxParent: this.props.mathbox,
        mathbox: this.props.mathbox
      } )
    )
  }

}
