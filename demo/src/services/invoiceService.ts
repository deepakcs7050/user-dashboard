import { getApiBaseUrl, jsonFetch, useMockApi } from './api.js'
import { mockInvoiceDetailsLog } from './mock.js'
import type { InvoiceDetailsLogResponse } from '../types/invoice.js'

export const fetchInvoiceDetailsLog = async (): Promise<InvoiceDetailsLogResponse> => {
  if (useMockApi()) {
    return mockInvoiceDetailsLog()
  }

  return jsonFetch<InvoiceDetailsLogResponse>(`${getApiBaseUrl()}/invoice-details-log`)
}
