import { BOOLEAN_VARIABLE, defaultSettings } from './metadata'
import { connect } from 'react-redux'
import { MathSymbol } from '../../MathObject'
import { setProperty } from '../../actions'
import BooleanVariable from './components/BooleanVariable'

const mapStateToProps = ( { mathSymbols }, ownProps) => ( {
  value: mathSymbols[ownProps.id].value
} )

const mapDispatchToProps = {
  setProperty
}

export default new MathSymbol( {
  type: BOOLEAN_VARIABLE,
  defaultSettings: defaultSettings,
  uiComponent: connect(mapStateToProps, mapDispatchToProps)(BooleanVariable)
} )

export { BOOLEAN_VARIABLE }
