import {
  getImage,
  selectImageById,
  updateImage,
} from "../../redux/slice/imageSlice";
import { useEffect, useState } from "react";

import { Storage } from "@aws-amplify/storage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStarter from "./useStarter";

export default function useGetImages(marketItem, id) {
  const dispatch = useDispatch();
  const [imgKeyFromServer, setImgKeyFromServer] = useState([]);
  const imgKeys = useSelector((state) => selectImageById(state, id));
  const starter = useStarter(marketItem);

  useEffect(() => {
    const getImages = async (url) => {
      const response = await dispatch(getImage({ url: url, id }));
      setImgKeyFromServer((prev) => prev.concat(response.payload.imgUrl));
    };
    const updateImages = async (newUrl, oldUrl) => {
      const response = await dispatch(
        updateImage({ url: newUrl, id, prevUrl: oldUrl })
      );
      setImgKeyFromServer((prev) => prev.concat(response.payload.imgUrl));
    };
    if (starter && imgKeys === undefined) {
      getImages(marketItem.imgS3Keys);
    } else if (starter && imgKeys !== undefined) {
      if (Object.keys(imgKeys.images).length < marketItem.imgS3Keys.length) {
        const loadedImages = imgKeys.images;
        const unloadedImages = marketItem.imgS3Keys.filter(
          (key) => Object.keys(imgKeys.images).includes(key) === false
        );
        setImgKeyFromServer((prev) =>
          prev.concat(Object.values(imgKeys.images))
        );
        updateImages(unloadedImages, loadedImages);
      } else {
        setImgKeyFromServer(Object.values(imgKeys.images));
      }
    }
  }, [dispatch, marketItem, imgKeys, starter, id]);
  return imgKeyFromServer;
}

export function useGetAllImages(keys, trigger, options = "all", id = null) {
  const [imgKeyFromServer, setImgKeyFromServer] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getImages = async (url) => {
      if (id !== null) {
        const response = await dispatch(getImage({ url: url, id }));
        setImgKeyFromServer((prev) => prev.concat(response.payload.imgUrl));
      } else {
        try {
          // setImgKeyFromServer([]);
          const imageAccessURL = await Promise.all(
            keys.map((key) =>
              Storage.get(key, {
                level: "public",
                expires: 120,
                download: false,
              })
            )
          );
          // setImgKeyFromServer((url) => url.concat(imageAccessURL));
          setImgKeyFromServer(imageAccessURL);
        } catch (error) {
          console.error("error accessing the Image from s3", error);
          setImgKeyFromServer([]);
        }
      }
    };
    if (trigger) {
      if (options === "first") {
        getImages([keys[0]]);
      } else {
        getImages(keys);
      }
    }
  }, [keys, trigger, dispatch, id, options]);

  return imgKeyFromServer;
}
