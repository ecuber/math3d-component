import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MathObjectUI from '../../../MathObjectUI'
import { MainRow } from '../../../components'
import {
  MathInputLHS,
  MathInputRHS,
  StaticMathStyled
} from '../../../containers/MathInput'
import { VARIABLE } from '../metadata'

export default class Variable extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {
    return (
      <MathObjectUI
        id={this.props.id}
        type={VARIABLE}
      >
        <MainRow>
          <MathInputLHS
            parentId={this.props.id}
          />
          <StaticMathStyled
            latex='='
          />
          <MathInputRHS
            field='value'
            parentId={this.props.id}
          />
        </MainRow>
      </MathObjectUI>
    )
  }

}
