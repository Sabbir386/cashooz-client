import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateOfferMutation } from "./offerApi";

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

  const onSubmit = async (data) => {
    const toastId = toast.loading("Offer Creating....");

    try {
      const offerInfo = {
        name: data.name,
        network: [data.network],
        category: [data.category],
        device: "Mobile",
        country: ["usa"],
        gender: ["male"],
        age: 30,
        offerStatus: data.offerStatus,
        dailyLimit: 100,
        totalLimit: 500,
        price: Number(data.price),
        description: content,
        step: "A string representing the steps to complete the offe",
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
      // reset();
      toast.success("Successfully Offer Created", {
        id: toastId,
        duration: 2000,
      });

      // navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log("err-", error);
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
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Offer Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="name"
                required
                {...register("name", {
                  required: "id is Required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
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
                  required: "id is Required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                defaultValue={""}
                {...register("category", {
                  required: "id is Required",
                })}
                id="category"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              >
                <option selected>Choose a Category</option>
                <option value={"Referral Rewards"}>Referral Rewards</option>
                <option value={"First-Time Buyer Offers"}>
                  First-Time Buyer Offers
                </option>
                <option value={"Happy Hour Discounts"}>
                  Happy Hour Discounts
                </option>
                <option value={"Daily Deals"}>Daily Deals</option>
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
                {...register("network", {
                  required: "id is Required",
                })}
              >
                <option value={""}>Choose a Network</option>
                <option value="network 1">network 1</option>
                <option value="network 2">network 2</option>
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
                placeholder="Flowbite"
                required
                {...register("company", {
                  required: "id is Required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
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
                  required: "id is Required",
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
                {...register("price", {
                  required: "id is Required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="visitors"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Unique visitors (per month)
              </label>
              <input
                type="number"
                id="visitors"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder=""
                required
                {...register("unique", {
                  required: "id is Required",
                })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tags
              </label>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tag"
                placeHolder="enter tags"
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
                {...register("email", {
                  required: "id is Required",
                })}
              />
            </div>
          </div>

          <div className="flex items-start mb-6">
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
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

      {/* <form
        action=""
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md"
      >
        <div className="mb-3">
          <label htmlhtmlFor="" className="text-sm ">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-400 outline-none px-3 py-2 rounded-md w-full focus:border-blue-700 text-sm"
          />
        </div>
        <div className="mb-3">
          <label htmlhtmlFor="" className="text-sm ">
            Select Network
          </label>
          <select className="border border-gray-400 outline-none px-3 py-2 rounded-md w-full focus:border-blue-700 text-sm">
            <option value="">Popular Offer</option>
            <option value="">Trusted Popular Offer</option>
            <option value="">Exclusive Offer</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlhtmlFor="" className="text-sm ">
            Category
          </label>
          <select className="border border-gray-400 outline-none px-3 py-2 rounded-md w-full focus:border-blue-700 text-sm">
            <option value="">Instaleed Apps</option>
            <option value="">Play Games</option>
            <option value="">Surveys</option>
          </select>
        </div>
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 flex items-center"
              >
                <span className="text-sm">{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v6a1 1 0 102 0V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <input
              type="text"
              placeholder="Enter tags..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="border border-gray-300 rounded px-3 py-1"
            />
          </div>
        </div>
      </form> */}
    </>
  );
};

export default CreateOffer;
