import React, { Component } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
const Menus = () => <Menu fixed='top' inverted>
<Container>
  <Menu.Item as='a' header>
    <Image size='mini' src='/images/logosemantic.png' style={{ marginRight: '1.5em' }} />
    Sistem Informasi Hasil Belajar Siswa
  </Menu.Item>
</Container>
</Menu>
export default Menus;
