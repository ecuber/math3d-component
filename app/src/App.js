import React from 'react'
import Math3D from 'math3d-component'
// import Math3D from './client/index'
import graphs from './myGraphs.json'
import styled from 'styled-components'

// Styled Components
const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* margin: 2rem 0; */
`

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
`

const graphStyles = { width: 744, boxShadow: 'lightgray 0 0 30px 2px'}

// Sends a POST request to the development server to save the graph.
const saveGraph = (dehydrated) => {
  fetch('dev/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dehydrated })
  } )
  .then((res) => {
    if (res.ok) {
      console.log('successfully saved graph!')
    }
  } )
}

function App() {
  return <>
  <header>
    <h1>Math3D Component Demo</h1>
  </header>

  <section>
    <VStack>
      <HStack>
        <h2>Graph configured for production</h2>
        <GraphContainer>
          <Math3D style={graphStyles} dehydrated={graphs.z6rPenvx} />
        </GraphContainer>
      </HStack>

      <HStack>
        <h2>Graph configured for development</h2>
        <GraphContainer>
          <Math3D style={graphStyles} dehydrated={graphs.tZqhYXdi} save={saveGraph} dev/>
        </GraphContainer>
      </HStack>



    </VStack>

  </section>
  </>
}

export default App
