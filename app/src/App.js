import React from 'react'
import Math3D from 'math3d-component'
// import Math3D from './client/index'
import graphs from './myGraphs.json'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 70%;
  margin: 2rem 0;
`
const graphStyles = { width: 744, boxShadow: 'lightgray 0 0 30px 2px'}

function App() {
  return<>
  <h1>hello world this is a header</h1>
  <p>this is a paragraph</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultricies, sapien eu feugiat ullamcorper, enim nunc posuere ligula, nec maximus risus nulla nec orci. Nullam sem massa, congue sed ultricies eget, ultrices eget nunc. Aenean nec eros bibendum nisl fermentum tempor quis eu tortor. Nulla et nisl enim. Nullam dui tellus, auctor eget feugiat sed, volutpat eu ipsum. Donec lacinia, odio vitae mattis vestibulum, ex purus pellentesque ipsum, mollis sagittis velit arcu ullamcorper augue. In hac habitasse platea dictumst. Phasellus faucibus efficitur magna nec cursus. In aliquam mauris ac quam feugiat, sed dignissim nunc lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin sed massa et turpis tempus rhoncus. In ac mauris diam.</p>
  <Container>
    <Math3D style={graphStyles} dehydrated={graphs.z6rPenvx} drawer={false}/>
  </Container>
  <p>
Pellentesque nisi odio, consequat eu dapibus eget, fermentum at dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque dolor lectus, eleifend imperdiet velit sodales, posuere euismod ligula. Curabitur varius, nibh sollicitudin dictum commodo, libero massa interdum arcu, et fermentum libero libero sed elit. Fusce non nisl libero. Mauris felis felis, viverra a consectetur at, hendrerit sit amet erat. Vestibulum non lacus lorem. Nunc vehicula turpis et accumsan venenatis. Vivamus vel augue non eros pellentesque vulputate non scelerisque augue. Cras tincidunt justo tincidunt ex vestibulum, id commodo augue tincidunt. Aenean pulvinar vulputate libero, ac rhoncus tellus tincidunt vitae. Proin porttitor tellus nisi, vitae suscipit erat iaculis sed. Morbi bibendum, est eget dapibus consectetur, lacus sapien condimentum lorem, vitae tempor risus nulla sit amet augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi bibendum, venenatis mauris sit amet, sodales lectus.

Aenean sagittis sem eu nulla malesuada, sed condimentum felis pulvinar. Morbi a augue non ex venenatis dapibus vel nec nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam vel nibh libero. Morbi et massa eget enim viverra suscipit. Integer egestas porta faucibus. Proin vehicula, tortor eu convallis sollicitudin, turpis nibh luctus ligula, at scelerisque odio sapien hendrerit lacus. Sed ut fermentum turpis. Cras sit amet nisi magna. Duis pretium ante quis ornare tempus. Etiam ac tincidunt arcu. Mauris nec ligula enim. Cras consequat nisi id elementum efficitur. Fusce volutpat dapibus vulputate.
</p>
  <Container>
    <Math3D style={graphStyles} drawer={false}/>
  </Container>
  </>
}

export default App
