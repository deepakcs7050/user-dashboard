import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Lock, OpenInNew } from '@mui/icons-material'

interface InvoiceMetadataDetail {
  ocr_validation_discrepancies: string[]
  ocr_validation_status: string
  yoooz_status?: string
}

interface InvoiceMetadata {
  currency: string
  invoice_date: string
  po_number: string
  source: string
  yoooz_id: string
  yoooz_updated: boolean
  gcs_attachment_uri?: string
  metadata: InvoiceMetadataDetail
}

interface Invoice {
  invoice_number: string
  vendor_name: string
  amount: number
  gcs_attachment_uri?: string
  metadata: InvoiceMetadata
}

interface Discrepancy {
  fieldName: string
  ocrValue: string
  yoozValue: string
  correctValue: string
}

const mockInvoice: Invoice = {
  invoice_number: 'INV-2025-00147',
  vendor_name: 'Acme Corp',
  amount: 12500,
  gcs_attachment_uri: '/sample.pdf',
  metadata: {
    currency: 'USD',
    invoice_date: '2025-05-01',
    po_number: '4549001234',
    source: 'yoooz',
    yoooz_id: 'invoice_number',
    yoooz_updated: true,
    metadata: {
      ocr_validation_discrepancies: [
        "Invoice Number: OCR='EMAIL-INV-2025-00147.pdf', Yooz='INV-2025-00147'",
        "Amount: OCR='0.0', Yooz='12500.0'",
      ],
      ocr_validation_status: 'FAILED',
      yoooz_status: 'Open',
    },
  },
}

/**
 * Parse a raw discrepancy string into structured values.
 * Supports dynamic field names and values.
 */
const parseDiscrepancy = (raw: string): Discrepancy => {
  const [fieldSection, valueSection] = raw.split(':', 2).map(segment => segment.trim())
  const parsed: Discrepancy = {
    fieldName: fieldSection || 'Unknown field',
    ocrValue: '',
    yoozValue: '',
    correctValue: '',
  }

  if (!valueSection) {
    return parsed
  }

  const rawEntries = valueSection.split(',').map(entry => entry.trim())

  rawEntries.forEach(entry => {
    const [rawKey, rawValue] = entry.split('=', 2).map(part => part.trim())
    if (!rawKey || !rawValue) {
      return
    }

    const normalizedValue = rawValue.replace(/^['"]|['"]$/g, '')
    const normalizedKey = rawKey.toLowerCase()

    if (normalizedKey === 'ocr') {
      parsed.ocrValue = normalizedValue
    } else if (normalizedKey === 'yooz') {
      parsed.yoozValue = normalizedValue
      parsed.correctValue = normalizedValue
    }
  })

  return parsed
}

const statusColorMap: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
  success: 'success',
  failed: 'error',
  fail: 'error',
  open: 'warning',
}

const InvoiceReview = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([])
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setInvoice(mockInvoice)
        setDiscrepancies(mockInvoice.metadata.metadata.ocr_validation_discrepancies.map(parseDiscrepancy))
        setError(null)
      } catch {
        setError('Unable to load invoice data. ')
      } finally {
        setLoading(false)
      }
    }, 450)

    return () => window.clearTimeout(timer)
  }, [])

  const initialDiscrepancies = useMemo(() => {
    return invoice?.metadata?.metadata?.ocr_validation_discrepancies?.map(parseDiscrepancy) ?? []
  }, [invoice])

  const pdfUrl = useMemo(() => {
    if (!invoice) {
      return '/sample.pdf'
    }

    const uri = invoice.gcs_attachment_uri || invoice.metadata.gcs_attachment_uri || '/sample.pdf'
    const normalizedUri = uri.trim()

    if (/^(https?:)?\/\//i.test(normalizedUri) || normalizedUri.startsWith('/')) {
      return normalizedUri
    }

    return '/sample.pdf'
  }, [invoice])

  const metadata = invoice?.metadata ?? null
  const statusLabel = metadata?.metadata?.ocr_validation_status ?? 'OPEN'
  const statusKey = statusLabel.toLowerCase()
  const chipColor = statusColorMap[statusKey] ?? 'default'

  const handleDiscrepancyChange = (index: number, value: string) => {
    setDiscrepancies(current =>
      current.map((item, idx) => (idx === index ? { ...item, correctValue: value } : item))
    )
  }

  const handleCancel = () => {
    setDiscrepancies(initialDiscrepancies)
    setSnackbarMessage('Changes canceled. Review values restored.')
  }

  const handleSubmitReview = () => {
    const payload = {
      invoiceNumber: invoice?.invoice_number,
      reviewedAt: new Date().toISOString(),
      corrections: discrepancies.map(item => ({ fieldName: item.fieldName, correctedValue: item.correctValue })),
    }

    // Log editable values for debugging / verification
    console.log('Submitting invoice review payload:', payload)
    console.log('Editable discrepancies:', discrepancies)
    // In a real implementation this would dispatch an API request.
    setSnackbarMessage('Invoice review submitted successfully.')
  }


  const handleDownload = () => {
    window.open(pdfUrl, '_blank', 'noopener')
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size={48} />
      </Box>
    )
  }

  if (error || !invoice || !metadata) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Card sx={{ width: '100%', maxWidth: 680, p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Invoice review is unavailable
          </Typography>
          <Typography color="text.secondary">{error ?? 'Missing invoice metadata.'}</Typography>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Invoice Review
          </Typography>
          <Typography color="text.secondary">
            Review extracted invoice values and compare them with the original document.
          </Typography>
        </Box>

        <Box>
          <Card sx={{ bgcolor: '#FFFFFF' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 3, mb: 3 }}>
                <Box sx={{ border: '1px solid #E5E7EB', borderRadius: 3, bgcolor: '#FAFBFC', p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Invoice Information
                  </Typography>
                  <Stack spacing={2}>
                    {[
                      ['Invoice Number', invoice.invoice_number],
                      ['Vendor Name', invoice.vendor_name],
                      ['Amount', `${metadata.currency} ${invoice.amount.toFixed(2)}`],
                      ['Invoice Date', metadata.invoice_date],
                      ['PO Number', metadata.po_number],
                    ].map(([label, value], idx) => (
                      <Box
                        key={label}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: 2,
                          alignItems: 'center',
                          py: idx === 0 ? 0 : 1.5,
                          borderTop: idx === 0 ? 'none' : '1px solid #E5E7EB',
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {label}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'right' }}>
                            {value}
                          </Typography>
                          {label === 'Amount' ? (
                            <Chip label={metadata.currency} size="small" sx={{ bgcolor: '#F3F4F6', color: '#111827', fontWeight: 700 }} />
                          ) : null}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ border: '1px solid #E5E7EB', borderRadius: 3, bgcolor: '#FAFBFC', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      System Information
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleDownload}
                      sx={{ textTransform: 'none', py: 1.25, px: 2 }}
                      startIcon={<OpenInNew />}
                    >
                      Open Document
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {[
                      ['Source', metadata.source],
                      ['Yoooz ID', metadata.yoooz_id],
                      ['Yoooz Updated', metadata.yoooz_updated ? 'Yes' : 'No'],
                    ].map(([label, value], idx) => (
                      <Box
                        key={label}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: 2,
                          alignItems: 'center',
                          py: idx === 0 ? 0 : 1.5,
                          borderTop: idx === 0 ? 'none' : '1px solid #E5E7EB',
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'right' }}>
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Chip
                      label={statusLabel.toUpperCase()}
                      color={chipColor}
                      size="small"
                      sx={{ px: 1.5, py: 1, fontWeight: 700 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {discrepancies.length} discrepancy(s) found
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              <Paper variant="outlined" sx={{ borderColor: '#E5E7EB', borderRadius: 3, p: 3, bgcolor: '#FAFBFC' }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Discrepancies
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Review and update the correct values below.
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                      {discrepancies.length} items
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {discrepancies.map((discrepancy, idx) => (
                      <Grid item xs={12} key={`${discrepancy.fieldName}-${idx}`}>
                        <Paper variant="outlined" sx={{ borderColor: '#E5E7EB', borderRadius: 3, p: 3 }}>
                          <Stack spacing={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: '#2563EB', color: '#FFFFFF', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                                  {idx + 1}
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                  {discrepancy.fieldName}
                                </Typography>
                              </Stack>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                                Editable discrepancy
                              </Typography>
                            </Box>

                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>
                                  OCR Value
                                </Typography>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={discrepancy.ocrValue}
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock sx={{ color: '#9CA3AF' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  disabled
                                  sx={{ bgcolor: '#F7F8FA' }}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>
                                  Correct Value (Editable)
                                </Typography>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={discrepancy.correctValue}
                                  onChange={event => handleDiscrepancyChange(idx, event.target.value)}
                                  variant="outlined"
                                />
                              </Grid>
                            </Grid>

                            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
                              <Typography variant="caption" color="text.secondary">
                                Update the correct value before submitting.
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => navigator.clipboard.writeText(discrepancy.ocrValue)}
                                  sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                  Copy OCR
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleDiscrepancyChange(idx, discrepancy.yoozValue)}
                                  sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                  Reset
                                </Button>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  <Paper variant="outlined" sx={{ borderColor: '#D1D5DB', borderRadius: 3, p: 2, bgcolor: '#F8FAFC' }}>
                    <Typography variant="body2" color="text.secondary">
                      Please review all discrepancy values carefully before submitting.
                    </Typography>
                  </Paper>

                  <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ pt: 3 }}>
                    <Button variant="outlined" onClick={handleCancel} sx={{ textTransform: 'none' }}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmitReview} sx={{ textTransform: 'none' }}>
                      Submit Review
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Stack>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  )
}

export default InvoiceReview
