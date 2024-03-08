import { useRoutes } from "react-router-dom";
import Login from "../components/Login";
import AuthWrap from "./AuthWrap";
import Dashboard from "../components/Dashboard";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <>
          <AuthWrap>
            <Login title="Login" />
          </AuthWrap>
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <AuthWrap>
            <Dashboard title="dashboard" />
          </AuthWrap>
        </>
      ),
    },
    {
      path: "/*",
      element: (
        <>
          <AuthWrap>
            <Dashboard title="dashboard" />
          </AuthWrap>
        </>
      ),
    },
  ]);
  return routes;
};

export default Routes;
