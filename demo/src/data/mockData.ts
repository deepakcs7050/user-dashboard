import type { Task, TaskStatus } from '../types/task'

const users = ['Avery', 'Jordan', 'Morgan', 'Riley', 'Taylor', 'Dakota', 'Casey', 'Quinn']
const descriptions = [
  'Audit task details and confirm ownership.',
  'Resolve outstanding issues in the task queue.',
  'Prepare summary report for the last sprint.',
  'Validate task dependencies and completion status.',
  'Review stakeholder feedback and update task notes.',
  'Finalize documentation before deployment.',
  'Sync with engineering on requirement changes.',
  'Confirm resource allocation for next phase.'
]

function choose<T>(items: T[], index: number): T {
  return items[index % items.length]
}

function getTimestamp(index: number) {
  const now = new Date('2026-04-01T08:00:00.000Z').getTime()
  const offset = index * 60 * 60 * 1000
  return new Date(now + offset).toISOString()
}

function buildTask(index: number): Task {
  let status: TaskStatus
  if (index < 200) status = 'SUCCESS'
  else if (index < 300) status = 'FAILED'
  else status = 'PENDING'

  const createdBy = choose(users, index)
  const updatedBy = choose(users, index + 3)
  const createdAt = getTimestamp(index)
  const updatedAt = getTimestamp(index + 1)

  return {
    id: `task-${index + 1}`,
    name: `Task ${index + 1}: ${choose(['Review', 'Improve', 'Complete', 'Document', 'Launch', 'Inspect', 'Align', 'Prioritize'], index)}`,
    status,
    description: choose(descriptions, index),
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }
}

export const mockTasks: Task[] = Array.from({ length: 1000 }, (_, index) => buildTask(index))

export const processes = [
  {
    title: 'Account Payable',
    icon: 'AccountBalanceWalletOutlined',
    gradient: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
    open: 42,
    inProgress: 28,
    pending: 15,
    closed: 8,
    completed: 67
  },
  {
    title: 'Travel and Expense',
    icon: 'FlightTakeoffOutlined',
    gradient: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
    open: 35,
    inProgress: 42,
    pending: 22,
    closed: 12,
    completed: 89
  },
  {
    title: 'Country Accounting',
    icon: 'PublicOutlined',
    gradient: 'linear-gradient(135deg,#10B981,#22C55E)',
    open: 58,
    inProgress: 35,
    pending: 18,
    closed: 5,
    completed: 45
  },
  {
    title: 'Fixed Assets',
    icon: 'AccountBalanceOutlined',
    gradient: 'linear-gradient(135deg,#A855F7,#D946EF)',
    open: 31,
    inProgress: 51,
    pending: 25,
    closed: 15,
    completed: 78
  },
  {
    title: 'FPNA',
    icon: 'AnalyticsOutlined',
    gradient: 'linear-gradient(135deg,#EC4899,#F43F5E)',
    open: 49,
    inProgress: 38,
    pending: 20,
    closed: 10,
    completed: 82
  },
  {
    title: 'Inter Entity',
    icon: 'GroupsOutlined',
    gradient: 'linear-gradient(135deg,#F97316,#FB923C)',
    open: 45,
    inProgress: 32,
    pending: 17,
    closed: 9,
    completed: 71
  },
  {
    title: 'Inventory Accounting',
    icon: 'Inventory2Outlined',
    gradient: 'linear-gradient(135deg,#06B6D4,#0EA5E9)',
    open: 52,
    inProgress: 40,
    pending: 23,
    closed: 11,
    completed: 65
  },
  {
    title: 'SSM Setup on GCP',
    icon: 'CloudOutlined',
    gradient: 'linear-gradient(135deg,#3B82F6,#60A5FA)',
    open: 38,
    inProgress: 45,
    pending: 26,
    closed: 14,
    completed: 85
  }
]

export default mockTasks
