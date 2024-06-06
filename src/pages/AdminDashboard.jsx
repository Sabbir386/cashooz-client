import React, { useEffect, useState } from "react";
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
  PieChart,
  Pie,
  Line,
  LineChart,
  Cell,
} from "recharts";
import {
  useCompletedOfferQuery,
  useDateAndOfferWiseCompletedOfferQuery,
  useDateWiseCompletedOfferQuery,
  usePerDayCompletedOfferQuery,
  useSpecificOfferTotalCountsQuery,
  useSpecificUserTotalOfferCountsQuery,
  useTotalAdminQuery,
  useTotalAdvertiserQuery,
  useTotalOfferQuery,
  useTotalUserQuery,
} from "./dashboardApi";

const AdminDashboard = () => {
  const [countTotalOffer, setCountTotalOffer] = useState(null);
  const {
    data: totalOffer,
    isLoading: isLoadingOffer,
    error: errorOffer,
  } = useTotalOfferQuery();
  const [countCompletedOffer, setCountCompletedOffer] = useState(null);
  const {
    data: completedOffer,
    isLoading: isLoadingCompleted,
    error: errorCompleted,
  } = useCompletedOfferQuery();
  const [countTotalAdmin, setCountTotalAdmin] = useState(null);
  const {
    data: totalAdmins,
    isLoading: isLoadingAdmins,
    error: errorAdmins,
  } = useTotalAdminQuery();
  const [countTotalUser, setCountTotalUser] = useState(null);
  const {
    data: totalUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useTotalUserQuery();
  const [countTotalAdvertiser, setCountTotalAdvertiser] = useState(null);
  const {
    data: totalAdvertisers,
    isLoading: isLoadingAdvertisers,
    error: errorAdvertisers,
  } = useTotalAdvertiserQuery();
  //dateWiseCompletedOfferCount
  const [countDateWiseCompletedOffer, setCountDateWiseCompletedOffer] =
    useState(null);
  const {
    data: dateWiseCompletedOffer,
    isLoading: isLoadingdateWiseCompletedOffer,
    error: errordateWiseCompletedOffer,
  } = useDateWiseCompletedOfferQuery();
  //date + offer+ user wise completed Offer
  const [
    countDateandOfferandUserWiseCompletedOffer,
    setCountDateandOfferandUserWiseCompletedOffer,
  ] = useState(null);
  const {
    data: dateAndOfferAnduserWiseCompletedOffer,
    isLoading: isLoadingdateAndOfferAnduserWiseCompletedOffer,
    error: errordateAndOfferAnduserWiseCompletedOffer,
  } = useDateAndOfferWiseCompletedOfferQuery();
  //specific-user-total-offer-counts
  const [
    countSpecificUserWiseCompletedOffer,
    setCountSpecificUserWiseCompletedOffer,
  ] = useState(null);
  const {
    data: specificUserWiseCompletedOffer,
    isLoading: isLoadingspecificUserWiseCompletedOffer,
    error: errorspecificUserWiseCompletedOffer,
  } = useSpecificUserTotalOfferCountsQuery();
  //specific-offer-total-counts
  const [
    countSpecificOfferWiseCompletedOffer,
    setCountSpecificOfferWiseCompletedOffer,
  ] = useState(null);
  const {
    data: specificOfferWiseCompletedOffer,
    isLoading: isLoadingspecificOfferWiseCompletedOffer,
    error: errorspecificOfferWiseCompletedOffer,
  } = useSpecificOfferTotalCountsQuery();
  //Per Day Completed Offer
  const [
    countPerDayCompletedOffer,
    setCountPerDayCompletedOffer,
  ] = useState(null);
  const {
    data: regularCompletedOffer,
    isLoading: isLoadingregularCompletedOffer,
    error: errorregularCompletedOffer,
  } = usePerDayCompletedOfferQuery();
  useEffect(() => {
    if (totalOffer) {
      setCountTotalOffer(totalOffer.meta.total);
    }
    if (completedOffer) {
      setCountCompletedOffer(completedOffer.meta.total);
    }
    if (totalAdmins) {
      setCountTotalAdmin(totalAdmins.meta.total);
    }
    if (totalUsers) {
      setCountTotalUser(totalUsers.meta.total);
    }
    if (totalAdvertisers) {
      setCountTotalAdvertiser(totalAdvertisers.meta.total);
    }
    if (regularCompletedOffer) {
      console.log(regularCompletedOffer);
      setCountPerDayCompletedOffer(regularCompletedOffer);
    }
    if (dateWiseCompletedOffer) {
      console.log(dateWiseCompletedOffer);
      setCountDateWiseCompletedOffer(dateWiseCompletedOffer);
    }
    if (dateAndOfferAnduserWiseCompletedOffer) {
      console.log(dateAndOfferAnduserWiseCompletedOffer);
      setCountDateandOfferandUserWiseCompletedOffer(
        dateAndOfferAnduserWiseCompletedOffer
      );
    }
    if (specificUserWiseCompletedOffer) {
      console.log(specificUserWiseCompletedOffer);
      setCountSpecificUserWiseCompletedOffer(specificUserWiseCompletedOffer);
    }
    if (specificOfferWiseCompletedOffer) {
      console.log(specificOfferWiseCompletedOffer);
      setCountSpecificOfferWiseCompletedOffer(specificOfferWiseCompletedOffer);
    }
  }, [
    totalOffer,
    completedOffer,
    totalAdmins,
    totalUsers,
    totalAdvertisers,
    dateWiseCompletedOffer,
    dateAndOfferAnduserWiseCompletedOffer,
    specificUserWiseCompletedOffer,
    regularCompletedOffer,
    specificOfferWiseCompletedOffer
  ]);

  const data = countSpecificUserWiseCompletedOffer?.data ?? [];

  const data2 = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const data01 = countSpecificOfferWiseCompletedOffer?.data;

  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];

  const lineData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Total Offer</h4>
          {isLoadingOffer && <p>Loading...</p>}
          {errorOffer && <p>Error loading offer data</p>}
          <h5 className="font-semibold text-base">{countTotalOffer}</h5>
        </div>
        <div className="bg-gradient-to-r from-amber-200 to-yellow-500 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-">Completed Offer</h4>
          {isLoadingCompleted && <p>Loading...</p>}
          {errorCompleted && <p>Error loading offer data</p>}
          <h5 className="font-semibold text-base">{countCompletedOffer}</h5>
        </div>
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Total Admin</h4>
          {isLoadingAdmins && <p>Loading...</p>}
          {errorAdmins && <p>Error loading offer data</p>}
          <h5 className="font-semibold text-base">{countTotalAdmin}</h5>
        </div>
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-">Total User</h4>
          {isLoadingUsers && <p>Loading...</p>}
          {errorUsers && <p>Error loading offer data</p>}
          <h5 className="font-semibold text-base">{countTotalUser}</h5>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Total Advertiser</h4>
          {isLoadingAdvertisers && <p>Loading...</p>}
          {errorAdvertisers && <p>Error loading offer data</p>}
          <h5 className="font-semibold text-base">{countTotalAdvertiser}</h5>
        </div>
        <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white px-4 py-6 rounded shadow-sm">
          <h4 className="font-bold text-xl">Today Completed Offer</h4>
          <h5 className="font-semibold text-base">{regularCompletedOffer?.data[0]?.TotalCount}</h5>
        </div>
      </div>
      <div className="grid gap-4 mt-5 grid-cols-1 md:grid-cols-2">
        <div className="bg-white px-4 py-6 rounded shadow-sm">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="id" stroke="#8884d8" />
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
              <Bar dataKey="TotalCount" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white px-4 py-6 rounded shadow-sm">
          <ResponsiveContainer width="100%" height={250}>
          <PieChart width={400} height={400}>
          <Pie
            data={data01}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="TotalCount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white px-4 py-6 rounded shadow-sm mt-5">
        <div className="grid gap-4 mt-5 grid-cols-1 md:grid-cols-2">
          <div style={{ width: "100%", height: 300 }}>
           { console.log('area chart',countDateWiseCompletedOffer?.offerInfo)}
            <ResponsiveContainer>
              <AreaChart
                data={countDateWiseCompletedOffer?.data.offerInfo}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div>
          <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr className="text-left">
              <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                No.
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                Offer
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                Completed
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                Date
              </th>
           
            </tr>
          </thead>
          <tbody className="text-gray-700">
            
            {countDateandOfferandUserWiseCompletedOffer?.data.slice(0,7).map((row,idx) => (
              <tr key={idx}>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                  {idx+1}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-xs">
                  {row.name}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.count}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.date}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
