import React, { useEffect } from "react";
import { MdStarRate, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { FaCamera, FaRoute, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRating } from "../../features/ratingSlice";

const YourProfile = ({ user, joinedDate, isCurrentUser }) => {
    console.log("user: ", user);
    const dispatch = useDispatch();
    const { userRatings, loading, error } = useSelector(
        (state) => state.ratings
    );
    console.log(`userRatings in YourProfile : ${userRatings}`);

    useEffect(() => {
        if (user._id) {
            dispatch(fetchRating(user._id));
        }
    }, [dispatch, user._id]);
    return (
        <>
            <div className="flex flex-row flex-wrap mt-6 lg:space-x-20 space-y-2 space-x-1 md:space-x-2 ">
                <div className="flex flex-row relative w-20 h-20 md:w-24 md:h-24 rounded-full items-left justify-left">
                    {user?.avatar ? (
                        <img
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                            src={user?.avatar}
                            alt="User Avatar"
                        />
                    ) : (
                        <FaUserCircle className="absolute rounded-full w-20 h-20 md:w-24 md:h-24 text-paragraph-color" />
                    )}
                    {isCurrentUser && (
                        <Link
                            to="/update-profile-picture"
                            className=" w-23 h-26"
                        >
                            <FaCamera className="absolute w-6 h-4 bg-black rounded-full text-white  bottom-1 right-1" />
                        </Link>
                    )}
                </div>
                <div className="flex flex-col space-y-2 ml-2 p-1  ">
                    <h2 className="flex flex-col font-roboto text-sm font-semibold">
                        {user.fullName}
                        <p className="mt-">
                            {" "}
                            <span className="text-[0.5rem] tracking-widest font-poppins bg-btn-bg-color rounded-full px-2 py-0.5 text-red-500">
                                @{user?.username}
                            </span>{" "}
                        </p>
                    </h2>

                    <div className="flex flex-row space-x-2">
                        <p className="text-xs font-roboto bg-btn-bg-color rounded-full px-2 py-0.5 text-button-color">
                            Connected
                        </p>
                        <p className="text-xs font-roboto bg-btn-bg-color rounded-full px-2 py-0.5 text-button-color">
                            Connecting
                        </p>
                    </div>
                    <p className="flex flex-row  items-center font-normal font-roboto   text-profile-details text-sm">
                        <MdLocationOn /> {user?.address}
                    </p>
                    <p className="flex flex-row items-center font-normal font-roboto   text-profile-details text-sm">
                        <MdCalendarMonth /> Member since
                        <span className="ml-1 font-black tracking-widest text-xs ">
                            {joinedDate(user?.createdAt)}
                        </span>
                    </p>
                    <div className="flex flex-row space-x-8">
                        <p className="font-normal flex items-center  flex-row font-roboto  text-profile-details space-x-1/2 md:space-x-2 sm:space-x-1 text-sm">
                            <MdStarRate fill="#FACC15" className="h-6 w-6" />
                            {userRatings?.averageRating}{" "}
                            <span> ({userRatings?.totalCount} reviews)</span>
                        </p>
                        <p className="flex flex-row  font-normal items-center font-roboto   space-x-2 text-sm sm:space-x-0 md:space-x-2">
                            <FaRoute fill="#F79489" />
                            28{" "}
                            <span className="text-profile-details ">trips</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourProfile;
