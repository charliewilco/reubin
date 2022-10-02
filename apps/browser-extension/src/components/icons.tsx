export const Feed = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-rss"
      {...props}>
      <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16" />
      <circle cx={5} cy={19} r={1} />
    </svg>
  );
};

export const ChevronRight = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-right"
      {...props}>
      <path d="M9 18L15 12 9 6" />
    </svg>
  );
};
