// @flow
import React, { PureComponent } from 'react'
import { Switch } from 'antd'
import MathObjectUI from '../../../MathObjectUI'
import { MainRow, Cell, Label } from '../../../components'
import {
  MathInputLHS
} from '../../../containers/MathInput'
import { BOOLEAN_VARIABLE } from '../metadata'
import typeof { setProperty } from '../../../actions'

type Props = {
  id: string,
  setProperty: setProperty,
  value: boolean
}

export default class BooleanVariable extends PureComponent<Props> {

  onChange = (value: boolean) => {
    this.props.setProperty(this.props.id, BOOLEAN_VARIABLE, 'value', value)
  }

  render() {
    return (
      <MathObjectUI
        id={this.props.id}
        type={BOOLEAN_VARIABLE}
      >
        <MainRow>
          <Cell>
            <Label>
              Name:
            </Label>
            <MathInputLHS
              parentId={this.props.id}
            />
          </Cell>
          <Cell>
            <Label>
              Value:
            </Label>
            <Switch
              checkedChildren='On'
              unCheckedChildren='Off'
              checked={this.props.value}
              onChange={this.onChange}
            />
          </Cell>
        </MainRow>
      </MathObjectUI>
    )
  }

}
