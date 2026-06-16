import type { DashboardSummary, LoginRequest, LoginResponse } from '../types/api.js'
import type { InvoiceDetailsLogResponse } from '../types/invoice.js'

const DELAY = 250

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  await sleep(DELAY)

  if (payload.email === 'test.user@example.com' && payload.password === 'Password123') {
    return { token: 'fake-jwt-token' }
  }

  throw new Error('Invalid credentials')
}

export const mockDashboardSummary = async (): Promise<DashboardSummary> => {
  await sleep(DELAY)

  return {
    welcome: 'Hello from your mock dashboard',
    tasks: {
      success: 42,
      failed: 8,
      pending: 13,
      total: 63,
      successRate: '66.7%',
    },
  }
}

export const mockInvoiceDetailsLog = async (): Promise<InvoiceDetailsLogResponse> => {
  await sleep(DELAY)

  return {
    invoiceNumber: 'INV-2026-0042',
    dcnType: 'E (Email)',
    vendor: 'Acme Corp LLC',
    amount: 12500,
    currency: 'USD',
    poNumber: '4548123456',
    source: 'EMAIL',
    companyCode: 'S25A',
    invoiceDate: '2026-06-08',
    decision: 'BDC_GENERATED',
    auditTrail: [
      {
        timestamp: '11:02:01',
        status: 'PASS',
        label: 'AP_TRIAGE',
        message: "task='invoice_processing'",
      },
      {
        timestamp: '11:02:01',
        status: 'PASS',
        label: 'VALIDATION',
        message: 'Invoice INV-2026-0042 field validation complete.',
      },
      {
        timestamp: '11:02:02',
        status: 'PASS',
        label: 'VENDOR_CHECK',
        message: 'Vendor validated: Acme Corp LLC',
      },
      {
        timestamp: '11:02:04',
        status: 'PASS',
        label: 'PO_MATCH',
        message: 'Matched PO 4548123456 from Coupa (Amount: $12,600.00)',
      },
      {
        timestamp: '11:02:05',
        status: 'PASS',
        label: 'PRICE_VALIDATION',
        message: 'PO $12,500.00 vs. Inv $12,500.00 (diff: $0.00, variance:0.0%)',
      },
      {
        timestamp: '11:02:06',
        status: 'PASS',
        label: 'SAP_POSTING',
        message: 'BDC session AP_MIRO_20260610_INV-2026-0042 generated',
      },
      {
        timestamp: '11:02:08',
        status: 'PASS',
        label: 'ERP_SAVE',
        message: 'Saved posting record to ap_erp_postings',
      },
    ],
    matchSummary: {
      poNumber: '4548123456',
      poType: '4540',
      poAmount: 12600,
      invoiceAmount: 12500,
      variance: '0.8% ($100)',
      withinTolerance: true,
      grRequired: true,
      grPosted: true,
      fundsRemaining: '$15,200.00',
      matchResult: 'SUCCESS',
    },
    erpPosting: {
      targetErp: 'SAP',
      transaction: 'MIRO',
      status: 'BDC_GENERATED',
      bdcSession: 'AP_MIRO_20260610_INV-2026-0042',
      sapDocNumber: '5100000234',
    },
    hitlApproval: {
      summary: 'Invoice was within $0.01 threshold -> auto-processed',
      wasRequired: false,
    },
    notifications: [
      {
        id: 'notification-1',
        type: 'HITL REQUEST',
        status: 'SENT',
        title: 'john.doe@acme.com',
        subtitle: '09/10/2026, 10:15:00',
        description: 'Invoice INV-2026-0042 requires HITL triple match approval.',
        receivedAt: '09/10/2026, 10:15:00',
        decision: 'APPROVED',
      },
      {
        id: 'notification-2',
        type: 'HITL DECISION',
        status: 'RECEIVED',
        title: 'erin.smith@acme.com',
        subtitle: '09/10/2026, 20:00:00',
        description: 'Human reviewer has approved invoice INV-2026-0042 ($12,500.00).',
        receivedAt: '09/10/2026, 20:00:00',
        decision: 'APPROVED',
      },
    ],
  }
}
