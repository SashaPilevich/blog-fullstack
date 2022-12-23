import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { AddPostItem } from "../../components/AddPostForm";

export const AddPost = () => {
  return (
    <Container>
      <Header />
      <AddPostItem isEdit={false} />
    </Container>
  );
};
