import React from "react";
import { Wrapper } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { authInfoChange } from "@/store/actions/auth";

const validationSchema = object().shape({
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилия")
    .max(15, "Слишком длинная фамилия")
    .required("Введите фамилию"),
});

interface FormValues {
  firstName: string;
  lastName: string;
}

interface ChangeFormProps {
  initialFirstName: string;
  initialLastName: string;
  setClose: () => void;
}

const ChangeForm: React.FC<ChangeFormProps> = ({
  initialFirstName,
  initialLastName,
  setClose,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstName: initialFirstName ?? "",
          lastName: initialLastName ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(authInfoChange(values.firstName, values.lastName));
          setSubmitting(false);
          resetForm();
          setClose();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Input
              type="text"
              name="firstName"
              placeholder="Введите имя"
              src="user_another"
              another
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Введите фамилию"
              src="user_another"
              another
            />
            <SButton myType="nwhite" type="submit">
              Сохранить изменения
            </SButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangeForm;
