import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobList } from "./job/JobList";
import { loadCompany } from "../helpers/requestOPT";

export const CompanyDetail = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    load();

    async function load() {
      const company = await loadCompany(companyId);
      setCompany(company);
    }
  }, [companyId]);

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
