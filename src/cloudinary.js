import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "your_cloud_name" // replace with your Cloudinary cloud name
  }
});

export default cloudinary;
