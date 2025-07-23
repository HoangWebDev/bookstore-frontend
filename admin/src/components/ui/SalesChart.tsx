import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", sales: 120 },
    { name: "Feb", sales: 340 },
    { name: "Mar", sales: 180 },
    { name: "Apr", sales: 270 },
    { name: "May", sales: 140 },
    { name: "Jun", sales: 150 },
    { name: "Jul", sales: 250 },
    { name: "Aug", sales: 90 },
    { name: "Sep", sales: 170 },
    { name: "Oct", sales: 320 },
    { name: "Nov", sales: 230 },
    { name: "Dec", sales: 80 },
];

function SalesChart() {
    return (
        <div className="relative">
            <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
            <button className="absolute top-2 right-2 text-gray-400">⋮</button>

            {/* Biểu đồ */}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    {/* Lưới ngang */}
                    <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} />

                    {/* Trục X và Y */}
                    <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "12px" }} />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: "12px" }}
                        tickCount={5}
                        domain={[0, 400]}
                    />
                    {/* Hiển thị tooltip khi hover */}
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[5, 5, 0, 0]} barSize={15} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
