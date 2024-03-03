import { Navigate } from "react-router-dom";

const PrivateCheckRouter = ({ isAutentication, children }) => {
    return isAutentication === true ? children : <Navigate to="/newcomer" />;
};

export default PrivateCheckRouter;