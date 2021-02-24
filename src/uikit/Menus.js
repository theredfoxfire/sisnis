import React from 'react';
import {
  Grid,
  Menu,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";
import { storeActions, getAllState } from '../store/Store.js';
import { USER_ROLE } from '../Constants';
import { getUserRole } from '../utils/arrayUtils';
const Header = (props) => {
  let { activeItem, userDetail } = getAllState();
  return (<Grid.Column width={3}>
    <Menu fluid vertical tabular> {
      getUserRole(userDetail.roles, USER_ROLE.ROLE_ADMIN) && <>
        <Link to="/home" onClick={() => storeActions.setActiveItem("home")}>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
          />
        </Link>
        <Link to="/class" onClick={() => storeActions.setActiveItem("class")}>
          <Menu.Item
            name='kelas'
            active={activeItem === 'class'}
          />
        </Link>
        <Link to="/student" onClick={() => storeActions.setActiveItem("student")}>
          <Menu.Item
            name='siswa'
            active={activeItem === 'student'}
          />
        </Link>
        <Link to="/teacher" onClick={() => storeActions.setActiveItem("teacher")}>
          <Menu.Item
            name='guru'
            active={activeItem === 'teacher'}
          />
        </Link>
        <Link to="/subject" onClick={() => storeActions.setActiveItem("subject")}>
          <Menu.Item
            name='mata pelajaran'
            active={activeItem === 'subject'}
          />
        </Link>
        <Link to="/exam-type" onClick={() => storeActions.setActiveItem("exam-type")}>
          <Menu.Item
            name='Jenis Exam'
            active={activeItem === 'exam-type'}
          />
        </Link>
        <Link to="/room" onClick={() => storeActions.setActiveItem("room")}>
          <Menu.Item
            name='Ruangan'
            active={activeItem === 'room'}
          />
        </Link>
        <Link to="/timeSlot" onClick={() => storeActions.setActiveItem("timeSlot")}>
          <Menu.Item
            name='Slot Waktu'
            active={activeItem === 'timeSlot'}
          />
        </Link>
        <Link to="/schedule" onClick={() => storeActions.setActiveItem("schedule")}>
          <Menu.Item
            name='Jadwal Pelajaran'
            active={activeItem === 'schedule'}
          />
        </Link>
        <Link to="/studentAttendance" onClick={() => storeActions.setActiveItem("studentAttendance")}>
          <Menu.Item
            name='Absesnsi Siswa'
            active={activeItem === 'studentAttendance'}
          />
        </Link>
        <Link to="/school-info" onClick={() => storeActions.setActiveItem("school-info")}>
          <Menu.Item
            name='Info Sekolah'
            active={activeItem === 'school-info'}
          />
        </Link>
        <Link to="/academic-year" onClick={() => storeActions.setActiveItem("academic-year")}>
          <Menu.Item
            name='Tahun Ajaran'
            active={activeItem === 'academic-year'}
          />
        </Link>
        <Link to={`/user/${USER_ROLE.ROLE_ADMIN}`} onClick={() => storeActions.setActiveItem("user")}>
          <Menu.Item
            name='Users Admin'
            active={activeItem === 'user'}
          />
        </Link>
        <Link to={`/user/${USER_ROLE.ROLE_STUDENT}`} onClick={() => {
          storeActions.setActiveItem("student-role");
        }}>
          <Menu.Item
            name='Users Siswa'
            active={activeItem === 'student-role'}
          />
        </Link>

      </>
    }
      <Link to="/" >
        <Menu.Item
          name='logout'
          active={activeItem === 'auth'}
        />
      </Link>
    </Menu>
  </Grid.Column>)
};

export default Header;
