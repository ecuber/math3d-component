// @flow
import React from 'react'
import { connect } from 'react-redux'
import withSizes from 'react-sizes'
import { closeDrawer, openDrawer, setWidth } from './actions'
import { DEFAULT_WIDTH } from './reducer'
import { MOBILE_BREAKPOINT } from '../../constants/theme'

type DispatchProps = {|
  openDrawer: string => void,
  closeDrawer: string => void,
  setWidth: (id: string, width: string) => void,
|}
type OwnProps = {|
  isSmall: boolean,
  drawer: boolean,
  id: string
|}
type Props = {|
  ...DispatchProps,
  ...OwnProps
|}

class ScreenSizeDrawerManager extends React.PureComponent<Props> {

  resize() {
    const { id, isSmall, closeDrawer, openDrawer, setWidth, drawer } = this.props
    if (isSmall || !drawer) {
      closeDrawer(id)
      if (isSmall) {
        setWidth(id, '290px')
      }
    }
    else {
      if (this.props.drawer) { // CUSTOM_FUNCTIONALITY
        openDrawer(id)
        setWidth(id, DEFAULT_WIDTH)
      }
    }
  }

  componentDidUpdate() {
    this.resize()
  }

  componentDidMount() {
    this.resize()
  }

  render() {
    return null
  }

}

const mapSizesToProps = ( { width } ) => ( { isSmall: width < MOBILE_BREAKPOINT } )
const mapDispatchToProps = { openDrawer, closeDrawer, setWidth }

export default connect<Props, OwnProps, _, _, _, _>(null, mapDispatchToProps)(
  withSizes(mapSizesToProps)(ScreenSizeDrawerManager)
)
