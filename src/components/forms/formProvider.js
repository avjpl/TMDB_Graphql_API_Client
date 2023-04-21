import { Children, cloneElement } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import {
  Button,
  Input,
  InternalLink,
  ExternalLink,
  Select,
  TextArea,
} from './elements';

import styles from './formProvider.module.css';

const Form = ({ children, ...formActions }) => {
  const { handleSubmit, reset, ...rest } = useForm();
  const onSubmit = (data) => {
    formActions?.submitCallback?.(data);
    reset();
  };

  return (
    <div className={styles.form__container}>
      <FormProvider {...rest}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <>
            {Children.map(children, (child) => {
              return cloneElement(child, {});
            })}
          </>
        </form>
      </FormProvider>
    </div>
  );
};

Form.Input = Input;
Form.Select = Select;
Form.Button = Button;
Form.TextArea = TextArea;
Form.InternalLink = InternalLink;
Form.ExternalLink = ExternalLink;

export { Form };
