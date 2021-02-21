import Layout from "../components/layout";
import Head from "next/head";
import {useContext, useEffect} from "react";
import {User} from "../components/contexts";
import Router from "next/router";

// Sections
import Hero from "../components/sections/Hero";
import Info from "../components/sections/Info";
import Plans from "../components/sections/Plans";
import Services from "../components/sections/Services";
import CallToAction from "../components/sections/CallToAction";
import Testimonials from "../components/sections/Testimonials";

// Layout
import Footer from "../components/layout/Footer";

const Index = () => {
  const {isLoggedIn, user} = useContext(User.UserContext);

  useEffect(() => {
    if (isLoggedIn) Router.push("/dashboard");
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Hifive | Marketing para abogados</title>
      </Head>
      <Layout>
        <Hero></Hero>
        <Info></Info>
        <Plans></Plans>
        <Services></Services>
        <CallToAction></CallToAction>
        {/*         <Testimonials></Testimonials> */}
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default Index;
