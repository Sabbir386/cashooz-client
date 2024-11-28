import React from "react";
import Swal from "sweetalert2";
import {
  useGetAllSocialMediaPostsQuery,
  useDeleteSocialMediaPostMutation,
  useUpdateSocialMediaPostStatusMutation,
} from "./socialmediaPostApi";

const SocialMediaPage = () => {
  const {
    data: socialMediaLinks,
    isLoading,
    isError,
    refetch,
  } = useGetAllSocialMediaPostsQuery();
  console.log(socialMediaLinks);
  const [deleteSocialMediaPost] = useDeleteSocialMediaPostMutation();
  const [updateSocialMediaPostStatus] =
    useUpdateSocialMediaPostStatusMutation();

  const handleStatusChange = async (id, newStatus) => {
    console.log(id, newStatus);
    try {
      await updateSocialMediaPostStatus({
        postId: id,
        status: newStatus,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `The status has been successfully updated to "${newStatus}".`,
        timer: 2000,
        showConfirmButton: false,
      });

      refetch(); // Refetch to reflect the updated status
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the status. Please try again later.",
      });
    }
  };

  const handleDeleteLink = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSocialMediaPost(id).unwrap();

          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "The post has been deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });

          refetch(); // Refetch to update the table
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the post. Please try again later.",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load social media posts. Please try again later.
      </p>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full overflow-x-auto">
      <h3 className="text-white text-2xl font-bold mb-6">Social Media Links</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-white border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 border border-gray-600">Name</th>
              <th className="px-4 py-2 border border-gray-600">User Email</th>
              <th className="px-4 py-2 border border-gray-600">Platform</th>
              <th className="px-4 py-2 border border-gray-600">Link</th>
              <th className="px-4 py-2 border border-gray-600">Status</th>
              <th className="px-4 py-2 border border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {socialMediaLinks?.map((link) => (
              <tr
                key={link._id}
                className={`${
                  link._id % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500`}
              >
                <td className="px-4 py-2 border border-gray-600">
                  {link.userName}
                </td>
                <td className="px-4 py-2 border border-gray-600 cursor-not-allowed">
                  <span className="text-gray-400">{link.email}</span>
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {link.platform}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <a
                    href={link.link}
                    className="text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.link}
                  </a>
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <select
                    value={link.status}
                    onChange={
                      (e) => handleStatusChange(link._id, e.target.value) // Use _id here
                    }
                    className={`bg-gray-700 text-white border border-gray-600 rounded p-1 ${
                      link.status === "completed" ? "cursor-not-allowed" : ""
                    }`}
                    disabled={link.status === "completed"}
                  >
                    <option value="Pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="invalid-link">Invalid Link</option>
                  </select>
                </td>

                <td className="px-4 py-2 border border-gray-600">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded"
                    onClick={() => handleDeleteLink(link._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SocialMediaPage;
