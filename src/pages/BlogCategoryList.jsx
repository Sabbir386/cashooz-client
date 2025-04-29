import React, { useState } from "react";

import { toast } from "sonner";
import Swal from "sweetalert2";

import {
  useDeleteBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useViewBlogCategoryQuery,
} from "./blogCategory/BlogCategoryApi";



const BlogCategoryList = () => {
  const { data, isLoading } = useViewBlogCategoryQuery();
  const [deleteBlogCategory] = useDeleteBlogCategoryMutation();
  const [updateBlogCategory] = useUpdateBlogCategoryMutation();

  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <p>Loading...</p>;

  const handleEditClick = (category) => {
    setEditData(category);
    setUpdatedName(category.categoryName);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBlogCategory(id);
        toast.success("Category deleted");
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await updateBlogCategory({ id: editData._id, blogCategoryName: updatedName });
      toast.success("Category updated");
      setIsModalOpen(false);
    } catch {
      toast.error("Update failed");
    }
  };

  // Pagination Logic
  
  const blogCategories = data?.data || []; // Extract actual array

const totalPages = Math.ceil(blogCategories.length / itemsPerPage);

const paginatedData = blogCategories.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        All Blog category List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-darkMode border border-gray-700">
          <thead>
            <tr className="text-green-500 text-left border-b border-gray-600">
              <th className="p-3">SL.</th>
              <th className="p-3">OFFER</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {paginatedData?.map((category, index) => (
              <tr key={category._id} className="border-t border-gray-700">
                <td className="p-3">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3">{category.blogCategoryName}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEditClick(category)}
                  >
                    🖉
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(category._id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4 text-green-500">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 ${
                  currentPage === i + 1 ? "text-blue-500 font-bold" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Edit Category</h3>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCategoryList;
