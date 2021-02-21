export const FullLogoTypeOne = ({name, type, color}) => {
  let typeD;

  if (type !== undefined) {
    typeD = type;
  }
  return (
    <>
      <style jsx>{`
        div {
          text-align: center;
        }

        h1 {
          font-weight: 300;
          font-size: 2.4rem;
        }

        p {
          font-size: 1.3rem;
          line-height: 18px;
          color: rgba(65, 65, 65, 0.3);
        }
      `}</style>
      <div>
        <h1>{name ? name : "Bufete Velazquez"}</h1>
        <p>
          {typeD === "bufete" ? "Abogados" : "Tu Abogado"}{" "}
          {name ? name : "Bufete Velazquez"}
        </p>
      </div>
    </>
  );
};
export const FullLogoTypeTwo = ({name, type}) => {
  let typeD;
  if (type !== undefined) {
    typeD = type;
  }
  return (
    <>
      <style jsx>{`
        div {
          text-align: center;
        }

        h1 {
          background: #ffa16f;
          color: var(--color-white);
          font-family: "Poppins", sans-serif;
          font-weight: 300;
          font-size: 2.4rem;
          text-transform: capitalize;
        }

        p {
          font-size: 1.3rem;
          text-transform: uppercase;
          letter-spacing: 1.3em;
          font-weight: 600;
        }

        @media only screen and (min-width: 768px) {
          p {
            letter-spacing: 1em;
          }
        }
      `}</style>
      <div>
        <h1>{name ? name : "Bufete Velazquez"}</h1>
        <p>{typeD === "bufete" ? "Abogados" : "Tu Abogado"}</p>
      </div>
    </>
  );
};
export const FullLogoTypeThree = ({name, type}) => {
  let typeD;
  if (type !== undefined) {
    typeD = type;
  }
  return (
    <>
      <style jsx>{`
        div {
          text-align: center;
        }

        h1 {
          font-weight: var(--black);
          font-size: 2.4rem;
        }
        p {
          font-weight: 300;
          font-size: 1.3rem;
          line-height: 16px;
          letter-spacing: 1.3em;
          color: rgba(0, 0, 0, 0.7);
          text-transform: uppercase;
        }

        @media only screen and (min-width: 768px) {
          p {
            letter-spacing: 1em;
          }
        }
      `}</style>
      <div>
        <h1>{name ? name : "Bufete Velazquez"}</h1>
        <p>{typeD === "bufete" ? "Abogados" : "Tu Abogado"}</p>
      </div>
    </>
  );
};
export const FullLogoTypeFour = ({name, type}) => {
  let typeD;
  if (type !== undefined) {
    typeD = type;
  }
  return (
    <>
      <style jsx>{`
        h1 {
          font-family: "Quicksand", sans-serif;
          font-weight: bold;
          font-size: 24px;
          line-height: 30px;
          color: #000000;
        }
        p {
          font-family: "Quicksand", sans-serif;
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 0.15em;
          color: #ff8544;
        }
      `}</style>
      <div className="text-center">
        <h1>{name ? name : "Bufete Velazquez"}</h1>
        <p>{typeD === "bufete" ? "Abogados" : "Tu Abogado"}</p>
      </div>
    </>
  );
};
export const FullLogoTypeFive = ({name, type}) => {
  let typeD;
  if (type !== undefined) {
    typeD = type;
  }
  return (
    <>
      <style jsx>{`
        div {
          position: relative;
        }

        .square {
          position: absolute;
          width: 60px;
          height: 60px;
          border-top: 3px solid #30fecc;
          border-left: 3px solid #30fecc;
          border-bottom: 3px solid #30fecc;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .square::before,
        .square::after {
          content: "";
          position: absolute;
          height: 8%;
          width: 3px;
          background: #30fecc;
        }

        .square::before {
          right: 0;
          top: 0;
        }

        .square::after {
          right: 0;
          bottom: 0;
        }

        h1 {
          display: inline-block;
          font-weight: 300;
          font-size: 15px;
          line-height: 1;
        }

        p {
          font-weight: 200;
          font-size: 10px;
          line-height: 15px;
          text-transform: uppercase;
        }
      `}</style>
      <div className="text-center">
        <div className="square"></div>
        <h1>{name ? name : "Bufete Velazquez"}</h1>
        <p>{typeD === "bufete" ? "Abogados" : "Tu Abogado"}</p>
      </div>
    </>
  );
};

export const ShortLogoTypeOne = ({initials, name}) => {
  return (
    <>
      <style jsx>{`
        h1 {
          font-family: serif;
          margin-right: 0.5em;
          font-size: 24px;
        }
        p {
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
        }
      `}</style>
      <div className="text-center d-flex align-items-center justify-content-center">
        <h1>{initials ? initials : "BV"}</h1>
        <p>{name ? name : "Bufete Velazquez"}</p>
      </div>
    </>
  );
};
export const ShortLogoTypeTwo = ({initials, name}) => {
  return (
    <>
      <style jsx>{`
        h1 {
          margin-right: 0.5em;
          font-size: 24px;
          color: black;
          -webkit-text-fill-color: white; /* Will override color (regardless of order) */
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: black;
        }
        p {
          font-weight: 300;
          font-size: 15px;
          line-height: 22px;
        }
      `}</style>
      <div className="text-center d-flex align-items-center justify-content-center">
        <h1>{initials ? initials : "BV"}</h1>
        <p>{name ? name : "Bufete Velazquez"}</p>
      </div>
    </>
  );
};
export const ShortLogoTypeThree = ({initials, name}) => {
  return (
    <>
      <style jsx>{`
        h1 {
          margin-right: 0.5em;
          font-size: 24px;
          font-weight: 1000;
          background: -webkit-linear-gradient(0deg, #02060c, #1551b5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-weight: 600;
          font-size: 15px;
          line-height: 22px;
        }

        @media screen and (max-width: 787px) {
          h1 {
            font-weight: 900;
            font-size: 24px;
          }
        }
      `}</style>
      <div className="text-center d-flex align-items-center justify-content-center">
        <h1>{initials ? initials : "BV"}</h1>
        <p>{name ? name : "Bufete Velazquez"}</p>
      </div>
    </>
  );
};
export const ShortLogoTypeFour = ({initials, name}) => {
  return (
    <>
      <style jsx>{`
        h1 {
          margin-right: 0.5em;
          font-size: 24px;
          font-weight: var(--black);
          background: -webkit-linear-gradient(0deg, #ffab77, #ffe4a2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-weight: 600;
          font-size: 15px;
          line-height: 22px;
        }
      `}</style>
      <div className="text-center d-flex align-items-center justify-content-center">
        <h1>{initials ? initials : "BV"}</h1>
        <p>{name ? name : "Bufete Velazquez"}</p>
      </div>
    </>
  );
};

export default [
  FullLogoTypeOne,
  FullLogoTypeTwo,
  FullLogoTypeThree,
  FullLogoTypeFour,
  FullLogoTypeFive,
  ShortLogoTypeOne,
  ShortLogoTypeTwo,
  ShortLogoTypeThree,
  ShortLogoTypeFour,
];
