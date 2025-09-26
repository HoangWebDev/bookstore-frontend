import Image from "~/components/ui/Image/Image";
import "./Orders.module.scss";
function Order() {
    // Giả lập danh sách đơn hàng
    const orders = [
        { name: 'Order 1', id: 'DH001', date: '2025-06-01', total: '200.000 đ', status: 'Đã giao' },
        { name: 'Order 2', id: 'DH002', date: '2025-06-10', total: '150.000 đ', status: 'Đang xử lý' },
    ];

    return (
        <div className="order">
            <h2>Đơn hàng của tôi</h2>
            {/* Mobile */}
            <div className="order-list">
                <div className="order-list__header">
                    <p>Danh sách đơn hàng:</p>
                </div>
                {orders.map((order) => (
                    <div key={order.id} className="order-list__item">
                        <div className="item-image">
                            <Image className="item-image__img" />
                        </div>
                        <div className="item-info">
                            <p>{order.name}</p>
                            <p>{order.date}</p>
                            <p>{order.total}</p>
                            <p>{order.status}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Laptop */}
            <table className="order-table">
                <thead className="order-table__header">
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Mã đơn hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Ngày đặt</th>
                        <th>Tổng cộng</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="order-table__body">
                    {orders.map((order) => (
                        <tr key={order.id} className="table-body__item">
                            <td className="item-image">
                                <Image className="item-image__img" />
                            </td>
                            <td>{order.name}</td>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;