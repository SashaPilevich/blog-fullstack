import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { MyPostsList } from "../../components/MyPostsList";

export const MyPostPage = () => {
  return (
    <Container>
      <Header />
      <MyPostsList />
    </Container>
  );
};
