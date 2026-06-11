import { memo, useMemo } from 'react'
import { Avatar, Box, Button, Card, Divider, Typography } from '@mui/material'
import type { AgentCardProps } from './AgentCard.types'
import {
  avatarStyles,
  bodyStyles,
  buttonStyles,
  cardStyles,
  footerStyles,
  headerContentStyles,
  headerStyles,
  headerTextStyles,
  roleTextStyles,
  rowIconStyles,
  rowStyles,
  statusMetadata,
  viewDetailsIcon
} from './AgentCard.styles'

const getAgentInitials = (firstName: string, lastName: string): string => {
  const initials = `${firstName.trim().charAt(0) || ''}${lastName.trim().charAt(0) || ''}`
  return initials.toUpperCase()
}

const AgentCard = ({ agent, onViewDetails }: AgentCardProps) => {
  const initials = useMemo(() => getAgentInitials(agent.firstName, agent.lastName), [agent.firstName, agent.lastName])

  const statusRows = useMemo(
    () =>
      statusMetadata.map((status) => ({
        ...status,
        value: agent.stats[status.key as keyof typeof agent.stats]
      })),
    [agent.stats]
  )

  const ViewDetailsIcon = viewDetailsIcon

  return (
    <Card elevation={0} sx={cardStyles}>
      <Box sx={headerStyles(agent.headerGradient)}>
        <Box sx={headerContentStyles}>
          <Avatar sx={avatarStyles} aria-label={`${agent.firstName} ${agent.lastName} initials`}>
            {initials}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ ...headerTextStyles, fontWeight: 700, lineHeight: 1.1 }} noWrap>
              {`${agent.firstName} ${agent.lastName}`}
            </Typography>
            <Typography variant="body2" sx={roleTextStyles} noWrap>
              Support Agent
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={bodyStyles}>
        {statusRows.map((row) => {
          const IconComponent = row.icon
          return (
            <Box key={row.label} sx={rowStyles}>
              <Box sx={rowIconStyles(row.color)} aria-hidden="true">
                <IconComponent fontSize="small" />
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                {row.label}
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                {row.value}
              </Typography>
            </Box>
          )
        })}
      </Box>

      <Divider sx={{ borderColor: '#E5E7EB' }} />

      <Box sx={footerStyles}>
        <Button
          variant="text"
          endIcon={<ViewDetailsIcon />}
          sx={buttonStyles}
          onClick={() => onViewDetails?.(agent)}
          aria-label={`view details for ${agent.firstName} ${agent.lastName}`}
        >
          View Details
        </Button>
      </Box>
    </Card>
  )
}

export default memo(AgentCard)
