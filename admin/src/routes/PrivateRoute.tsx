import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "~/redux/store";
import ChildrenType from "~/types/childrenType";

function PrivateRoute({ children }: ChildrenType) {
    const user = useSelector((state: RootState) => state.admin.admin);

    if (!user || user.role !== "Admin") {
        console.log("❌ Không có quyền truy cập, chuyển hướng về login");
        return <Navigate to='/login' replace />;
    }

    return children;
}

export default PrivateRoute;