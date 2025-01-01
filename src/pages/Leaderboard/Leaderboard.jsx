import React, { useState } from "react";
import Loader from "../../components/Loader";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("usersLadder");

  const usersLadderData = [
    { position: 1, user: "Amy D. Willis", earnings: "$500", bonus: "10%" },
    { position: 2, user: "Linda B. Solis", earnings: "$450", bonus: "8%" },
    { position: 3, user: "Lyn R. Reese", earnings: "$400", bonus: "7%" },
    { position: 4, user: "Mary L. Frank", earnings: "$350", bonus: "5%" },
    { position: 5, user: "Judy J. Castillo", earnings: "$300", bonus: "4%" },
    { position: 6, user: "Peter T. Marshall", earnings: "$280", bonus: "3.5%" },
    { position: 7, user: "Jason M. Payne", earnings: "$260", bonus: "3%" },
    { position: 8, user: "Carol D. Walters", earnings: "$240", bonus: "2.5%" },
    { position: 9, user: "Cynthia J. Russell", earnings: "$220", bonus: "2%" },
    { position: 10, user: "Diana B. Moore", earnings: "$200", bonus: "1.8%" },
    { position: 11, user: "Stephen A. Ross", earnings: "$190", bonus: "1.6%" },
    { position: 12, user: "Hannah P. Young", earnings: "$180", bonus: "1.5%" },
    { position: 13, user: "Daniel L. Carter", earnings: "$170", bonus: "1.4%" },
    {
      position: 14,
      user: "Barbara M. Bennett",
      earnings: "$160",
      bonus: "1.3%",
    },
    { position: 15, user: "Edward F. Kelly", earnings: "$150", bonus: "1.2%" },
    { position: 16, user: "Thomas E. Morgan", earnings: "$140", bonus: "1.1%" },
    { position: 17, user: "Sarah J. Sanders", earnings: "$130", bonus: "1%" },
    { position: 18, user: "Karen C. Hill", earnings: "$120", bonus: "0.9%" },
    { position: 19, user: "James N. Flores", earnings: "$110", bonus: "0.8%" },
    {
      position: 20,
      user: "Christopher M. Murphy",
      earnings: "$100",
      bonus: "0.7%",
    },
    { position: 21, user: "Rachel A. Hall", earnings: "$95", bonus: "0.6%" },
    {
      position: 22,
      user: "Elizabeth D. Perry",
      earnings: "$90",
      bonus: "0.5%",
    },
    { position: 23, user: "Andrew G. Edwards", earnings: "$85", bonus: "0.4%" },
    {
      position: 24,
      user: "Michelle S. Butler",
      earnings: "$80",
      bonus: "0.35%",
    },
    { position: 25, user: "Paul B. Howard", earnings: "$75", bonus: "0.3%" },
    { position: 26, user: "Emily C. Ross", earnings: "$70", bonus: "0.25%" },
    { position: 27, user: "Robert T. Bell", earnings: "$65", bonus: "0.2%" },
    {
      position: 28,
      user: "Sophia L. Jenkins",
      earnings: "$60",
      bonus: "0.15%",
    },
    { position: 29, user: "George W. Ortiz", earnings: "$55", bonus: "0.1%" },
    { position: 30, user: "Victoria K. Ward", earnings: "$50", bonus: "0.09%" },
    { position: 31, user: "John M. Cooper", earnings: "$48", bonus: "0.08%" },
    { position: 32, user: "Angela R. Gray", earnings: "$46", bonus: "0.07%" },
    { position: 33, user: "Samuel F. Bryant", earnings: "$44", bonus: "0.06%" },
    {
      position: 34,
      user: "Charlotte J. Alexander",
      earnings: "$42",
      bonus: "0.05%",
    },
    { position: 35, user: "David B. Foster", earnings: "$40", bonus: "0.04%" },
    {
      position: 36,
      user: "Jessica H. Simmons",
      earnings: "$38",
      bonus: "0.035%",
    },
    {
      position: 37,
      user: "Joshua C. Ramirez",
      earnings: "$36",
      bonus: "0.03%",
    },
    { position: 38, user: "Laura L. Powell", earnings: "$34", bonus: "0.025%" },
    {
      position: 39,
      user: "Richard K. Turner",
      earnings: "$32",
      bonus: "0.02%",
    },
    { position: 40, user: "Susan M. Perry", earnings: "$30", bonus: "0.018%" },
    {
      position: 41,
      user: "Benjamin A. Torres",
      earnings: "$28",
      bonus: "0.016%",
    },
    {
      position: 42,
      user: "Patricia C. Watson",
      earnings: "$26",
      bonus: "0.014%",
    },
    {
      position: 43,
      user: "Alexander D. Brooks",
      earnings: "$24",
      bonus: "0.012%",
    },
    {
      position: 44,
      user: "Olivia N. Sanders",
      earnings: "$22",
      bonus: "0.01%",
    },
    {
      position: 45,
      user: "Nathan R. Howard",
      earnings: "$20",
      bonus: "0.009%",
    },
    {
      position: 46,
      user: "Isabella J. Bryant",
      earnings: "$18",
      bonus: "0.008%",
    },
    {
      position: 47,
      user: "Henry B. Martinez",
      earnings: "$16",
      bonus: "0.007%",
    },
    { position: 48, user: "Grace C. Flores", earnings: "$14", bonus: "0.006%" },
    { position: 49, user: "Ethan W. Bell", earnings: "$12", bonus: "0.005%" },
    {
      position: 50,
      user: "Abigail R. Wilson",
      earnings: "$10",
      bonus: "0.004%",
    },
  ];

  const referralLadderData = [
    { position: 1, user: "Elaine J. Mays", earnings: "$600", referrals: 50 },
    { position: 2, user: "Stacy E. Levi", earnings: "$550", referrals: 45 },
    { position: 3, user: "Ofelia G. McCord", earnings: "$500", referrals: 40 },
    { position: 4, user: "Lucy M. Harris", earnings: "$450", referrals: 35 },
    { position: 5, user: "Phyllis L. Hand", earnings: "$400", referrals: 30 },
    { position: 6, user: "Sunny H. Anderson", earnings: "$390", referrals: 28 },
    { position: 7, user: "Jill C. Herman", earnings: "$380", referrals: 26 },
    { position: 8, user: "Linda D. Young", earnings: "$370", referrals: 25 },
    { position: 9, user: "Wilda M. Young", earnings: "$360", referrals: 24 },
    { position: 10, user: "Nadine C. Diaz", earnings: "$350", referrals: 23 },
    { position: 11, user: "Hilda D. Amann", earnings: "$340", referrals: 22 },
    { position: 12, user: "Carrie F. Broome", earnings: "$330", referrals: 21 },
    { position: 13, user: "Sarah G. Chapman", earnings: "$320", referrals: 20 },
    { position: 14, user: "Annie J. Navarro", earnings: "$310", referrals: 19 },
    {
      position: 15,
      user: "Melissa M. Martin",
      earnings: "$300",
      referrals: 18,
    },
    { position: 16, user: "Mae J. Wells", earnings: "$290", referrals: 17 },
    { position: 17, user: "Nilda D. Offutt", earnings: "$280", referrals: 16 },
    { position: 18, user: "Joyce F. Lewis", earnings: "$270", referrals: 15 },
    {
      position: 19,
      user: "Barbara Z. Carter",
      earnings: "$260",
      referrals: 14,
    },
    { position: 20, user: "Maryjo D. Gaines", earnings: "$250", referrals: 13 },
    {
      position: 21,
      user: "Mary W. Gillespie",
      earnings: "$240",
      referrals: 12,
    },
    { position: 22, user: "Peggy J. Henke", earnings: "$230", referrals: 11 },
    { position: 23, user: "Jessie T. Menard", earnings: "$220", referrals: 10 },
    { position: 24, user: "Peter T. Marshall", earnings: "$210", referrals: 9 },
    { position: 25, user: "Jason M. Payne", earnings: "$200", referrals: 8 },
    { position: 26, user: "Carol D. Walters", earnings: "$190", referrals: 7 },
    {
      position: 27,
      user: "Cynthia J. Russell",
      earnings: "$180",
      referrals: 6,
    },
    { position: 28, user: "Diana B. Moore", earnings: "$170", referrals: 5 },
    { position: 29, user: "Stephen A. Ross", earnings: "$160", referrals: 4 },
    { position: 30, user: "Hannah P. Young", earnings: "$150", referrals: 3 },
    { position: 31, user: "Daniel L. Carter", earnings: "$140", referrals: 3 },
    {
      position: 32,
      user: "Barbara M. Bennett",
      earnings: "$130",
      referrals: 3,
    },
    { position: 33, user: "Edward F. Kelly", earnings: "$120", referrals: 2 },
    { position: 34, user: "Thomas E. Morgan", earnings: "$110", referrals: 2 },
    { position: 35, user: "Sarah J. Sanders", earnings: "$100", referrals: 2 },
    { position: 36, user: "Karen C. Hill", earnings: "$90", referrals: 2 },
    { position: 37, user: "James N. Flores", earnings: "$80", referrals: 2 },
    {
      position: 38,
      user: "Christopher M. Murphy",
      earnings: "$70",
      referrals: 1,
    },
    { position: 39, user: "Rachel A. Hall", earnings: "$60", referrals: 1 },
    { position: 40, user: "Elizabeth D. Perry", earnings: "$50", referrals: 1 },
    { position: 41, user: "Andrew G. Edwards", earnings: "$45", referrals: 1 },
    { position: 42, user: "Michelle S. Butler", earnings: "$40", referrals: 1 },
    { position: 43, user: "Paul B. Howard", earnings: "$35", referrals: 1 },
    { position: 44, user: "Emily C. Ross", earnings: "$30", referrals: 1 },
    { position: 45, user: "Robert T. Bell", earnings: "$25", referrals: 1 },
    { position: 46, user: "Sophia L. Jenkins", earnings: "$20", referrals: 1 },
    { position: 47, user: "George W. Ortiz", earnings: "$15", referrals: 1 },
    { position: 48, user: "Victoria K. Ward", earnings: "$10", referrals: 1 },
    { position: 49, user: "John M. Cooper", earnings: "$5", referrals: 1 },
    { position: 50, user: "Angela R. Gray", earnings: "$2", referrals: 1 },
  ];

  const recentPaymentsData = [
    {
      name: "Amy D. Willis",
      country: "United Kingdom",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "Just now",
    },
    {
      name: "Linda B. Solis",
      country: "United States",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "Just now",
    },
    {
      name: "Lyn R. Reese",
      country: "Canada",
      paymentType: "Litecoin",
      amount: "$27",
      timeAgo: "5 minutes ago",
    },
    {
      name: "Mary L. Frank",
      country: "United States",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "10 minutes ago",
    },
    {
      name: "Judy J. Castillo",
      country: "Greece",
      paymentType: "Bitcoin",
      amount: "$25",
      timeAgo: "15 minutes ago",
    },
    {
      name: "Elaine J. Mays",
      country: "Australia",
      paymentType: "Ethereum",
      amount: "$23",
      timeAgo: "20 minutes ago",
    },
    {
      name: "Stacy E. Levi",
      country: "United States",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "30 minutes ago",
    },
    {
      name: "Ofelia G. McCord",
      country: "United States",
      paymentType: "Bitcoin",
      amount: "$21",
      timeAgo: "45 minutes ago",
    },
    {
      name: "Lucy M. Harris",
      country: "Italy",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "1 hour ago",
    },
    {
      name: "Phyllis L. Hand",
      country: "United Kingdom",
      paymentType: "Litecoin",
      amount: "$15",
      timeAgo: "1.5 hours ago",
    },
    {
      name: "Anita J. Rowsey",
      country: "Canada",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "2 hours ago",
    },
    {
      name: "Sunny H. Anderson",
      country: "Norway",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "3 hours ago",
    },
    {
      name: "Jill C. Herman",
      country: "Poland",
      paymentType: "Bitcoin",
      amount: "$20",
      timeAgo: "4 hours ago",
    },
    {
      name: "Linda D. Young",
      country: "United States",
      paymentType: "Litecoin",
      amount: "$22",
      timeAgo: "5 hours ago",
    },
    {
      name: "Wilda M. Young",
      country: "Romania",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "6 hours ago",
    },
    {
      name: "Nadine C. Diaz",
      country: "United States",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "7 hours ago",
    },
    {
      name: "Hilda D. Amann",
      country: "United Kingdom",
      paymentType: "Bitcoin",
      amount: "$21",
      timeAgo: "8 hours ago",
    },
    {
      name: "Carrie F. Broome",
      country: "Canada",
      paymentType: "Ethereum",
      amount: "$23",
      timeAgo: "9 hours ago",
    },
    {
      name: "Sarah G. Chapman",
      country: "Australia",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "10 hours ago",
    },
    {
      name: "Annie J. Navarro",
      country: "Austria",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "11 hours ago",
    },
    {
      name: "Melissa M. Martin",
      country: "United States",
      paymentType: "Bitcoin",
      amount: "$10",
      timeAgo: "12 hours ago",
    },
    {
      name: "Mae J. Wells",
      country: "United States",
      paymentType: "Ethereum",
      amount: "$20",
      timeAgo: "13 hours ago",
    },
    {
      name: "Nilda D. Offutt",
      country: "Bulgaria",
      paymentType: "Litecoin",
      amount: "$22",
      timeAgo: "14 hours ago",
    },
    {
      name: "Joyce F. Lewis",
      country: "United States",
      paymentType: "Ethereum",
      amount: "$24",
      timeAgo: "15 hours ago",
    },
    {
      name: "Barbara Z. Carter",
      country: "Australia",
      paymentType: "Bitcoin",
      amount: "$20",
      timeAgo: "16 hours ago",
    },
    {
      name: "Maryjo D. Gaines",
      country: "United Kingdom",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "17 hours ago",
    },
    {
      name: "Mary W. Gillespie",
      country: "Canada",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "18 hours ago",
    },
    {
      name: "Peggy J. Henke",
      country: "United States",
      paymentType: "Bitcoin",
      amount: "$26",
      timeAgo: "19 hours ago",
    },
    {
      name: "Jessie T. Menard",
      country: "United Kingdom",
      paymentType: "Litecoin",
      amount: "$25",
      timeAgo: "20 hours ago",
    },
    {
      name: "Steven B. Ward",
      country: "Germany",
      paymentType: "Ethereum",
      amount: "$30",
      timeAgo: "21 hours ago",
    },
    {
      name: "Rachel E. Hall",
      country: "France",
      paymentType: "PayPal",
      amount: "$19",
      timeAgo: "22 hours ago",
    },
    {
      name: "Jacob T. Morgan",
      country: "Italy",
      paymentType: "Bitcoin",
      amount: "$18",
      timeAgo: "23 hours ago",
    },
    {
      name: "Victoria D. Knight",
      country: "Netherlands",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "1 day ago",
    },
    {
      name: "Chris P. Wilson",
      country: "Switzerland",
      paymentType: "Litecoin",
      amount: "$17",
      timeAgo: "1 day ago",
    },
    {
      name: "Susan M. Adams",
      country: "Ireland",
      paymentType: "Ethereum",
      amount: "$25",
      timeAgo: "1 day ago",
    },
    {
      name: "Paul T. James",
      country: "United States",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "2 days ago",
    },
    {
      name: "Elizabeth R. Brown",
      country: "Norway",
      paymentType: "Bitcoin",
      amount: "$15",
      timeAgo: "2 days ago",
    },
    {
      name: "Michael L. Martinez",
      country: "Spain",
      paymentType: "Litecoin",
      amount: "$30",
      timeAgo: "2 days ago",
    },
    {
      name: "Emily C. King",
      country: "Portugal",
      paymentType: "Ethereum",
      amount: "$23",
      timeAgo: "2 days ago",
    },
    {
      name: "Andrew G. Davis",
      country: "Sweden",
      paymentType: "PayPal",
      amount: "$20",
      timeAgo: "3 days ago",
    },
    {
      name: "Sophia H. Roberts",
      country: "Denmark",
      paymentType: "Bitcoin",
      amount: "$22",
      timeAgo: "3 days ago",
    },
    {
      name: "John T. Clark",
      country: "Finland",
      paymentType: "Litecoin",
      amount: "$24",
      timeAgo: "3 days ago",
    },
    {
      name: "Laura Z. Lee",
      country: "United States",
      paymentType: "Ethereum",
      amount: "$26",
      timeAgo: "3 days ago",
    },
    {
      name: "Peter J. Hall",
      country: "Canada",
      paymentType: "PayPal",
      amount: "$27",
      timeAgo: "4 days ago",
    },
    {
      name: "Hannah W. Nelson",
      country: "United Kingdom",
      paymentType: "Bitcoin",
      amount: "$28",
      timeAgo: "4 days ago",
    },
    {
      name: "George R. Smith",
      country: "Germany",
      paymentType: "Litecoin",
      amount: "$25",
      timeAgo: "4 days ago",
    },
    {
      name: "Sophia L. Turner",
      country: "United States",
      paymentType: "PayPal",
      amount: "$19",
      timeAgo: "5 days ago",
    },
    {
      name: "Anna D. Moore",
      country: "Australia",
      paymentType: "Ethereum",
      amount: "$22",
      timeAgo: "5 days ago",
    },
    {
      name: "Paul Z. Foster",
      country: "France",
      paymentType: "Litecoin",
      amount: "$21",
      timeAgo: "5 days ago",
    },
  ];

  const isLoading = false; // Replace with actual loading state
  const error = null; // Replace with actual error state
  const isRecentLoading = false; // Replace with actual loading state for recent data
  const recentError = null; // Replace with actual error state for recent data

  const renderTableContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <p>Error loading data: {error.message}</p>;
    }

    if (activeTab === "usersLadder") {
      return (
        <table className="min-w-full leading-normal text-center">
        <thead className="text-center">
          <tr className="bg-buttonBackground text-white text-center">
            <th className="px-4 py-4">Position</th>
            <th className="px-4 py-4">User</th>
            <th className="px-4 py-4">Earnings</th>
            <th className="px-4 py-4">Potential Bonus</th>
          </tr>
        </thead>
        <tbody>
          {usersLadderData.length > 0 ? (
            usersLadderData.map((user, index) => (
              <tr key={index} className="bg-primaryColor text-white border-b text-center">
                <td className="px-4 py-4 text-center">{user.position}</td>
                <td className="px-4 py-4 text-center">{user.user}</td>
                <td className="px-4 py-4 text-center">{user.earnings}</td>
                <td className="px-4 py-4 text-center">
                  <span className="text-yellow-600 font-semibold">
                    {user.bonus}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      );
    }

    if (activeTab === "referralLadder") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-buttonBackground text-white">
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Earnings</th>
              <th className="px-4 py-2">Referrals</th>
            </tr>
          </thead>
          <tbody>
            {referralLadderData.length > 0 ? (
              referralLadderData.map((user, index) => (
                <tr key={index} className="bg-primaryColor border-b text-white text-center">
                  <td className="px-4 py-4">{user.position}</td>
                  <td className="px-4 py-4">{user.user}</td>
                  <td className="px-4 py-4">{user.earnings}</td>
                  <td className="px-4 py-4">{user.referrals}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }

    if (activeTab === "recentCompletions") {
      return (
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-buttonBackground text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Payment Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Time Ago</th>
            </tr>
          </thead>
          <tbody>
            {isRecentLoading ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  Loading recent completions...
                </td>
              </tr>
            ) : recentError ? (
              recentError.status === 404 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center">
                    No recent payments found in the last 3 hours.
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center">
                    Error loading recent completions:{" "}
                    {recentError?.message || "Unknown error"}
                  </td>
                </tr>
              )
            ) : recentPaymentsData.length > 0 ? (
              recentPaymentsData.map((payment, index) => (
                <tr key={index} className="bg-primaryColor border-b text-white text-center">
                  <td className="px-4 py-4">{payment.name || "Anonymous"}</td>
                  <td className="px-4 py-4">
                    {payment.paymentType || "Unknown Task"}
                  </td>
                  <td className="px-4 py-4">{payment.amount || "0.00"}</td>
                  <td className="px-4 py-4">{payment.timeAgo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  No recent completions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="p-4 bg-primaryColor min-h-screen">
      <div className="max-w-6xl mx-auto bg-secondaryColor rounded-lg shadow-md overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex bg-secondaryColor p-4 gap-1">
          <button
            onClick={() => setActiveTab("usersLadder")}
            className={`px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none ${
              activeTab === "usersLadder"
                ? "bg-buttonBackground"
                : "bg-primaryColor"
            }`}
          >
            Users Ladder
          </button>
          <button
            onClick={() => setActiveTab("referralLadder")}
            className={`px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none ${
              activeTab === "referralLadder"
                ? "bg-buttonBackground"
                : "bg-primaryColor"
            }`}
          >
            Referral Ladder
          </button>
          <button
            onClick={() => setActiveTab("recentCompletions")}
            className={`px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none ${
              activeTab === "recentCompletions"
                ? "bg-buttonBackground"
                : "bg-primaryColor"
            }`}
          >
            Recent Completions
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">{renderTableContent()}</div>
      </div>
    </div>
  );
};

export default Leaderboard;
