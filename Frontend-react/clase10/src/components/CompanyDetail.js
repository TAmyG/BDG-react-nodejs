import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { JobList } from "./job/JobList";
import { useDispatch, useSelector } from "react-redux";
import { acLoadCompany } from "../actions/companyAction";

export const CompanyDetail = () => {
  const { companyId } = useParams();

  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(acLoadCompany(companyId));
  }, [companyId, dispatch]);

  return (
    <>
      {company && (
        <div>
          <h1 className="title">{company.name}</h1>
          <div className="box">{company.description}</div>

          <h1 className="title is-5">Jobs at {company.name}</h1>
          <JobList jobs={company.jobs} />
        </div>
      )}
    </>
  );
};
