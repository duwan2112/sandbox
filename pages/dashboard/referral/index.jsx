import React, {useState, useEffect} from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import petition_post from "../../../utils/petitions/petition_post";
import petition_get from "../../../utils/petitions/petition_get";
import {postAsync, getAsync} from "../../../utils/server";

const ReferralStyled = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 60rem;
  .container {
    &-title {
      margin-top: 4rem;
      font-size: 3rem;
    }
  }
`;

const Referral = () => {
  const [form, setForm] = useState({first_name: "", last_name: ""});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const onSubmitReferral = async (e) => {
    e.preventDefault();
    if (form.first_name.trim() !== "" && form.last_name.trim() !== "") {
      const {ok, data: result} = await postAsync("/users/referrals", {
        userid: data.user._id,
        form,
      });
      setData({user: result});
    }
  };

  useEffect(() => {
    const petitions = async () => {
      const {data} = await getAsync("/users/website");
      console.log(data);
      setData(data);
      setLoading(true);
    };

    petitions();
  }, []);

  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <>
      <Head>
        <title>Hifive | Planes</title>
      </Head>
      <ReferralStyled>
        <h3 className="container-title">
          {" "}
          Bienvenido a tu sistema de referidos{" "}
        </h3>
        {loading && (
          <>
            {" "}
            {data.user.referral_link.length !== 0 ? (
              <>
                <br />
                <h2>Link: {data.user.referral_link[0].links[0].url}</h2>
              </>
            ) : (
              <form onSubmit={onSubmitReferral} action="">
                <p>Obten tu link de referidos </p>
                <input
                  name="first_name"
                  placeholder="first name"
                  type="text"
                  value={form.first_name}
                  onChange={onChangeForm}
                />
                <br /> <br />
                <input
                  name="last_name"
                  placeholder="last name"
                  type="text"
                  value={form.last_name}
                  onChange={onChangeForm}
                />
                <input
                  className="mt-5 btn btn-primary btn-block "
                  type="submit"
                />
              </form>
            )}{" "}
          </>
        )}
      </ReferralStyled>
    </>
  );
};

export default Referral;
