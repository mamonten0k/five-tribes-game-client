export * from './services';
export * from './types';

/**
 * @name waitFor
 * @descr Функция позволяет вызвать задержку в асинхронных функциях
 * @param timeout - время задержки
 */
export function waitFor(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Timeout');
    }, timeout);
  });
}
