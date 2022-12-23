import { ChangeEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { editPost } from "../../api/posts";
import { Context } from "../../App";
import { createPost, editPost } from "../../http/postsApi";
import { EditPost } from "../../pages/EditPost";

import { Button } from "../Button";
import { Input } from "../Input";
import style from "./style.module.css";
interface IProps {
  isEdit: boolean;
  defaultTitle?: string;
  defaultNumber?: number;
  defaultText?: string;
  defaultImage?: string;
  postId?: number;
}
export const AddPostItem = ({
  isEdit,
  defaultTitle,
  defaultNumber,
  defaultText,
  defaultImage,
  postId,
}: IProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [title, setTitle] = useState(defaultTitle || "");
  const [lessonNum, setLessonNum] = useState(String(defaultNumber) || "");
  const [text, setText] = useState(defaultText || "");
  const [image, setImage] = useState(defaultImage || "");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark, user } = useContext(Context);
  const [editImage, setEditImage] = useState(false);

  const removeImage = () => {
    setImage("");
  };
  const createNewPost = () => {
    setIsLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    // if (defaultImage) {
    //   formData.append("image", defaultImage);
    // }

    if (user) {
      formData.append("userId", String(user?.id));
    }

    formData.append("title", title);
    formData.append("lesson_num", lessonNum);
    formData.append("text", text);
    console.log(formData);
    const promise =
      isEdit && postId ? editPost(formData, postId) : createPost(formData);
    promise
      .then((response) => {
        if (response) {
          navigate(`/my_post/${user?.id}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
    let fileReader = new FileReader();
    let files = event.target.files;
    if (files?.length) {
      fileReader.readAsDataURL(files[0]);
      setFile(files[0]);
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof event.target?.result === "string") {
          setImage(event.target?.result);
        }
      };
    }
    {
      isEdit && postId ? setEditImage(true) : setEditImage(false);
    }
  };

  return (
    <div className={`${style.container} ${isDark ? style.darkContainer : ""}`}>
      <div className={style.infoPanel}>
        <button className={style.btnBack} onClick={goBack}>
          Back
        </button>
        {isEdit ? (
          <h2 className={style.title}>Edit post</h2>
        ) : (
          <h2 className={style.title}>Add new post</h2>
        )}
      </div>
      <div className={style.infoContainer}>
        <div className={style.inputContainer}>
          <label className={style.label}>
            Title
            <Input
              uniqType="inputForRegistration"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className={style.label}>
            Lesson number
            <Input
              uniqType="inputForRegistration"
              type="text"
              value={lessonNum}
              onChange={(event) => setLessonNum(event.target.value)}
            />
          </label>
          <p className={`${style.textTextarea} `}>Text</p>
          <textarea
            className={`${style.textarea} ${isDark ? style.darkTextarea : ""}`}
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
        </div>
        <div className={style.imagePreview}>
          {image ? (
            <>
              <p className={style.textImage}>Image</p>

              {isEdit && postId ? (
                <img
                  className={`${style.addImg} ${
                    isDark ? style.darkAddImg : ""
                  } ${editImage ? style.noneImage : ""}`}
                  src={process.env.REACT_APP_API_URL + image}
                  alt="image for my post"
                />
              ) : (
                <img
                  className={`${style.addImg} ${
                    isDark ? style.darkAddImg : ""
                  }`}
                  src={image}
                  alt="image for my post"
                />
              )}

              {editImage ? (
                <img
                  className={`${style.addImg} ${
                    isDark ? style.darkAddImg : ""
                  }`}
                  src={image}
                  alt="image"
                />
              ) : (
                ""
              )}
              {/* <img
                className={`${style.addImg} ${isDark ? style.darkAddImg : ""}`}
                // src={process.env.REACT_APP_API_URL + image}
                src={image}
                alt="image for my post"
              /> */}

              <Button label={"Remove"} onClick={removeImage} type="remove" />
            </>
          ) : (
            <>
              <div className={style.imageContainer}>
                <p className={style.textImage}>Image</p>
                <label
                  className={`${style.add} ${isDark ? style.addDark : ""}`}
                >
                  {" "}
                  Add
                  <input
                    type={"file"}
                    className={style.inputFile}
                    multiple
                    accept="image/*"
                    onChange={handleOnChange}
                  ></input>
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      <Button
        label={isEdit ? "Edit" : "Add"}
        onClick={createNewPost}
        type="buttonForRegistration"
      />
    </div>
  );
};
