/**
 * Typed API service groups aligned with ResearchNest SRS §4.2.
 * Response models can be added here as Django serializers are finalized.
 */
import { api, endpoints } from './api';

type Id = number | string;
type JsonObject = Record<string, unknown>;

export const authService = {
  login: (data: { email: string; password: string }) => api(endpoints.login, { method: 'POST', body: JSON.stringify(data) }),
  register: (data: { email: string; password: string }) => api(endpoints.register, { method: 'POST', body: JSON.stringify(data) }),
  verifyEmail: (token: string) => api(endpoints.verifyEmail, { method: 'POST', body: JSON.stringify({ token }) }),
  me: () => api(endpoints.me),
  logout: () => api(endpoints.logout, { method: 'POST' }),
  requestPasswordReset: (email: string) => api(endpoints.reset, { method: 'POST', body: JSON.stringify({ email }) }),
  deleteAccount: (confirmation: string) => api(endpoints.account, { method: 'DELETE', body: JSON.stringify({ confirmation }) }),
};

export const profileService = {
  get: () => api(endpoints.profile),
  update: (data: JsonObject) => api(endpoints.profile, { method: 'PATCH', body: JSON.stringify(data) }),
};

export const discoveryService = {
  search: (params: URLSearchParams) => api(`${endpoints.search}?${params.toString()}`),
  professors: (params?: URLSearchParams) => api(`${endpoints.professors}${params?.toString() ? `?${params}` : ''}`),
  professor: (id: Id) => api(`/professors/${id}`),
  papers: (id: Id) => api(`/professors/${id}/papers`),
  replyStats: (id: Id) => api(`/professors/${id}/reply-stats`),
  lab: (id: Id) => api(`/labs/${id}`),
  university: (id: Id) => api(`/universities/${id}`),
  paper: (id: Id) => api(`/papers/${id}`),
  shortlist: () => api(endpoints.shortlist),
  saveProfessor: (id: Id) => api(`${endpoints.shortlist}/${id}`, { method: 'POST' }),
  removeProfessor: (id: Id) => api(`${endpoints.shortlist}/${id}`, { method: 'DELETE' }),
};

export const labQaService = {
  questions: (labId: Id) => api(`/labs/${labId}/questions`),
  ask: (labId: Id, body: string) => api(`/labs/${labId}/questions`, { method: 'POST', body: JSON.stringify({ body }) }),
  upvote: (answerId: Id) => api(`/answers/${answerId}/upvote`, { method: 'POST' }),
  // SRS FR-QA-02 requires verified members to answer, but §4.2 omits an answer-create route.
  // This proposed path must be confirmed with the backend before enabling live Q&A answers.
  answer: (labId: Id, questionId: Id, body: string) => api(`/labs/${labId}/questions/${questionId}/answers`, { method: 'POST', body: JSON.stringify({ body }) }),
};

export const applicationService = {
  list: () => api(endpoints.applications),
  create: (data: JsonObject) => api(endpoints.applications, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: Id, data: JsonObject) => api(`/applications/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: Id) => api(`/applications/${id}`, { method: 'DELETE' }),
  addTask: (id: Id, data: JsonObject) => api(`/applications/${id}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
};

export const communityService = {
  suggestEdit: (data: JsonObject) => api(endpoints.edits, { method: 'POST', body: JSON.stringify(data) }),
  myEdits: () => api(`${endpoints.edits}/mine`),
  decision: (id: Id, data: JsonObject) => api(`${endpoints.edits}/${id}/decision`, { method: 'POST', body: JSON.stringify(data) }),
  claim: (data: JsonObject) => api(endpoints.claims, { method: 'POST', body: JSON.stringify(data) }),
  verifyClaim: (data: JsonObject) => api(`${endpoints.claims}/verify-email`, { method: 'POST', body: JSON.stringify(data) }),
  report: (data: JsonObject) => api(endpoints.reports, { method: 'POST', body: JSON.stringify(data) }),
};

export const socialService = {
  posts: (params?: URLSearchParams) => api(`${endpoints.posts}${params?.toString() ? `?${params}` : ''}`),
  createPost: (data: JsonObject) => api(endpoints.posts, { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id: Id, data: JsonObject) => api(`/posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  feed: (params?: URLSearchParams) => api(`${endpoints.feed}${params?.toString() ? `?${params}` : ''}`),
  follow: (data: JsonObject) => api('/follows', { method: 'POST', body: JSON.stringify(data) }),
  unfollow: (data: JsonObject) => api('/follows', { method: 'DELETE', body: JSON.stringify(data) }),
  messages: () => api(endpoints.messages),
  sendMessage: (data: JsonObject) => api(endpoints.messages, { method: 'POST', body: JSON.stringify(data) }),
  blockUser: (id: Id) => api(`/users/${id}/block`, { method: 'POST' }),
};

export const notificationService = {
  list: () => api(endpoints.notifications),
  markRead: (id: Id) => api(`/notifications/${id}`, { method: 'PATCH', body: JSON.stringify({ read: true }) }),
  preferences: (data: JsonObject) => api(endpoints.settings, { method: 'PATCH', body: JSON.stringify(data) }),
};

export const adminService = {
  moderationQueue: () => api(endpoints.moderation),
  startImport: (data: JsonObject) => api(endpoints.imports, { method: 'POST', body: JSON.stringify(data) }),
  importStatus: (id: Id) => api(`${endpoints.imports}/${id}`),
  users: (params?: URLSearchParams) => api(`${endpoints.users}${params?.toString() ? `?${params}` : ''}`),
  changeUserRoles: (id: Id, roles: string[]) => api(`/admin/users/${id}/roles`, { method: 'PATCH', body: JSON.stringify({ roles }) }),
  audit: (params?: URLSearchParams) => api(`${endpoints.audit}${params?.toString() ? `?${params}` : ''}`),
};
