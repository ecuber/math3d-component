import React, { useEffect, useRef, useState, createContext } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import newStore from 'store';
import { Provider } from 'react-redux'
import App from './App'
import { hasMeaningfulChangeOccured } from 'services/lastSavedState/index';
import MathScopeProvider from 'containers/MathScopeContext';
import { scopeEvaluator, parser } from 'constants/parsing';
import theme from 'constants/theme'
import randomstring from 'randomstring'

// global imports
import 'process'
import './index.css'
// import 'regenerator-runtime/runtime.js'

import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

const Math3D = (props) => {
  // useRef's instead of state to avoid unnecessary reload (https://dev.to/jz222/comment/ndbf)
  const mathboxRef = useRef(null)
  const store = useRef(newStore())
  
  // want to rerender component after mathbox has loaded (rest will render first)
  // ==> so we use useState hook
  const [mathbox, setMathbox] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // have to set mathbox after window is loaded and dependencies are available
    if (!loaded) {
      setMathbox(() => mathBox( {
        plugins: ['core', 'controls', 'cursor'],
        controls: {
          klass: THREE.OrbitControls
        },
        element: mathboxRef.current,
        camera: {
          up: new THREE.Vector3(0, 0, 1)
        }
      } ))
      setLoaded(true)
    }
   }, [window] )

  useEffect(() => {
     if (loaded) {
       const three = mathbox.three
       three.camera.position.set(1, 1, 2)
       three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0)
     }
   }, [loaded] )

  return (
    <div style={{
      height: '100%', // will be overwritten if given by props.style
      width: '100%',
      ...props.style
      
    }}>
      <div className='mathbox' ref={mathboxRef}></div>
      <Provider store={store.current}>
        <MathScopeProvider scopeEvaluator={scopeEvaluator} parser={parser}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              { 
              mathbox &&
                <App domElement={mathboxRef.current} mathbox={mathbox} {...props}/>
              }
            </BrowserRouter>
          </ThemeProvider>
        </MathScopeProvider>
      </Provider>
    </div>
  )
}

Math3D.propTypes = {
  dehydrated: PropTypes.object,
  drawer: PropTypes.bool,
  dev: PropTypes.bool,
  style: PropTypes.object,
  fullscreen: PropTypes.bool,
  elem: PropTypes.oneOfType( [
    PropTypes.func, 
    PropTypes.shape( { current: PropTypes.any } )
] )
}

export default Math3D
