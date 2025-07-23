import { useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import useGet from "~/hooks/useGet";
import StatisticsAll from "~/models/StatisticsAll";

const colorPalette = ["#32d583", "#9b8afb", "#fd853a", "#fdb022"];

function TargetChart() {
    const { data: rawData } = useGet<StatisticsAll>("statistics/count_all");

    const [active, setActive] = useState<{ name?: string; value?: number } | null>(null);

    // Chuyển đổi object → array, thêm tên và màu sắc
    const data = rawData
        ? Object.entries(rawData).map(([key, value], index) => ({
            name: key,  // Giữ nguyên tên bảng từ API
            value,
            color: colorPalette[index % colorPalette.length] // Gán màu theo thứ tự, lặp lại nếu hết màu
        }))
        : [];

    return (
        <>
            <h2 className="text-lg font-semibold">Details Order</h2>
            <span className="my-1.5 block text-sm text-gray-500 font-medium">In the last 7 days</span>
            <div className="relative flex justify-center items-center">
                {/* Biểu đồ */}
                <PieChart width={400} height={370}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80} // Tạo hình Donut
                        outerRadius={150}
                        dataKey="value"
                        onMouseEnter={(entry) => setActive(entry)} // Hiển thị giá trị khi hover
                        onMouseLeave={() => setActive(null)}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: ".8rem" }} />
                </PieChart>

                {/* Giá trị hiển thị ở giữa */}
                {active && <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center">
                    <p className="text-xl font-semibold text-gray-600">
                        {active.name}
                    </p>
                    <p className="text-2xl font-bold">{active.value}</p>
                </div>}
            </div>
        </>
    );
};

export default TargetChart;
