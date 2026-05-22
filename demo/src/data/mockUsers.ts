import { UserTask } from "../types/api"

const mockUsers: UserTask[] = [
  { id: 'user-1', userName: 'Ava Patel', status: 'Active', agent: 'Agent A', process: 'Onboarding', source: 'GMAIL', createdAt: '2026-05-15T09:12:00Z', email: 'ava.patel@example.com' },
  { id: 'user-2', userName: 'Liam Smith', status: 'Pending', agent: 'Agent B', process: 'Verification', source: 'OUTLOOK', createdAt: '2026-05-14T14:32:00Z', email: 'liam.smith@example.com' },
  { id: 'user-3', userName: 'Sophia Lee', status: 'Active', agent: '-', process: 'Review', source: 'GMAIL', createdAt: '2026-05-14T08:22:00Z', email: 'sophia.lee@example.com' },
  { id: 'user-4', userName: 'Noah Johnson', status: 'Suspended', agent: 'Agent C', process: 'Support', source: 'GMAIL', createdAt: '2026-05-13T11:05:00Z', email: 'noah.johnson@example.com' },
  { id: 'user-5', userName: 'Olivia Brown', status: 'Active', agent: 'Agent A', process: 'Onboarding', source: 'GMAIL', createdAt: '2026-05-12T10:45:00Z', email: 'olivia.brown@example.com' },
  { id: 'user-6', userName: 'William Garcia', status: 'Pending', agent: 'Agent D', process: 'Verification', source: 'GMAIL', createdAt: '2026-05-12T09:00:00Z', email: 'william.garcia@example.com' },
  { id: 'user-7', userName: 'Mia Martinez', status: 'Active', agent: '-', process: 'Review', source: 'GMAIL', createdAt: '2026-05-11T13:20:00Z', email: 'mia.martinez@example.com' },
  { id: 'user-8', userName: 'James Rodriguez', status: 'Active', agent: 'Agent B', process: 'Onboarding', source: 'OUTLOOK', createdAt: '2026-05-11T07:50:00Z', email: 'james.rodriguez@example.com' },
  { id: 'user-9', userName: 'Isabella Davis', status: 'Suspended', agent: 'Agent C', process: 'Support', source: 'GMAIL', createdAt: '2026-05-10T16:40:00Z', email: 'isabella.davis@example.com' },
  { id: 'user-10', userName: 'Benjamin Wilson', status: 'Active', agent: 'Agent A', process: 'Onboarding', source: 'GMAIL', createdAt: '2026-05-10T09:15:00Z', email: 'benjamin.wilson@example.com' },
  { id: 'user-11', userName: 'Emma Anderson', status: 'Pending', agent: '-', process: 'Verification', source: 'OUTLOOK', createdAt: '2026-05-09T12:05:00Z', email: 'emma.anderson@example.com' },
  { id: 'user-12', userName: 'Lucas Thomas', status: 'Active', agent: 'Agent D', process: 'Review', source: 'GMAIL', createdAt: '2026-05-09T08:30:00Z', email: 'lucas.thomas@example.com' },
  { id: 'user-13', userName: 'Amelia Taylor', status: 'Active', agent: 'Agent B', process: 'Onboarding', source: 'GMAIL', createdAt: '2026-05-08T15:10:00Z', email: 'amelia.taylor@example.com' },
  { id: 'user-14', userName: 'Henry Moore', status: 'Suspended', agent: '-', process: 'Support', source: 'OUTLOOK', createdAt: '2026-05-08T10:20:00Z', email: 'henry.moore@example.com' },
  { id: 'user-15', userName: 'Evelyn Martin', status: 'Active', agent: 'Agent C', process: 'Review', source: 'GMAIL', createdAt: '2026-05-07T09:45:00Z', email: 'evelyn.martin@example.com' },
  { id: 'user-16', userName: 'Alexander Jackson', status: 'Pending', agent: 'Agent A', process: 'Verification', source: 'GMAIL', createdAt: '2026-05-07T07:30:00Z', email: 'alex.jackson@example.com' },
  { id: 'user-17', userName: 'Harper White', status: 'Active', agent: 'Agent B', process: 'Onboarding', source: 'GMAIL', createdAt: '2026-05-06T14:00:00Z', email: 'harper.white@example.com' },
  { id: 'user-18', userName: 'Michael Harris', status: 'Active', agent: '-', process: 'Review', source: 'OUTLOOK', createdAt: '2026-05-06T11:25:00Z', email: 'michael.harris@example.com' },
  { id: 'user-19', userName: 'Charlotte Clark', status: 'Pending', agent: 'Agent D', process: 'Verification', source: 'GMAIL', createdAt: '2026-05-05T10:05:00Z', email: 'charlotte.clark@example.com' },
  { id: 'user-20', userName: 'Daniel Lewis', status: 'Active', agent: 'Agent C', process: 'Onboarding', source: 'OUTLOOK', createdAt: '2026-05-05T08:55:00Z', email: 'daniel.lewis@example.com' },
]

export default mockUsers
