export interface AuditTrailEntry {
  timestamp: string
  status: string
  label: string
  message: string
}

export interface ThreeWayMatchSummary {
  poNumber: string
  poType: string
  poAmount: number
  invoiceAmount: number
  variance: string
  withinTolerance: boolean
  grRequired: boolean
  grPosted: boolean
  fundsRemaining: string
  matchResult: string
}

export interface ErpPostingDetails {
  targetErp: string
  transaction: string
  status: string
  bdcSession: string
  sapDocNumber: string
}

export interface NotificationApprovalEntry {
  id: string
  type: string
  status: string
  title: string
  subtitle: string
  description: string
  receivedAt: string
  decision: string
}

export interface InvoiceDetailsLogResponse {
  invoiceNumber: string
  dcnType: string
  vendor: string
  amount: number
  currency: string
  poNumber: string
  source: string
  companyCode: string
  invoiceDate: string
  decision: string
  auditTrail: AuditTrailEntry[]
  matchSummary: ThreeWayMatchSummary
  erpPosting: ErpPostingDetails
  hitlApproval: {
    summary: string
    wasRequired: boolean
  }
  notifications: NotificationApprovalEntry[]
}
