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
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material'
import { OpenInNew, ReceiptLong } from '@mui/icons-material'
import { Send, MailOutline, CheckCircle } from '@mui/icons-material'
import { fetchInvoiceDetailsLog } from '../services/invoiceService.js'
import type {
  AuditTrailEntry,
  InvoiceDetailsLogResponse,
  NotificationApprovalEntry,
} from '../types/invoice.js'

const iconButtonSx = {
  px: 2,
  py: 1,
  borderRadius: 2,
  textTransform: 'none',
}

const statusColorMap: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
  PASS: 'success',
  FAIL: 'error',
  FAILED: 'error',
  SENT: 'warning',
  RECEIVED: 'success',
  APPROVED: 'success',
}

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const renderFieldValue = (label: string, value: string | number | boolean) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 2,
      alignItems: 'center',
      py: 1,
      borderTop: '1px solid rgba(148, 163, 184, 0.16)',
      '&:first-of-type': {
        borderTop: 'none',
      },
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
    </Typography>
  </Box>
)

const InvoiceDetailsLog = () => {
  const [invoiceLog, setInvoiceLog] = useState<InvoiceDetailsLogResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const response = await fetchInvoiceDetailsLog()
        setInvoiceLog(response)
      } catch (fetchError) {
        setError((fetchError as Error)?.message ?? 'Unable to load invoice details.')
      } finally {
        setLoading(false)
      }
    }

    loadInvoice()
  }, [])

  const notificationRows = useMemo(() => invoiceLog?.notifications ?? [], [invoiceLog])

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size={52} />
      </Box>
    )
  }

  if (error || !invoiceLog) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Card sx={{ width: '100%', maxWidth: 760, p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Invoice details are unavailable
          </Typography>
          <Typography color="text.secondary">{error ?? 'Failed to load invoice details.'}</Typography>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
      <Stack spacing={2}>
        <Card sx={{ border: '1px solid rgba(148, 163, 184, 0.12)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Invoice {invoiceLog.invoiceNumber}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                  <Chip label={invoiceLog.decision} color="success" size="small" />
                  <Chip label={invoiceLog.dcnType} size="small" />
                </Stack>
              </Box>
              <Button
                variant="contained"
                color="primary"
                endIcon={<OpenInNew />}
                sx={iconButtonSx}
                onClick={() => window.open('#', '_blank')}
              >
                View Invoice PDF
              </Button>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(148, 163, 184, 0.16)' }} />

            <Grid container spacing={2}>
              {[
                ['Vendor', invoiceLog.vendor],
                ['Amount', formatCurrency(invoiceLog.amount, invoiceLog.currency)],
                ['PO Number', invoiceLog.poNumber],
                ['Source', invoiceLog.source],
                ['Company Code', invoiceLog.companyCode],
                ['Invoice Date', invoiceLog.invoiceDate],
              ].map(([label, value]) => (
                <Grid item xs={12} sm={6} md={4} key={label}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ border: '1px solid rgba(148, 163, 184, 0.16)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Audit Trail
              </Typography>

              <TableContainer component={Paper} variant="outlined" sx={{ mt: 0 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 140 }}>Time</TableCell>
                      <TableCell sx={{ width: 120 }}>Status</TableCell>
                      <TableCell>Step</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceLog.auditTrail.map((entry: AuditTrailEntry) => (
                      <TableRow key={`${entry.timestamp}-${entry.label}`}>
                        <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{entry.timestamp}</TableCell>
                        <TableCell>
                          <Chip label={entry.status} size="small" color={statusColorMap[entry.status] ?? 'default'} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{entry.label}</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{entry.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </CardContent>
        </Card>

        <Grid container >
          <Grid item xs={12} md={6}>
              <Card sx={{ border: '1px solid rgba(148, 163, 184, 0.16)' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  3-Way Match
                </Typography>
                {renderFieldValue('PO Number', invoiceLog.matchSummary.poNumber)}
                {renderFieldValue('PO Type', invoiceLog.matchSummary.poType)}
                {renderFieldValue('PO Amount', formatCurrency(invoiceLog.matchSummary.poAmount, invoiceLog.currency))}
                {renderFieldValue('Invoice Amount', formatCurrency(invoiceLog.matchSummary.invoiceAmount, invoiceLog.currency))}
                {renderFieldValue('Variance', invoiceLog.matchSummary.variance)}
                {renderFieldValue('Within Tolerance', invoiceLog.matchSummary.withinTolerance)}
                {renderFieldValue('GR Required', invoiceLog.matchSummary.grRequired)}
                {renderFieldValue('GR Posted', invoiceLog.matchSummary.grPosted)}
                {renderFieldValue('Funds Remaining', invoiceLog.matchSummary.fundsRemaining)}
                {renderFieldValue('Match Result', invoiceLog.matchSummary.matchResult)}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} >
            <Stack spacing={3} sx={{ ml:2 }}>
                <Card sx={{ border: '1px solid rgba(148, 163, 184, 0.16)' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ReceiptLong fontSize="small" />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      HITL Approval
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {invoiceLog.hitlApproval.summary}
                  </Typography>
                  <Chip label={invoiceLog.hitlApproval.wasRequired ? 'Requires review' : 'Auto-processed'} color={invoiceLog.hitlApproval.wasRequired ? 'warning' : 'success'} />
                </CardContent>
              </Card>

                <Card sx={{ border: '1px solid rgba(148, 163, 184, 0.16)' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    ERP Posting
                  </Typography>
                  {renderFieldValue('Target ERP', invoiceLog.erpPosting.targetErp)}
                  {renderFieldValue('Transaction', invoiceLog.erpPosting.transaction)}
                  {renderFieldValue('Status', invoiceLog.erpPosting.status)}
                  {renderFieldValue('BDC Session', invoiceLog.erpPosting.bdcSession)}
                  {renderFieldValue('SAP Doc #', invoiceLog.erpPosting.sapDocNumber)}
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt:2 }}>
              <Card sx={{ border: '1px solid rgba(148, 163, 184, 0.16)' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Notifications & Approvals
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Stepper orientation="vertical" nonLinear activeStep={-1} sx={{ p: 0 }}>
                    {notificationRows.map((notification: NotificationApprovalEntry) => (
                      <Step key={notification.id} expanded>
                        <StepLabel
                          icon={
                            notification.status === 'SENT' ? <Send /> :
                            notification.status === 'RECEIVED' ? <MailOutline /> :
                            <CheckCircle />
                          }
                        >
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {notification.type}
                              <Chip label={notification.status} size="small" sx={{ ml: 1 }} />
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {notification.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.subtitle}
                            </Typography>
                          </Box>
                        </StepLabel>
                        <StepContent>
                          <Box sx={{ p: 1, border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {notification.description}
                            </Typography>
                            <Chip label={notification.decision} size="small" color="success" sx={{ mt: 1 }} />
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

export default InvoiceDetailsLog
