import React, { useEffect, useState } from "react";
import {
  useSingleNormalUserQuery,
  useUpdateNormalUserMutation,
} from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import Swal from "sweetalert2";
const EditProfile = ({ onClose }) => {
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const handleChangePhoto = () => {
    console.log("Change Photo clicked");
  };

  const handleDeletePhoto = () => {
    setProfileImage(
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  };

  const [updateNormalUser, { isLoading, isSuccess, isError, error }] =
    useUpdateNormalUserMutation();
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSingleNormalUserQuery(user?.objectId);

  console.log("User data:", userData);
  const [formData, setFormData] = useState({
    name: userData?.data?.name || "",
    gender: userData?.data?.gender || "",
    dateOfBirth: userData?.data?.dateOfBirth || "",
    contactNo: userData?.data?.contactNo,
    bloodGroup: userData?.data?.bloodGroup || "",
    state: userData?.data?.state || "",
    city: userData?.data?.city || "",
    postalCode: userData?.data?.postalCode || "",
    presentAddress: userData?.data?.presentAddress || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!user) {
      console.error("No user data found");
      return;
    }

    const normalUser = {
      normalUser: {
        name: formData.name,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        contactNo: formData.contactNo,
        bloodGroup: formData.bloodGroup,
        // state: formData.state,
        // postalCode: formData.postalCode,
        presentAddress: formData.presentAddress,
        city: formData.city,
      },
    };
    console.log("update input field data", normalUser);
    updateNormalUser({ id: user?.objectId, normalUser })
      .unwrap()
      .then((response) => {
        console.log("Full response:", response);

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Profile updated successfully",
            // confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            timer: 1800,
          });
          console.log("User updated successfully:", response.message);
        } else {
          console.error("Update failed:", response.message);
        }
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  // UseEffect to trigger onClose after successful save
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close after success
      }, 400); // Adjust timing as needed
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  return (
    <div className="w-full flex flex-col items-start min-h-screen p-0 md:p-6 relative">
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <span className="text-white font-semibold">Saving...</span>
          </div>
        </div>
      )}

      <div className="w-full md:w-3/6 mx-auto bg-secondaryColor rounded-lg shadow-md p-6 space-y-6 relative">
        <button
          onClick={onClose} // This should be bound correctly
          className="text-white text-2xl bg-red-500 w-8 h-8 rounded-full cursor-pointer absolute right-2 top-2 z-50"
        >
          ×
        </button>
        <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleChangePhoto}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
              >
                Change photo
              </button>
              <button
                onClick={handleDeletePhoto}
                className="bg-white text-red-500 px-4 py-2 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition"
              >
                <span className="flex items-center space-x-1">
                  <span>🗑️</span> <span>Delete</span>
                </span>
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Cashooz keeps your profile private
            </p>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Edit Profile
          </h2>
          <div className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center gap-2">
              <SelectField
                label="Gender"
                name="gender"
                options={["male", "female", "other"]}
                value={formData.gender}
                onChange={handleInputChange}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth.split("T")[0]}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex space-x-2">
              <select
                name="countryCode"
                onChange={(e) =>
                  console.log("Selected Country Code:", e.target.value)
                } // Handle the country code selection
                value={(() => {
                  const countryToCodeMap = {
                    Afghanistan: "+93",
                    Albania: "+355",
                    Algeria: "+213",
                    Andorra: "+376",
                    Angola: "+244",
                    Anguilla: "+1-264",
                    Antigua: "+1-268",
                    Argentina: "+54",
                    Armenia: "+374",
                    Aruba: "+297",
                    Australia: "+61",
                    Austria: "+43",
                    Azerbaijan: "+994",
                    Bahamas: "+1-242",
                    Bahrain: "+973",
                    Bangladesh: "+880",
                    Barbados: "+1-246",
                    Belarus: "+375",
                    Belgium: "+32",
                    Belize: "+501",
                    Benin: "+229",
                    Bhutan: "+975",
                    Bolivia: "+591",
                    Bosnia: "+387",
                    Botswana: "+267",
                    Brazil: "+55",
                    Brunei: "+673",
                    Bulgaria: "+359",
                    Burkina_Faso: "+226",
                    Burundi: "+257",
                    Cambodia: "+855",
                    Cameroon: "+237",
                    Canada: "+1",
                    Cape_Verde: "+238",
                    Cayman_Islands: "+1-345",
                    Central_African_Republic: "+236",
                    Chad: "+235",
                    Chile: "+56",
                    China: "+86",
                    Colombia: "+57",
                    Comoros: "+269",
                    Congo_Democratic_Republic: "+243",
                    Congo_Republic: "+242",
                    Cook_Islands: "+682",
                    Costa_Rica: "+506",
                    Croatia: "+385",
                    Cuba: "+53",
                    Cyprus: "+357",
                    Czech_Republic: "+420",
                    Denmark: "+45",
                    Djibouti: "+253",
                    Dominica: "+1-767",
                    Dominican_Republic: "+1-809",
                    Ecuador: "+593",
                    Egypt: "+20",
                    El_Salvador: "+503",
                    Equatorial_Guinea: "+240",
                    Eritrea: "+291",
                    Estonia: "+372",
                    Eswatini: "+268",
                    Ethiopia: "+251",
                    Fiji: "+679",
                    Finland: "+358",
                    France: "+33",
                    Gabon: "+241",
                    Gambia: "+220",
                    Georgia: "+995",
                    Germany: "+49",
                    Ghana: "+233",
                    Gibraltar: "+350",
                    Greece: "+30",
                    Greenland: "+299",
                    Grenada: "+1-473",
                    Guatemala: "+502",
                    Guernsey: "+44-1481",
                    Guinea: "+224",
                    Guinea_Bissau: "+245",
                    Guyana: "+592",
                    Haiti: "+509",
                    Honduras: "+504",
                    Hong_Kong: "+852",
                    Hungary: "+36",
                    Iceland: "+354",
                    India: "+91",
                    Indonesia: "+62",
                    Iran: "+98",
                    Iraq: "+964",
                    Ireland: "+353",
                    Isle_of_Man: "+44-1624",
                    Israel: "+972",
                    Italy: "+39",
                    Jamaica: "+1-876",
                    Japan: "+81",
                    Jersey: "+44-1534",
                    Jordan: "+962",
                    Kazakhstan: "+7",
                    Kenya: "+254",
                    Kiribati: "+686",
                    North_Korea: "+850",
                    South_Korea: "+82",
                    Kuwait: "+965",
                    Kyrgyzstan: "+996",
                    Laos: "+856",
                    Latvia: "+371",
                    Lebanon: "+961",
                    Lesotho: "+266",
                    Liberia: "+231",
                    Libya: "+218",
                    Liechtenstein: "+423",
                    Lithuania: "+370",
                    Luxembourg: "+352",
                    Macau: "+853",
                    Madagascar: "+261",
                    Malawi: "+265",
                    Malaysia: "+60",
                    Maldives: "+960",
                    Mali: "+223",
                    Malta: "+356",
                    Marshall_Islands: "+692",
                    Mauritania: "+222",
                    Mauritius: "+230",
                    Mayotte: "+262",
                    Mexico: "+52",
                    Micronesia: "+691",
                    Moldova: "+373",
                    Monaco: "+377",
                    Mongolia: "+976",
                    Montenegro: "+382",
                    Montserrat: "+1-664",
                    Morocco: "+212",
                    Mozambique: "+258",
                    Myanmar: "+95",
                    Namibia: "+264",
                    Nauru: "+674",
                    Nepal: "+977",
                    Netherlands: "+31",
                    New_Zealand: "+64",
                    Nicaragua: "+505",
                    Niger: "+227",
                    Nigeria: "+234",
                    Niue: "+683",
                    Norfolk_Islands: "+672",
                    North_Macedonia: "+389",
                    Norway: "+47",
                    Oman: "+968",
                    Pakistan: "+92",
                    Palau: "+680",
                    Palestine: "+970",
                    Panama: "+507",
                    Papua_New_Guinea: "+675",
                    Paraguay: "+595",
                    Peru: "+51",
                    Philippines: "+63",
                    Poland: "+48",
                    Portugal: "+351",
                    Puerto_Rico: "+1-787",
                    Qatar: "+974",
                    Romania: "+40",
                    Russia: "+7",
                    Rwanda: "+250",
                    Saint_Kitts: "+1-869",
                    Saint_Lucia: "+1-758",
                    Saint_Pierre_and_Miquelon: "+508",
                    Saint_Vincent_and_the_Grenadines: "+1-784",
                    Samoa: "+685",
                    San_Marino: "+378",
                    Sao_Tome_and_Principe: "+239",
                    Saudi_Arabia: "+966",
                    Senegal: "+221",
                    Serbia: "+381",
                    Seychelles: "+248",
                    Sierra_Leone: "+232",
                    Singapore: "+65",
                    Slovakia: "+421",
                    Slovenia: "+386",
                    Solomon_Islands: "+677",
                    Somalia: "+252",
                    South_Africa: "+27",
                    South_Sudan: "+211",
                    Spain: "+34",
                    Sri_Lanka: "+94",
                    Sudan: "+249",
                    Suriname: "+597",
                    Sweden: "+46",
                    Switzerland: "+41",
                    Syria: "+963",
                    Taiwan: "+886",
                    Tajikistan: "+992",
                    Tanzania: "+255",
                    Thailand: "+66",
                    Togo: "+228",
                    Tonga: "+676",
                    Trinidad_and_Tobago: "+1-868",
                    Tunisia: "+216",
                    Turkey: "+90",
                    Turkmenistan: "+993",
                    Turks_and_Caicos_Islands: "+1-649",
                    Tuvalu: "+688",
                    Uganda: "+256",
                    Ukraine: "+380",
                    United_Arab_Emirates: "+971",
                    United_Kingdom: "+44",
                    United_States: "+1",
                    Uruguay: "+598",
                    Uzbekistan: "+998",
                    Vanuatu: "+678",
                    Vatican_City: "+39-06",
                    Venezuela: "+58",
                    Vietnam: "+84",
                    Wallis_and_Futuna: "+681",
                    Yemen: "+967",
                    Zambia: "+260",
                    Zimbabwe: "+263",
                  };

                  const userCountry = userData?.data?.country || "";
                  console.log(userCountry);
                  return countryToCodeMap[userCountry] || "+1"; // Default to +1 if country not found
                })()}
                className="border border-gray-300 rounded-lg px-2 py-1 w-2/6"
              >
                <option value="+93">+93 (AF)</option>
                <option value="+355">+355 (AL)</option>
                <option value="+213">+213 (DZ)</option>
                <option value="+376">+376 (AD)</option>
                <option value="+244">+244 (AO)</option>
                <option value="+1-264">+1-264 (AI)</option>
                <option value="+1-268">+1-268 (AG)</option>
                <option value="+54">+54 (AR)</option>
                <option value="+374">+374 (AM)</option>
                <option value="+297">+297 (AW)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+43">+43 (AT)</option>
                <option value="+994">+994 (AZ)</option>
                <option value="+1-242">+1-242 (BS)</option>
                <option value="+973">+973 (BH)</option>
                <option value="+880">+880 (BD)</option>
                <option value="+1-246">+1-246 (BB)</option>
                <option value="+375">+375 (BY)</option>
                <option value="+32">+32 (BE)</option>
                <option value="+501">+501 (BZ)</option>
                <option value="+229">+229 (BJ)</option>
                <option value="+975">+975 (BT)</option>
                <option value="+591">+591 (BO)</option>
                <option value="+387">+387 (BA)</option>
                <option value="+267">+267 (BW)</option>
                <option value="+55">+55 (BR)</option>
                <option value="+673">+673 (BN)</option>
                <option value="+359">+359 (BG)</option>
                <option value="+226">+226 (BF)</option>
                <option value="+257">+257 (BI)</option>
                <option value="+855">+855 (KH)</option>
                <option value="+237">+237 (CM)</option>
                <option value="+1">+1 (CA)</option>
                <option value="+238">+238 (CV)</option>
                <option value="+1-345">+1-345 (KY)</option>
                <option value="+236">+236 (CF)</option>
                <option value="+235">+235 (TD)</option>
                <option value="+56">+56 (CL)</option>
                <option value="+86">+86 (CN)</option>
                <option value="+57">+57 (CO)</option>
                <option value="+269">+269 (KM)</option>
                <option value="+243">+243 (CD)</option>
                <option value="+242">+242 (CG)</option>
                <option value="+682">+682 (CK)</option>
                <option value="+506">+506 (CR)</option>
                <option value="+225">+225 (CI)</option>
                <option value="+385">+385 (HR)</option>
                <option value="+53">+53 (CU)</option>
                <option value="+357">+357 (CY)</option>
                <option value="+420">+420 (CZ)</option>
                <option value="+45">+45 (DK)</option>
                <option value="+253">+253 (DJ)</option>
                <option value="+1-767">+1-767 (DM)</option>
                <option value="+1-809">+1-809 (DO)</option>
                <option value="+593">+593 (EC)</option>
                <option value="+20">+20 (EG)</option>
                <option value="+503">+503 (SV)</option>
                <option value="+240">+240 (GQ)</option>
                <option value="+291">+291 (ER)</option>
                <option value="+372">+372 (EE)</option>
                <option value="+251">+251 (ET)</option>
                <option value="+500">+500 (FK)</option>
                <option value="+298">+298 (FO)</option>
                <option value="+679">+679 (FJ)</option>
                <option value="+358">+358 (FI)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+241">+241 (GA)</option>
                <option value="+220">+220 (GM)</option>
                <option value="+995">+995 (GE)</option>
                <option value="+49">+49 (DE)</option>
                <option value="+233">+233 (GH)</option>
                <option value="+350">+350 (GI)</option>
                <option value="+30">+30 (GR)</option>
                <option value="+299">+299 (GL)</option>
                <option value="+1-473">+1-473 (GD)</option>
                <option value="+502">+502 (GT)</option>
                <option value="+44-1481">+44-1481 (GG)</option>
                <option value="+224">+224 (GN)</option>
                <option value="+245">+245 (GW)</option>
                <option value="+592">+592 (GY)</option>
                <option value="+509">+509 (HT)</option>
                <option value="+39-06">+39-06 (VA)</option>
                <option value="+504">+504 (HN)</option>
                <option value="+852">+852 (HK)</option>
                <option value="+36">+36 (HU)</option>
                <option value="+354">+354 (IS)</option>
                <option value="+91">+91 (IN)</option>
                <option value="+62">+62 (ID)</option>
                <option value="+98">+98 (IR)</option>
                <option value="+964">+964 (IQ)</option>
                <option value="+353">+353 (IE)</option>
                <option value="+44-1624">+44-1624 (IM)</option>
                <option value="+972">+972 (IL)</option>
                <option value="+39">+39 (IT)</option>
                <option value="+1-876">+1-876 (JM)</option>
                <option value="+81">+81 (JP)</option>
                <option value="+44-1534">+44-1534 (JE)</option>
                <option value="+962">+962 (JO)</option>
                <option value="+7">+7 (KZ)</option>
                <option value="+254">+254 (KE)</option>
                <option value="+686">+686 (KI)</option>
                <option value="+850">+850 (KP)</option>
                <option value="+82">+82 (KR)</option>
                <option value="+965">+965 (KW)</option>
                <option value="+996">+996 (KG)</option>
                <option value="+856">+856 (LA)</option>
                <option value="+371">+371 (LV)</option>
                <option value="+961">+961 (LB)</option>
                <option value="+266">+266 (LS)</option>
                <option value="+231">+231 (LR)</option>
                <option value="+218">+218 (LY)</option>
                <option value="+423">+423 (LI)</option>
                <option value="+370">+370 (LT)</option>
                <option value="+352">+352 (LU)</option>
                <option value="+853">+853 (MO)</option>
                <option value="+389">+389 (MK)</option>
                <option value="+261">+261 (MG)</option>
                <option value="+265">+265 (MW)</option>
                <option value="+60">+60 (MY)</option>
                <option value="+960">+960 (MV)</option>
                <option value="+223">+223 (ML)</option>
                <option value="+356">+356 (MT)</option>
                <option value="+692">+692 (MH)</option>
                <option value="+222">+222 (MR)</option>
                <option value="+230">+230 (MU)</option>
                <option value="+262">+262 (YT)</option>
                <option value="+52">+52 (MX)</option>
                <option value="+691">+691 (FM)</option>
                <option value="+373">+373 (MD)</option>
                <option value="+377">+377 (MC)</option>
                <option value="+976">+976 (MN)</option>
                <option value="+382">+382 (ME)</option>
                <option value="+1-664">+1-664 (MS)</option>
                <option value="+212">+212 (MA)</option>
                <option value="+258">+258 (MZ)</option>
                <option value="+95">+95 (MM)</option>
                <option value="+264">+264 (NA)</option>
                <option value="+674">+674 (NR)</option>
                <option value="+977">+977 (NP)</option>
                <option value="+31">+31 (NL)</option>
                <option value="+687">+687 (NC)</option>
                <option value="+64">+64 (NZ)</option>
                <option value="+505">+505 (NI)</option>
                <option value="+227">+227 (NE)</option>
                <option value="+234">+234 (NG)</option>
                <option value="+683">+683 (NU)</option>
                <option value="+672">+672 (NF)</option>
                <option value="+47">+47 (NO)</option>
                <option value="+968">+968 (OM)</option>
                <option value="+92">+92 (PK)</option>
                <option value="+680">+680 (PW)</option>
                <option value="+970">+970 (PS)</option>
                <option value="+507">+507 (PA)</option>
                <option value="+675">+675 (PG)</option>
                <option value="+595">+595 (PY)</option>
                <option value="+51">+51 (PE)</option>
                <option value="+63">+63 (PH)</option>
                <option value="+48">+48 (PL)</option>
                <option value="+351">+351 (PT)</option>
                <option value="+974">+974 (QA)</option>
                <option value="+242">+242 (CG)</option>
                <option value="+262">+262 (RE)</option>
                <option value="+40">+40 (RO)</option>
                <option value="+7">+7 (RU)</option>
                <option value="+250">+250 (RW)</option>
                <option value="+290">+290 (SH)</option>
                <option value="+1-869">+1-869 (KN)</option>
                <option value="+1-758">+1-758 (LC)</option>
                <option value="+508">+508 (PM)</option>
                <option value="+1-784">+1-784 (VC)</option>
                <option value="+685">+685 (WS)</option>
                <option value="+378">+378 (SM)</option>
                <option value="+239">+239 (ST)</option>
                <option value="+966">+966 (SA)</option>
                <option value="+221">+221 (SN)</option>
                <option value="+381">+381 (RS)</option>
                <option value="+248">+248 (SC)</option>
                <option value="+232">+232 (SL)</option>
                <option value="+65">+65 (SG)</option>
                <option value="+421">+421 (SK)</option>
                <option value="+386">+386 (SI)</option>
                <option value="+677">+677 (SB)</option>
                <option value="+252">+252 (SO)</option>
                <option value="+27">+27 (ZA)</option>
                <option value="+211">+211 (SS)</option>
                <option value="+34">+34 (ES)</option>
                <option value="+94">+94 (LK)</option>
                <option value="+249">+249 (SD)</option>
                <option value="+597">+597 (SR)</option>
                <option value="+268">+268 (SZ)</option>
                <option value="+46">+46 (SE)</option>
                <option value="+41">+41 (CH)</option>
                <option value="+963">+963 (SY)</option>
                <option value="+886">+886 (TW)</option>
                <option value="+992">+992 (TJ)</option>
                <option value="+255">+255 (TZ)</option>
                <option value="+66">+66 (TH)</option>
                <option value="+670">+670 (TL)</option>
                <option value="+228">+228 (TG)</option>
                <option value="+690">+690 (TK)</option>
                <option value="+676">+676 (TO)</option>
                <option value="+1-868">+1-868 (TT)</option>
                <option value="+216">+216 (TN)</option>
                <option value="+90">+90 (TR)</option>
                <option value="+993">+993 (TM)</option>
                <option value="+1-649">+1-649 (TC)</option>
                <option value="+688">+688 (TV)</option>
                <option value="+256">+256 (UG)</option>
                <option value="+380">+380 (UA)</option>
                <option value="+971">+971 (AE)</option>
                <option value="+44">+44 (GB)</option>
                <option value="+1">+1 (US)</option>
                <option value="+598">+598 (UY)</option>
                <option value="+998">+998 (UZ)</option>
                <option value="+678">+678 (VU)</option>
                <option value="+58">+58 (VE)</option>
                <option value="+84">+84 (VN)</option>
                <option value="+681">+681 (WF)</option>
                <option value="+212">+212 (EH)</option>
                <option value="+967">+967 (YE)</option>
                <option value="+260">+260 (ZM)</option>
                <option value="+263">+263 (ZW)</option>
              </select>
              <InputField
                type="tel"
                name="contactNo"
                placeholder="Enter Contact Number"
                // onChange={(e) =>
                //   console.log("Entered Contact Number:", e.target.value)
                // } // Handle input changes
                onChange={handleInputChange}
                className="w-4/6 text-primaryColor border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-buttonBackground"
              />
            </div>

            <SelectField
              label="Blood Group"
              name="bloodGroup"
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              value={formData.bloodGroup}
              onChange={handleInputChange}
            />

            <InputField
              label="State"
              name="state"
              // value={formData.state}
              placeholder="Enter Your State" // Add placeholder here
              onChange={handleInputChange}
            />

            <InputField
              label="City"
              name="city"
              // value={formData.city}
              placeholder="Enter Your City"
              onChange={handleInputChange}
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              // value={formData.postalCode}
              placeholder="Enter Your Postal-code"
              onChange={handleInputChange}
            />
            <InputField
              label="Present Address"
              name="presentAddress"
              // value={formData.presentAddress}
              placeholder="Enter Your Address"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Save Button Section */}
        <div className="flex justify-end items-center space-x-4 p-4 rounded-lg shadow-lg  bg-opacity-80 backdrop-blur-md transition-all duration-300 ease-in-out">
          <button
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out 
    ${
      isLoading
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-buttonBackground hover:bg-opacity-80"
    }
  `}
            type="button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              "Save"
            )}
          </button>
          {isSuccess && (
            <p className="text-white font-medium text-sm transition-opacity duration-500">
              Profile updated successfully! Closing shortly...
            </p>
          )}
          {isError && (
            <p className="text-red-500 font-medium text-sm transition-opacity duration-500">
              Error updating profile: {error?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Input field component
const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div className="w-full">
    <label className="block text-buttonBackground mb-1 text-sm">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full text-primaryColor border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-buttonBackground"
    />
  </div>
);

// Select field component
const SelectField = ({ label, name, options, value, onChange }) => (
  <div className="w-full">
    <label className="block text-buttonBackground mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default EditProfile;
