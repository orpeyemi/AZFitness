
export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  PENDING = 'pending'
}

// Added missing Exercise interface required by the exercise library and workout tracker
export interface Exercise {
  id: string;
  name: string;
  category: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: string;
  start_date: string;
  end_date: string;
  status: SubscriptionStatus;
}

export interface WorkoutEntry {
  id: string;
  user_id: string;
  date: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Attendance {
  id: string;
  user_id: string;
  check_in_time: string;
}

// UI Wrapper for Profile with related data
export interface UserProfile extends Profile {
  subscription?: Subscription;
  streak: number;
}