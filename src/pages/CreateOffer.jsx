import { useState, useRef } from "react";
import { TagsInput } from "react-tag-input-component";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateOfferMutation } from "./offerApi";
import { useViewNetworkQuery } from "./NetworkApi";
import { useViewCategoryQuery } from "./CategoryApi";

const CreateOffer = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(["all"]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [CreateOffer] = useCreateOfferMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch networks data
  const {
    data: networks,
    isLoading: networksLoading,
    isError: networksError,
  } = useViewNetworkQuery();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useViewCategoryQuery();

  console.log(categories); // Add this line to check the fetched categories data in console

  const onSubmit = async (data) => {
    const toastId = toast.loading("Offer Creating....");

    try {
      const offerInfo = {
        name: data.name,
        network: data.network,
        category: data.category,
        device: "Mobile",
        country: ["usa"],
        gender: ["male"],
        age: 30,
        offerStatus: data.offerStatus,
        dailyLimit: 100,
        totalLimit: 500,
        price: Number(data.price),
        description: content,
        step: "A string representing the steps to complete the offer",
        image: "https://example.com/image.jpg",
        points: 300,
        completionLimit: 200,
        completionWindow: 300,
        completedCount: 50,
        startDate: "2023-11-01T00:00:00.000Z",
        endDate: "2024-01-31T00:00:00.000Z",
      };
      console.log(offerInfo);
      await CreateOffer(offerInfo);
      toast.success("Successfully Offer Created", {
        id: toastId,
        duration: 2000,
      });

      reset();
      // navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="">
        <form
          className="bg-white p-6 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Offer Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Name"
                required
                {...register("name", { required: "Name is required" })}
              />
            </div>
            <div>
              <label
                htmlFor="offerStatus"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Offer Status
              </label>
              <input
                type="text"
                id="offerStatus"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Offer Status"
                required
                {...register("offerStatus", {
                  required: "Offer Status is required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                defaultValue={""}
                {...register("category", { required: "Category is required" })}
                id="category"
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
                      {category.categoryName}
                    </option>
                  ))}
                {categoriesLoading && <option>Loading...</option>}
                {categoriesError && <option>Error loading categories</option>}
              </select>
            </div>
            <div>
              <label
                htmlFor="network"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Network
              </label>
              <select
                defaultValue={""}
                id="network"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                {...register("network", { required: "Network is required" })}
              >
                <option value="" disabled>
                  Choose a Network
                </option>
                {!networksLoading &&
                  !networksError &&
                  Array.isArray(networks?.data) &&
                  networks.data.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.networkName}
                    </option>
                  ))}
                {networksLoading && <option>Loading...</option>}
                {networksError && <option>Error loading networks</option>}
              </select>
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Company"
                required
                {...register("company", { required: "Company is required" })}
              />
            </div>
            <div>
              <label
                htmlFor="contactNo"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="contactNo"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                {...register("contactNo", {
                  required: "Contact number is required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="123"
                required
                {...register("price", { required: "Price is required" })}
              />
            </div>
            <div>
              <label
                htmlFor="unique"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Unique visitors (per month)
              </label>
              <input
                type="number"
                id="unique"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder=""
                required
                {...register("unique", {
                  required: "Unique visitors count is required",
                })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tags
              </label>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tag"
                placeHolder="Enter tags"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="john.doe@company.com"
                required
                {...register("email", { required: "Email is required" })}
              />
            </div>
          </div>

          <div className="flex items-start mb-6">
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="block mb-2 ml-2 text-sm font-medium text-gray-900"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateOffer;
