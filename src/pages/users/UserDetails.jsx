import React from "react";
import { Loader } from "../../components";

const UserDetails = ({ userDetail }) => {
    //console.log("userDeatils: ", userDetail);
    return (
        <>
            {userDetail ? (
                <div className="flex flex-col md:flex-row flex-wrap justify-between space-y-2  p-4">
                    <div className=" space-y-4 w-1/2">
                        <h1 className="font-roboto text-xl font-bold">
                            Personal Information
                        </h1>
                        <div>
                            <h2 className="font-roboto text-sm font-semibold">
                                Full Name
                            </h2>
                            <h2 className="flex flex-row  items-center font-normal font-roboto   text-profile-details text-sm">
                                {userDetail.fullName}
                            </h2>
                        </div>

                        <div>
                            <h2 className="font-roboto text-sm font-semibold">
                                Email
                            </h2>
                            <h2 className="flex flex-row  items-center font-normal font-roboto   text-profile-details text-sm">
                                {userDetail.email}
                            </h2>
                        </div>
                        <div>
                            <h2 className="font-roboto text-sm font-semibold">
                                Phone Number
                            </h2>
                            <h2 className="flex flex-row  items-center font-normal font-roboto   text-profile-details text-sm">
                                {userDetail.phone}
                            </h2>
                        </div>
                        <div>
                            <h2 className="font-roboto font-paragraph-color text-sm font-semibold">
                                Address
                            </h2>
                            <h2 className="flex flex-row  items-center font-normal font-roboto   text-profile-details text-sm">
                                {userDetail.address}
                            </h2>
                        </div>
                    </div>
                    <div className=" space-y-4 w-1/2 md:mt-12">
                        <h1 className="font-roboto text-md font-bold">
                            Travel Preferences
                        </h1>
                        <div className="flex felx-row flex-wrap items-center space-x-1 space-y-1">
                            {userDetail.travelPreference &&
                                userDetail.travelPreference.map((travel) => (
                                    <p
                                        key={travel}
                                        className="text-xs font-roboto capitalize bg-btn-bg-color rounded-full px-2 text-button-color"
                                    >
                                        {travel}
                                    </p>
                                ))}
                        </div>
                        <div>
                            <h2 className="font-roboto text-md font-bold">
                                Language
                            </h2>
                            <div className="flex felx-row capitalize flex-wrap items-center space-x-1 space-y-1 mt-2">
                                {userDetail.languages &&
                                    userDetail.languages.map((language) => (
                                        <p
                                            key={language}
                                            className="text-xs font-roboto bg-btn-bg-color rounded-full px-2 text-button-color"
                                        >
                                            {language}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default UserDetails;
