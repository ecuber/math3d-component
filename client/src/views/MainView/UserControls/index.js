import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ControlsDrawer from './components/ControlsDrawer'
import ScreenSizeDrawerManager from 'containers/Drawer/ScreenSizeDrawerManager';

export default function UserControls(props) {
  return (
    <Fragment>
      <ControlsDrawer />
      <ScreenSizeDrawerManager dev={props.dev} drawer={props.drawer} id='main'/>
    </Fragment>
  )
}

UserControls.propTypes = {
  drawer: PropTypes.bool,
  dev: PropTypes.bool,
  fullscreen: PropTypes.bool
}
