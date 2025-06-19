import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserAvatar } from "../../features/auth/authSlice";

const UpdateProfilePicture = () => {
    const [image, setImage] = useState(null); // Selected image file
    const [croppedImage, setCroppedImage] = useState(null); // Cropped image
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    console.log(
        `image: ${image} croppedImage: ${croppedImage} crop: ${crop} zoom: ${zoom} croppedAreaPixels: ${croppedAreaPixels} showCropper: ${showCropper}`
    );

    // Handle image selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setShowCropper(true);
        }
    };

    // Capture the cropping area
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Create a cropped version of the image
    const cropImage = async () => {
        if (!image || !croppedAreaPixels) return;

        const img = new Image();
        img.src = image;
        await new Promise((resolve) => (img.onload = resolve));

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
            setCroppedImage(blob);
            setShowCropper(false);
        }, "image/jpeg");
    };

    let navigate = useNavigate();

    const dispatch = useDispatch();

    // Upload avatar image
    const handleUpload = async () => {
        if (!croppedImage) {
            alert("Please crop an image before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", croppedImage, "avatar.jpg");

        //sending data in backend
        const response = await dispatch(updateUserAvatar(formData));
        if (
            updateUserAvatar.fulfilled.match(response) &&
            response.payload.statusCode === 201
        ) {
            console.log("Avatar Updated successfully:", response.data);
            alert("Avatar updated successfully!");
            navigate("/profile");
        } else {
            alert("Unexpected response from server. Please try again.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-4 h-screen w-screen">
            {/* File Input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="avatar"
            />
            <label
                htmlFor="avatar"
                className="cursor-pointer bg-button-color-hover text-white px-4 py-2 rounded-md"
            >
                Choose Image
            </label>

            {/* Image Cropper */}
            {showCropper && image && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80">
                    <div className="relative w-96 h-96 bg-gray-900">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} // 1:1 aspect ratio
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <button
                        onClick={cropImage}
                        className="mt-4 bg-button-color text-white px-4 py-2 rounded-md hover:cursor-pointer"
                    >
                        Crop Image
                    </button>
                </div>
            )}

            {/* Cropped Image Preview */}
            {croppedImage && (
                <img
                    src={URL.createObjectURL(croppedImage)}
                    alt="Cropped Avatar"
                    className="w-24 h-24 rounded-full object-cover border"
                />
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="bg-button-color text-white px-4 py-2 rounded-md hover:cursor-pointer"
            >
                Upload Avatar
            </button>
        </div>
    );
};

export default UpdateProfilePicture;
