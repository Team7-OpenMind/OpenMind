export const createSubjectUrl = () => `/subjects/`; // POST

export const subjectListUrl = (limit, offset, order) => {
  const params = new URLSearchParams();
  params.append("limit", limit);
  params.append("offset", offset);
  params.append("sort", order);
  return `/subjects/?${params.toString()}`;
}; // GET

export const subjectUrl = (subjectId) => `/subjects/${subjectId}/`; // GET

export const questionUrl = (subjectId, limit, offset) => {
  const params = new URLSearchParams();
  params.append("limit", limit);
  params.append("offset", offset);
  return `/subjects/${subjectId}/questions/?${params.toString()}`;
}; // GET
