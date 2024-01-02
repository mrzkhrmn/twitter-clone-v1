import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Trends } from "../components/Trends";
import { useState } from "react";
import { Modal, message } from "antd";
import { useUpdateProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

export const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({});
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date(userInfo.createdAt);

  const getMonthToString = (month) => {
    switch (month) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";

      default:
        break;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords are not match");
    } else {
      try {
        const res = await updateProfile({
          ...formData,
          _id: userInfo._id,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        message.success("User updated!");
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    }
  }

  return (
    <div className="flex max-w-6xl mx-auto justify-between py-10 gap-20">
      <Navigation />
      <div className="text-white flex-grow border border-white/30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 ">
            <FaArrowLeft />
          </button>{" "}
          <p>{userInfo?.username}</p>
        </div>
        <div className="bg-gray-500 w-100 h-60"></div>
        <div className="relative">
          <img
            src={userInfo?.profileImage}
            alt="userProfile"
            className="h-32 rounded-full object-cover absolute -bottom-6 left-5 border-4 border-black"
          />
          <div className="flex justify-end p=3 text=lg p-4">
            <button
              onClick={showModal}
              className="border border-gray-500 py-1 px-4 rounded-full hover:bg-white/15"
            >
              Edit profile
            </button>
          </div>
        </div>
        <div className="flex flex-col px-2 mt-8 items-start">
          <p className="text-xl font-semibold">{userInfo?.username}</p>
          <p className="text-gray-500">@{userInfo?.username}</p>
          <div className="mt-2 flex flex-col gap-4">
            <p className="text-gray-500 flex items-center gap-2">
              <FaCalendarAlt /> joined in {getMonthToString(date.getMonth())}{" "}
              {date.getFullYear()}
            </p>
            <div className="flex gap-2">
              <p>
                {userInfo.following.length}{" "}
                <span className="text-gray-500">Following</span>
              </p>
              <p>
                {userInfo.followers.length}{" "}
                <span className="text-gray-500">Followers</span>
              </p>
            </div>
            <p>Bio: {userInfo.description}</p>
          </div>
        </div>
      </div>
      <Trends />
      <Modal
        title="Update Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-3">
            <input
              type="text"
              id="username"
              placeholder="Username..."
              className="border p-3 outline-none rounded-lg"
              defaultValue={userInfo.username}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="email"
              id="email"
              placeholder="Email..."
              className="border p-3 outline-none rounded-lg"
              defaultValue={userInfo.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="text"
              id="description"
              placeholder="Bio..."
              className="border p-3 outline-none rounded-lg"
              defaultValue={userInfo.description}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="password"
              id="password"
              placeholder="Password..."
              className="border p-3 outline-none rounded-lg"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password..."
              className="border p-3 outline-none rounded-lg"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              className="bg-blue-500 px-4 py-2 rounded-full text-white "
              type="submit"
              onClick={handleOk}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
