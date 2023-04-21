import classnames from 'classnames';
import { useFormContext, useFormState } from 'react-hook-form';

import styles from './input.module.css';

const Input = ({ name, type = 'text', placeholder, minLength, maxLength }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <div className={styles.form__group}>
      <label className={styles.form__label} htmlFor={name}>
        {name}
      </label>

      <input
        type={type}
        className={classnames(`${styles.form__input}`, {
          [styles['form__input--error']]: errors[name]?.type === 'required',
        })}
        placeholder={placeholder}
        id={name}
        {...register(name, { required: true, minLength, maxLength })}
      />
    </div>
  );
};

export { Input };
