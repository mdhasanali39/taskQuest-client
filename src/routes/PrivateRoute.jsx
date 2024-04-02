import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'
import {Grid} from 'react-loader-spinner'

const PrivateRoute = ({children}) => {
    const {user, isLoading} = useAuth()

    if(isLoading){
        return <div className="min-h-[86vh] flex justify-center items-center"><span className=""> <Grid
        visible={true}
        height="80"
        width="80"
        color="#3b82f6"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
        /></span></div>
    }
    if(!user){
       return <Navigate to="/login" replace={true}/>
    }

    return children;
};
PrivateRoute.propTypes = {
    children: PropTypes.node,
}
export default PrivateRoute;