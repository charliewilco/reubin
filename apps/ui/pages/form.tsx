import { AddFeedForm } from "../components/add-feed";
import { UpdateFeedForm } from "../components/feed-settings";

const FormPage = () => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 py-4">
      <AddFeedForm onSubmit={() => {}} />
      <UpdateFeedForm onClose={() => {}} />
    </div>
  );
};

export default FormPage;
