import type { SxProps, Theme } from '@mui/material'
import { ArrowForward, FolderOutlined, ScheduleOutlined, CheckCircleOutline, LockOutlined, AutorenewOutlined } from '@mui/icons-material'

export const AGENT_CARD_BORDER_RADIUS = 20
export const AGENT_AVATAR_SIZE = 64
export const AGENT_AVATAR_BACKGROUND = '#2563EB'
export const AGENT_AVATAR_COLOR = '#FFFFFF'
export const AGENT_CARD_SHADOW = '0px 8px 24px rgba(0, 0, 0, 0.08)'
export const AGENT_CARD_HOVER_SHADOW = '0px 12px 32px rgba(0, 0, 0, 0.12)'
export const AGENT_HEADER_GRADIENT = 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
export const AGENT_STATUS_OPEN = '#2563EB'
export const AGENT_STATUS_PENDING = '#F97316'
export const AGENT_STATUS_COMPLETED = '#16A34A'
export const AGENT_STATUS_CLOSED = '#6B7280'
export const AGENT_STATUS_IN_PROGRESS = '#F97316'

export const cardStyles: SxProps<Theme> = {
  width: '100%',
  borderRadius: `${AGENT_CARD_BORDER_RADIUS}px`,
  backgroundColor: '#FFFFFF',
  boxShadow: AGENT_CARD_SHADOW,
  overflow: 'hidden',
  transition: 'transform 200ms ease, box-shadow 200ms ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: AGENT_CARD_HOVER_SHADOW
  }
}

export const headerStyles = (gradient?: string): SxProps<Theme> => ({
  background: gradient || AGENT_HEADER_GRADIENT,
  px: 3,
  py: 3,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 2
})

export const avatarStyles: SxProps<Theme> = {
  width: AGENT_AVATAR_SIZE,
  height: AGENT_AVATAR_SIZE,
  bgcolor: AGENT_AVATAR_BACKGROUND,
  color: AGENT_AVATAR_COLOR,
  fontWeight: 700,
  fontSize: 18,
  borderRadius: '50%'
}

export const headerContentStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  flex: 1,
  minWidth: 0
}

export const headerTextStyles: SxProps<Theme> = {
  color: '#FFFFFF'
}

export const roleTextStyles: SxProps<Theme> = {
  color: 'rgba(255, 255, 255, 0.88)',
  fontSize: 14,
  mt: 0.5
}

export const bodyStyles: SxProps<Theme> = {
  px: 3,
  py: 2.5,
  display: 'grid',
  gap: 2
}

export const rowStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: 2,
  py: 1.5,
  px: 1,
  '&:not(:last-of-type)': {
    borderBottom: '1px solid #E5E7EB'
  }
}

export const rowIconStyles = (color: string): SxProps<Theme> => ({
  width: 40,
  height: 40,
  borderRadius: 2,
  display: 'grid',
  placeItems: 'center',
  backgroundColor: `${color}1A`,
  color,
  flexShrink: 0
})

export const footerStyles: SxProps<Theme> = {
  px: 3,
  py: 2,
  display: 'flex',
  justifyContent: 'center'
}

export const buttonStyles: SxProps<Theme> = {
  textTransform: 'none',
  fontWeight: 700,
  color: '#2563EB',
  px: 0,
  '&:hover': {
    backgroundColor: 'transparent'
  }
}

export const statusMetadata = [
  {
    label: 'Open',
    key: 'open',
    icon: FolderOutlined,
    color: AGENT_STATUS_OPEN
  },
  {
    label: 'Pending',
    key: 'pending',
    icon: ScheduleOutlined,
    color: AGENT_STATUS_PENDING
  },
  {
    label: 'Completed',
    key: 'completed',
    icon: CheckCircleOutline,
    color: AGENT_STATUS_COMPLETED
  },
  {
    label: 'Closed',
    key: 'closed',
    icon: LockOutlined,
    color: AGENT_STATUS_CLOSED
  },
  {
    label: 'In Progress',
    key: 'inProgress',
    icon: AutorenewOutlined,
    color: AGENT_STATUS_IN_PROGRESS
  }
]

export const viewDetailsIcon = ArrowForward
