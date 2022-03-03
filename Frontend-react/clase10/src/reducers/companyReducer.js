import { types } from "../types/types";

export const companyReducer = (state = { companies: [] }, action) => {
  switch (action.type) {
    case types.loadCompany:
      return {
        ...state,
        company: action.payload.company,
      };

    case types.loadCompanies:
      return {
        ...state,
        companies: action.payload.companies,
      };
    case types.setCompanyId:
      return {
        ...state,
        companyId: action.payload.companyId,
      };

    default:
      return state;
  }
};
