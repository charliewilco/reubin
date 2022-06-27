import { useFormik } from "formik";
import { MdAddCircleOutline } from "react-icons/md";

interface AddFeedFormProps {
  onSubmit(url: string): void | Promise<void>;
  onSelect?(selectedFeed: unknown): void | Promise<void>;
}

export const AddFeedForm = (props: AddFeedFormProps) => {
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit(values) {
      props.onSubmit(values.url);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input {...formik.getFieldProps("url")} />
      </form>
    </div>
  );
};

export const AddFeedTrigger = () => {
  return (
    <div>
      <MdAddCircleOutline />
    </div>
  );
};
