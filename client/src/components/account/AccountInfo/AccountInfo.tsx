import UserModel from "~/models/UserModel";
import "./AccountInfo.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCustomer } from "~/redux/customer";

interface AccountInfoProps {
    customer: UserModel;
}


function AccountInfo({ customer }: AccountInfoProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(removeCustomer());
        navigate('/');
    };

    const handleManageSubscriptions = () => {
        navigate('/manage-subscriptions');
    };

    return (
        <div className="account__info">
            <h2>Thông tin cá nhân</h2>
            <div className="profile-info">
                <div className="profile-info__name">
                    <label htmlFor="user" className="name-label">
                        Fullname:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="name-input"
                        value={customer.fullName}
                    />
                </div>
                <div className="profile-info__username">
                    <label htmlFor="username" className="username-label">
                        Username:
                    </label>
                    <input
                        type="username"
                        id="username"
                        className="username-input"
                        value={customer.userName}
                    />
                </div>
                <div className="profile-info__role">
                    <label htmlFor="role" className="role-label">
                        Role:
                    </label>
                    <p
                        className="role-input"
                        dangerouslySetInnerHTML={{ __html: customer.role }}
                    />
                </div>
                <div className="profile-info__btn">
                    <button className="button" onClick={logout}>Log out</button>
                    <button className="button">Chỉnh sửa</button>
                    <button className="button" onClick={handleManageSubscriptions}>Quản lý đăng ký</button>
                    <button className="button" onClick={() => navigate('/change-password')}>Đổi mật khẩu</button>
                </div>
            </div>
        </div>
    );
}

export default AccountInfo;