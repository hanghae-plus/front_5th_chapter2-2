export const getApi = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

export const postApi = async <T, R>(url: string, newData: T): Promise<R> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error('data 추가 실패!');
    }

    const data = await response.json();
    // console.log('response', response, response.json());
    return data as R;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};
