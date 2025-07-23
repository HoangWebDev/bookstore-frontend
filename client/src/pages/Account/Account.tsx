import { useState } from 'react';
import './Account.module.scss';

import AccountInfo from '~/components/account/AccountInfo/AccountInfo';
import Orders from '~/components/account/Orders';
import Preferences from '~/components/account/Preferences';
import Settings from '~/components/account/Settings';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import UserModel from '~/models/UserModel';

function Account() {
    const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'preferences' | 'settings'>('info');
    const customer = useSelector((state: RootState) => state.customer.customer);

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return <AccountInfo customer={customer as UserModel} />;
            case 'orders':
                return <Orders />;
            case 'preferences':
                return <Preferences />;
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <section className="account section" id="account">
            <div className="account__container container grid">
                <aside className="sidebar">
                    <ul>
                        <li
                            className={activeTab === 'info' ? 'active' : ''}
                            onClick={() => setActiveTab('info')}
                        >
                            Thông tin cá nhân
                        </li>
                        <li
                            className={activeTab === 'orders' ? 'active' : ''}
                            onClick={() => setActiveTab('orders')}
                        >
                            Đơn hàng
                        </li>
                        <li
                            className={activeTab === 'preferences' ? 'active' : ''}
                            onClick={() => setActiveTab('preferences')}
                        >
                            Sở thích
                        </li>
                        <li
                            className={activeTab === 'settings' ? 'active' : ''}
                            onClick={() => setActiveTab('settings')}
                        >
                            Cài đặt
                        </li>
                    </ul>
                </aside>
                <main className="content">{renderContent()}</main>
            </div>
        </section>
    );
};

export default Account;
