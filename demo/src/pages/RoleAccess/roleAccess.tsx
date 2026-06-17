import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Stack,
  Divider,
  
  SvgIcon,
} from '@mui/material'
import Chip from '@mui/material/Chip'

// Dummy JSON data (from user)
const processesData = [
  {
    processName: 'Accounts Payable',
    subProcesses: ['Invoice Processing', 'Payment Reconciliation'],
  },
  {
    processName: 'Travel Expense',
    subProcesses: ['Expense Report Submission', 'Reimbursement Approval'],
  },
  {
    processName: 'Inter Entity',
    subProcesses: ['Intercompany Reconciliation', 'Transfer Pricing'],
  },
  { processName: 'Automation Study', subProcesses: [] },
  {
    processName: 'Fixed Asset',
    subProcesses: ['Depreciation Calculation', 'Asset Retirement'],
  },
  {
    processName: 'Corporate GL Accounting',
    subProcesses: ['Journal Entry Processing', 'Month End Closing'],
  },
  { processName: 'FPNA', subProcesses: [] },
  {
    processName: 'Inventory Accounting',
    subProcesses: ['COGS Calculation', 'Inventory Valuation'],
  },
  {
    processName: 'Country Accounting',
    subProcesses: ['Local Tax Compliance', 'Statutory Reporting'],
  },
  {
    processName: 'Cash In Bank',
    subProcesses: ['Bank Reconciliation', 'Cash Flow Forecasting'],
  },
]

type SelectedMap = {
  [process: string]: {
    checked: boolean
    subs: Record<string, boolean>
  }
}

// Simple inline chevron icon to avoid external icon import issues
const ChevronDown = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SvgIcon>
)

const ChevronRight = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props}>
    <path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

// Dummy users data for the right panel (matches screenshot style)
const usersData = [
  { email: 'john.doe@company.com', role: 'SuperAdmin', access: ['Accounts Payable', 'Fixed Asset', 'Corporate GL Accounting', 'Inventory Accounting', 'Cash In Bank'] },
  { email: 'jane.smith@company.com', role: 'Admin', access: ['Accounts Payable', 'Travel Expense', 'Fixed Asset', 'Country Accounting'] },
  { email: 'raj.kumar@company.com', role: 'Manager', access: ['Inter Entity', 'Corporate GL Accounting', 'FPNA'] },
  { email: 'priya.shah@company.com', role: 'Manager', access: ['Travel Expense', 'Inventory Accounting', 'Country Accounting'] },
  { email: 'amit.patel@company.com', role: 'Admin', access: ['Accounts Payable', 'Fixed Asset'] },
  { email: 'meera.nair@company.com', role: 'Manager', access: ['Inventory Accounting', 'Country Accounting', 'Cash In Bank'] },
  
]

const RoleAccess = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [selected, setSelected] = useState<SelectedMap>(() => {
    const map: SelectedMap = {}
    processesData.forEach((p) => {
      map[p.processName] = {
        checked: false,
        subs: p.subProcesses.reduce((acc, s) => ({ ...acc, [s]: false }), {} as Record<string, boolean>),
      }
    })
    return map
  })

  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({})
  const toggleUserExpanded = (email: string) => setExpandedUsers((prev) => ({ ...prev, [email]: !prev[email] }))

  const toggleProcess = (processName: string, value?: boolean) => {
    setSelected((prev) => {
      const cur = prev[processName]
      const checked = typeof value === 'boolean' ? value : !cur.checked
      const subs = Object.keys(cur.subs).reduce((acc, k) => ({ ...acc, [k]: checked ? cur.subs[k] : false }), {} as Record<string, boolean>)
      return { ...prev, [processName]: { checked, subs } }
    })
  }

  const toggleSub = (processName: string, subName: string) => {
    setSelected((prev) => {
      const cur = prev[processName]
      const nextSubs = { ...cur.subs, [subName]: !cur.subs[subName] }
      const anySubChecked = Object.values(nextSubs).some(Boolean)
      return { ...prev, [processName]: { checked: anySubChecked || cur.checked, subs: nextSubs } }
    })
  }

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault()

    // Build payload: selected processes with selected subProcesses
    const payload = {
      userEmail: email,
      role,
      access: Object.entries(selected).map(([processName, meta]) => ({
        processName,
        granted: meta.checked,
        subProcesses: Object.entries(meta.subs).filter(([, v]) => v).map(([k]) => k),
      })),
    }

    // Simulate API call and log the JSON
    console.log('Submitting Role Access payload:')
    console.log(JSON.stringify(payload, null, 2))
    // For UX, you might show a snackbar/toast — omitted for brevity
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid rgba(148,163,184,0.12)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  User & Role Details
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                  <TextField
                    label="User Email ID"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user.name@company.com"
                  />

                  <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty sx={{ minWidth: 160 }}>
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Process & Sub-Process Access
                </Typography>

                <Box>
                  {processesData.map((p) => (
                    <Accordion key={p.processName} defaultExpanded={false} sx={{ boxShadow: 'none', borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                      <AccordionSummary expandIcon={<ChevronDown />}>
                        <FormControlLabel
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                          control={<Checkbox checked={selected[p.processName].checked} onChange={() => toggleProcess(p.processName)} />}
                          label={<Typography sx={{ fontWeight: 600 }}>{p.processName}</Typography>}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        {p.subProcesses.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            No sub-processes
                          </Typography>
                        ) : (
                          p.subProcesses.map((s) => (
                            <Box key={s} sx={{ pl: 2 }}>
                              <FormControlLabel control={<Checkbox checked={selected[p.processName].subs[s]} onChange={() => toggleSub(p.processName, s)} />} label={s} />
                            </Box>
                          ))
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button type="button" onClick={() => {
                    // clear selections
                    setSelected((prev) => {
                      const cleared: SelectedMap = {}
                      Object.keys(prev).forEach((k) => {
                        cleared[k] = { checked: false, subs: Object.keys(prev[k].subs).reduce((a, s) => ({ ...a, [s]: false }), {}) }
                      })
                      return cleared
                    })
                    setEmail('')
                    setRole('')
                  }} sx={{ mr: 1 }}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save Access
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid rgba(148,163,184,0.12)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Users & Access Summary
                </Typography>

                {/* Users summary rendered from JSON; search removed per design */}
                <Box sx={{ width: '100%', mb: 1, display: 'grid', gridTemplateColumns: '1fr 120px 1fr 40px', gap: 2, py: 1, px: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">Email ID</Typography>
                  <Typography variant="caption" color="text.secondary">Role</Typography>
                  <Typography variant="caption" color="text.secondary">Process Access</Typography>
                  <div />
                </Box>

                <Box>
                  {usersData.map((u) => {
                    const maxShown = 2
                    const shown = u.access.slice(0, maxShown).join(', ')
                    const remaining = Math.max(0, u.access.length - maxShown)
                    const roleSx = (role: string) => {
                      if (role === 'SuperAdmin') return { bgcolor: '#f3e8ff', color: '#6b21a8' }
                      if (role === 'Admin') return { bgcolor: '#e8f0ff', color: '#1e3a8a' }
                      return { bgcolor: '#e6f4ea', color: '#14532d' }
                    }

                    return (
                      <Box key={u.email} sx={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr 40px', gap: 2, alignItems: 'center', py: 1, px: 1, borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                        <Typography variant="body2">{u.email}</Typography>
                        <Chip label={u.role} size="small" sx={{ ...roleSx(u.role), fontWeight: 600 }} />
                        <Typography variant="body2" color="text.secondary">
                          {shown}{remaining > 0 && !expandedUsers[u.email] ? `, ` : ''}
                          {remaining > 0 && (
                            <Box
                              component="span"
                              role="button"
                              tabIndex={0}
                              onClick={() => toggleUserExpanded(u.email)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleUserExpanded(u.email) }}
                              sx={{ color: 'primary.main', cursor: 'pointer' }}
                            >
                              {expandedUsers[u.email] ? ' show less' : `+${remaining} more`}
                            </Box>
                          )}
                          {expandedUsers[u.email] && (
                            <Box component="span" sx={{ color: 'text.secondary' }}> {u.access.slice(2).join(', ')}</Box>
                          )}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <ChevronRight />
                        </Box>
                      </Box>
                    )
                  })}

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">Showing 1 to {usersData.length} of {usersData.length} users</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
export default RoleAccess