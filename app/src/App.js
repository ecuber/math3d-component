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
  flex: ${props => props.flex};
  overflow-x: hidden;
  /* margin: 2rem 0; */
`

const VStack = styled.div`
  display: flex;
  flex: ${props => props.flex};
  flex-direction: column;
  width: 100%;
  overflow-wrap: normal;
`

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
`

const Section = styled.section`
  width: 95vw;
  margin: auto;
`

const Header = styled.header`
  width: 95vw;
  margin: 1.5rem auto;
`

const graphStyles = { boxShadow: 'lightgray 0 0 30px 3px'}

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
  <Header>
    <h1><strong>Math3D Component Demo</strong></h1>
  </Header>

  <Section>
    <VStack>
      <HStack>
        <VStack flex='2'>
          <h2>Graph configured for production</h2>
          <ol style={{ paddingRight: '1rem' }}>
            <li><code>dehydrated</code>: set to a reference to the dehydrated scene object</li>
            <li><code>styles</code>: all handled by the parent component</li>
            <ul>
              <li>TODO: need to add <code>overflow-x: hidden</code> to the top level div in the component</li>
            </ul>
            <li>All other props omitted</li>
            
          </ol>
        </VStack>
        <GraphContainer style={graphStyles} flex='3'>
          <Math3D dehydrated={graphs.z6rPenvx} />
        </GraphContainer>
      </HStack>

      <HStack>
        <VStack flex='2'>
          <h2>Graph configured for development</h2>
          <ol style={{ paddingRight: '1rem' }}>
            <li><code>dehydrated</code>: set to a reference to the dehydrated scene object (in a JSON file)</li>
            <li><code>dev</code>: set to <code style={{color: 'purple'}}>true</code></li>
            <ul>
              <li>Left sidebar is open by default and the <code>Save Graph</code> button appears</li>
              <li>Pressing the button will call the <code>saveGraph</code> function defined in this file, making a request to the web server to update the local file</li>
              <ul>
                <li>Whatever function is passed as the <code>save</code> prop will be called and passed the latest version of <code>dehydrated</code> on click</li>
              </ul>
            </ul>
          </ol>
        </VStack>
        <GraphContainer style={graphStyles} flex='3'>
          <Math3D style={graphStyles} dehydrated={graphs.tZqhYXdi} save={saveGraph} dev/>
        </GraphContainer>
      </HStack>

      <HStack>
        <VStack flex='2'>
          <h2>Graph configured for development, but without a <code>save</code> prop</h2>
          <ol style={{ paddingRight: '1rem' }}>
            <li><code>dehydrated</code>: set to a reference to the dehydrated scene object (in a JSON file)</li>
            <li><code>dev</code>: set to <code style={{color: 'purple'}}>true</code></li>
            <ul>
              <li>Left sidebar is open by default and the <code>Save Graph</code> button appears</li>
              <li><strong>No prop was passed to the save graph function.</strong> The user gets the chance to copy the dehydrated state to their clipboard to manually save it before fixing their file.</li>
            </ul>
          </ol>
        </VStack>
        <GraphContainer style={graphStyles} flex='3'>
          <Math3D style={graphStyles} dehydrated={graphs.oimwJhet} dev/>
        </GraphContainer>
      </HStack>



    </VStack>

  </Section>
  </>
}

export default App
