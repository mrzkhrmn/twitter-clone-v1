import { useState } from "react";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";

export const CreatePost = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [focus, setFocus] = useState(false);
  const [textCount, setTextCount] = useState(0);

  return (
    <div className="flex gap-4 text-white border-b border-white/30 px-10 py-6">
      <img
        src={userInfo?.profileImage}
        alt="profileImage"
        className="h-14  self-start mt-[5px]"
      />
      <div className="flex flex-col gap-4">
        <textarea
          className="bg-white/5 p-8 outline-none h-30"
          placeholder="What's happening..."
          name="post"
          id="post"
          cols="50"
          rows={focus ? "5" : "1"}
          maxLength={300}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setTextCount(Number(e.target.value.length))}
        ></textarea>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <button className="hover:text-blue-400">
              <FaImage />
            </button>{" "}
            <p>{textCount}/300</p>
          </div>
          <button className="px-6 py-2 bg-[#379BF0] rounded-full font-semibold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
