import Organization from "../../model/organization";

const getOrganizationService = async () => {
  const organizations = await Organization.find({});

  return organizations;
};

export default { getOrganizationService };
