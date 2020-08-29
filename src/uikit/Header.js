import React from 'react'
import {
  Container,
  Image,
  Menu,
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
