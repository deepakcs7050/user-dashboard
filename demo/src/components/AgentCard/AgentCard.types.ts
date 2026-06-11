export interface AgentStats {
  open: number
  pending: number
  completed: number
  closed: number
  inProgress: number
}

export interface Agent {
  id: string
  firstName: string
  lastName: string
  isActive: boolean
  stats: AgentStats
  headerGradient?: string
}

export interface AgentCardProps {
  agent: Agent
  onViewDetails?: (agent: Agent) => void
}

export interface AgentListProps {
  agents: Agent[]
  onViewDetails?: (agent: Agent) => void
}
