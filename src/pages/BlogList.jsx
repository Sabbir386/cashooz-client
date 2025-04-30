import React, { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useDeleteBlogPostMutation, useUpdateBlogPostMutation, useViewBlogPostQuery } from "./blogPost/blogPostApi";
import CustomSwal from "../customSwal/customSwal";
// Update this path if needed

const BlogPostList = () => {
  const { data, isLoading } = useViewBlogPostQuery();
  const [deleteBlogPost] = useDeleteBlogPostMutation();
  const [updateBlogPost] = useUpdateBlogPostMutation();

  const [editData, setEditData] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <p>Loading...</p>;

  const handleEditClick = (post) => {
    setEditData(post);
    setUpdatedTitle(post.title);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await CustomSwal.fire({
      title: "Are you sure?",
      text: "This blog post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBlogPost(id);
        toast.success("Blog post deleted");
      } catch {
        toast.error("Failed to delete");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await updateBlogPost({ id: editData._id, title: updatedTitle });
      toast.success("Blog post updated");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update");
    }
  };

  const blogPosts = data?.data || [];
  console.log(blogPosts)
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const paginatedData = blogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold text-white mb-4">All Blog Post List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-darkMode border border-gray-700">
          <thead>
            <tr className="text-green-500 text-left border-b border-gray-600">
              <th className="p-3">SL.</th>
              <th className="p-3">TITLE</th>
              <th className="p-3">Author-Name</th>
              <th className="p-3">Category-Name</th>
              
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {paginatedData?.map((post, index) => (
              <tr key={post._id} className="border-t border-gray-700">
                <td className="p-3">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.authorName}</td>
                <td className="p-3">{post.categoryId.blogCategoryName}</td>
                
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEditClick(post)}
                  >
                    🖉
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(post._id)}
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
            <h3 className="text-lg font-bold mb-4">Edit Blog Post</h3>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
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

export default BlogPostList;
