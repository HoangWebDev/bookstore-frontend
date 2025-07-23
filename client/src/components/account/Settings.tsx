import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    const handleManageSubscriptions = () => {
        navigate('/manage-subscriptions');
    };

    return (
        <div className="section">
            <h2>Cài đặt</h2>
            <button className="btn" onClick={handleManageSubscriptions}>Quản lý đăng ký</button>
            <button className="btn" onClick={() => navigate('/change-password')}>Đổi mật khẩu</button>
        </div>
    );
}

export default Settings;