import React, { useRef } from 'react';
import styles from './modal.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GrClose } from 'react-icons/gr';
import { IoMdDoneAll } from 'react-icons/io';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Modal = ({ setIsOpen }) => {
  const success = useRef();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
    success.current.style.display = 'block';
    setTimeout(() => {
      setIsOpen(false);
      success.current.style.display = 'none';
    }, 1500);
  };

  return (
    <>
      <div ref={success} className={styles.success}>
        <IoMdDoneAll />
      </div>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <form
        className={styles.centered}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h2 className={styles.modalHeader}>Lets sign you up.</h2>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            {...register('email')}
            placeholder='email'
            type='email'
            required
          />
          <p>{errors.email?.message}</p>

          <input
            className={styles.input}
            {...register('password')}
            placeholder='password'
            type='password'
            required
          />
          <p>{errors.password?.message}</p>
        </div>

        <button className={styles.button} type='submit'>
          Sign up
        </button>
        <GrClose onClick={() => setIsOpen(false)} className={styles.closeBtn} />
      </form>
    </>
  );
};

export default Modal;
