import Layout from "../../../components/layout";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import {server} from "../../../utils";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import {useState, useEffect, useContext} from "react";
import {User} from "../../../components/contexts";
import Users from "../../../components/blocks/sections/users";
import LegalDocument from "../../../components/blocks/sections/legalDocument";
import Frecuent from "../../../components/blocks/sections/frecuent";
import Plans_subscriptions from "../../../components/blocks/sections/plans&subscriptions";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuIcon from "@material-ui/icons/Menu";
const Container = styled.div`
  margin: 0;

  .col-3,
  .col-9 {
    padding: 0;
  }
  .content {
    width: 80vw;
    @media (max-width: 968px) {
      width: 100vw;
    }
  }
  .sidebar {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 20vw;
    margin: 0;
    background: #edf2f7;
    padding-left: 3rem;
    padding-top: 25rem;
    .close {
      position: absolute;
      top: 1.5rem;
      right: 1rem;
      svg {
        font-size: 40px;
      }
    }
    @media (max-width: 968px) {
      width: 40vw;
      left: ${(props) => (props.active ? "0vw" : "-40vw")};
      transition: 1s all;
      z-index: 1000;
    }
    p {
      font-size: 14px;
      margin-bottom: 3rem;
      line-height: 21px;
      color: #2c5282;
      font-weight: 400;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
      svg {
        color: red;
        font-size: 35px;
        margin-right: 1rem;
        margin-bottom: 0.7rem;
        color: #2c5282;
      }
    }
    .active {
      font-weight: 800;
    }
  }
`;

const Header = styled.div`
  background: #2d3748;
  height: 10vh;
  color: white;
  margin: 0;
  position: relative;
  z-index: 1000;
  .title {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    text-align: center;
    margin: 0;
  }
  .logout {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn {
      border-radius: 1px;
      height: 60%;
      font-size: 11px;
      font-weight: 400;
      background: white;
      margin-right: 5rem;
    }
  }
`;

const Admin = (props) => {
  const {setLogOut} = useContext(User.UserContext);
  const [section, setSection] = useState(1);
  const [legalData, setLegalData] = useState(null);
  const [pricesData, setPricesData] = useState(null);
  const [frecuent, setFrecuent] = useState(null);
  const [contact, setContact] = useState(null);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(false);
  const [userId, setUserId] = useState(null);
  const onClickSection = (selected) => {
    setSection(selected);
  };

  useEffect(() => {
    const petitions = async () => {
      const {ok, data} = await server.getAsync("/admin/cms");
      setContact(data.contact);
      setFrecuent(data.faq);
      setPricesData(data.prices);
      setLegalData(data.documents);

      const {data: users} = await server.getAsync("/admin/users/");
      setUsers(users);
    };
    petitions();
  }, []);

  return (
    <>
      <Head>
        <title>Hifive | Panel de Administracion</title>
      </Head>

      <Header className="row">
        <div className="col-3 title">
          {" "}
          <button
            className="d-lg-none btn"
            onClick={() => {
              setActive(true);
            }}
          >
            <MenuIcon
              style={{color: "white", fontSize: "30px", marginRight: "1rem"}}
            />
          </button>{" "}
          HFMA
        </div>
        <div className="col-6 offset-3 logout">
          <button onClick={setLogOut} className="btn">
            Cerrar sesion
          </button>
        </div>
      </Header>
      <Container active={active} className="row">
        <div className="col-3 ">
          <div className="sidebar">
            <div
              onClick={() => {
                setActive(false);
              }}
              className=" d-lg-none close"
            >
              <HighlightOffIcon />
            </div>
            <p
              className={`${section === 1 && "active"}`}
              onClick={() => {
                setActive(false);
                onClickSection(1);
              }}
            >
              {" "}
              <PeopleOutlineOutlinedIcon />
              Users({users.length})
            </p>
            <p
              className={`${section === 2 && "active"}`}
              onClick={() => {
                setActive(false);
                onClickSection(2);
              }}
            >
              {" "}
              <ImportContactsIcon /> Legal Documents
            </p>
            <p
              className={`${section === 3 && "active"}`}
              onClick={() => {
                setActive(false);
                onClickSection(3);
              }}
            >
              {" "}
              <ImportContactsIcon /> Frecuent A&Q
            </p>
            <p
              className={`${section === 4 && "active"}`}
              onClick={() => {
                setActive(false);
                onClickSection(4);
              }}
            >
              {" "}
              <ImportContactsIcon /> Plans & Subscriptions
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-9 content">
          {section === 1 && <Users />}
          {section === 2 && legalData && <LegalDocument data={legalData} />}
          {section === 3 && frecuent && (
            <Frecuent contact={contact} data={frecuent} />
          )}
          {section === 4 && pricesData && (
            <Plans_subscriptions data={pricesData} />
          )}
        </div>
      </Container>
    </>
  );
};

export default Admin;
