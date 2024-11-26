import React, { useState } from 'react';

const SocialMediaPage = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { id: 1, name: 'Sabbir', platform: 'Facebook', link: 'https://facebook.com', status: 'Pending', userEmail: 'user1@example.com' },
    { id: 2, name: 'Rony', platform: 'Instagram', link: 'https://instagram.com', status: 'Completed', userEmail: 'user2@example.com' },
    { id: 3, name: 'Amit', platform: 'Twitter', link: 'https://twitter.com', status: 'Pending', userEmail: 'user3@example.com' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setSocialMediaLinks(prevLinks =>
      prevLinks.map(link =>
        link.id === id ? { ...link, status: newStatus } : link
      )
    );
  };

  const handleDeleteLink = (id) => {
    setSocialMediaLinks(socialMediaLinks.filter(link => link.id !== id));
  };

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
            {socialMediaLinks.map((link) => (
              <tr
                key={link.id}
                className={`${
                  link.id % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500`}
              >
                <td className="px-4 py-2 border border-gray-600">{link.name}</td>
                <td className="px-4 py-2 border border-gray-600 cursor-not-allowed">
                  <span className="text-gray-400">{link.userEmail}</span>
                </td>
                <td className="px-4 py-2 border border-gray-600">{link.platform}</td>
                <td className="px-4 py-2 border border-gray-600">
                  <a href={link.link} className="text-blue-400" target="_blank" rel="noopener noreferrer">
                    {link.link}
                  </a>
                </td>
                
                <td className="px-4 py-2 border border-gray-600">
                  <select
                    value={link.status}
                    onChange={(e) => handleStatusChange(link.id, e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded"
                    onClick={() => handleDeleteLink(link.id)}
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
