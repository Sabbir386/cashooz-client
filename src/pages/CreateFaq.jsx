import { useState, useRef, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import JoditEditor from "jodit-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateOfferMutation } from "./offerApi";
import { useViewNetworkQuery } from "./NetworkApi";
import { useViewCategoryQuery } from "./CategoryApi";
import Select from "react-select";

const CreateFaq = () => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState("https://avatar.iran.liara.run/public");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [CreateOffer] = useCreateOfferMutation();
  const handleTitleKeyUp = (e) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')  // Remove invalid chars
        .replace(/\s+/g, '-')          // Replace spaces with -
        .replace(/-+/g, '-')            // Replace multiple - with single -
    );
  };
  const [tags, setTags] = useState([
    { value: "all", label: "all" },
    { value: "AD", label: "AD" },
    { value: "AE", label: "AE" },
    { value: "AF", label: "AF" },
    { value: "AG", label: "AG" },
    { value: "AI", label: "AI" },
    { value: "AL", label: "AL" },
    { value: "AM", label: "AM" },
    { value: "AO", label: "AO" },
    { value: "AQ", label: "AQ" },
    { value: "AR", label: "AR" },
    { value: "AS", label: "AS" },
    { value: "AT", label: "AT" },
    { value: "AU", label: "AU" },
    { value: "AW", label: "AW" },
    { value: "AX", label: "AX" },
    { value: "AZ", label: "AZ" },
    { value: "BA", label: "BA" },
    { value: "BB", label: "BB" },
    { value: "BD", label: "BD" },
    { value: "BE", label: "BE" },
    { value: "BF", label: "BF" },
    { value: "BG", label: "BG" },
    { value: "BH", label: "BH" },
    { value: "BI", label: "BI" },
    { value: "BJ", label: "BJ" },
    { value: "BL", label: "BL" },
    { value: "BM", label: "BM" },
    { value: "BN", label: "BN" },
    { value: "BO", label: "BO" },
    { value: "BQ", label: "BQ" },
    { value: "BR", label: "BR" },
    { value: "BS", label: "BS" },
    { value: "BT", label: "BT" },
    { value: "BV", label: "BV" },
    { value: "BW", label: "BW" },
    { value: "BY", label: "BY" },
    { value: "BZ", label: "BZ" },
    { value: "CA", label: "CA" },
    { value: "CC", label: "CC" },
    { value: "CD", label: "CD" },
    { value: "CF", label: "CF" },
    { value: "CG", label: "CG" },
    { value: "CH", label: "CH" },
    { value: "CI", label: "CI" },
    { value: "CK", label: "CK" },
    { value: "CL", label: "CL" },
    { value: "CM", label: "CM" },
    { value: "CN", label: "CN" },
    { value: "CO", label: "CO" },
    { value: "CR", label: "CR" },
    { value: "CU", label: "CU" },
    { value: "CV", label: "CV" },
    { value: "CW", label: "CW" },
    { value: "CX", label: "CX" },
    { value: "CY", label: "CY" },
    { value: "CZ", label: "CZ" },
    { value: "DE", label: "DE" },
    { value: "DJ", label: "DJ" },
    { value: "DK", label: "DK" },
    { value: "DM", label: "DM" },
    { value: "DO", label: "DO" },
    { value: "DZ", label: "DZ" },
    { value: "EC", label: "EC" },
    { value: "EE", label: "EE" },
    { value: "EG", label: "EG" },
    { value: "EH", label: "EH" },
    { value: "ER", label: "ER" },
    { value: "ES", label: "ES" },
    { value: "ET", label: "ET" },
    { value: "FI", label: "FI" },
    { value: "FJ", label: "FJ" },
    { value: "FM", label: "FM" },
    { value: "FO", label: "FO" },
    { value: "FR", label: "FR" },
    { value: "GA", label: "GA" },
    { value: "GB", label: "GB" },
    { value: "GD", label: "GD" },
    { value: "GE", label: "GE" },
    { value: "GF", label: "GF" },
    { value: "GG", label: "GG" },
    { value: "GH", label: "GH" },
    { value: "GI", label: "GI" },
    { value: "GL", label: "GL" },
    { value: "GM", label: "GM" },
    { value: "GN", label: "GN" },
    { value: "GP", label: "GP" },
    { value: "GQ", label: "GQ" },
    { value: "GR", label: "GR" },
    { value: "GT", label: "GT" },
    { value: "GU", label: "GU" },
    { value: "GW", label: "GW" },
    { value: "GY", label: "GY" },
    { value: "HK", label: "HK" },
    { value: "HM", label: "HM" },
    { value: "HN", label: "HN" },
    { value: "HR", label: "HR" },
    { value: "HT", label: "HT" },
    { value: "HU", label: "HU" },
    { value: "ID", label: "ID" },
    { value: "IE", label: "IE" },
    { value: "IL", label: "IL" },
    { value: "IM", label: "IM" },
    { value: "IN", label: "IN" },
    { value: "IO", label: "IO" },
    { value: "IQ", label: "IQ" },
    { value: "IR", label: "IR" },
    { value: "IS", label: "IS" },
    { value: "IT", label: "IT" },
    { value: "JE", label: "JE" },
    { value: "JM", label: "JM" },
    { value: "JO", label: "JO" },
    { value: "JP", label: "JP" },
    { value: "KE", label: "KE" },
    { value: "KG", label: "KG" },
    { value: "KH", label: "KH" },
    { value: "KI", label: "KI" },
    { value: "KM", label: "KM" },
    { value: "KN", label: "KN" },
    { value: "KP", label: "KP" },
    { value: "KR", label: "KR" },
    { value: "KW", label: "KW" },
    { value: "KY", label: "KY" },
    { value: "KZ", label: "KZ" },
    { value: "LA", label: "LA" },
    { value: "LB", label: "LB" },
    { value: "LC", label: "LC" },
    { value: "LI", label: "LI" },
    { value: "LK", label: "LK" },
    { value: "LR", label: "LR" },
    { value: "LS", label: "LS" },
    { value: "LT", label: "LT" },
    { value: "LU", label: "LU" },
    { value: "LV", label: "LV" },
    { value: "LY", label: "LY" },
    { value: "MA", label: "MA" },
    { value: "MC", label: "MC" },
    { value: "MD", label: "MD" },
    { value: "ME", label: "ME" },
    { value: "MF", label: "MF" },
    { value: "MG", label: "MG" },
    { value: "MH", label: "MH" },
    { value: "MK", label: "MK" },
    { value: "ML", label: "ML" },
    { value: "MM", label: "MM" },
    { value: "MN", label: "MN" },
    { value: "MO", label: "MO" },
    { value: "MP", label: "MP" },
    { value: "MQ", label: "MQ" },
    { value: "MR", label: "MR" },
    { value: "MS", label: "MS" },
    { value: "MT", label: "MT" },
    { value: "MU", label: "MU" },
    { value: "MV", label: "MV" },
    { value: "MW", label: "MW" },
    { value: "MX", label: "MX" },
    { value: "MY", label: "MY" },
    { value: "MZ", label: "MZ" },
    { value: "NA", label: "NA" },
    { value: "NC", label: "NC" },
    { value: "NE", label: "NE" },
    { value: "NF", label: "NF" },
    { value: "NG", label: "NG" },
    { value: "NI", label: "NI" },
    { value: "NL", label: "NL" },
    { value: "NO", label: "NO" },
    { value: "NP", label: "NP" },
    { value: "NR", label: "NR" },
    { value: "NU", label: "NU" },
    { value: "NZ", label: "NZ" },
    { value: "OM", label: "OM" },
    { value: "PA", label: "PA" },
    { value: "PE", label: "PE" },
    { value: "PF", label: "PF" },
    { value: "PG", label: "PG" },
    { value: "PH", label: "PH" },
    { value: "PK", label: "PK" },
    { value: "PL", label: "PL" },
    { value: "PM", label: "PM" },
    { value: "PN", label: "PN" },
    { value: "PR", label: "PR" },
    { value: "PT", label: "PT" },
    { value: "PW", label: "PW" },
    { value: "PY", label: "PY" },
    { value: "QA", label: "QA" },
    { value: "RE", label: "RE" },
    { value: "RO", label: "RO" },
    { value: "RS", label: "RS" },
    { value: "RU", label: "RU" },
    { value: "RW", label: "RW" },
    { value: "SA", label: "SA" },
    { value: "SB", label: "SB" },
    { value: "SC", label: "SC" },
    { value: "SD", label: "SD" },
    { value: "SE", label: "SE" },
    { value: "SG", label: "SG" },
    { value: "SH", label: "SH" },
    { value: "SI", label: "SI" },
    { value: "SJ", label: "SJ" },
    { value: "SK", label: "SK" },
    { value: "SL", label: "SL" },
    { value: "SM", label: "SM" },
    { value: "SN", label: "SN" },
    { value: "SO", label: "SO" },
    { value: "SR", label: "SR" },
    { value: "SS", label: "SS" },
    { value: "ST", label: "ST" },
    { value: "SV", label: "SV" },
    { value: "SX", label: "SX" },
    { value: "SY", label: "SY" },
    { value: "SZ", label: "SZ" },
    { value: "TC", label: "TC" },
    { value: "TD", label: "TD" },
    { value: "TF", label: "TF" },
    { value: "TG", label: "TG" },
    { value: "TH", label: "TH" },
    { value: "TJ", label: "TJ" },
    { value: "TK", label: "TK" },
    { value: "TL", label: "TL" },
    { value: "TM", label: "TM" },
    { value: "TN", label: "TN" },
    { value: "TO", label: "TO" },
    { value: "TR", label: "TR" },
    { value: "TT", label: "TT" },
    { value: "TV", label: "TV" },
    { value: "TW", label: "TW" },
    { value: "TZ", label: "TZ" },
    { value: "UA", label: "UA" },
    { value: "UG", label: "UG" },
    { value: "UM", label: "UM" },
    { value: "US", label: "US" },
    { value: "UY", label: "UY" },
    { value: "UZ", label: "UZ" },
    { value: "VA", label: "VA" },
    { value: "VC", label: "VC" },
    { value: "VE", label: "VE" },
    { value: "VG", label: "VG" },
    { value: "VI", label: "VI" },
    { value: "VN", label: "VN" },
    { value: "VU", label: "VU" },
    { value: "WF", label: "WF" },
    { value: "WS", label: "WS" },
    { value: "YE", label: "YE" },
    { value: "YT", label: "YT" },
    { value: "ZA", label: "ZA" },
    { value: "ZM", label: "ZM" },
    { value: "ZW", label: "ZW" },
  ]); // Update initial state to an empty array
  const [devices, setDevices] = useState([
    { value: "all", label: "all" },
    { value: "iOS", label: "iOS" },
    { value: "Android", label: "Android" },
    { value: "Mac OS", label: "Mac OS" },
    { value: "Windows", label: "Windows" },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: [{ value: "all", label: "all" }],
      devices: [{ value: "all", label: "all" }],
    },
  });
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

  // //console.log(categories); // Add this line to check the fetched categories data in console

  const onSubmit = async (data) => {
    const toastId = toast.loading("Offer Creating....");

    // // //console.log(data);

    try {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cashooz");
      formData.append("cloud_name", "djkk46gdh");
      const url = `https://api.cloudinary.com/v1_1/djkk46gdh/image/upload`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (imageData) => {
          // //console.log(imageData);
          if (imageData.url) {
            const offerInfo = {
              name: data.name,
              network: data.network,
              category: data.category,
              country: data.country,
              device: data.devices,
              gender: ["male"],
              offerLink: data.offerLink,
              offerStatus: "active",
              dailyLimit: 100,
              totalLimit: parseInt(data.totalLimt),
              price: 500,
              description: content,
              terms: data.terms,
              image: imageData.url,
              points: Number(data.points * 1000 * 0.7),
              completionLimit: 200,
              completionWindow: 300,
              completedCount: 50,
              startDate: "2023-11-01T00:00:00.000Z",
              endDate: "2024-01-31T00:00:00.000Z",
            };
            //console.log(offerInfo);
            await CreateOffer(offerInfo);
            toast.success("Successfully Offer Created", {
              id: toastId,
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          //console.log(err);
        });

      // reset();
      // navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // //console.log("Error:", error);
    }
  };

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setUploadImage(event.target.files[0]);
    }
  };

  const handleInputChange = (selectedOptions) => {
    setTags(selectedOptions || []);
  };

  return (
    <>
      <div className="">
        <form
          className="bg-secondaryColor p-6 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                FAQ Question
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Question "
                required
                onKeyUp={handleTitleKeyUp}
                {...register("name", { required: "Question is required" })}
              />
            </div>
            <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                FAQ Slug
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm read-only:"
                placeholder="Post Slug"
                value={slug}
                required
                {...register("slug", { required: "Name is required" })}
              />
            </div>
          </div>

          <div className="flex flex-col items-start mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              FAQ Answer
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
         
          <button
            type="submit"
            className="text-white bg-buttonBackground hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-buttonBackground dark:hover:bg-green-500 dark:focus:ring-blue-800"
          >
            Add FAQ
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateFaq;
