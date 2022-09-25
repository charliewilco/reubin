import type { InferGetStaticPropsType, NextPage } from "next";
import { RecommendedKeyArray } from "../server/recommended";
import { RecommendationList } from "../components/recommendation-list";
import Link from "next/link";
import { FiCornerDownLeft } from "react-icons/fi";

export const getStaticProps = async () => {
  return {
    props: {
      recommended: RecommendedKeyArray,
    },
  };
};

const RecommendationsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  recommended,
}) => {
  return (
    <div className="mx-auto max-w-7xl space-y-16 pt-16">
      <div>
        <Link href="/dashboard">
          <a className="flex items-center gap-4">
            <FiCornerDownLeft />

            <span>Dashboard</span>
          </a>
        </Link>
      </div>
      <RecommendationList recommended={recommended} />
    </div>
  );
};

export default RecommendationsPage;
