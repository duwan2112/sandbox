import React from "react";

import Head from "next/head";
import styled from "styled-components";
import {useState, useEffect, useContext} from "react";
import {Alert} from "../../contexts";
import Layout from "../../layout";
import {server} from "../../../utils";
import {Table, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import EditIcon from "@material-ui/icons/Edit";
import Dash from "../../Dashboard";
const Container = styled.div`
  padding-top: 4rem;
  height: 90vh;
  margin: 0;
  position: relative;
  left: 0;
  margin-right: 4rem;

  .scroll-table {
    height: 70vh;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
      width: 10px;
    }

    &::-webkit-scrollbar-button:increment,
    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar:horizontal {
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #797979;
      border-radius: 20px;
      border: 2px solid #f1f2f3;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  input,
  select,
  .container-csv {
    border-radius: 3px;
    background: #eeeeee;
    width: 100%;
    border: none;
    color: black;
    &:focus {
      background: #eeeeee;
      outline: none;
      border: none;
    }
    &::placeholder {
      color: black;
    }
  }

  .table-users {
    font-size: 17px;
    margin-top: 10rem;

    thead {
      color: rgba(0, 0, 0, 0.5);
      th {
        border: none;
        font-weight: 400;
        padding: 1rem 1rem;
        font-size: 15px;
      }
    }
    tbody {
      position: relative;
      th {
        font-weight: 400 !important;
        color: black;
        padding: 1rem 1rem;
        font-size: 14px;
      }
    }
    .arrow-icon {
      font-size: 4rem;
      margin-left: 2rem;
      cursor: pointer;
      transition: 0.5s all;
    }
    .active {
      transform: rotate(-180deg);
      transition: 0.5s all;
    }
  }
  select {
    height: 50px;
    margin-left: 2rem;
    font-size: 16px;
    padding-left: 1rem;
  }
  .container-csv {
    position: absolute;
    right: 0;
    @media (max-width: 768px) {
      margin-top: 15rem;
    }
  }
  .container-button {
    border: none;
    width: 100%;
    font-size: 18px;
    height: 50px;
    &:focus {
      outline: none;
    }
  }

  .modal-container {
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }
  .modal-delete {
    border-radius: 3px;
    width: 450px;
    text-align: center;

    background: #eeeeee;
    font-size: 17px;
    padding: 4rem;
    margin-top: 3rem;
    .btn-modal {
      border: none;
      background: white;
      padding: 1rem;
      &:focus {
        outline: none;
      }
    }
  }
`;

// Style for campaign  item

const StyledCampaignItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  &:not(:last-child) {
    margin-top: 3rem;
  }
`;

const Name = styled.h1`
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 4px;
`;

const Text = styled.p`
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;

  p {
    &:not(:last-child) {
      margin-right: 6px;
      border-right: 1px solid var(--color-black);
      padding-right: 6px;
    }
  }
`;

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

const getInfo = (user) => {
  if (user.payments.length <= 0) {
    return null;
  }

  const lastAmountPayed = user.payments[user.payments.length - 1].price;
  const months = user.payments.length;
  let totalAmount = 0;

  user.payments.forEach((payment) => {
    totalAmount += payment.price;
  });

  return {lastAmountPayed, months, totalAmount: Math.round(totalAmount)};
};

/**
 * Session Item
 */

export default function Users() {
  const {setToast} = useContext(Alert.AlertContext);

  const [filter, setFilter] = useState(0);
  const [filteredArray, setFilteredArray] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usersFilter, setUsersFilter] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [select, setSelect] = useState({
    option: "",
    filter: "",
  });

  const handleDelete = async (id) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const {ok, data: msg} = await server.deleteAsync(
      `/admin/users/${deleteUser.id}`
    );

    if (ok) {
      const {ok, data: users} = await server.getAsync("/admin/users/");
      setFilteredArray(users);
      setToast(msg, "success").then(() => {
        setDeleteUser(null);
      });
    } else {
      setToast(msg);
    }

    setLoading(false);
  };

  const onChangeSelect = (e) => {
    setSelect({...select, select: e.target.value, filter: ""});

    if (filter === 0) {
      setUsersFilter([...usersFilter]);
    } else {
      setUsersFilter([...usersFilter.reverse()]);
      setFilter(0);
    }
  };

  const onChangeFilter = (e) => {
    if (e.target.value === "") {
      setSelect({...select, filter: ""});

      return setUsersFilter([...filteredArray]);
    }
    if (filter === 0) {
      setUsersFilter([...usersFilter]);
    } else {
      setUsersFilter([...usersFilter.reverse()]);
      setFilter(0);
    }

    setSelect({...select, filter: e.target.value});
    let filtered = [];

    switch (select.select) {
      case "userid":
        filtered = filteredArray.filter((element, i) => {
          if (element.filterId == e.target.value) {
            return element;
          }
        });

        break;
      case "date_sign":
        filtered = filteredArray.filter((element, i) => {
          if (element.user.createdAt.includes(e.target.value)) {
            return element;
          }
        });
        break;
      case "email":
        filtered = filteredArray.filter((element, i) => {
          if (element.user.email.includes(e.target.value)) {
            return element;
          }
        });
        break;
      case "bufete":
        filtered = filteredArray.filter((element, i) => {
          if (element.website.isCompleted) {
            if (element.website.basic.bufeteName.includes(e.target.value)) {
              return element;
            }
          }
        });
        break;
      case "web":
        filtered = filteredArray.filter((element, i) => {
          if (element.website.isCompleted) {
            if (element.website.basic.url.includes(e.target.value)) {
              return element;
            }
          }
        });
        break;
      case "status":
        if (e.target.value === "subscrito") {
          filtered = filteredArray.filter((element, i) => {
            if (element.user.sub !== null) {
              return element;
            }
          });
        } else if (e.target.value === "no subscrito") {
          filtered = filteredArray.filter((element, i) => {
            if (element.user.sub === null) {
              return element;
            }
          });
        }

        break;
      case "type":
        filtered = filteredArray.filter((element, i) => {
          if (element.user.sub !== null) {
            if (element.user.sub.includes(e.target.value)) {
              return element;
            }
          }
        });
        break;
      case "date_sub":
        filtered = filteredArray.filter((element, i) => {
          if (element.user.sub !== null) {
            if (element.user.subDate.includes(e.target.value)) {
              return element;
            }
          }
        });
        break;
      case "date_unsub":
        filtered = filteredArray.filter((element, i) => {
          if (element.user.sub === null && element.user.subDate) {
            if (element.user.subDate.includes(e.target.value)) {
              return element;
            }
          }
        });

        break;
      default:
        console.log("default");
        break;
    }
    if (filtered.length === 0) return setUsersFilter(filteredArray);

    setUsersFilter([...filtered]);
  };

  useEffect(() => {
    const petitions = async () => {
      const {ok, data} = await server.getAsync("/admin/users/");
      data.map((element, i) => {
        element.filterId = i;
      });
      setFilteredArray(data);
      setUsersFilter(data.reverse());
    };
    petitions();
  }, []);

  const filterIcon = (type) => {
    const arrayNew = [...filteredArray];

    if (
      (filter === 2 && type === 2) ||
      (filter === 3 && type === 3) ||
      (filter === 4 && type === 4) ||
      (filter === 5 && type === 5) ||
      (filter === 6 && type === 6) ||
      (filter === 7 && type === 7) ||
      (filter === 8 && type === 8)
    ) {
      setUsersFilter([...filteredArray]);
      return setFilter(0);
    } else if (type === filter) {
      setUsersFilter([...usersFilter.reverse()]);
      return setFilter(0);
    }
    setFilter(type);

    switch (type) {
      case 1:
        setUsersFilter([...usersFilter.reverse()]);
        break;
      case 2:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            return current.user.email > next.user.email ? 1 : -1;
          }),
        ]);
        break;
      case 3:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            if (!current.website.isCompleted && next.website.isCompleted)
              return 1;
            else if (!next.website.isCompleted && current.website.isCompleted)
              return -1;
            else if (!next.website.isCompleted && !current.website.isCompleted)
              return 0;

            return current.website.basic.bufeteName.toLowerCase() >
              next.website.basic.bufeteName.toLowerCase()
              ? 1
              : -1;
          }),
        ]);
        break;
      case 4:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            if (!current.website.isCompleted && next.website.isCompleted)
              return 1;
            else if (!next.website.isCompleted && current.website.isCompleted)
              return -1;
            else if (!next.website.isCompleted && !current.website.isCompleted)
              return 0;

            return current.website.basic.url > next.website.basic.url ? 1 : -1;
          }),
        ]);
        break;
      case 5:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            if (current.user.sub && !next.user.sub) return 1;
            else if (!current.user.sub && next.user.sub) return -1;
          }),
        ]);
        break;
      case 6:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            if (!current.user.sub && next.user.sub) return 1;
            else if (!next.user.sub && current.user.sub) return -1;
            else if (!next.user.sub && !current.user.sub) return 0;

            return current.user.sub.toLowerCase() > next.user.sub.toLowerCase()
              ? 1
              : -1;
          }),
        ]);
        break;
      case 7:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            if (!current.user.sub && next.user.sub) return 1;
            else if (!next.user.sub && current.user.sub) return -1;
            else if (!next.user.sub && !current.user.sub) return 0;

            return current.user.subDate > next.user.subDate ? -1 : 1;
          }),
        ]);

        break;
      case 8:
        setUsersFilter([
          ...arrayNew.sort(function (current, next) {
            if (!current.user.subDate && next.user.subDate) return 1;
            else if (!next.user.subDate && current.user.subDate) return -1;
            else if (!next.user.subDate && !current.user.subDate) return 0;

            return current.user.subDate > next.user.subDate ? 1 : -1;
          }),
        ]);

        break;
      default:
        console.log("default");
        break;
    }
  };

  return (
    <Container>
      <div className="mb-5">
        <>
          {" "}
          <div
            className="d-flex row"
            style={{alignItems: "center", position: "relative"}}
          >
            <div className="col-6  col-md-3">
              {" "}
              <input
                type="text"
                className="form-control mt-5 mb-5"
                placeholder="Buscar"
                value={select.filter}
                onChange={onChangeFilter}
              />
            </div>
            <div className="col-6 col-md-3">
              {" "}
              <select onChange={onChangeSelect} value={select.select}>
                <option value="">Select one option</option>
                <option value="userid">User id</option>
                <option value="date_sign">Date Sign Up</option>
                <option value="email">Email</option>
                <option value="bufete">Bufete name</option>
                <option value="web">Web Domain</option>
                <option value="status">Status</option>
                <option value="type">Type</option>
                <option value="date_sub">Date Subs</option>
                <option value="date_unsub">Date unSubs</option>
              </select>
            </div>

            <div className="col-12 col-md-3 container-csv">
              <ReactHtmlTableToExcel
                id="button_excel"
                className="container-button"
                table="table_info"
                filename="Usuarios"
                sheet="Pagina 1"
                buttonText="CSV"
              />
            </div>
          </div>
          <div className="scroll-table">
            <Table
              id="table_info"
              className="table-users"
              style={{width: "1800px"}}
            >
              <thead>
                <tr>
                  <th>
                    User Id{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(1);
                      }}
                      className={`arrow-icon ${filter === 1 && "active"}`}
                    />{" "}
                  </th>
                  <th>
                    Date Sign up{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(1);
                      }}
                      className={`arrow-icon ${filter === 1 && "active"}`}
                    />
                  </th>
                  <th>
                    Email (Sign up){" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(2);
                      }}
                      className={`arrow-icon ${filter === 2 && "active"}`}
                    />
                  </th>
                  <th>
                    Bufete name{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(3);
                      }}
                      className={`arrow-icon ${filter === 3 && "active"}`}
                    />
                  </th>
                  <th>
                    Web domain{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(4);
                      }}
                      className={`arrow-icon ${filter === 4 && "active"}`}
                    />
                  </th>
                  <th>
                    Status{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(5);
                      }}
                      className={`arrow-icon ${filter === 5 && "active"}`}
                    />
                  </th>
                  <th>
                    Type{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(6);
                      }}
                      className={`arrow-icon ${filter === 6 && "active"}`}
                    />
                  </th>
                  <th>
                    Date Subs{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(7);
                      }}
                      className={`arrow-icon ${filter === 7 && "active"}`}
                    />
                  </th>
                  <th>
                    Date unSubs{" "}
                    <ArrowDropDownIcon
                      onClick={() => {
                        filterIcon(8);
                      }}
                      className={`arrow-icon ${filter === 8 && "active"}`}
                    />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersFilter &&
                  usersFilter.map((item, index) => (
                    <tr key={index}>
                      <th style={{paddingLeft: "2rem"}}>{item.filterId}</th>
                      <th>{formatDate(item.user.createdAt)}</th>
                      <th>{item.user.email}</th>
                      <th>
                        {item.website.isCompleted &&
                          item.website.basic.bufeteName}
                      </th>
                      <th>
                        {item.website.isCompleted && item.website.basic.url}
                      </th>
                      <th>
                        {item.user.sub === null ? "No Subscrito" : "Subscrito"}
                      </th>
                      <th>
                        {" "}
                        {item.user.sub === null ? "" : `${item.user.sub}`}
                      </th>
                      <th>
                        {" "}
                        {item.user.sub === null
                          ? ""
                          : `${formatDate(item.user.subDate)}`}
                      </th>
                      <th>
                        {" "}
                        {item.user.sub === null && item.user.subDate
                          ? `${formatDate(item.user.subDate)}`
                          : " "}
                      </th>
                      <th style={{paddingLeft: "2rem"}}>
                        <a
                          href={`/dashboard?userid=${item.user._id}`}
                          target="_blank"
                        >
                          {" "}
                          <EditIcon
                            style={{
                              color: "black",

                              fontSize: "25px",
                              cursor: "pointer",
                            }}
                          />
                        </a>

                        <DeleteIcon
                          style={{fontSize: "25px", cursor: "pointer"}}
                          onClick={() => {
                            setDeleteUser({
                              id: item.user._id,
                              email: item.user.email,
                            });
                          }}
                        />
                      </th>
                    </tr>
                  ))}
              </tbody>
            </Table>{" "}
          </div>
          <Modal
            style={{
              marginTop: "30rem",

              fontSize: "17px",
            }}
            isOpen={deleteUser ? true : false}
          >
            <ModalBody style={{background: "#eeeeee"}}>
              <div className="modal-container" style={{padding: "1rem"}}>
                <div className="modal-delete">
                  Vas a eliminar a el usuario {deleteUser && deleteUser.email}{" "}
                  <br /> <br /> Quieres continuar?
                  <div className="row pt-5">
                    <div className="col-6 text-center">
                      <button
                        style={{
                          border: "none",
                          background: "white",
                          padding: "1rem",
                        }}
                        onClick={() => {
                          setDeleteUser(null);
                        }}
                        className="btn-modal"
                      >
                        Cancelar
                      </button>
                    </div>
                    <div
                      onClick={() => {
                        handleDelete();
                      }}
                      className="col-6 text-center"
                    >
                      <button
                        style={{
                          border: "none",
                          background: "white",
                          padding: "1rem",
                        }}
                        className="btn-modal"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </>
      </div>
    </Container>
  );
}

Users.getInitialProps = async (ctx) => {
  return {data, user};
};
