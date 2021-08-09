// @flow
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HEADER_HEIGHT_PX } from 'constants/index'
import ShareButton from './containers/ShareButton'
import HeaderButton from './components/HeaderButton'
import TitleInput from './containers/TitleInput'
import HelpButton from './components/HelpButton'
import ExamplesButton from './containers/ExamplesButton'
import HeaderMenu from './containers/HeaderMenu'
import { Menu } from 'antd'
const Item = Menu.Item

const HeaderContainer = styled.div`
  background-color: ${props => props.theme.gray[1]};
  height: ${ HEADER_HEIGHT_PX }px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1pt solid ${props => props.theme.gray[5]};
`

const HeaderGroup = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
`

const HStack = styled.div`
  display: flex;
  flex-direction: row;
`

const SavedAt = styled.p`
  padding: 0 10px;
`
type Props = {
  dehydrated: any,
  showButton: boolean,
  mathbox: any,
  storeRef: { current: any }
}

const Header = (props: Props) => {
  const { showButton, mathbox, dehydrated, storeRef } = props
  const { getState } = storeRef.current
  console.log(storeRef)
  console.log(getState)
  return (
    <HeaderContainer>
      <HeaderGroup>
        <HeaderButton type='brand'>Math3D</HeaderButton>
        <TitleInput />
      </HeaderGroup>
      <HeaderGroup>
        {/** TODO: update save button styles */}
        {
            props.showButton &&
            <ShareButton mathbox={mathbox} dehydrated={dehydrated} getState={getState}/>
            // <HStack>
            //   <SavedAt>
            //     {
            //       props.dehydrated.edited 
            //       ? `Last saved at ${props.dehydrated.edited}`
            //       : 'You have unsaved changes'
            //     }
            //   </SavedAt>
            //   <ShareButton dehydrated={props.dehydrated} getState={store.getState}/>
            // </HStack>
          }
        {/* <HeaderMenu>
          <Item><ExamplesButton /></Item>
        </HeaderMenu> */}
      </HeaderGroup>
    </HeaderContainer>
  )
}

Header.propTypes = {
  showButton: PropTypes.bool,
  dehydrated: PropTypes.object
}

export default Header
