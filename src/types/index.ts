export type TabType = 
  | 'dashboard'
  | 'jadwal'
  | 'masta'
  | 'btq'
  | 'tips'
  | 'tugas'
  | 'forum'
  | 'buletin'
  | 'wagroup'
  | 'admin';

export interface ScheduleItem {
  id: string;
  day: string;
  dayCode: number;
  time: string;
  startTime: string;
  endTime: string;
  course: string;
  lecturer: string;
  room: string;
  building: string;
  sks: number;
  badge: string;
  color: string;
}

export interface TaskItem {
  id: string;
  title: string;
  course: string;
  deadline: string;
  priority: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  status: 'Belum Dikerjakan' | 'Dalam Proses' | 'Selesai';
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Pengumuman Resmi' | 'Akademik & Masta' | 'Laboratorium';
  author: string;
  pinned: boolean;
  summary: string;
  content: string;
}

export interface ForumReply {
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export interface ForumThread {
  id: string;
  author: string;
  nim: string;
  avatar: string;
  title: string;
  category: string;
  content: string;
  date: string;
  upvotes: number;
  replies: ForumReply[];
}

export interface WASubmission {
  id: string;
  name: string;
  nim: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  waLink: string;
}

export interface MastaStage {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
}

export interface MastaData {
  disclaimer: string;
  stages: MastaStage[];
  dressCode: { type: string; items: string[] }[];
  equipments: string[];
  dosAndDonts: { dos: string[]; donts: string[] };
}

export interface BTQData {
  alertMessage: string;
  passingCriteria: string[];
  surahList: string[];
  consequences: string[];
  tipsForGradeA: { title: string; desc: string }[];
}

export interface AcademicTip {
  id: string;
  title: string;
  category: string;
  icon: string;
  tagColor: string;
  content: string;
}
