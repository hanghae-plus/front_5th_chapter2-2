import { PERMISSION_TYPE } from "../../types";

// 갑자기 궁금한 부분은.. 서버와 통신하는 함수들은
export const getUserPermission = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(() => PERMISSION_TYPE.ADMIN);
    }, 300);
  });
};
