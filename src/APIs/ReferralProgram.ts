import { trackConversion } from "../analytics/analytics";
import { authRequest, publicRequest } from "./client";

export type ReferralPartnerStatus = "pending" | "approved" | "active" | "rejected" | "suspended" | "closed";
export type ReferralLeadStatus = "submitted" | "waiting_for_introduction" | "under_review" | "accepted" | "duplicate" | "rejected" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost";
export type ReferralRewardStatus = "waiting_client_payment" | "earned" | "approved" | "scheduled" | "paid" | "cancelled";
export type ReferralPreferredContact = "email" | "whatsapp";

export interface ReferralActivity {
  type?: string;
  message: string;
  actorEmail?: string;
  actorName?: string;
  at: string;
}

export interface ReferralNotificationDelivery {
  kind: "approval" | "rejection";
  requestedChannel: "email" | "whatsapp" | "phone" | "sms" | "other";
  deliveredChannel?: "email" | "whatsapp";
  status: "sent" | "delivered" | "read" | "failed" | "manual_required";
  fallbackUsed: boolean;
  providerMessageId?: string;
  error?: string;
  attemptedAt: string;
  updatedAt: string;
}

export interface ReferralPartner {
  _id: string;
  partnerId?: string;
  name: string;
  email?: string;
  phone?: string;
  preferredContact: "email" | "whatsapp" | "phone" | "sms" | "other";
  country: string;
  locale: string;
  profileType: string;
  program: "referral" | "business";
  website?: string;
  networkDescription?: string;
  status: ReferralPartnerStatus;
  termsVersion: string;
  termsAcceptedAt: string;
  marketingConsent: boolean;
  rejectionReason?: string;
  accessRecoveryStatus?: "pending" | "resolved";
  accessRecoveryRequestedAt?: string;
  accessRecoveryResolvedAt?: string;
  accessRecoveryRequestCount?: number;
  lastNotification?: ReferralNotificationDelivery;
  shareUrl?: string;
  activity: ReferralActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ReferralLead {
  _id: string;
  partnerId: string;
  partnerName: string;
  partnerEmail?: string;
  partnerPhone?: string;
  clientType?: "person" | "company";
  companyName?: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription?: string;
  relationship: string;
  consentStatus: "agreed" | "not_yet" | "prospect_submitted";
  introductionMethod: string;
  introductionDetails?: string;
  locale: string;
  status: ReferralLeadStatus;
  eligibility: "pending" | "eligible" | "ineligible";
  decisionReason?: string;
  assignedToEmail?: string;
  assignedToName?: string;
  activity: ReferralActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ReferralReward {
  _id: string;
  lead: { _id: string; companyName?: string; contactName?: string; status: ReferralLeadStatus } | string;
  partner: { _id: string; name: string; email: string } | string;
  partnerId: string;
  currency: string;
  eligibleRevenueCents: number;
  rateBasisPoints: number;
  capCents: number;
  amountCents: number;
  status: ReferralRewardStatus;
  paymentReference?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralApplicationPayload {
  name: string;
  email?: string;
  phone?: string;
  preferredContact: ReferralPreferredContact;
  country: string;
  locale: string;
  profileType: string;
  program: "referral" | "business";
  website?: string;
  networkDescription?: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
  websiteConfirmation?: string;
}

export interface ReferralLeadPayload {
  partnerId: string;
  accessSecret: string;
  clientType: "person" | "company";
  companyName?: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription?: string;
  relationship: string;
  consentStatus: "agreed" | "not_yet";
  introductionMethod?: string;
  introductionDetails?: string;
  locale: string;
  websiteConfirmation?: string;
}

export interface ProspectReferralPayload {
  referralCode: string;
  clientType: "person" | "company";
  companyName?: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription?: string;
  contactConsent: boolean;
  locale: string;
  websiteConfirmation?: string;
}

export interface DirectReferralPayload {
  referrerName: string;
  referrerEmail?: string;
  referrerPhone?: string;
  preferredContact: ReferralPreferredContact;
  referrerCountry: string;
  referrerProfileType: string;
  referrerWebsite?: string;
  clientType: "person" | "company";
  companyName?: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription?: string;
  relationship: string;
  consentStatus: "agreed" | "not_yet";
  introductionMethod?: string;
  introductionDetails?: string;
  termsAccepted: boolean;
  locale: string;
  websiteConfirmation?: string;
}

export const submitReferralApplication = async (data: ReferralApplicationPayload) => {
  const response = await publicRequest<{
    applicationId?: string;
    outcome: "submitted" | "already_registered";
    status: ReferralPartnerStatus;
    recoveryAvailable?: boolean;
  }>(
    { method: "POST", url: "/api/referral-program/partners", data },
    "Failed to submit referral partner application."
  );
  trackConversion("referral_partner_application_submitted", "referral_partner_application");
  return response;
};

export const requestReferralAccessRecovery = async (data: {
  email?: string;
  phone?: string;
  locale: string;
  websiteConfirmation?: string;
}) => publicRequest<{ outcome: "received" }>(
  { method: "POST", url: "/api/referral-program/partners/recover-access", data },
  "Failed to request referral access."
);

export const submitReferralLead = async (data: ReferralLeadPayload) => {
  const response = await publicRequest<{ leadId: string; status: ReferralLeadStatus }>(
    { method: "POST", url: "/api/referral-program/leads", data },
    "Failed to submit referral."
  );
  trackConversion("referral_lead_submitted", "referral_lead");
  return response;
};

export const submitDirectReferral = async (data: DirectReferralPayload) => {
  const response = await publicRequest<{
    leadId: string;
    status: ReferralLeadStatus;
    partnerId: string;
    applicationStatus: ReferralPartnerStatus;
  }>(
    { method: "POST", url: "/api/referral-program/direct-referrals", data },
    "Failed to submit the client introduction."
  );
  trackConversion("direct_referral_submitted", "referral_lead");
  return response;
};

export const submitProspectReferral = async (data: ProspectReferralPayload) => {
  const response = await publicRequest<{ leadId: string; status: ReferralLeadStatus }>(
    { method: "POST", url: "/api/referral-program/prospect-referrals", data },
    "Failed to submit your project request."
  );
  trackConversion("prospect_confirmed_referral_submitted", "referral_lead");
  return response;
};

export const getReferralProgramSummary = () => authRequest<{ metrics: Record<string, number> }>(
  { method: "GET", url: "/api/referral-program/summary" },
  "Failed to fetch referral program summary."
);

export interface ManualReferralEntryPayload {
  existingPartnerId?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferredContact?: ReferralPreferredContact;
  country?: string;
  locale: string;
  profileType?: string;
  program?: "referral" | "business";
  website?: string;
  termsAccepted?: boolean;
  marketingConsent?: boolean;
  approveNow: boolean;
  regenerateAccess: boolean;
  includeClient: boolean;
  clientType?: "person" | "company";
  companyName?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  clientWebsite?: string;
  serviceNeeded?: string;
  budgetRange?: string;
  needDescription?: string;
  relationship?: string;
  consentStatus?: "agreed" | "not_yet";
  introductionMethod?: string;
  introductionDetails?: string;
}

export const createManualReferralEntry = (data: ManualReferralEntryPayload) => authRequest<{
  partner: ReferralPartner;
  lead?: ReferralLead;
  notification?: ReferralNotificationDelivery;
  accessUrl?: string;
  shareUrl?: string;
  subject?: string;
  message?: string;
}>(
  { method: "POST", url: "/api/referral-program/manual-entries", data },
  "Failed to create the manual referral entry."
);

export const getReferralPartners = (page = 1, status = "all", search = "") => authRequest<{
  partners: ReferralPartner[];
  pagination: { currentPage: number; totalPages: number; total: number; limit: number };
}>({ method: "GET", url: "/api/referral-program/partners", params: { page, status, search } }, "Failed to fetch referral partners.");

export interface ReferralPartnerAccessPackage {
  partner: ReferralPartner;
  accessUrl: string;
  shareUrl: string;
  subject: string;
  message: string;
}

export const updateReferralPartner = (id: string, data: { status: ReferralPartnerStatus; reason?: string; regenerateAccess?: boolean }) => authRequest<{ partner: ReferralPartner; emailSent: boolean; notification?: ReferralNotificationDelivery; accessUrl?: string; shareUrl?: string; subject?: string; message?: string }>(
  { method: "PATCH", url: `/api/referral-program/partners/${id}`, data },
  "Failed to update referral partner."
);

export const prepareReferralPartnerManualPackage = (id: string) => authRequest<ReferralPartnerAccessPackage>(
  { method: "POST", url: `/api/referral-program/partners/${id}/manual-package` },
  "Failed to prepare the manual partner access package."
);

export const getReferralLeads = (page = 1, status = "all", search = "") => authRequest<{
  leads: ReferralLead[];
  pagination: { currentPage: number; totalPages: number; total: number; limit: number };
}>({ method: "GET", url: "/api/referral-program/leads", params: { page, status, search } }, "Failed to fetch referral leads.");

export const updateReferralLead = (id: string, data: { status?: ReferralLeadStatus; eligibility?: ReferralLead["eligibility"]; reason?: string }) => authRequest<{ lead: ReferralLead }>(
  { method: "PATCH", url: `/api/referral-program/leads/${id}`, data },
  "Failed to update referral lead."
);

export const claimReferralLead = (id: string) => authRequest<{ lead: ReferralLead }>(
  { method: "POST", url: `/api/referral-program/leads/${id}/claim` },
  "Failed to assign referral lead."
);

export const getReferralRewards = (page = 1, status = "all") => authRequest<{
  rewards: ReferralReward[];
  pagination: { currentPage: number; totalPages: number; total: number; limit: number };
}>({ method: "GET", url: "/api/referral-program/rewards", params: { page, status } }, "Failed to fetch referral rewards.");

export const upsertReferralReward = (leadId: string, data: { eligibleRevenueCents: number; rateBasisPoints?: number; capCents?: number; status: ReferralRewardStatus; paymentReference?: string }) => authRequest<{ reward: ReferralReward }>(
  { method: "PUT", url: `/api/referral-program/leads/${leadId}/reward`, data },
  "Failed to update referral reward."
);

export const updateReferralRewardStatus = (id: string, status: "earned" | "approved" | "scheduled" | "cancelled") => authRequest<{ reward: ReferralReward }>(
  { method: "PATCH", url: `/api/referral-program/rewards/${id}/status`, data: { status } },
  "Failed to update referral reward status."
);

export const markReferralRewardPaid = (id: string, paymentReference: string) => authRequest<{ reward: ReferralReward }>(
  { method: "PATCH", url: `/api/referral-program/rewards/${id}/pay`, data: { paymentReference } },
  "Failed to mark referral reward as paid."
);
