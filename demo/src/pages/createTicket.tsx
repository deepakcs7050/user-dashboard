import { ChangeEvent, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material'

interface CreateTicketFormData {
  user: string
  processName: string
  heading: string
  information: string
  attachment: File | null
}

interface CreateTicketDialogProps {
  open: boolean
  onClose: () => void
}

// Dummy data
const dummyUsers = [
  { id: 1, label: 'John Doe' },
  { id: 2, label: 'Jane Smith' },
  { id: 3, label: 'Mike Johnson' },
  { id: 4, label: 'Sarah Williams' },
  { id: 5, label: 'Tom Brown' },
]

const dummyProcesses = [
  { id: 1, label: 'Support' },
  { id: 2, label: 'Onboarding' },
  { id: 3, label: 'Compliance' },
  { id: 4, label: 'Billing' },
  { id: 5, label: 'Technical' },
]

export const CreateTicketDialog = ({ open, onClose }: CreateTicketDialogProps) => {
  const [formData, setFormData] = useState<CreateTicketFormData>({
    user: '',
    processName: '',
    heading: '',
    information: '',
    attachment: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.user) newErrors.user = 'User is required'
    if (!formData.processName) newErrors.processName = 'Process name is required'
    if (!formData.heading || formData.heading.trim() === '') newErrors.heading = 'Heading is required'
    if (!formData.information || formData.information.trim() === '') newErrors.information = 'Information is required'
    if (!formData.attachment) newErrors.attachment = 'Attachment is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSelectChange = (field: keyof CreateTicketFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const handleTextChange = (field: keyof CreateTicketFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        attachment: file,
      }))
      if (errors.attachment) {
        setErrors(prev => ({
          ...prev,
          attachment: '',
        }))
      }
    }
  }

  const handleCreate = () => {
    if (validateForm()) {
      // Get user name and process name from the IDs
      const selectedUser = dummyUsers.find(u => u.id.toString() === formData.user)
      const selectedProcess = dummyProcesses.find(p => p.id.toString() === formData.processName)

      const ticketData = {
        user: selectedUser?.label,
        processName: selectedProcess?.label,
        heading: formData.heading,
        information: formData.information,
        attachment: formData.attachment?.name,
      }

      console.log('Create Ticket Data:', ticketData)
      
      // Reset form
      setFormData({
        user: '',
        processName: '',
        heading: '',
        information: '',
        attachment: null,
      })
      setErrors({})
      onClose()
    }
  }

  const handleCancel = () => {
    setFormData({
      user: '',
      processName: '',
      heading: '',
      information: '',
      attachment: null,
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 24px 80px rgba(15, 23, 42, 0.12)',
          width: 'min(600px, 100%)',
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 28, fontWeight: 700, color: '#111827', mb: 1 }}>Create New Ticket</DialogTitle>
      <DialogContent sx={{ pt: 0, pb: 0 }}>
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          {/* Select User */}
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Select User
              <Box component="span" sx={{ color: '#EF4444', ml: 0.5 }}>*</Box>
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.user}
              onChange={e => handleSelectChange('user', e.target.value)}
              placeholder="Select user"
              error={Boolean(errors.user)}
              helperText={errors.user}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D1D5DB',
                  '&:hover fieldset': {
                    borderColor: '#9CA3AF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '& .MuiInputBase-input': {
                  fontSize: 14,
                  padding: '12px 14px',
                },
                '& .MuiSelect-icon': {
                  top: 'calc(50% - 10px)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#9CA3AF',
                },
              }}
            >
              {dummyUsers.map(user => (
                <MenuItem key={user.id} value={user.id.toString()}>
                  {user.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Select Process */}
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Process Name
              <Box component="span" sx={{ color: '#EF4444', ml: 0.5 }}>*</Box>
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.processName}
              onChange={e => handleSelectChange('processName', e.target.value)}
              placeholder="Select process"
              error={Boolean(errors.processName)}
              helperText={errors.processName}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D1D5DB',
                  '&:hover fieldset': {
                    borderColor: '#9CA3AF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '& .MuiInputBase-input': {
                  fontSize: 14,
                  padding: '12px 14px',
                },
                '& .MuiSelect-icon': {
                  top: 'calc(50% - 10px)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#9CA3AF',
                },
              }}
            >
              {dummyProcesses.map(process => (
                <MenuItem key={process.id} value={process.id.toString()}>
                  {process.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Heading */}
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Heading
              <Box component="span" sx={{ color: '#EF4444', ml: 0.5 }}>*</Box>
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.heading}
              onChange={e => handleTextChange('heading', e.target.value)}
              placeholder="Enter heading"
              error={Boolean(errors.heading)}
              helperText={errors.heading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D1D5DB',
                  '&:hover fieldset': {
                    borderColor: '#9CA3AF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '& .MuiInputBase-input': {
                  fontSize: 14,
                  padding: '12px 14px',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#9CA3AF',
                },
              }}
            />
          </Box>

          {/* Information */}
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Information
              <Box component="span" sx={{ color: '#EF4444', ml: 0.5 }}>*</Box>
            </Typography>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={4}
              value={formData.information}
              onChange={e => handleTextChange('information', e.target.value)}
              placeholder="Enter information"
              error={Boolean(errors.information)}
              helperText={errors.information}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D1D5DB',
                  '&:hover fieldset': {
                    borderColor: '#9CA3AF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '& .MuiInputBase-input': {
                  fontSize: 14,
                  padding: '12px 14px',
                  lineHeight: 1.6,
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#9CA3AF',
                },
              }}
            />
          </Box>

          {/* Attachments */}
          <Box sx={{ display: 'grid', gap: 0.75 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Attachments
              <Box component="span" sx={{ color: '#EF4444', ml: 0.5 }}>*</Box>
            </Typography>
            <Box
              component="label"
              htmlFor="file-input"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 2.25,
                border: '1px dashed #CBD5E1',
                backgroundColor: '#FFFFFF',
                minHeight: 96,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: '#2563EB',
                  backgroundColor: '#F8FAFC',
                },
              }}
            >
              <input
                id="file-input"
                type="file"
                hidden
                onChange={handleFileChange}
              />
              {/* <CloudUploadIcon sx={{ color: '#2563EB', fontSize: 24 }} /> */}
              {formData.attachment ? (
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  {formData.attachment.name}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  Drag and drop files or click to browse
                </Typography>
              )}
              <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                Supported files: PDF, PNG, JPG
              </Typography>
            </Box>
            {errors.attachment && (
              <Typography sx={{ fontSize: 12, color: '#EF4444', mt: 0.5 }}>{errors.attachment}</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pt: 2, pb: 3, gap: 1.5, borderTop: '1px solid #E5E7EB', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            height: 44,
            borderRadius: 10,
            px: 3,
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'none',
            borderColor: '#D1D5DB',
            color: '#374151',
            '&:hover': {
              backgroundColor: '#F8FAFC',
              borderColor: '#9CA3AF',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          sx={{
            height: 44,
            borderRadius: 10,
            px: 3,
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#2563EB',
            '&:hover': {
              backgroundColor: '#1D4ED8',
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTicketDialog;


