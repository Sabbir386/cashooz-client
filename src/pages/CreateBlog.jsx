import { useState, useRef } from "react";
import { TagsInput } from "react-tag-input-component";
import JoditEditor from "jodit-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useViewBlogCategoryQuery } from "./blogCategory/BlogCategoryApi";
import { useCreateBlogPostMutation } from "./blogPost/blogPostApi";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useSingleNormalUserQuery } from "../redux/features/auth/authApi";
import { useSingleAdminQuery } from "./adminApi";

const CreateBlog = () => {
  const editor = useRef(null);
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState(
    "https://gigapress.net/wp-content/uploads/2022/02/get-featured-image-url.jpg"
  );
  const [content, setContent] = useState("");

  const { register, handleSubmit, setValue, control, reset } = useForm();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useViewBlogCategoryQuery();
  const [createBlogPost] = useCreateBlogPostMutation();
  const token = useAppSelector(useCurrentToken);
  
   
    let user;
    if (token) {
      user = verifyToken(token);
    }
    const {
        data: userData,
        isLoading: isUserLoading,
        error: userError,
      } = useSingleNormalUserQuery(user?.objectId, {
        skip: user?.role !== "user", 
      });

      const { data: adminData, isLoading: isAdminLoading,
        error: adminError, } = useSingleAdminQuery(user?.objectId, {
          skip: user?.role !== "admin"
        });

  const handleTitleKeyUp = (e) => {
    const value = e.target.value;
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
    );
    setValue("slug", slug);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating blog post...");

    try {
      const image = data.image;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cashooz");
      formData.append("cloud_name", "djkk46gdh");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/djkk46gdh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await uploadRes.json();

      if (imageData.url) {
        const blogPost = {
          title: data.name,
          content: "Detailed guide here...",
          slug: slug,
          categoryId: data.category,
          postThumbnail: imageData.url,
          postDetails: content,
          status: "published",
          tags: ["affiliate", "marketing", "cashooz"],
          authorName: "cashooz team",
          authorImage: "https://ibb.co.com/MDQrXysg", 
          coverImage: "https://i.ibb.co/M2FRJKZ/user.png",
        };
        // console.log(blogPost);
        await createBlogPost(blogPost);
        toast.success("Blog post created successfully!", { id: toastId });
        reset();
        setContent("");
        setImagePreview(
          "https://gigapress.net/wp-content/uploads/2022/02/get-featured-image-url.jpg"
        );
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div>
      <form
        className="bg-secondaryColor p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Post Title
            </label>
            <input
              type="text"
              placeholder="Post title"
              onKeyUp={handleTitleKeyUp}
              {...register("name", { required: "Title is required" })}
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
            />

            <label className="block mb-2 text-sm font-medium text-white mt-4">
              Post Slug
            </label>
            <input
              type="text"
              value={slug}
              readOnly
              {...register("slug")}
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Blog Category
            </label>
            <select
              defaultValue=""
              {...register("category", { required: "Category is required" })}
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {!categoriesLoading &&
                !categoriesError &&
                Array.isArray(categories?.data) &&
                categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.blogCategoryName}
                  </option>
                ))}
              {categoriesLoading && <option>Loading...</option>}
              {categoriesError && <option>Error loading categories</option>}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-white">
              Post Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border-0 bg-transparent border-b-2 border-b-blue-500 w-full text-black focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-80 rounded-md mx-auto object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-start mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Post Details
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              required
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
          </div>
          <label
            htmlFor="remember"
            className="block mb-2 ml-2 text-sm font-medium text-white"
          >
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-buttonBackground hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
