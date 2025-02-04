import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, username, password } = req.body;

//     if ([name, email, username, password].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     // Add validation for email format
//     if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//         throw new ApiError(400, "Invalid email format");
//     }

//     const exist = await User.findOne({
//         $or: [{ email }, { username }],
//     })
//     if(exist){
//         throw new ApiError(409,"email or username already exist");
//     }
//     const avatarpath = req.files?.avatar?.[0]?.path;
//     const coverpath= req.files?.coverImage?.[0]?.path;

//     if(!avatarpath){
//         throw new ApiError(400,"avatar and cover image both are required");
//     }
//     // const avatar = await uploadOnCloudinary(avatarpath);
//     // const coverImage = await uploadOnCloudinary(coverpath);
//         let avatar;

//         try{
//             avatar=await uploadOnCloudinary(avatarpath);
//             console.log("avatar uploaded");
//         }
//         catch(e){
//             console.log("error in uploading avatar",e);
//             throw new ApiError(500,"filed to upload avatar");
//         }
//         let cover

//         try{
//             cover=await uploadOnCloudinary(coverpath);
//             console.log("coverr uploaded");
//         }
//         catch(e){
//             console.log("error in uploading coverr",e);
//             throw new ApiError(500,"filed to upload cover");
//         }
//  const duser=  await User.create({
//         name,
//         email,
//         username : username.toLowerCase(),
//         password,
//         avatar: avatar.url,
//         coverImage: coverImage.url,
//     })

//     const createdUser=await User.findById(duser._id).select("-refreshToken -password");

//     if(!createdUser){
//         throw new ApiError(500,"user not created");
//     }
//     return res.status(201).json(new ApiResponse(201,"created",createdUser));

// })

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password } = req.body;

    if ([name, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new ApiError(400, "Invalid email format");
    }

    const exist = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (exist) {
        throw new ApiError(409, "Email or username already exists");
    }

    const avatarpath = req.files?.avatar?.[0]?.path;
    const coverpath = req.files?.coverImage?.[0]?.path;

    if (!avatarpath || !coverpath) {
        throw new ApiError(400, "Both avatar and cover image are required");
    }

    // console.log("Avatar Path:", avatarpath);
    // console.log("Cover Path:", coverpath);

    let avatar, cover;

    try {
        avatar = await uploadOnCloudinary(avatarpath);
        if (!avatar?.url) {
            throw new Error("Invalid Cloudinary response for avatar");
        }
        console.log("Avatar uploaded:", avatar.url);
    } catch (e) {
        console.error("Error uploading avatar:", e);
        throw new ApiError(500, "Failed to upload avatar");
    }

    try {
        cover = await uploadOnCloudinary(coverpath);
        if (!cover?.url) {
            throw new Error("Invalid Cloudinary response for cover image");
        }
        console.log("Cover image uploaded:", cover.url);
    } catch (e) {
        console.error("Error uploading cover:", e);
        throw new ApiError(500, "Failed to upload cover image");
    }

    const duser = await User.create({
        name,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: cover.url,
    });

    const createdUser = await User.findById(duser._id).select("-refreshToken -password");

    if (!createdUser) {
        throw new ApiError(500, "User not created ");
        console.log("something went wrong with database please check");

    }

    return res.status(201).json(new ApiResponse(201, "User created", createdUser));
});


export { registerUser };
