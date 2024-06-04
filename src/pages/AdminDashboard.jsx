import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Rectangle,
} from "recharts";

const AdminDashboard = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 4500, amt: 2000 },
  ];

  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const data3 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Total Offer</h4>
          <h5 className="font-semibold text-base">180</h5>
        </div>
        <div className="bg-gradient-to-r from-amber-200 to-yellow-500 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-">Completed Offer</h4>
          <h5 className="font-semibold text-base">40</h5>
        </div>
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Total Earning</h4>
          <h5 className="font-semibold text-base">$1800</h5>
        </div>
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-">Total User </h4>
          <h5 className="font-semibold text-base">500</h5>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Total Advertiser</h4>
          <h5 className="font-semibold text-base">275</h5>
        </div>
        <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Others</h4>
          <h5 className="font-semibold text-base">1200</h5>
        </div>
      </div>
      <div className="grid gap-4 mt-5 grid-cols-1 md:grid-cols-2">
        <div className="bg-white px-4 py-6 rounded shadow-sm">
          <ResponsiveContainer>
            <BarChart height={300} data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white px-4 py-6 rounded shadow-sm">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={data2}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-6 rounded shadow-sm mt-5">
        <ResponsiveContainer height={300}>
          <BarChart
            data={data3}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
