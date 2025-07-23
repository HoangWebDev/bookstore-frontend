function Order() {
    // Giả lập danh sách đơn hàng
    const orders = [
        { id: 'DH001', date: '2025-06-01', total: '200.000 đ', status: 'Đã giao' },
        { id: 'DH002', date: '2025-06-10', total: '150.000 đ', status: 'Đang xử lý' },
    ];

    return (
        <div className="section">
            <h2>Đơn hàng của tôi</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng cộng</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
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