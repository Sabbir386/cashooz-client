import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useViewNormalUsersQuery } from "../redux/features/auth/authApi";


const ViewUserList = () => {
  // Use the Redux query hook to fetch data
  const { data: users, error, isLoading } = useViewNormalUsersQuery();

  console.log(users);
  const [data, setData] = useState([]);

  // Update state when users data is available
  useEffect(() => {
    if (users) {
      setData(users.data);
    }
  }, [users]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Number of items per page
  const offset = currentPage * pageSize;

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // If data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Paginated data
  const paginatedData = data.slice(offset, offset + pageSize);

  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-800">
          <tr className="text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              ID
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Name
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Gender
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              ContactNo
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.id}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-lg object-cover"
                      src={Product}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium whitespace-no-wrap"></p>
                    <p className="text-gray-600 whitespace-no-wrap"></p>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {row.fullName}
                    </td>
                  </div>
                </div>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.gender}
              </td>

              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {row.contactNo}
              </td>

              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div>
                  <Link
                    to={`/dashboard/edit-offer/${row._id}`}
                    className="py-1 px-2 bg-blue-500 rounded text-white"
                  >
                    Edit
                  </Link>
                  <Link className="py-1 px-2 bg-red-500 rounded text-white ml-2">
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="flex mt-5 gap-3"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(data.length / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ViewUserList;
