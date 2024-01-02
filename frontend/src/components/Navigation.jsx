import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { CiSearch, CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { message } from "antd";
import { logout } from "../../redux/features/auth/authSlice";

export const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiSlice] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(userInfo);

  async function handleLogout() {
    if (window.confirm("Are you sure to logout?") === true) {
      try {
        await logoutApiSlice().unwrap();
        dispatch(logout());
        navigate("/login");
        message.success("Logged Out!");
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 justify-start">
        <NavLink
          to={"/"}
          className={
            "flex gap-4 items-center text-2xl font-normal text-white hover:bg-white/10 py-3 px-4 transiton duration-300 rounded-full"
          }
        >
          <FaHome className="text-3xl" /> <span>Home</span>
        </NavLink>
        <NavLink
          to={"/explore"}
          className={
            "flex gap-4 items-center text-2xl font-normal text-white hover:bg-white/10 py-3 px-4 transiton duration-300 rounded-full"
          }
        >
          <CiSearch className="text-3xl" /> <span>Explore</span>
        </NavLink>
        <NavLink
          to={`/profile`}
          className={
            "flex gap-4 items-center text-2xl font-normal text-white hover:bg-white/10 py-3 px-4 transiton duration-300 rounded-full"
          }
        >
          <FaUser className="text-3xl" /> <span>Profile</span>
        </NavLink>
      </div>
      <button
        type="submit"
        onClick={handleLogout}
        className="bg-[#379BF0] hover:bg-[#4f92ea] text-white text-lg py-3 px-12 rounded-full"
      >
        <span className="px-10 font-bold">Post</span>
      </button>
      <div className="text-white flex gap-2 items-center justify-between">
        <Link to={`/profile`}>
          <img
            src={userInfo?.profileImage}
            alt="profileImage"
            className="W-14 h-14"
          />
        </Link>
        <div>
          <p className="truncate w-28 hover:text-clip">{userInfo?.username}</p>
          <p className="text-gray-600">@{userInfo?.username}</p>
        </div>
        <button onClick={handleLogout} className="hover:opacity-80">
          <CiLogout className="text-3xl" />
        </button>
      </div>
    </div>
  );
};
