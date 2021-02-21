import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    /* 1rem = 10px */
    font-size: 62.5%; 
    box-sizing: border-box;
    --color-primary: ${(props) => props.theme.colors.primary};
    --color-primary-darker: ${(props) => props.theme.colors.primaryDarker};
    --color-secondary: ${(props) => props.theme.colors.secondary};
    --color-success: ${(props) => props.theme.colors.success};
    --color-warning: ${(props) => props.theme.colors.warning};
    --color-gray: ${(props) => props.theme.colors.gray};
    --color-orange: ${(props) => props.theme.colors.orange};
    --color-danger: ${(props) => props.theme.colors.danger};
    --color-white: ${(props) => props.theme.colors.white};
    --color-black: ${(props) => props.theme.colors.black};


    --color-website-gray: ${(props) => props.theme.colors.website.gray};
    --color-website-blue: ${(props) => props.theme.colors.website.blue};
    --color-website-orange: ${(props) => props.theme.colors.website.orange};
    --color-website-green: ${(props) => props.theme.colors.website.green};
    --color-website-green: ${(props) => props.theme.colors.website.green};
    --color-website-purple: ${(props) => props.theme.colors.website.purple};
    --color-website-aqua: ${(props) => props.theme.colors.website.aqua};
    --color-website-background: ${(props) =>
      props.theme.colors.website.background};
  --color-website-background2: ${(props) =>
    props.theme.colors.website.background2};


    
    --light: 300;
    --regular: 400;
    --medium: 500;
    --semiBold: 600;
    --bold: 700;
    --black: 900;

    --quicksand:  'Quicksand', sans-serif;
    --poppins: 'Poppins', sans-serif;
  }


  body {
    font-family: var(--poppins);
    font-weight: var(--regular);
    color: var(--color-black);
    transition: opacity 0.5s ease; 
  }
    
    
  h1,h2,h3,h4,h5,h6,p, figure, ul, label{
    margin: 0;
  }
  ul{
    list-style: none;
  }

  img{
    width: 100%;
  }

  form,
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  /**
    Buttons
  */


  .carousel .slide{
    background: none;
  }

  .btn{
    font-size: 1.2rem; 
    line-height: 30px;
    padding: 0.5em 3.3em;
    border-radius: 5px; 
    font-weight: 500;    
  }

  .btn-link{
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--color-primary) !important;

    &:hover {
      color: var(--color-primary);
      text-decoration: underline;
    }

    &--form{
      font-size: 1.3rem;
      font-weight: 400;
    }

    &--black{
      color: var(--color-black) !important;
    }
    &--danger{
      color: var(--color-danger) !important;
    }

    &--white{
      color: var(--color-white) !important;
    }

    &--nothover{
      &:hover{
        cursor: default;
        text-decoration: none;
      }
    }
  }

  .btn-primary{
    color: white;
    background: var(--color-primary);
  }

  .btn-rainbow{
    color: white;
    background: linear-gradient(45deg, var(--color-secondary), var(--color-primary-darker));
    border: none;
    position: relative;
    z-index: 1; 
   
    &:hover{
      color: white;
    }

    &::before {
      content: "";
      border-radius: 5px; 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to left,
        var(--color-secondary),
        var(--color-primary-darker)
      );
      opacity: 0;
      transition: opacity 0.4s;
      z-index: -1;
    }
    &:hover::before {
      opacity: 1;
    }
  }

  .btn-black{
    color: white;
    background: var(--color-black);
    border: none;

    &:hover{
      color: var(--color-white);
      background: #222;
    }
  }

  .btn-success{
    background: var(--color-success);
    color: var(--color-white);
    border-color: var(--color-success);
  }

  .btn-ghost{
    background: rgba(255, 255, 255, 0.4);
    color: var(--color-primary);

    &:hover, &:focus{
      background: white;
      color: var(--color-primary);
    }
  }

  .btn-warning{
    background: var(--color-warning);
    color: rgba(0, 0, 0, 0.7);

    &:hover, &:focus{
      color: rgba(0, 0, 0, 0.7);
      background:  #ffe053;
      border-color:  #ffe053;
    }
  }

  .btn-gray{
    background: #303030;
    color: var(--color-white);

    &:hover, &:focus{
      color: var(--color-white);
    }
  }

  .btn-outlined-gray{
    background: transparent;
    border: 1px solid #303030; 
    color: #303030;

    &:hover, &:focus{
      background: #303030;
      color: var(--color-white);
    }
  }


  .btn-outlined-primary {
    background: transparent;
    border: 1px solid var(--color-primary); 
    color: var(--color-primary);

    &:hover{
      color: var(--color-primary);
    }
  }

  .btn-outlined-black{
    background: transparent;
    border: 1px solid var(--color-black); 
    color: var(--color-black);

    &:hover{
      color: var(--color-white);
      background: var(--color-black);
    }

  }

  .btn-gradient-primary{
    color: var(--color-white) !important;
    background: linear-gradient(114.34deg, #2537D6 -18.15%, #4B62FF 18.06%, #4C66FE 52.54%, #627CFF 88.84%, #4285F4 142.48%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    
    position: relative;
    z-index: 1; 
   
    &:hover{
      color: white;
    }

    &::before {
      content: "";
      border-radius: 5px; 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to left,
        var(--color-primary-darker),
        var(--color-primary-darker)
      );
      opacity: 0;
      transition: opacity 0.4s;
      z-index: -1;
    }
    &:hover::before {
      opacity: 1;
    }


    &:hover{
      color: white;
    }
  }

  .btn-bold{
    font-weight: 800;
  }

  .btn-shadow{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  /**
    Typography
  */

  .title{
    font-size: 2.4rem;
    font-weight: var(--semiBold);
    line-height: 30px;
    margin-bottom: 1.3em;
  }

  .text{
    font-weight: var(--medium);
    font-size: 1.4rem;
    line-height: 27px; 
    margin-bottom: 1.4em;

    &--quicksand{
      font-family: var(--quicksand);
    }
  }

  .web-text{
    font-style: normal;
    font-weight: var(--regular);
    font-size: 13px;
    line-height: 19px;
    white-space: pre-line;

    &:not(:last-child){
      margin-bottom: 0.7rem;
    }
  }

  .heading{
    font-weight: 300 !important;
    margin-bottom: 1.6rem;
    strong{
      font-weight: 800;

      span{
        font-size: 1.4rem;
        font-weight: 300;
      }
    }

    &--blue{
      color: var(--color-primary);
    }

    &--gray{
      color: #303030;
    }
  }

  .rainbow{
    font-weight: var(--black);
    background: -webkit-linear-gradient(0deg, var(--color-secondary), var(--color-primary-darker));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .back-arrow {
    width: 3.1rem;
  }

  textarea::-webkit-scrollbar-track{
	/* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
	/* background-color: #F5F5F5; */
	border-radius: 10px;

}

  textarea::-webkit-scrollbar{
    width: 5px;

    /* background-color: #F5F5F5; */

  }

  textarea::-webkit-scrollbar-thumb{
    border-radius: 0px;
    height: 80%;
    margin-right: 0.5rem;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-darker));
  }


  /**
    Forms
  */

  .form-group{
    font-family: 'Quicksand', sans-serif;
    margin-bottom: 3rem;
    position: relative;

    label{
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 19px;
      margin-bottom: 0.3em;

      span{
        font-weight: 400;
      }
    }

    &__error{
      color: var(--color-danger);
      font-size: 1.1rem;
      position: absolute;
      bottom: -18px;
      left: 10px;
    }
  }



  .form-control{
    font-family: 'Quicksand', sans-serif;
    vertical-align: center;
    font-size: 1.4rem;
    line-height: 1.4rem;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    height: 5rem;
    padding: 8px 15px;
    color: var(--color-black);

    &::placeholder{
      font-size: 1.4rem;
      line-height: 1.4rem;
      color: rgba(65, 65, 65, 0.3);
    }

    &:-moz-placeholder { /* Firefox 18- */
      line-height: 1.4rem !important;
      padding-top: 20px !important;
      vertical-align: middle;
      text-align: center;
    }

    &::-moz-placeholder {  /* Firefox 19+ */
      line-height: 1.4rem !important;
      padding-top: 20px !important;
      vertical-align: middle;
    }


    &:focus{
      color: black;
      background-color: #fff;
      border-color: var(--color-primary);
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(85, 145, 245 ,.25);
    }

    &[readonly]{
      background: var(--color-white);
    }

    &--error{
      border-color: var(--color-danger);

      &:focus{
        border-color: var(--color-danger);
        box-shadow: 0 0 0 0.2rem rgba(244, 67, 54 ,.25);
      }
    }
  }

  textarea.form-control{
    height: 18.9rem;

    &--tall{
      height: 50rem;
    }
  }

  .form-array:not(:last-child){
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-primary);
  }

  .form-control-logo{
    cursor: pointer;
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.5px solid #EEEEEE;
    box-sizing: border-box;
    border-radius: 60px;
    /* overflow: hidden; */

    &:not(:last-child){
      margin-bottom: 1rem;
    }

    img{
      height: 80%;
      width: 20rem;
      object-fit: contain;
    }

  }


  .form-image-upload{
    cursor: pointer;
    width: 8rem;
    height: 8rem;
    border: 1px solid #EEEEEE;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;


    &__icon{
      width: 2.5rem;
    }

    &__thumbnail{
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;
    }

    span{
      border: 1px solid #EEEEEE;
      position: absolute;
      width: 3rem;
      height: 3rem;
      background: var(--color-white);
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__add{
      &::before,&::after{
        content:'';
        background: #929292;
        position: absolute;
      }

      &::before{
        width: 50%;
        height: 1.25px;
      }

      &::after{
        height: 50%;
        width: 1.25px;
      }

    }

    &__remove{
      &::before{
        content:'';
        background: #929292;
        position: absolute;
      }

      &::before{
        width: 60%;
        height: 1px;
      }
    }
  }


  /* Glide bullets styles  */
  .glide{

    position: relative ;
    &__track{
      overflow-x: hidden;
    }

    &__arrows{
      background: pink;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }


    &__arrow{
      position: absolute;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;

      &:focus{
        border: none;
        outline: none;
      }

      &--right{
        right: -15%;
      }

      &--left{
        left: -15%;

      }
    }

    &__bullets{
      display: flex;
      justify-content: center;
      margin: 1rem
    }

    &__bullet{
      
      width: 0.8rem;
      height: 0.8rem;
      border: none;
      outline: none;
      border-radius: 50%;
      background: #C4C4C4;


      &:not(:last-child){
        margin-right: 10px;
      }

      &--active{
        background: #FFFFFF;
      }
    }

  }


  @media ${(props) => props.theme.mediaQueries.medium}{



    .web-text{
      font-size: 15px;
      &:not(:last-child){
      }
    }

    .degub-text{
      position: absolute;
      left: 20px;
      top: 0;
    }

    .heading{
      font-size: 3rem;
      line-height: 3.6rem;
      margin-top: 3em;
      /* margin-bottom: 2em; */
    }

    .form-group{
      label{
        font-size: 1.6rem;
        line-height: 2.9rem;
      }
    }

    .form-control, .form-control::placeholder{
      font-size: 1.6rem;
      line-height: 1.8rem;
    }

    .form-container{
      max-width: 45rem;
      margin: 0 auto;
    }

    .form-control-logo{
      transition: border-color 0.2s ease;
      
      &:not(:last-child){
        margin-bottom: 2rem;
      }

      &:hover{
        border-color: var(--color-primary);
        box-shadow: 0 0 0 0.2rem rgba(85, 145, 245 ,.25);
      }

      &--selected{
        border-color: var(--color-primary);
        box-shadow: 0 0 0 0.2rem rgba(85, 145, 245 ,.25);
      }
    }

  }

  

  @media ${(props) => props.theme.mediaQueries.large}{
    .title{
      font-size: 3rem;
      line-height: 3.6rem;
    }

    .text{
      font-size: 1.6rem;
      line-height: 2.9rem;
    }

    .btn{
      font-size: 1.3rem;
    }

    .btn-outlined-primary:hover {
      color: var(--color-white);
      background: var(--color-primary);
    }
  }

`;
