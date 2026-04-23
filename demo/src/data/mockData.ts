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

export default mockTasks
