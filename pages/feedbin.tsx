import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const FeedbinPage = () => {
  return (
    <div>
      <h1>Feedbin</h1>
    </div>
  );
};

export default FeedbinPage;
