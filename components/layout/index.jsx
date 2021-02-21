import {useContext} from "react";
import {User} from "../contexts";

import Header from "./Header";

const Layout = ({children, ...props}) => {
  const {isLoggedIn, setLogOut} = useContext(User.UserContext);
  const {hideHeader} = props;
  return (
    <>
      {!hideHeader ? (
        <Header isLoggedIn={isLoggedIn} setLogOut={setLogOut} {...props} />
      ) : null}

      <main>{children}</main>
    </>
  );
};

export default Layout;
