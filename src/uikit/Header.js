import React from "react";
import { Container, Dropdown, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { storeActions, getAllState } from "../store/Store.js";
import { USER_ROLE } from "../Constants";
import { getUserRole } from "../utils/arrayUtils";

const Menus = () => {
  const history = useHistory();
  const { userDetail, userAditionalInfo } = getAllState();
  const gotToRoute = (route) => history.push(route);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Menu
          onClick={() => {
            gotToRoute("/home");
            storeActions.setActiveItem("home");
          }}
        >
          <Menu.Item as="a" header>
            Sistem Informasi Hasil Belajar Siswa
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Dropdown text="Menu" pointing className="link item" scrolling>
            <Dropdown.Menu>
              {getUserRole(userDetail.roles, USER_ROLE.ROLE_STUDENT) && (
                <>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-info");
                      storeActions.setActiveItem("student-info");
                    }}
                  >
                    Info Siswa
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-schedule");
                      storeActions.setActiveItem("student-schedule");
                    }}
                  >
                    Jadwal Pelajaran
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-exam");
                      storeActions.setActiveItem("student-exam");
                    }}
                  >
                    Tugas Harian / Ulangan / PR
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-presence");
                      storeActions.setActiveItem("student-presence");
                    }}
                  >
                    Rekap Absesnsi
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-result");
                      storeActions.setActiveItem("student-result");
                    }}
                  >
                    Rekap Hasil Belajar
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(
                        `/user-update-password/${userAditionalInfo.id}/${USER_ROLE.ROLE_STUDENT}`
                      );
                      storeActions.setActiveItem("user-update-password");
                    }}
                  >
                    Ubah Password
                  </Dropdown.Item>
                </>
              )}
              {getUserRole(userDetail.roles, USER_ROLE.ROLE_PARENT) && (
                <>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-info");
                      storeActions.setActiveItem("student-info");
                    }}
                  >
                    Info Anak
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-schedule");
                      storeActions.setActiveItem("student-schedule");
                    }}
                  >
                    Jadwal Pelajaran Anak
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-exam");
                      storeActions.setActiveItem("student-exam");
                    }}
                  >
                    Tugas Harian / Ulangan / PR Anak
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-presence");
                      storeActions.setActiveItem("student-presence");
                    }}
                  >
                    Rekap Absesnsi Anak
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student-result");
                      storeActions.setActiveItem("student-result");
                    }}
                  >
                    Rekap Hasil Belajar Anak
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/parent-bill");
                      storeActions.setActiveItem("parent-bill");
                    }}
                  >
                    Riwayat Tagihan/Pembayaran SPP
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(
                        `/user-update-password/${userAditionalInfo.id}/${USER_ROLE.ROLE_PARENT}`
                      );
                      storeActions.setActiveItem("user-update-password");
                    }}
                  >
                    Ubah Password
                  </Dropdown.Item>
                </>
              )}
              {getUserRole(userDetail.roles, USER_ROLE.ROLE_TEACHER) && (
                <>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(
                        `/teacher-detail/${userAditionalInfo.details.id}`
                      );
                      storeActions.setActiveItem("student-info");
                    }}
                  >
                    Info Guru
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/teacher-schedule`);
                      storeActions.setActiveItem("teacher-schedule");
                    }}
                  >
                    Jadwal Mengajar
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/teacher-manage-exam`);
                      storeActions.setActiveItem("teacher-manage-exam");
                    }}
                  >
                    Kelola Tugas/Ulangan/PR
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/teacher-attedance-report`);
                      storeActions.setActiveItem("teacher-attedance-report");
                    }}
                  >
                    Rekap Absensi Siswa Kelas Anda
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/teacher-exam-report`);
                      storeActions.setActiveItem("teacher-exam-report");
                    }}
                  >
                    Rekap Nilai Siswa Kelas Anda
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(
                        `/user-update-password/${userAditionalInfo.id}/${USER_ROLE.ROLE_TEACHER}`
                      );
                      storeActions.setActiveItem("user-update-password");
                    }}
                  >
                    Ubah Password
                  </Dropdown.Item>
                </>
              )}
              {getUserRole(userDetail.roles, USER_ROLE.ROLE_ADMIN) && (
                <>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/class");
                      storeActions.setActiveItem("class");
                    }}
                  >
                    Kelas
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/student");
                      storeActions.setActiveItem("student");
                    }}
                  >
                    Siswa
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/teacher");
                      storeActions.setActiveItem("teacher");
                    }}
                  >
                    Guru
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/subject");
                      storeActions.setActiveItem("subject");
                    }}
                  >
                    Matapelajaran
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/exam-type");
                      storeActions.setActiveItem("exam-type");
                    }}
                  >
                    Jenis Exam
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/room");
                      storeActions.setActiveItem("room");
                    }}
                  >
                    Ruangan
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/timeSlot");
                      storeActions.setActiveItem("timeSlot");
                    }}
                  >
                    Slot Waktu
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/schedule");
                      storeActions.setActiveItem("schedule");
                    }}
                  >
                    Jadwal
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/studentAttendance");
                      storeActions.setActiveItem("studentAttendance");
                    }}
                  >
                    Absesnsi Siswa
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/school-info");
                      storeActions.setActiveItem("school-info");
                    }}
                  >
                    Info Sekolah
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute("/academic-year");
                      storeActions.setActiveItem("academic-year");
                    }}
                  >
                    Tahun Ajaran
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/user/${USER_ROLE.ROLE_ADMIN}`);
                      storeActions.setActiveItem("user");
                    }}
                  >
                    User Admin
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/user/${USER_ROLE.ROLE_STUDENT}`);
                      storeActions.setActiveItem("student-role");
                    }}
                  >
                    User Siswa
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/user/${USER_ROLE.ROLE_TEACHER}`);
                      storeActions.setActiveItem("teacher-role");
                    }}
                  >
                    User Guru
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      gotToRoute(`/user/${USER_ROLE.ROLE_PARENT}`);
                      storeActions.setActiveItem("parent-role");
                    }}
                  >
                    User Wali Murid
                  </Dropdown.Item>
                </>
              )}
              {/* <Dropdown.Item onClick={() => {
                gotToRoute('/');
                storeActions.setActiveItem("");
              }}>

              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                gotToRoute('/');
                storeActions.setActiveItem("");
              }}>

              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                gotToRoute('/');
                storeActions.setActiveItem("");
              }}>

              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                gotToRoute('/');
                storeActions.setActiveItem("");
              }}>

              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                gotToRoute('/');
                storeActions.setActiveItem("");
              }}>

              </Dropdown.Item> 
            */}
              <Dropdown.Item
                onClick={() => {
                  gotToRoute("/");
                  storeActions.setActiveItem("auth");
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default Menus;
