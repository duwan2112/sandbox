import React, {useState} from "react";
import Link from "next/link";
import EditBlogs from "./EditLanding/EditBlogs";
import EditMarketing from "./EditLanding/EditMarketing";
import EditPrincipal from "./EditLanding/EditPrincipal";
import EditLawyers from "./EditLanding/EditLawyers";
import EditClient from "./EditLanding/EditClient";
import EditSolvedCases from "./EditLanding/EditSolvedCases";

export default function EditSubArea({
  visible,
  active,
  setActive,
  activeEdit,
  reload,
  url,
  userid,
}) {
  return (
    <>
      {active === 0 ? (
        <div>
          {visible ? (
            <a
              className="btn btn-outline-primary  mt-5"
              style={{
                padding: " 0",
                height: "6rem",
                lineHeight: "6rem",
                fontSize: "1.7rem",
                width: "100%",
              }}
              target="_blank"
              href={`/p/${url}/${activeEdit.subareaName}`}
            >
              Ver página web
            </a>
          ) : (
            <a
              target="_blank"
              href={`/landing-preview/${activeEdit.subareaName}?id=${activeEdit._id}`}
              className="btn btn-outline-primary  mt-5"
              style={{
                padding: " 0",
                height: "6rem",
                lineHeight: "6rem",
                fontSize: "1.7rem",
                width: "100%",
              }}
            >
              Ver página web
            </a>
          )}

          <button
            onClick={() => {
              setActive(1);
            }}
            className="btn btn-outline-dark mt-5"
            style={{
              padding: "0",
              height: "6rem",
              fontSize: "1.7rem",
              width: "100%",
            }}
          >
            Editar campaña de marketing
          </button>
          <button
            onClick={() => {
              setActive(2);
            }}
            className="btn btn-outline-dark mt-5"
            style={{
              padding: "0",
              height: "6rem",
              fontSize: "1.7rem",
              width: "100%",
            }}
          >
            Editar la pantalla de bienvenida
          </button>
          <button
            onClick={() => {
              setActive(3);
            }}
            className="btn btn-outline-dark mt-5"
            style={{
              padding: "0",
              height: "6rem",
              fontSize: "1.7rem",
              width: "100%",
            }}
          >
            Incluye a los abogados
          </button>
          <button
            onClick={() => {
              setActive(4);
            }}
            className="btn btn-outline-dark mt-5"
            style={{
              padding: "0",
              height: "6rem",
              fontSize: "1.7rem",
              width: "100%",
            }}
          >
            Editar la sección nuestros clientes
          </button>
          <button
            onClick={() => {
              setActive(5);
            }}
            className="btn btn-outline-dark mt-5"
            style={{
              padding: "0",
              height: "6rem",
              fontSize: "1.7rem",
              width: "100%",
            }}
          >
            Editar la sección casos resueltos
          </button>
          <button
            onClick={() => {
              setActive(6);
            }}
            className="btn btn-outline-dark mt-5 mb-5"
            style={{
              padding: "0",
              height: "6rem",
              fontSize: "1.7rem",
              width: "100%",
            }}
          >
            Editar la sección nuestro blog
          </button>
        </div>
      ) : (
        <>
          {active === 1 && (
            <>
              <EditMarketing
                seoInfo={activeEdit.seo}
                reload={reload}
                id={activeEdit._id}
                url={activeEdit.subareaName}
              />
            </>
          )}{" "}
          {active === 2 && (
            <>
              <EditPrincipal
                userid={userid}
                setActive={setActive}
                interviews={activeEdit.interviews}
                reload={reload}
                id={activeEdit._id}
                principal={activeEdit.principal}
              />
            </>
          )}{" "}
          {active === 3 && (
            <>
              <EditLawyers
                userid={userid}
                reload={reload}
                id={activeEdit._id}
                lawyers={activeEdit.lawyers}
              />
            </>
          )}{" "}
          {active === 4 && (
            <>
              <EditClient
                userid={userid}
                reload={reload}
                id={activeEdit._id}
                testimonials={activeEdit.testimonials}
              />
            </>
          )}{" "}
          {active === 5 && (
            <>
              <EditSolvedCases
                userid={userid}
                reload={reload}
                id={activeEdit._id}
                solvedCases={activeEdit.solvedCases}
              />
            </>
          )}
          {active === 6 && (
            <>
              <EditBlogs
                userid={userid}
                reload={reload}
                id={activeEdit._id}
                blogs={activeEdit.blogs}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
