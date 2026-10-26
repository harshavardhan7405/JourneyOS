export const DEMO_USERS = {
  admin: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'admin@journeyos.dev',
    full_name: 'Dr. Marcus Sterling (Head of Expeditions)',
    role: 'admin' as const,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  parent: {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'parent@journeyos.dev',
    full_name: 'Eleanor Vance (Parent Guardian)',
    role: 'parent' as const,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  student: {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'student1@journeyos.dev',
    full_name: 'Leo Vance (Grade 9 Explorer)',
    role: 'student' as const,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
} as const;
