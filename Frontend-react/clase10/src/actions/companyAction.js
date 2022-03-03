import { types } from "../types/types";
import { loadCompanies, loadCompany } from "../helpers/requestOPT";

export const acLoadCompany = (companyId) => {
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

export const acLoadCompanies = () => {
  return async (dispatch) => {
    const companies = await loadCompanies();
    console.log(companies);
    const action = {
      type: types.loadCompanies,
      payload: {
        companies,
      },
    };

    dispatch(action);

    //setCompanyId(companies[0].id);
    const action2 = {
      type: types.setCompanyId,
      payload: {
        companyId: companies[0].id,
      },
    };

    dispatch(action2);
  };
};

export const acSetCompanyId = (companyId) => {
  return async (dispatch) => {
    const action = {
      type: types.setCompanyId,
      payload: {
        companyId,
      },
    };

    dispatch(action);
  };
};
