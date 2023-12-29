import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUsers, FaRegComment } from "react-icons/fa";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { message } from "antd";

export const LoginPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({});

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      message.success("Logged In Successfully");
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div>
      <div className="flex  h-[100vh]">
        <div className="bg-[#3AA5F3] text-white w-[1100px] hidden md:flex md:flex-col items-center justify-center gap-10 pb-60">
          <h1 className="text-5xl leading-[60px] font-semibold">
            See what's happening in <br />
            the world right now
          </h1>
          <div className="text-3xl font-thin flex flex-col gap-6 justify-center">
            <div className="flex gap-6 items-center">
              <CiSearch className="text-5xl" /> <p>Follow your interests.</p>
            </div>
            <div className="flex gap-6 items-center">
              <FaUsers className="text-5xl" />{" "}
              <p>Hear what people talking about.</p>
            </div>
            <div className="flex gap-6 items-center">
              <FaRegComment className="text-5xl" />{" "}
              <p>Join the conversation.</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0D1A26] text-white flex-grow">
          <div className="flex flex-col justify-center items-between py-20 px-24 md:py-20 md:px-32">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <img
                className="w-20"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png"
                alt="Twitter Logo"
              />
              <div className=" flex items-center justify-center">
                <h2 className="text-4xl flex-shrink-0">Join Twitter today</h2>
              </div>
            </div>
            <div className="mt-20">
              <form
                className="flex flex-col md:px-16 gap-4"
                onSubmit={handleSubmit}
              >
                <input
                  className="bg-black p-3 ring-1 ring-gray-700 rounded-3xl placeholder-slate-600 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                />
                <input
                  className="bg-black p-3 ring-1 ring-gray-700 rounded-3xl placeholder-slate-600 focus:outline-none"
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
                <div className="flex justify-center mt-10">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="text-2xl py-4 px-16 text-white rounded-3xl font-light bg-[#3AA5F3] hover:bg-[#3BB5F9] transition-all duration-200"
                  >
                    {isLoading ? "Logging In..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-col items-center mt-16 gap-2">
              <p className="text-lg">Don't have an account?</p>
              <Link
                disabled={isLoading}
                to={"/register"}
                className="transition-all duration-200 text-2xl py-4 px-[70px]  text-white rounded-3xl font-light ring-1 ring-[#3AA5F3] hover:bg-[#3AA5F3]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
