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
  storeRef: { current: any },
  save?: (dehydrated: any) => void
}

const Header = (props: Props) => {
  const { showButton, mathbox, dehydrated, save, storeRef } = props
  const { getState } = storeRef.current
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
            <ShareButton save={save} mathbox={mathbox} dehydrated={dehydrated} getState={getState}/>
          }
        {/* <HeaderMenu>
          <Item><ExamplesButton /></Item>
        </HeaderMenu> */}
      </HeaderGroup>
    </HeaderContainer>
  )
}

export default Header
