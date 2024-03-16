import styles from './app.module.css';

import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState('');

  const onInputButtonClick = () => {
    const promptValue = prompt('Введите новое значение:');
    if (promptValue) {
      if (promptValue.length < 3) {
        setError('Введенное значение должно содержать минимум 3 символа');
      } else {
        setValue(promptValue);
        setError('');
      }
    }
  };

  const onAddButtonClick = () => {
    if (value.length >= 3) {
      const id = Date.now();
      const updatedList = [...list, { id, value }];
      setList(updatedList);
      setValue('');
      setError('');
    }
  };

  const isValueValid = value.length >= 3;

  return (
    <div className={styles.app}>
      <h1 className={styles['page-heading']}>Ввод значения</h1>
      <p className={`${styles['no-margin-text']} ${styles['current-value']}`}>
        Текущее значение <code>value</code>: "{value}"
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles['buttons-container']}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button className={styles.button} onClick={onAddButtonClick} disabled={!isValueValid}>
          Добавить в список
        </button>
      </div>
      <div className={styles['list-container']}>
        <h2 className={styles['list-heading']}>Список:</h2>
        {list.length > 0 ? (
          <ul className={styles.list}>
            {list.map(item => (
              <li key={item.id} className={styles['list-item']}>
                {item.value} ({new Date(item.id).toLocaleString()})
              </li>
            ))}
          </ul>
        ) : (
          <p className={`${styles['no-margin-text']} ${styles['list-item']}`}>Нет добавленных элементов</p>
        )}
      </div>
    </div>
  );
};

export default App;
