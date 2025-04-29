import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBlogCategoryMutation } from "./blogCategory/BlogCategoryApi";


const CreateBlogCategory = () => {
  const [createBlogCategory] = useCreateBlogCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating Blog Category...");

    try {
      const blogCategoryInfo = {
        blogCategoryName: data.categoryName,
      };
      await createBlogCategory(blogCategoryInfo);

      toast.success("Blog Category created successfully!", {
        id: toastId,
        duration: 2000,
      });

      reset(); // Clear form after success
    } catch (error) {
      toast.error("Something went wrong.", {
        id: toastId,
        duration: 2000,
      });
      // console.error("Error creating blog category:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <form
        className="bg-secondaryColor p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="categoryName"
              className="block mb-2 text-sm font-medium text-white"
            >
              Blog Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter blog category"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              {...register("categoryName", {
                required: "Blog category name is required",
              })}
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="ml-auto text-white bg-buttonBackground hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-24 px-5 py-2.5 text-center dark:bg-buttonBackground dark:hover:bg-green-500 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogCategory;
