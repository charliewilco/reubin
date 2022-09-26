import type { InferGetStaticPropsType } from "next";
import { RecommendationList, type RecommendedField } from "../components/recommendation-list";
import Link from "next/link";
import { FiCornerDownLeft } from "react-icons/fi";

type Recommendations = [string, RecommendedField[]][];

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:5300/recommendations");

  const { data }: { data: Recommendations } = await response.json();
  return {
    props: {
      recommended: data,
    },
  };
};

const RecommendationsPage = ({
  recommended,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
