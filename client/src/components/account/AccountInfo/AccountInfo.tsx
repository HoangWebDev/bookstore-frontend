import UserModel from "~/models/UserModel";
import "./AccountInfo.module.scss";

interface AccountInfoProps {
    customer: UserModel;
}


function AccountInfo({ customer }: AccountInfoProps) {
    return (
        <div className="account__info section">
            <h2>Thông tin cá nhân</h2>
            <div className="profile-info">
                <p><strong>Họ tên:</strong>{customer.fullName}</p>
                <p><strong>Email:</strong>{customer.role}</p>
                <p><strong>Số điện thoại:</strong> 0123456789</p>
                <button className="btn">Chỉnh sửa</button>
            </div>
        </div>
    );
}

export default AccountInfo;