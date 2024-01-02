import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { CreatePost } from "../components/CreatePost";
import { Navigation } from "../components/Navigation";
import { Trends } from "../components/Trends";
export const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);

  return (
    <div className="flex max-w-6xl mx-auto justify-between py-10">
      <Navigation />
      <div className="text-white flex-grow-0 border border-white/30">
        <CreatePost />
      </div>
      <Trends />
    </div>
  );
};
