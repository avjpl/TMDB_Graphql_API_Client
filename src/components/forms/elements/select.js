import { useFormContext } from 'react-hook-form';

import styles from './select.module.css';

const Select = ({ name, options }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.form__field}>
      <label className={styles.form__label} htmlFor={name}>
        {name}
      </label>

      <select className={styles.form__select} id={name} {...register(name)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Select };
