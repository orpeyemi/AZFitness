
import { Exercise, UserRole, SubscriptionStatus, UserProfile, Subscription } from './types';

export const COLORS = {
  primary: '#39FF14', // Neon Green
  secondary: '#0070f3', // Electric Blue
  background: '#0a0a0a',
  surface: '#121212',
  border: '#2a2a2a',
  text: '#f8fafc',
  textMuted: '#94a3b8'
};

export const EXERCISE_LIBRARY: Exercise[] = [
  { id: '1', name: 'Bench Press', category: 'Chest' },
  { id: '2', name: 'Squats', category: 'Legs' },
  { id: '3', name: 'Deadlift', category: 'Back' },
  { id: '4', name: 'Overhead Press', category: 'Shoulders' },
  { id: '5', name: 'Barbell Row', category: 'Back' },
  { id: '6', name: 'Dumbbell Curls', category: 'Arms' },
  { id: '7', name: 'Tricep Pushdown', category: 'Arms' },
  { id: '8', name: 'Leg Extensions', category: 'Legs' },
  { id: '9', name: 'Lat Pulldown', category: 'Back' },
  { id: '10', name: 'Pullups', category: 'Back' },
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'admin-uuid-1',
    name: 'AZ Admin',
    email: 'admin@azfitness.com',
    role: UserRole.ADMIN,
    created_at: '2023-01-01T00:00:00Z',
    streak: 0
  },
  {
    id: 'member-uuid-1',
    name: 'Alex Johnson',
    email: 'member@azfitness.com',
    role: UserRole.MEMBER,
    created_at: '2023-05-15T10:00:00Z',
    streak: 12,
    subscription: {
      id: 'sub-1',
      user_id: 'member-uuid-1',
      plan_type: 'Gold Monthly',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: SubscriptionStatus.ACTIVE
    }
  },
  {
    id: 'member-uuid-2',
    name: 'Sarah Miller',
    email: 'sarah@test.com',
    role: UserRole.MEMBER,
    created_at: '2023-02-10T09:00:00Z',
    streak: 0,
    subscription: {
      id: 'sub-2',
      user_id: 'member-uuid-2',
      plan_type: 'Silver Annual',
      start_date: '2023-02-10',
      end_date: '2024-02-10',
      status: SubscriptionStatus.EXPIRED
    }
  }
];
