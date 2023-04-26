import classnames from 'classnames';
import { useFormContext, useFormState } from 'react-hook-form';

import css from './textArea.module.css';

const TextArea = ({ name, placeholder }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <div className={css.form__field}>
      <textarea
        className={classnames(`${css.form__textArea}`, {
          [css['form__textArea--error']]: errors[name]?.type === 'required',
        })}
        rows='5'
        cols='150'
        id={name}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
    </div>
  );
};

export { TextArea };
