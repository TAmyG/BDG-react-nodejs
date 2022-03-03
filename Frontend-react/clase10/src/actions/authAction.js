import { types } from "../types/types";
import { loadCompany } from "../helpers/requestOPT";

export const acLogin = (companyId) => {
  return async (dispatch) => {
    const company = await loadCompany(companyId);
    console.log(company);
    const action = {
      type: types.loadCompany,
      payload: {
        company,
      },
    };

    dispatch(action);
  };
};
