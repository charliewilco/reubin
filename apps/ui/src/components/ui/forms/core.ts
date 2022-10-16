import { useCallback, useReducer } from "react";

type DefaultValues = Record<string, any>;

type FormActions<T extends DefaultValues> =
  | {
      type: "input";
      payload: Record<keyof T, any>;
    }
  | {
      type: "submit";
    }
  | {
      type: "reset";
    };

interface FormState<T extends DefaultValues> {
  values: T;
  errors: Partial<T>;
}

function reducer<T extends DefaultValues>(
  state: FormState<T>,
  _action: FormActions<T>
): FormState<T> {
  return {
    ...state,
  };
}

interface FormProps<T extends DefaultValues> {
  initialValues: T;
  onSubmit(values: T): void;
}

const initializer = <T extends DefaultValues>(props: FormProps<T>): FormState<T> => {
  return {
    values: props.initialValues,
    errors: {},
  };
};

export const useForm = <T extends DefaultValues>(props: FormProps<T>) => {
  const [state, dispatch] = useReducer<
    React.Reducer<FormState<T>, FormActions<T>>,
    FormProps<T>
  >(reducer, props, initializer);

  const getFieldProps = useCallback(
    (
      key: keyof T
    ): React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > => {
      return {
        value: state.values[key] as string | number | string[],
        onChange(event) {
          const payload = {} as any;
          payload[key] = event.target.value;
          dispatch({
            type: "input",
            payload,
          });
        },
      };
    },
    [state, dispatch]
  );

  return {
    getFieldProps,
    values: state.values,
  };
};
