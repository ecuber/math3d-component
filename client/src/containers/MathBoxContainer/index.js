import { connect } from 'react-redux'
import MathBoxContainer from './components/MathBoxContainer'

function getLeftAnimationStatus(state) {
  return state.drawers.main.isAnimating
}

function getLeftOffset(state, ownProps) {
  const width = 400
  const { isVisible } = state.drawers.main
  return isVisible || ownProps.drawer ? -width / 2 : 0
}

const mapStateToProps = (state, ownProps) => ( {
  leftOffset: getLeftOffset(state, ownProps),
  isAnimating: getLeftAnimationStatus(state)
} )

export default connect(mapStateToProps)(MathBoxContainer)
