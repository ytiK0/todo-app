interface Task {
  title: string;
  createdAt: number; // timestamp
  isDone: boolean;
}

type Filter = 'all' | 'active' | 'done';