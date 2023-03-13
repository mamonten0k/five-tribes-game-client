import { RequestConfig, ResponseData, RowResponseData } from '../../types';

export class HttpService {
  #config: RequestInit;

  constructor(config?: RequestConfig) {
    this.#config = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      keepalive: true,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    if (config) this.updateConfig(config);
  }

  /**
   * @name updateConfig
   * @descr Функция делает post запрос к БД
   * @param newConfig - конфиг, заданный пользователем
   */
  async post(url: string, newConfig: RequestConfig): Promise<any> {
    try {
      const params = this.mergeParams(newConfig.params);
      this.updateConfig(newConfig);

      const response = await fetch(`${url}?${params}`, { ...this.#config, method: 'POST' });
      const data = await response.json();
      return this.toJsonResponse(data);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  /**
   * @name postRows
   * @descr Функция делает post запрос к БД, берет данные по рядам
   * @param config - оригинальный конфиг
   * @param newConfig - конфиг, заданный пользователем
   */
  async postRows(url: string, config: RequestConfig): Promise<any> {
    try {
      const params = this.mergeParams(config.params);
      this.updateConfig(config);

      const response = await fetch(`${url}?${params}`, { ...this.#config, method: 'POST' });
      const data = await response.json();
      return this.rowsToJsonResponse(data);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  /**
   * @name updateConfig
   * @descr Функция обновляет конфиг для класса запросов, выполняя leftJoin
   * @param newConfig - конфиг, заданный пользователем
   */
  updateConfig(newConfig: RequestInit) {
    for (const key of Object.keys(newConfig) as Array<keyof RequestInit>) {
      if (key in this.#config) {
        this.#config[key] = {
          ...(this.#config[key] as any),
          ...(newConfig[key] as object),
        };
      }
    }
  }

  /**
   * @name waitFor
   * @descr Функция позволяет вызвать задержку в асинхронных функциях
   * @param timeout - время задержки
   */
  waitFor(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Timeout');
      }, timeout);
    });
  }

  /**
   * @name mergeParams
   * @descr Функция принимает query аргументы для http запроса и собирает их в строку
   * @param params - queries в формате JSON
   */
  mergeParams(params: object | undefined) {
    return params
      ? new URLSearchParams({
          ...params,
        }).toString()
      : {};
  }

  /**
   * @name toJsonResponse
   * @descr Функция парсит данные из базы данных на MySQL версии, меньшей 5.6, в удобоваримый JSON
   * @param response - Сырые данные из базы данных
   */
  toJsonResponse(response: ResponseData) {
    const res: any = {};

    for (const entry of response.RESULTS) {
      for (const [key, value] of Object.entries(entry)) {
        res[key] = value.length === 1 ? value[0] : [...value];
      }
    }

    if (res['error_message']) res['rejected'] = true;
    return Object.keys(res).length === 0 ? undefined : res;
  }

  /**
   * @name rowsToJsonResponse
   * @descr Функция парсит данные из базы данных на MySQL версии, меньшей 5.6, в удобоваримый JSON
   * @param response - Сырые данные из базы данных, взятые по рядам
   */
  rowsToJsonResponse(response: RowResponseData) {
    const res: any = {};

    for (const [entryKey, entryValue] of Object.entries(response.RESULTS)) {
      for (const [key, value] of Object.entries(entryValue || [])) {
        if (!key || !value) {
          continue;
        }

        if ('error_message' in value) {
          res['error_message'] = value.error_message;
          continue;
        }

        if (!res[`batch-${entryKey}`]) {
          res[`batch-${entryKey}`] = [value];
          continue;
        }

        res[`batch-${entryKey}`] = [...res[`batch-${entryKey}`], value];
      }
    }

    if (res['error_message']) res['rejected'] = true;
    return Object.keys(res).length === 0 ? undefined : res;
  }
}
