import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";
import { auth } from "utils/fire";

function ApolloServerComp({ children }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const isAuth = useSelector((s) => s.isAuth);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === "null") {
      token = null;
    }
    if (token) {
      dispatch(authActions.login());
    }
  }, [user, isAuth, dispatch]);

  const client = new ApolloClient({
    uri: process.env.REACT_APP_TEMP_URI,
    cache: new InMemoryCache(),
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloServerComp;
