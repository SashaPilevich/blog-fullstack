import { IPost } from "./types/post";
export const generateUniqId = () => {
  return "_" + Math.random().toString(16).slice(2);
};
export const generateDate = () => {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = [currentDate.getMonth() + 1];
  let year = [currentDate.getFullYear()];

  return `${day} ${month} ${year}`;
};
export const posts: IPost[] = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 0,
    // lesson_num: 1,
    title: "What is Lorem Ipsum?",
    // author: 1,
    image:
      "https://media.istockphoto.com/photos/rocky-mountains-and-autumnal-forest-with-colorful-trees-high-mountain-picture-id1282522992?b=1&k=20&m=1282522992&s=170667a&w=0&h=W_7cRAwDTWOqqXF3g9zwOaCMgol1-Vb4rYtlqBbJMYE=",
    // date: generateDate(),
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 1,
    // lesson_num: 2,
    title: "What is Lorem Ipsum?",
    // author: 2,
    image:
      "https://media.istockphoto.com/photos/christmas-nature-picture-id1063851048?k=20&m=1063851048&s=170667a&w=0&h=YRIvVn1XJTh5qz5lKbCCE1Bhe4TdwpWxWtrTBPQ6xrA=",
    // date: generateDate(),
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 2,
    // lesson_num: 3,
    title: "What is Lorem Ipsum?",
    // author: 3,
    image:
      "https://media.istockphoto.com/photos/backlight-view-through-apple-tree-summer-meadow-in-bavaria-germany-picture-id182027571?k=20&m=182027571&s=612x612&w=0&h=kK5Mlt5OQmAHO364As3n0uGoenAsgVlBWQW0az2XLNY=",
    // date: generateDate(),
  },
];
