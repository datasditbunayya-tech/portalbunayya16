'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Settings, 
  Home as HomeIcon, 
  LogOut, 
  CalendarDays, 
  ChevronDown,
  Users,
  GraduationCap,
  FileText,
  ClipboardList,
  Target,
  BookMarked,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  Plus,
  Search,
  Bell,
  MessageCircle,
  Save,
  Send,
  CalendarIcon,
  User,
  School,
  Award,
  Activity,
  FileSpreadsheet,
  LayoutDashboard,
  ClipboardCheck,
  Book,
  BookCopy,
  UserCog
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// ==================== DATA STORE ====================
const DATA = {
  siswa: [
    { nis: '201', nama: 'Aisyah Humairo Annur', kelas: 'Kelas 5' },
    { nis: '202', nama: 'Faiza Alya Azizah', kelas: 'Kelas 5' },
    { nis: '203', nama: 'Muhammad Arkaan Mubarrok Hutapea', kelas: 'Kelas 5' },
    { nis: '204', nama: 'Rayzaka Azhari', kelas: 'Kelas 5' },
    { nis: '205', nama: 'AHMAD ZAEN MALEEQ', kelas: 'Kelas 4' },
    { nis: '206', nama: 'ANWAR SHOFWAN ROMADHON', kelas: 'Kelas 4' },
    { nis: '207', nama: 'EARLYTA SARLINA SALSABILA', kelas: 'Kelas 4' },
    { nis: '208', nama: 'FATIH AHMAD RIZKY', kelas: 'Kelas 4' },
    { nis: '209', nama: 'KEYSHA ARLENE KAHLIYA', kelas: 'Kelas 4' },
    { nis: '210', nama: 'MUHAMMAD RAFI ARDHANI', kelas: 'Kelas 4' },
    { nis: '214', nama: 'Anindiya Hafizah Az-Zahra', kelas: 'Kelas 3' },
    { nis: '215', nama: 'Dyna Salsabila', kelas: 'Kelas 3' },
    { nis: '216', nama: 'Farkhan Haidar Faritsy', kelas: 'Kelas 3' },
    { nis: '217', nama: 'Keisya Biru Pratiwi', kelas: 'Kelas 3' },
    { nis: '218', nama: 'Muhammad Aqil Az-Zahran', kelas: 'Kelas 3' },
    { nis: '221', nama: 'Abid Zakki Hafiz Maulana', kelas: 'Kelas 2' },
    { nis: '222', nama: 'Alfian Izzam Pranata', kelas: 'Kelas 2' },
    { nis: '223', nama: 'Amara Zivanya Putri', kelas: 'Kelas 2' },
    { nis: '224', nama: 'Arsyila Kamila Hanifah', kelas: 'Kelas 2' },
    { nis: '225', nama: 'Ayro CV Bintang Pratama', kelas: 'Kelas 2' },
    { nis: '232', nama: 'AKMA NAUFAL MAHADAN', kelas: 'Kelas 6' },
    { nis: '233', nama: 'QONITA ISMAN TAQIYYA', kelas: 'Kelas 6' },
    { nis: '234', nama: 'SYAHRUL RAMADHAN', kelas: 'Kelas 6' },
    { nis: '235', nama: 'ZAHRA AULIA NADWA', kelas: 'Kelas 6' },
    { nis: '236', nama: 'MUTIARA ZAHRA SALMA', kelas: 'Kelas 6' },
    { nis: '119', nama: 'Abdurrahman Alhafidz Aribowo', kelas: 'Kelas 1' },
    { nis: '120', nama: 'Afra Nafisa Putri', kelas: 'Kelas 1' },
    { nis: '121', nama: 'Ahmad Fauzan', kelas: 'Kelas 1' },
    { nis: '122', nama: 'Aira Naila Salsabila', kelas: 'Kelas 1' },
    { nis: '123', nama: 'Danish Fawwaz Abdullah', kelas: 'Kelas 1' },
    { nis: '154', nama: 'Ahmad Karim', kelas: 'TK B' },
    { nis: '155', nama: 'Ayesha Zahra Putri', kelas: 'TK B' },
    { nis: '156', nama: 'Bilal Ramadan', kelas: 'TK B' },
    { nis: '157', nama: 'Fatimah Azzahra', kelas: 'TK B' },
    { nis: '158', nama: 'Muhammad Rizki', kelas: 'TK B' },
    { nis: '171', nama: 'Khairin Shaquilla Diza', kelas: 'TK A' },
    { nis: '172', nama: 'Adam Malik', kelas: 'TK A' },
    { nis: '173', nama: 'Aisha Nur Fatimah', kelas: 'TK A' },
    { nis: '174', nama: 'Hafiz Abdullah', kelas: 'TK A' },
    { nis: '175', nama: 'Zahra Aulia', kelas: 'TK A' },
  ],
  guru: [
    { nip: '256', nama: 'Nurochman', kelas: 'Kelas 5', status: 'Aktif' },
    { nip: '257', nama: 'Hasnal Labibah', kelas: 'KEPALA SEKOLAH', status: 'Aktif' },
    { nip: '260', nama: 'Nilayana', kelas: 'TK A', status: 'Aktif' },
    { nip: '263', nama: 'Tri Amelia', kelas: 'Kelas 3', status: 'Aktif' },
    { nip: '258', nama: 'Bhika Pratami', kelas: 'TK B', status: 'Aktif' },
    { nip: '290', nama: 'Mutia Pusparani', kelas: 'Kelas 1', status: 'Aktif' },
    { nip: '291', nama: 'Bhika Lasmono', kelas: 'Kelas 2', status: 'Aktif' },
    { nip: '293', nama: 'Sulistiyono', kelas: 'Kelas 4', status: 'Aktif' },
    { nip: '294', nama: 'Ahmad Fauzi', kelas: 'Kelas 6', status: 'Aktif' },
  ],
  kelas: ['TK A', 'TK B', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
  mapel: ['IQRO', 'TAHFIDZ', 'Al-Quran', 'Fiqih', 'Bahasa Arab', 'Bahasa Indonesia', 'Matematika', 'IPAS', 'PKN', 'PJOK', 'Bahasa Inggris'],
  // Juz data with specific surah
  juzData: {
    'Juz 26': [
      { no: 1, nama: 'Al-Ahqaf (46)', ayat: 35 },
      { no: 2, nama: 'Muhammad (47)', ayat: 38 },
      { no: 3, nama: 'Al-Fath (48)', ayat: 29 },
      { no: 4, nama: 'Al-Hujurat (49)', ayat: 18 },
      { no: 5, nama: 'Qaf (50)', ayat: 45 },
    ],
    'Juz 27': [
      { no: 1, nama: 'Adz-Dzariyat (51)', ayat: 60 },
      { no: 2, nama: 'Ath-Thur (52)', ayat: 49 },
      { no: 3, nama: 'An-Najm (53)', ayat: 62 },
      { no: 4, nama: 'Al-Qamar (54)', ayat: 55 },
      { no: 5, nama: 'Ar-Rahman (55)', ayat: 78 },
      { no: 6, nama: "Al-Waqi'ah (56)", ayat: 96 },
      { no: 7, nama: 'Al-Hadid (57)', ayat: 29 },
    ],
    'Juz 28': [
      { no: 1, nama: 'Al-Mujadilah (58)', ayat: 22 },
      { no: 2, nama: 'Al-Hasyr (59)', ayat: 24 },
      { no: 3, nama: 'Al-Mumtahanah (60)', ayat: 13 },
      { no: 4, nama: 'Ash-Shaff (61)', ayat: 14 },
      { no: 5, nama: "Al-Jumu'ah (62)", ayat: 11 },
      { no: 6, nama: 'Al-Munafiqun (63)', ayat: 11 },
      { no: 7, nama: 'At-Taghabun (64)', ayat: 18 },
      { no: 8, nama: 'At-Talaq (65)', ayat: 12 },
      { no: 9, nama: 'At-Tahrim (66)', ayat: 12 },
    ],
    'Juz 29': [
      { no: 1, nama: 'Al-Mulk (67)', ayat: 30 },
      { no: 2, nama: 'Al-Qalam (68)', ayat: 52 },
      { no: 3, nama: 'Al-Haqqah (69)', ayat: 52 },
      { no: 4, nama: "Al-Ma'arij (70)", ayat: 44 },
      { no: 5, nama: 'Nuh (71)', ayat: 28 },
      { no: 6, nama: 'Al-Jinn (72)', ayat: 28 },
      { no: 7, nama: 'Al-Muzzammil (73)', ayat: 20 },
      { no: 8, nama: "Al-Muddatstsir (74)", ayat: 56 },
      { no: 9, nama: "Al-Qiyamah (75)", ayat: 40 },
      { no: 10, nama: 'Al-Insan (76)', ayat: 31 },
      { no: 11, nama: 'Al-Mursalat (77)', ayat: 50 },
    ],
    'Juz 30(1)': [
      { no: 1, nama: "An-Naba' (78)", ayat: 40 },
      { no: 2, nama: "An-Nazi'at (79)", ayat: 46 },
      { no: 3, nama: "'Abasa (80)", ayat: 42 },
      { no: 4, nama: 'At-Takwir (81)', ayat: 29 },
      { no: 5, nama: 'Al-Infitar (82)', ayat: 19 },
      { no: 6, nama: 'Al-Mutaffifin (83)', ayat: 36 },
      { no: 7, nama: 'Al-Inshiqaq (84)', ayat: 25 },
      { no: 8, nama: 'Al-Buruj (85)', ayat: 22 },
      { no: 9, nama: 'At-Tariq (86)', ayat: 17 },
    ],
    'Juz 30(2)': [
      { no: 1, nama: "Al-A'la (87)", ayat: 19 },
      { no: 2, nama: 'Al-Ghashiyah (88)', ayat: 26 },
      { no: 3, nama: 'Al-Fajr (89)', ayat: 30 },
      { no: 4, nama: 'Al-Balad (90)', ayat: 20 },
      { no: 5, nama: 'Ash-Shams (91)', ayat: 15 },
      { no: 6, nama: 'Al-Layl (92)', ayat: 21 },
      { no: 7, nama: 'Ad-Duha (93)', ayat: 11 },
      { no: 8, nama: 'Al-Inshirah (94)', ayat: 8 },
      { no: 9, nama: 'At-Tin (95)', ayat: 8 },
      { no: 10, nama: "Al-'Alaq (96)", ayat: 19 },
      { no: 11, nama: 'Al-Qadr (97)', ayat: 5 },
      { no: 12, nama: 'Al-Bayyinah (98)', ayat: 8 },
      { no: 13, nama: 'Az-Zalzalah (99)', ayat: 8 },
      { no: 14, nama: "Al-'Adiyat (100)", ayat: 11 },
      { no: 15, nama: "Al-Qari'ah (101)", ayat: 11 },
      { no: 16, nama: 'At-Takathur (102)', ayat: 8 },
    ],
    'Juz 30(3)': [
      { no: 1, nama: "Al-'Asr (103)", ayat: 3 },
      { no: 2, nama: 'Al-Humazah (104)', ayat: 9 },
      { no: 3, nama: 'Al-Fil (105)', ayat: 5 },
      { no: 4, nama: 'Quraish (106)', ayat: 4 },
      { no: 5, nama: "Al-Ma'un (107)", ayat: 7 },
      { no: 6, nama: 'Al-Kawthar (108)', ayat: 3 },
      { no: 7, nama: 'Al-Kafirun (109)', ayat: 6 },
      { no: 8, nama: 'An-Nasr (110)', ayat: 3 },
      { no: 9, nama: 'Al-Lahab (111)', ayat: 5 },
      { no: 10, nama: 'Al-Ikhlas (112)', ayat: 4 },
      { no: 11, nama: 'Al-Falaq (113)', ayat: 5 },
      { no: 12, nama: 'An-Nas (114)', ayat: 6 },
    ],
  },
  juzList: ['Juz 26', 'Juz 27', 'Juz 28', 'Juz 29', 'Juz 30(1)', 'Juz 30(2)', 'Juz 30(3)'],
  surat: [
    'Al-Fatihah', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Maidah', 'Al-An\'am', 'Al-A\'raf', 'Al-Anfal',
    'At-Taubah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl',
    'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Mu\'minun', 'An-Nur',
    'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajdah',
    'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir',
    'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah', 'Al-Ahqaf', 'Muhammad', 'Al-Fath',
    'Al-Hujurat', 'Qaf', 'Adh-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqi\'ah',
    'Al-Hadid', 'Al-Mujadila', 'Al-Hashr', 'Al-Mumtahanah', 'As-Saff', 'Al-Jumu\'ah', 'Al-Munafiqun', 'At-Taghabun',
    'At-Talaq', 'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqah', 'Al-Ma\'arij', 'Nuh', 'Al-Jinn',
    'Al-Muzzammil', 'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba', 'An-Nazi\'at', 'Abasa',
    'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-A\'la', 'Al-Ghashiyah',
    'Al-Fajr', 'Al-Balad', 'Ash-Shams', 'Al-Lail', 'Ad-Dhuha', 'Ash-Sharh', 'At-Tin', 'Al-Alaq',
    'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-Adiyat', 'Al-Qari\'ah', 'At-Takathur', 'Al-Asr', 'Al-Humazah',
    'Al-Fil', 'Quraish', 'Al-Ma\'un', 'Al-Kauthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas',
    'Al-Falaq', 'An-Nas'
  ]
};

// Types
interface Siswa {
  nis: string;
  nama: string;
  kelas: string;
}

interface Guru {
  nip: string;
  nama: string;
  kelas: string;
  status: string;
}

interface NilaiSiswa {
  nis: string;
  mapel: string;
  nilai: number;
  predikat: string;
  tanggal: string;
}

interface AbsensiSiswaData {
  nis: string;
  tanggal: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
  keterangan: string;
}

interface AbsensiGuruData {
  nip: string;
  tanggal: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
  keterangan: string;
}

interface JurnalData {
  nip: string;
  tanggal: string;
  kelas: string;
  mapel: string;
  materi: string;
  keterangan: string;
}

interface LaporanHarianData {
  nis: string;
  kelas: string;
  tanggal: string;
  mapel: string;
  bahasan: string;
  halaman: string;
  hasil: 'Lancar' | 'Cukup' | 'Perlu Latihan';
  catatan: string;
}

interface KegiatanData {
  nis: string;
  kelas: string;
  tanggal: string;
  kategori: string;
  penilaian: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  deskripsi: string;
}

interface TargetData {
  nis: string;
  kelas: string;
  mapel: string;
  progress: number;
  deskripsi: string;
  hasil: 'Tercapai' | 'Proses' | 'Belum';
  catatan: string;
  deadline: string;
}

interface ZiyadahData {
  nis: string;
  kelas: string;
  tanggal: string;
  juz: string;
  surat: string;
  progress: string;
  hasil: 'Lancar' | 'Cukup' | 'Perlu Latihan' | 'Belum';
  catatan: string;
}

type UserRole = 'guru' | 'admin' | 'wali' | null;

interface User {
  role: UserRole;
  nama: string;
  nip?: string;
  nis?: string;
  kelas?: string;
}

// Initial sample data
const initialNilai: NilaiSiswa[] = [
  { nis: '201', mapel: 'Al-Quran', nilai: 90, predikat: 'Sangat Baik', tanggal: '2024-12-01' },
  { nis: '201', mapel: 'Fiqih', nilai: 85, predikat: 'Baik', tanggal: '2024-12-01' },
  { nis: '201', mapel: 'Matematika', nilai: 78, predikat: 'Cukup', tanggal: '2024-12-01' },
  { nis: '201', mapel: 'Bahasa Arab', nilai: 88, predikat: 'Baik', tanggal: '2024-12-01' },
  { nis: '201', mapel: 'Bahasa Indonesia', nilai: 82, predikat: 'Baik', tanggal: '2024-12-01' },
  { nis: '202', mapel: 'Al-Quran', nilai: 92, predikat: 'Sangat Baik', tanggal: '2024-12-01' },
  { nis: '202', mapel: 'Fiqih', nilai: 80, predikat: 'Baik', tanggal: '2024-12-01' },
];

const initialAbsensiSiswa: AbsensiSiswaData[] = [
  { nis: '201', tanggal: '2024-12-01', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nis: '201', tanggal: '2024-12-02', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nis: '201', tanggal: '2024-12-03', status: 'Sakit', keterangan: 'Izin tidak masuk' },
  { nis: '201', tanggal: '2024-12-04', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nis: '201', tanggal: '2024-12-05', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nis: '202', tanggal: '2024-12-01', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nis: '202', tanggal: '2024-12-02', status: 'Izin', keterangan: 'Acara keluarga' },
  { nis: '202', tanggal: '2024-12-03', status: 'Hadir', keterangan: 'Tepat waktu' },
];

const initialAbsensiGuru: AbsensiGuruData[] = [
  { nip: '256', tanggal: '2024-12-01', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nip: '256', tanggal: '2024-12-02', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nip: '256', tanggal: '2024-12-03', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nip: '257', tanggal: '2024-12-01', status: 'Hadir', keterangan: 'Tepat waktu' },
  { nip: '257', tanggal: '2024-12-02', status: 'Izin', keterangan: 'Rapat dinas' },
];

const initialJurnal: JurnalData[] = [
  { nip: '256', tanggal: '2024-12-01', kelas: 'Kelas 5', mapel: 'Al-Quran', materi: 'Surat An-Naba ayat 1-20', keterangan: 'Berjalan dengan baik' },
  { nip: '256', tanggal: '2024-12-02', kelas: 'Kelas 5', mapel: 'Fiqih', materi: 'Tata cara shalat', keterangan: 'Siswa antusias' },
  { nip: '263', tanggal: '2024-12-01', kelas: 'Kelas 3', mapel: 'Matematika', materi: 'Penjumlahan dan pengurangan', keterangan: 'Perlu latihan lebih' },
];

const initialLaporanHarian: LaporanHarianData[] = [
  { nis: '201', kelas: 'Kelas 5', tanggal: '2024-12-01', mapel: 'Al-Quran', bahasan: 'Surat An-Naba\' ayat 1-20', halaman: 'Juz 30', hasil: 'Lancar', catatan: 'Sangat baik dalam menghafal' },
  { nis: '201', kelas: 'Kelas 5', tanggal: '2024-12-02', mapel: 'Matematika', bahasan: 'Penjumlahan pecahan', halaman: 'Hal 45', hasil: 'Perlu Latihan', catatan: 'Perlu latihan lebih banyak' },
  { nis: '202', kelas: 'Kelas 5', tanggal: '2024-12-01', mapel: 'Al-Quran', bahasan: 'Surat An-Naba\' ayat 1-20', halaman: 'Juz 30', hasil: 'Lancar', catatan: 'Tajwid sudah baik' },
];

const initialKegiatan: KegiatanData[] = [
  { nis: '201', kelas: 'Kelas 5', tanggal: '2024-12-01', kategori: 'Shalat Berjamaah', penilaian: 'Sangat Baik', deskripsi: 'Menjadi imam shalat dzuhur berjamaah' },
  { nis: '201', kelas: 'Kelas 5', tanggal: '2024-12-02', kategori: 'Kebersihan', penilaian: 'Baik', deskripsi: 'Aktif membantu kebersihan kelas' },
];

const initialTarget: TargetData[] = [
  { nis: '201', kelas: 'Kelas 5', mapel: 'Al-Quran', progress: 80, deskripsi: 'Hafal Juz 30', hasil: 'Proses', catatan: 'Sudah hafal 20 surat', deadline: '2025-01-30' },
  { nis: '201', kelas: 'Kelas 5', mapel: 'Bahasa Arab', progress: 100, deskripsi: 'Kosakata harian', hasil: 'Tercapai', catatan: 'Sudah menguasai 100 kosakata', deadline: '2024-12-15' },
];

const initialZiyadah: ZiyadahData[] = [
  { nis: '201', kelas: 'Kelas 5', tanggal: '2024-12-01', juz: 'Juz 30(1)', surat: "An-Naba' (78)", progress: 'Ayat 1-40', hasil: 'Lancar', catatan: 'Tajwid sangat baik' },
  { nis: '201', kelas: 'Kelas 5', tanggal: '2024-12-05', juz: 'Juz 30(1)', surat: "An-Nazi'at (79)", progress: 'Ayat 1-46', hasil: 'Cukup', catatan: 'Perlu latihan tajwid' },
  { nis: '202', kelas: 'Kelas 5', tanggal: '2024-12-01', juz: 'Juz 29', surat: 'Al-Mursalat (77)', progress: 'Ayat 1-50', hasil: 'Lancar', catatan: 'Hafalan lancar' },
];

// ==================== MAIN COMPONENT ====================
export default function Home() {
  const { toast } = useToast();
  
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [selectedPortal, setSelectedPortal] = useState<UserRole>(null);
  const [activeTab, setActiveTab] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentPortalView, setCurrentPortalView] = useState<'guru' | 'siswa' | 'wali'>('guru'); // For admin to switch portals
  
  // Data state
  const [nilai, setNilai] = useState<NilaiSiswa[]>(initialNilai);
  const [absensiSiswa, setAbsensiSiswa] = useState<AbsensiSiswaData[]>(initialAbsensiSiswa);
  const [absensiGuru, setAbsensiGuru] = useState<AbsensiGuruData[]>(initialAbsensiGuru);
  const [jurnal, setJurnal] = useState<JurnalData[]>(initialJurnal);
  const [laporanHarian, setLaporanHarian] = useState<LaporanHarianData[]>(initialLaporanHarian);
  const [kegiatan, setKegiatan] = useState<KegiatanData[]>(initialKegiatan);
  const [target, setTarget] = useState<TargetData[]>(initialTarget);
  const [ziyadah, setZiyadah] = useState<ZiyadahData[]>(initialZiyadah);
  
  // Login form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedGuru, setSelectedGuru] = useState('');
  const [guruPassword, setGuruPassword] = useState('');
  const [selectedKelasWali, setSelectedKelasWali] = useState('');
  const [selectedSiswaWali, setSelectedSiswaWali] = useState('');
  
  // Date filter
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());
  
  // Form states
  const [formData, setFormData] = useState({
    kelas: '',
    nis: '',
    tanggal: new Date(),
    mapel: '',
    bahasan: '',
    halaman: '',
    hasil: 'Hadir',
    catatan: '',
    kategori: '',
    penilaian: 'Baik',
    deskripsi: '',
    progress: 50,
    deadline: new Date(),
    juzStr: 'Juz 26',
    surat: '',
    progressAyat: '',
  });
  
  // State for loaded siswa in absensi
  const [loadedSiswaAbsensi, setLoadedSiswaAbsensi] = useState<Array<{nis: string, nama: string, kelas: string, status: string}>>([]);

  // State for settings (Pintasan/Pengaturan)
  const [quickLinks, setQuickLinks] = useState([
    { id: 1, icon: '📝', title: 'PPDB', url: 'https://script.google.com/a/macros/admin.paud.belajar.id/s/AKfycbxXADFTW-6LkMMoi4X4k681iBwbpR-Bd5hVQLVO_rS1p9g6XtC8LfCoBezJQAGvGdM94Q/exec' },
    { id: 2, icon: '💰', title: 'Bayar', url: 'https://docs.google.com/spreadsheets/d/19RX6IWg7JegYv0vO7B-67OK3l4nN_ypaN8WkEXv4EDI/edit?pli=1&gid=385377373#gid=385377373' },
    { id: 3, icon: '❤️', title: 'Open Donasi', url: 'https://docs.google.com/forms/d/1pS4ZonyqO3G6m4XG8YnDw-O51BjFDDkA0uBbkKfikgk/edit' },
  ]);
  
  const [banners, setBanners] = useState([
    { id: 1, title: 'Selamat Datang', subtitle: 'di Portal Pendidikan Bunayya', gradient: 'from-green-600 to-green-700' },
    { id: 2, title: 'Pendaftaran Dibuka', subtitle: 'Tahun Ajaran 2024/2025', gradient: 'from-blue-600 to-blue-700' },
    { id: 3, title: 'Raih Prestasi', subtitle: 'Bersama Kami', gradient: 'from-amber-600 to-amber-700' },
  ]);
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, icon: '📢', title: 'Libur Semester', content: 'Libur semester dimulai tanggal 20 Februari 2026' },
    { id: 2, icon: '📝', title: 'Pendaftaran', content: 'PPDB tahun ajaran baru telah dibuka' },
  ]);
  
  const [newLink, setNewLink] = useState({ icon: '📝', title: '', url: '' });
  const [newAnnouncement, setNewAnnouncement] = useState({ icon: '📢', title: '', content: '' });
  const [editBannerIndex, setEditBannerIndex] = useState<number | null>(null);

  // Handle login functions
  const handleAdminLogin = () => {
    if (adminUsername === 'admin' && adminPassword === 'admin@123') {
      setUser({ role: 'admin', nama: 'Administrator' });
      setActiveTab('dashboard');
      setSelectedPortal(null);
      setLoginError('');
      toast({ title: 'Login Berhasil', description: 'Selamat datang Administrator' });
    } else {
      setLoginError('Username atau password salah');
    }
  };

  const handleGuruLogin = () => {
    const guru = DATA.guru.find(g => g.nip === selectedGuru);
    if (guru && guruPassword === guru.nip) {
      setUser({ role: 'guru', nama: guru.nama, nip: guru.nip, kelas: guru.kelas });
      setActiveTab('dashboard');
      setSelectedPortal(null);
      setLoginError('');
      toast({ title: 'Login Berhasil', description: `Selamat datang ${guru.nama}` });
    } else {
      setLoginError('NIP tidak valid');
    }
  };

  const handleWaliLogin = () => {
    const siswa = DATA.siswa.find(s => s.nis === selectedSiswaWali);
    if (siswa) {
      setUser({ role: 'wali', nama: siswa.nama, nis: siswa.nis, kelas: siswa.kelas });
      setActiveTab('dashboard');
      setSelectedPortal(null);
      setLoginError('');
      toast({ title: 'Login Berhasil', description: `Selamat datang Wali dari ${siswa.nama}` });
    } else {
      setLoginError('Pilih siswa terlebih dahulu');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedPortal(null);
    setActiveTab('');
    setLoginError('');
    setAdminUsername('');
    setAdminPassword('');
    setSelectedGuru('');
    setGuruPassword('');
    setSelectedKelasWali('');
    setSelectedSiswaWali('');
    toast({ title: 'Logout Berhasil', description: 'Anda telah keluar dari sistem' });
  };

  // Get filtered siswa by kelas
  const getSiswaByKelas = (kelas: string) => {
    return DATA.siswa.filter(s => s.kelas === kelas);
  };

  // Stats calculation
  const getStats = () => {
    const totalSiswa = DATA.siswa.length;
    const totalGuru = DATA.guru.length;
    const totalNilai = nilai.length;
    const totalAbsensi = absensiSiswa.length;
    
    return { totalSiswa, totalGuru, totalNilai, totalAbsensi };
  };

  // Get nilai by nis
  const getNilaiByNis = (nis: string) => {
    return nilai.filter(n => n.nis === nis);
  };

  // Get absensi by nis
  const getAbsensiByNis = (nis: string) => {
    return absensiSiswa.filter(a => a.nis === nis);
  };

  // Get laporan harian by nis
  const getLaporanHarianByNis = (nis: string) => {
    return laporanHarian.filter(l => l.nis === nis);
  };

  // Get ziyadah by nis
  const getZiyadahByNis = (nis: string) => {
    return ziyadah.filter(z => z.nis === nis);
  };

  // Get target by nis
  const getTargetByNis = (nis: string) => {
    return target.filter(t => t.nis === nis);
  };

  // Calculate attendance percentage
  const getAttendancePercentage = (nis: string) => {
    const abs = getAbsensiByNis(nis);
    if (abs.length === 0) return 0;
    const hadir = abs.filter(a => a.status === 'Hadir').length;
    return Math.round((hadir / abs.length) * 100);
  };

  // Calculate average grade
  const getAverageGrade = (nis: string) => {
    const grades = getNilaiByNis(nis);
    if (grades.length === 0) return 0;
    return Math.round(grades.reduce((sum, n) => sum + n.nilai, 0) / grades.length);
  };

  // Save form handlers
  const saveLaporanHarian = () => {
    if (!formData.kelas || !formData.nis || !formData.mapel || !formData.bahasan) {
      toast({ title: 'Error', description: 'Lengkapi semua field yang wajib', variant: 'destructive' });
      return;
    }
    
    const newLaporan: LaporanHarianData = {
      nis: formData.nis,
      kelas: formData.kelas,
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
      mapel: formData.mapel,
      bahasan: formData.bahasan,
      halaman: formData.halaman,
      hasil: formData.hasil as 'Lancar' | 'Cukup' | 'Perlu Latihan',
      catatan: formData.catatan,
    };
    
    setLaporanHarian(prev => [newLaporan, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Laporan harian berhasil disimpan' });
  };

  const saveKegiatan = () => {
    if (!formData.kelas || !formData.nis || !formData.kategori || !formData.deskripsi) {
      toast({ title: 'Error', description: 'Lengkapi semua field yang wajib', variant: 'destructive' });
      return;
    }
    
    const newKegiatan: KegiatanData = {
      nis: formData.nis,
      kelas: formData.kelas,
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
      kategori: formData.kategori,
      penilaian: formData.penilaian as 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang',
      deskripsi: formData.deskripsi,
    };
    
    setKegiatan(prev => [newKegiatan, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Laporan kegiatan berhasil disimpan' });
  };

  const saveTarget = () => {
    if (!formData.kelas || !formData.nis || !formData.mapel || !formData.deskripsi) {
      toast({ title: 'Error', description: 'Lengkapi semua field yang wajib', variant: 'destructive' });
      return;
    }
    
    const newTarget: TargetData = {
      nis: formData.nis,
      kelas: formData.kelas,
      mapel: formData.mapel,
      progress: formData.progress,
      deskripsi: formData.deskripsi,
      hasil: formData.hasil as 'Tercapai' | 'Proses' | 'Belum',
      catatan: formData.catatan,
      deadline: format(formData.deadline, 'yyyy-MM-dd'),
    };
    
    setTarget(prev => [newTarget, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Target pencapaian berhasil disimpan' });
  };

  const saveZiyadah = () => {
    if (!formData.kelas || !formData.nis || !formData.surat || !formData.progressAyat) {
      toast({ title: 'Error', description: 'Lengkapi semua field yang wajib', variant: 'destructive' });
      return;
    }
    
    const newZiyadah: ZiyadahData = {
      nis: formData.nis,
      kelas: formData.kelas,
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
      juz: formData.juzStr,
      surat: formData.surat,
      progress: formData.progressAyat,
      hasil: formData.hasil as 'Lancar' | 'Cukup' | 'Perlu Latihan' | 'Belum',
      catatan: formData.catatan,
    };
    
    setZiyadah(prev => [newZiyadah, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Ziyadah hafalan berhasil disimpan' });
  };

  const resetForm = () => {
    setFormData({
      kelas: '',
      nis: '',
      tanggal: new Date(),
      mapel: '',
      bahasan: '',
      halaman: '',
      hasil: 'Hadir',
      catatan: '',
      kategori: '',
      penilaian: 'Baik',
      deskripsi: '',
      progress: 50,
      deadline: new Date(),
      juzStr: 'Juz 26',
      surat: '',
      progressAyat: '',
    });
    setLoadedSiswaAbsensi([]);
  };

  // Additional save functions for Portal Guru forms
  const saveAbsensiSiswa = () => {
    if (!formData.kelas || !formData.nis) {
      toast({ title: 'Error', description: 'Pilih kelas dan siswa', variant: 'destructive' });
      return;
    }
    
    const newAbsensi: AbsensiSiswaData = {
      nis: formData.nis,
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
      status: formData.hasil as 'Hadir' | 'Sakit' | 'Izin' | 'Alpha',
      keterangan: formData.catatan || 'Tepat waktu',
    };
    
    setAbsensiSiswa(prev => [newAbsensi, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Absensi siswa berhasil disimpan' });
  };

  // Load students for absensi
  const loadSiswaForAbsensi = () => {
    if (!formData.kelas) {
      toast({ title: 'Error', description: 'Pilih kelas terlebih dahulu', variant: 'destructive' });
      return;
    }
    const siswaKelas = getSiswaByKelas(formData.kelas);
    const loaded = siswaKelas.map(s => ({
      nis: s.nis,
      nama: s.nama,
      kelas: s.kelas,
      status: 'Hadir' // Default to Hadir
    }));
    setLoadedSiswaAbsensi(loaded);
    toast({ title: 'Berhasil', description: `${loaded.length} siswa dimuat untuk kelas ${formData.kelas}` });
  };

  // Update status for individual student
  const updateSiswaStatus = (nis: string, status: string) => {
    setLoadedSiswaAbsensi(prev => prev.map(s => 
      s.nis === nis ? { ...s, status } : s
    ));
  };

  // Save all absensi at once
  const saveAllAbsensiSiswa = () => {
    if (loadedSiswaAbsensi.length === 0) {
      toast({ title: 'Error', description: 'Tidak ada data siswa yang dimuat', variant: 'destructive' });
      return;
    }
    
    const tanggalStr = format(formData.tanggal, 'yyyy-MM-dd');
    const newAbsensiList = loadedSiswaAbsensi.map(s => ({
      nis: s.nis,
      tanggal: tanggalStr,
      status: s.status as 'Hadir' | 'Sakit' | 'Izin' | 'Alpha',
      keterangan: 'Tepat waktu'
    }));
    
    setAbsensiSiswa(prev => [...newAbsensiList, ...prev]);
    toast({ title: 'Berhasil', description: `${newAbsensiList.length} absensi siswa berhasil disimpan` });
  };

  // Download absensi as CSV (Excel compatible)
  const downloadAbsensiExcel = () => {
    if (loadedSiswaAbsensi.length === 0) {
      toast({ title: 'Error', description: 'Tidak ada data untuk diunduh', variant: 'destructive' });
      return;
    }
    
    const tanggalStr = format(formData.tanggal, 'yyyy-MM-dd');
    const headers = ['No', 'NIS', 'Nama', 'Kelas', 'Tanggal', 'Status'];
    const rows = loadedSiswaAbsensi.map((s, i) => [
      i + 1,
      s.nis,
      s.nama,
      s.kelas,
      tanggalStr,
      s.status
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `absensi_${formData.kelas.replace(' ', '_')}_${tanggalStr}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Berhasil', description: 'File absensi berhasil diunduh' });
  };

  const saveAbsensiGuru = () => {
    if (!formData.mapel) {
      toast({ title: 'Error', description: 'Pilih guru', variant: 'destructive' });
      return;
    }
    
    const newAbsensiGuru: AbsensiGuruData = {
      nip: formData.mapel, // Using mapel field temporarily for nip
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
      status: formData.hasil as 'Hadir' | 'Sakit' | 'Izin' | 'Alpha',
      keterangan: formData.catatan || 'Tepat waktu',
    };
    
    setAbsensiGuru(prev => [newAbsensiGuru, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Absensi guru berhasil disimpan' });
  };

  const saveJurnalGuru = () => {
    if (!formData.kelas || !formData.mapel || !formData.bahasan) {
      toast({ title: 'Error', description: 'Lengkapi semua field yang wajib', variant: 'destructive' });
      return;
    }
    
    const newJurnal: JurnalData = {
      nip: user?.nip || '',
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
      kelas: formData.kelas,
      mapel: formData.mapel,
      materi: formData.bahasan,
      keterangan: formData.catatan,
    };
    
    setJurnal(prev => [newJurnal, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Jurnal mengajar berhasil disimpan' });
  };

  const saveNilaiSiswa = () => {
    if (!formData.kelas || !formData.nis || !formData.mapel || !formData.progress) {
      toast({ title: 'Error', description: 'Lengkapi semua field yang wajib', variant: 'destructive' });
      return;
    }
    
    const predikat = formData.progress >= 90 ? 'Sangat Baik' : 
                     formData.progress >= 80 ? 'Baik' : 
                     formData.progress >= 70 ? 'Cukup' : 'Kurang';
    
    const newNilai: NilaiSiswa = {
      nis: formData.nis,
      mapel: formData.mapel,
      nilai: formData.progress,
      predikat: predikat,
      tanggal: format(formData.tanggal, 'yyyy-MM-dd'),
    };
    
    setNilai(prev => [newNilai, ...prev]);
    resetForm();
    toast({ title: 'Berhasil', description: 'Nilai siswa berhasil disimpan' });
  };

  // Delete functions for Kontrol
  const deleteLaporanHarian = (index: number) => {
    setLaporanHarian(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Laporan harian berhasil dihapus' });
  };

  const deleteKegiatan = (index: number) => {
    setKegiatan(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Kegiatan berhasil dihapus' });
  };

  const deleteTarget = (index: number) => {
    setTarget(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Target berhasil dihapus' });
  };

  const deleteZiyadah = (index: number) => {
    setZiyadah(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Ziyadah berhasil dihapus' });
  };

  const deleteAbsensiSiswa = (index: number) => {
    setAbsensiSiswa(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Absensi siswa berhasil dihapus' });
  };

  const deleteAbsensiGuru = (index: number) => {
    setAbsensiGuru(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Absensi guru berhasil dihapus' });
  };

  const deleteJurnal = (index: number) => {
    setJurnal(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Jurnal berhasil dihapus' });
  };

  const deleteNilai = (index: number) => {
    setNilai(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Berhasil', description: 'Nilai berhasil dihapus' });
  };

  // Chart data preparation
  const getNilaiPerKelas = () => {
    return DATA.kelas.map(kelas => {
      const siswaKelas = DATA.siswa.filter(s => s.kelas === kelas);
      const nilaiKelas = nilai.filter(n => siswaKelas.some(s => s.nis === n.nis));
      return {
        name: kelas.replace('Kelas ', ''),
        nilai: nilaiKelas.length
      };
    });
  };

  const getAbsensiPerKelas = () => {
    return DATA.kelas.map(kelas => {
      const siswaKelas = DATA.siswa.filter(s => s.kelas === kelas);
      const absensiKelas = absensiSiswa.filter(a => siswaKelas.some(s => s.nis === a.nis));
      return {
        name: kelas.replace('Kelas ', ''),
        hadir: absensiKelas.filter(a => a.status === 'Hadir').length,
        sakit: absensiKelas.filter(a => a.status === 'Sakit').length,
        izin: absensiKelas.filter(a => a.status === 'Izin').length,
      };
    });
  };

  const getZiyadahChart = (nis: string) => {
    const z = getZiyadahByNis(nis);
    return z.map(item => ({
      name: item.surat.substring(0, 8),
      progress: item.hasil === 'Lancar' ? 100 : item.hasil === 'Cukup' ? 75 : item.hasil === 'Perlu Latihan' ? 50 : 25,
    }));
  };

  const getZiyadahPieData = (nis: string) => {
    const z = getZiyadahByNis(nis);
    return [
      { name: 'Lancar', value: z.filter(item => item.hasil === 'Lancar').length, color: '#4ade80' },
      { name: 'Cukup', value: z.filter(item => item.hasil === 'Cukup').length, color: '#fbbf24' },
      { name: 'Perlu Latihan', value: z.filter(item => item.hasil === 'Perlu Latihan').length, color: '#f97316' },
      { name: 'Belum', value: z.filter(item => item.hasil === 'Belum').length, color: '#ef4444' },
    ];
  };

  // Dashboard chart data functions
  const getAbsensiSiswaChartData = () => {
    return DATA.kelas.map(kelas => {
      const siswaKelas = DATA.siswa.filter(s => s.kelas === kelas);
      const absensiKelas = absensiSiswa.filter(a => siswaKelas.some(s => s.nis === a.nis));
      return {
        name: kelas.replace('Kelas ', ''),
        hadir: absensiKelas.filter(a => a.status === 'Hadir').length,
        sakit: absensiKelas.filter(a => a.status === 'Sakit').length,
        izin: absensiKelas.filter(a => a.status === 'Izin').length,
      };
    });
  };

  const getAbsensiGuruPieData = (nip: string) => {
    const absensiG = absensiGuru.filter(a => a.nip === nip);
    return [
      { name: 'Hadir', value: absensiG.filter(a => a.status === 'Hadir').length, color: '#4ade80' },
      { name: 'Tidak Hadir', value: absensiG.filter(a => a.status !== 'Hadir').length, color: '#ef4444' },
    ];
  };

  const getJurnalGuruChartData = () => {
    return DATA.guru.map(guru => ({
      name: guru.nama.split(' ')[0],
      jurnal: jurnal.filter(j => j.nip === guru.nip).length,
    }));
  };

  const getLaporanHarianChartData = () => {
    return DATA.kelas.map(kelas => ({
      name: kelas.replace('Kelas ', ''),
      laporan: laporanHarian.filter(l => l.kelas === kelas).length,
    }));
  };

  const getKegiatanChartData = () => {
    return DATA.kelas.map(kelas => ({
      name: kelas.replace('Kelas ', ''),
      kegiatan: kegiatan.filter(k => k.kelas === kelas).length,
    }));
  };

  const getTargetChartData = () => {
    return DATA.kelas.map(kelas => ({
      name: kelas.replace('Kelas ', ''),
      tercapai: target.filter(t => t.kelas === kelas && t.hasil === 'Tercapai').length,
      proses: target.filter(t => t.kelas === kelas && t.hasil === 'Proses').length,
    }));
  };

  const getZiyadahChartData = () => {
    return DATA.kelas.map(kelas => ({
      name: kelas.replace('Kelas ', ''),
      lancar: ziyadah.filter(z => z.kelas === kelas && z.hasil === 'Lancar').length,
      cukup: ziyadah.filter(z => z.kelas === kelas && z.hasil === 'Cukup').length,
    }));
  };

  const COLORS = ['#4ade80', '#fbbf24', '#f97316', '#ef4444'];

  // ==================== LOGIN PAGE ====================
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col animate-fade-in" style={{ background: 'linear-gradient(135deg, #052e16 0%, #0a3d1f 50%, #052e16 100%)' }}>
        {/* Header Section - Full Width Green */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 rounded-b-3xl shadow-xl">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg mb-4">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">EDUCATION PORTAL</h1>
            <h2 className="text-lg font-semibold text-white/90 mt-1">Bunayya Islamic School</h2>
            <p className="text-white/70 text-sm mt-1">Menuju Generasi Qur&apos;ani</p>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
          {/* Portal Selection - White Card with Circular Buttons */}
          {!selectedPortal && (
            <div className="animate-slide-up">
              <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <p className="text-center text-gray-600 mb-6 text-sm font-medium">Pilih Portal untuk Masuk</p>
                  <div className="flex justify-center gap-6">
                    {/* Portal Guru */}
                    <button
                      onClick={() => setSelectedPortal('guru')}
                      className="group flex flex-col items-center gap-2 transition-all duration-300 active:scale-95"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-xs">Portal Guru</span>
                    </button>

                    {/* Portal Admin */}
                    <button
                      onClick={() => setSelectedPortal('admin')}
                      className="group flex flex-col items-center gap-2 transition-all duration-300 active:scale-95"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-xs">Portal Admin</span>
                    </button>

                    {/* Portal Wali */}
                    <button
                      onClick={() => setSelectedPortal('wali')}
                      className="group flex flex-col items-center gap-2 transition-all duration-300 active:scale-95"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-xs">Portal Wali</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Welcome Banner */}
              <Card className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg rounded-2xl mt-4 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Selamat Datang</p>
                        <p className="text-white/70 text-sm">Portal Pendidikan Bunayya</p>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/70 -rotate-90" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links - Same Size as Portal Buttons */}
              <div className="mt-4">
                <p className="text-center text-gray-500 text-xs mb-3">Link Cepat</p>
                <div className="flex justify-center gap-6">
                  <button className="group flex flex-col items-center gap-2 transition-all duration-300 active:scale-95">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-xs">PPDB</span>
                  </button>
                  <button className="group flex flex-col items-center gap-2 transition-all duration-300 active:scale-95">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-xs">Bayar</span>
                  </button>
                </div>
              </div>

              {/* Announcements */}
              <div className="mt-4 space-y-3">
                <Card className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]">
                  <CardContent className="p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">Libur Semester</p>
                      <p className="text-gray-500 text-xs">Libur semester dimulai tanggal 20 Desember</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]">
                  <CardContent className="p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">Pendaftaran</p>
                      <p className="text-gray-500 text-xs">PPDB tahun ajaran baru telah dibuka</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Login Forms */}
          {selectedPortal && (
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700">
                <CardTitle className="text-white flex items-center gap-2">
                  {selectedPortal === 'admin' && <User className="w-5 h-5" />}
                  {selectedPortal === 'guru' && <GraduationCap className="w-5 h-5" />}
                  {selectedPortal === 'wali' && <Users className="w-5 h-5" />}
                  Login {selectedPortal === 'admin' ? 'Admin' : selectedPortal === 'guru' ? 'Guru' : 'Wali Murid'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                    {loginError}
                  </div>
                )}

                {/* Admin Login */}
                {selectedPortal === 'admin' && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-gray-600">Username</Label>
                      <Input
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="Masukkan username"
                        className="bg-gray-50 border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-600">Password</Label>
                      <Input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Masukkan password"
                        className="bg-gray-50 border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <Button onClick={handleAdminLogin} className="w-full min-h-[44px] touch-manipulation bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                      Masuk Portal
                    </Button>
                  </>
                )}

                {/* Guru Login */}
                {selectedPortal === 'guru' && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-gray-600">Pilih Guru</Label>
                      <Select value={selectedGuru} onValueChange={setSelectedGuru}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-800">
                          <SelectValue placeholder="-- Pilih Guru --" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          {DATA.guru.map((guru) => (
                            <SelectItem key={guru.nip} value={guru.nip} className="text-gray-800">
                              {guru.nama} ({guru.kelas})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-600">Password (NIP)</Label>
                      <Input
                        type="password"
                        value={guruPassword}
                        onChange={(e) => setGuruPassword(e.target.value)}
                        placeholder="Masukkan NIP sebagai password"
                        className="bg-gray-50 border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <Button onClick={handleGuruLogin} className="w-full min-h-[44px] touch-manipulation bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                      Masuk Portal
                    </Button>
                  </>
                )}

                {/* Wali Login */}
                {selectedPortal === 'wali' && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-gray-600">Pilih Kelas</Label>
                      <Select value={selectedKelasWali} onValueChange={setSelectedKelasWali}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-800">
                          <SelectValue placeholder="-- Pilih Kelas --" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          {DATA.kelas.map((kelas) => (
                            <SelectItem key={kelas} value={kelas} className="text-gray-800">
                              {kelas}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-600">Pilih Siswa</Label>
                      <Select value={selectedSiswaWali} onValueChange={setSelectedSiswaWali} disabled={!selectedKelasWali}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-800 disabled:opacity-50">
                          <SelectValue placeholder={!selectedKelasWali ? "Pilih kelas terlebih dahulu" : "-- Pilih Siswa --"} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          {getSiswaByKelas(selectedKelasWali).map((siswa) => (
                            <SelectItem key={siswa.nis} value={siswa.nis} className="text-gray-800">
                              {siswa.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleWaliLogin} className="w-full min-h-[44px] touch-manipulation bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                      Masuk Portal
                    </Button>
                  </>
                )}

                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedPortal(null);
                    setLoginError('');
                  }}
                  className="w-full min-h-[44px] touch-manipulation text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-300"
                >
                  <ChevronDown className="w-4 h-4 mr-2 rotate-90" />
                  Kembali
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // ==================== MAIN APPLICATION ====================
  
  // Determine which portals user can access
  const getAvailablePortals = () => {
    if (user?.role === 'admin') {
      return ['guru', 'siswa', 'wali'] as const;
    } else if (user?.role === 'guru') {
      return ['guru', 'siswa', 'wali'] as const;
    } else {
      return ['wali'] as const;
    }
  };

  // Check if user can access specific tabs (for guru role restriction)
  const canAccessTab = (tab: string) => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'guru') {
      // Guru cannot access: Data Guru, Pintasan (settings), Mapel (settings)
      const restrictedTabs = ['data-guru', 'pintasan', 'mapel'];
      return !restrictedTabs.includes(tab);
    }
    return true;
  };

  // Get current active portal based on user role
  const getActivePortal = () => {
    if (user?.role === 'admin') return currentPortalView;
    if (user?.role === 'guru') return currentPortalView;
    return 'wali'; // Wali can only see wali portal
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom, var(--bg), var(--bg-light))' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur border-b border-[var(--bunayya-border)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[var(--fg)] font-bold">Bunayya Islamic School</h1>
              <p className="text-[var(--fg-muted)] text-xs">
                {user?.role === 'admin' ? 'Administrator' : user?.role === 'guru' ? `Guru: ${user.nama}` : `Wali dari: ${user.nama}`}
              </p>
            </div>
          </div>
          
          {/* Portal Switcher for Admin & Guru */}
          {(user?.role === 'admin' || user?.role === 'guru') && (
            <div className="flex items-center gap-2">
              {getAvailablePortals().map((portal) => (
                <Button
                  key={portal}
                  onClick={() => { setCurrentPortalView(portal); setActiveTab('dashboard'); }}
                  variant={getActivePortal() === portal ? 'default' : 'ghost'}
                  size="sm"
                  className={`min-h-[44px] touch-manipulation transition-all duration-300 active:scale-95 ${
                    getActivePortal() === portal 
                      ? 'bg-[var(--accent-green)] text-[var(--bg)] hover:bg-green-500' 
                      : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bunayya-card)]'
                  }`}
                >
                  {portal === 'guru' && <GraduationCap className="w-4 h-4 mr-1" />}
                  {portal === 'siswa' && <BookOpen className="w-4 h-4 mr-1" />}
                  {portal === 'wali' && <Users className="w-4 h-4 mr-1" />}
                  {portal.charAt(0).toUpperCase() + portal.slice(1)}
                </Button>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="min-h-[44px] touch-manipulation text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all duration-300 active:scale-95">
              <Bell className="w-5 h-5" />
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm" className="min-h-[44px] touch-manipulation bg-transparent border-[var(--bunayya-border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bunayya-card)] transition-all duration-300 active:scale-95">
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* PORTAL GURU */}
        {(getActivePortal() === 'guru') && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <div className="mb-6 overflow-x-auto">
              <TabsList className="bg-[var(--bunayya-card)] inline-flex flex-wrap gap-1 p-1 rounded-lg">
                {/* Row 1 */}
                <div className="flex gap-1 w-full">
                  <TabsTrigger value="dashboard" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <LayoutDashboard className="w-4 h-4 mr-1" />Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="datasheets" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <FileSpreadsheet className="w-4 h-4 mr-1" />Data Sheets
                  </TabsTrigger>
                  <TabsTrigger value="kontrol" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <ClipboardCheck className="w-4 h-4 mr-1" />Kontrol
                  </TabsTrigger>
                  <TabsTrigger value="absensi-siswa" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <ClipboardList className="w-4 h-4 mr-1" />Absensi Siswa
                  </TabsTrigger>
                  <TabsTrigger value="absensi-guru" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <Users className="w-4 h-4 mr-1" />Absensi Guru
                  </TabsTrigger>
                  <TabsTrigger value="jurnal" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <FileText className="w-4 h-4 mr-1" />Jurnal
                  </TabsTrigger>
                </div>
                {/* Row 2 */}
                <div className="flex gap-1 w-full mt-1">
                  <TabsTrigger value="nilai" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <Award className="w-4 h-4 mr-1" />Nilai
                  </TabsTrigger>
                  <TabsTrigger value="rapor" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                    <BookCopy className="w-4 h-4 mr-1" />Rapor
                  </TabsTrigger>
                  {canAccessTab('data-guru') && (
                    <TabsTrigger value="data-guru" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                      <User className="w-4 h-4 mr-1" />Data Guru
                    </TabsTrigger>
                  )}
                  {canAccessTab('pintasan') && (
                    <TabsTrigger value="pintasan" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                      <Activity className="w-4 h-4 mr-1" />Pintasan
                    </TabsTrigger>
                  )}
                  {canAccessTab('mapel') && (
                    <TabsTrigger value="mapel" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                      <Book className="w-4 h-4 mr-1" />Mapel
                    </TabsTrigger>
                  )}
                </div>
              </TabsList>
            </div>

            {/* Dashboard Guru */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Date Filter */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[var(--fg-muted)] text-sm">Filter Tanggal:</span>
                    <div className="flex items-center gap-2">
                      <Label className="text-[var(--fg-muted)] text-sm">Dari:</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(dateFrom, 'dd/MM/yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={(date) => date && setDateFrom(date)}
                            className="text-[var(--fg)]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-[var(--fg-muted)] text-sm">Sampai:</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(dateTo, 'dd/MM/yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            onSelect={(date) => date && setDateTo(date)}
                            className="text-[var(--fg)]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Total Siswa</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{getStats().totalSiswa}</p>
                      </div>
                      <Users className="w-10 h-10 text-[var(--accent-green)]" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Total Guru</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{getStats().totalGuru}</p>
                      </div>
                      <GraduationCap className="w-10 h-10 text-[var(--accent-gold)]" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Data Nilai</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{getStats().totalNilai}</p>
                      </div>
                      <Award className="w-10 h-10 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Absensi</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{getStats().totalAbsensi}</p>
                      </div>
                      <ClipboardList className="w-10 h-10 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[var(--accent-green)]" />
                    Statistik Nilai per Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getNilaiPerKelas()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                        <XAxis dataKey="name" stroke="#a7c4bc" />
                        <YAxis stroke="#a7c4bc" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }}
                        />
                        <Bar dataKey="nilai" fill="#4ade80" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Charts Grid - Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Absensi Siswa per Kelas Chart */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-purple-400" />
                      📋 Absensi Siswa per Kelas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getAbsensiSiswaChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                          <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <YAxis stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                          <Bar dataKey="hadir" stackId="a" fill="#4ade80" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="sakit" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="izin" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Absensi Guru per Nama - Pie Charts */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      👨‍🏫 Absensi Guru per Nama
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 flex flex-col items-center justify-center">
                      {DATA.guru.slice(0, 1).map(guru => {
                        const pieData = getAbsensiGuruPieData(guru.nip);
                        const hadir = pieData[0]?.value || 0;
                        const tidakHadir = pieData[1]?.value || 0;
                        return (
                          <div key={guru.nip} className="w-full flex items-center justify-between">
                            <div className="w-1/2">
                              <p className="text-[var(--fg)] text-sm font-medium">{guru.nama}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge className="bg-green-900/50 text-green-300">Hadir: {hadir}</Badge>
                                <Badge className="bg-red-900/50 text-red-300">TH: {tidakHadir}</Badge>
                              </div>
                            </div>
                            <div className="w-1/2 h-24">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={20} outerRadius={35} dataKey="value">
                                    {pieData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Jurnal per Guru Chart */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      📝 Jurnal per Guru
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getJurnalGuruChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                          <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <YAxis stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                          <Bar dataKey="jurnal" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Laporan Harian per Kelas */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-400" />
                      📄 Laporan Harian per Kelas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {laporanHarian.length === 0 ? (
                      <div className="h-40 flex items-center justify-center">
                        <p className="text-[var(--fg-muted)] text-sm">Belum ada data laporan harian</p>
                      </div>
                    ) : (
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getLaporanHarianChartData()}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                            <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                            <Bar dataKey="laporan" fill="#fb923c" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Laporan Kegiatan per Kelas */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <Target className="w-4 h-4 text-pink-400" />
                      🎯 Laporan Kegiatan per Kelas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getKegiatanChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                          <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <YAxis stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                          <Bar dataKey="kegiatan" fill="#f472b6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Target Pencapaian per Kelas */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <Target className="w-4 h-4 text-teal-400" />
                      🎯 Target Pencapaian per Kelas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getTargetChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                          <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <YAxis stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                          <Bar dataKey="tercapai" stackId="a" fill="#4ade80" />
                          <Bar dataKey="proses" stackId="a" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Ziyadah Hafalan per Kelas */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-indigo-400" />
                      📖 Ziyadah Hafalan per Kelas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {ziyadah.length === 0 ? (
                      <div className="h-40 flex items-center justify-center">
                        <p className="text-[var(--fg-muted)] text-sm">Belum ada data ziyadah hafalan</p>
                      </div>
                    ) : (
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getZiyadahChartData()}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                            <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#a7c4bc" tick={{ fontSize: 10 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                            <Bar dataKey="lancar" stackId="a" fill="#4ade80" />
                            <Bar dataKey="cukup" stackId="a" fill="#818cf8" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data Sheets Tab */}
            <TabsContent value="datasheets" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[var(--accent-green)]" />
                    Data Sheets - Laporan Harian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Kelas</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Bahasan</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Hasil</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {laporanHarian.map((l, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === l.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{l.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{l.kelas}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{l.mapel}</TableCell>
                              <TableCell className="text-[var(--fg)]">{l.bahasan}</TableCell>
                              <TableCell>
                                <Badge className={
                                  l.hasil === 'Lancar' ? 'bg-green-900/50 text-green-300' :
                                  l.hasil === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                  'bg-red-900/50 text-red-300'
                                }>{l.hasil}</Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kontrol Tab */}
            <TabsContent value="kontrol" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-[var(--accent-green)]" />
                    📊 Dashboard Kontrol Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat-card rounded-xl p-4 text-center bg-gradient-to-br from-green-900/50 to-green-800/30 border-[var(--bunayya-border)]">
                      <div className="text-3xl font-bold text-[var(--accent-green)]">{laporanHarian.length}</div>
                      <div className="text-sm text-[var(--fg-muted)]">Laporan Harian</div>
                    </div>
                    <div className="stat-card rounded-xl p-4 text-center bg-gradient-to-br from-amber-900/50 to-amber-800/30 border-[var(--bunayya-border)]">
                      <div className="text-3xl font-bold text-[var(--accent-gold)]">{kegiatan.length}</div>
                      <div className="text-sm text-[var(--fg-muted)]">Kegiatan</div>
                    </div>
                    <div className="stat-card rounded-xl p-4 text-center bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-[var(--bunayya-border)]">
                      <div className="text-3xl font-bold text-blue-400">{target.length}</div>
                      <div className="text-sm text-[var(--fg-muted)]">Target</div>
                    </div>
                    <div className="stat-card rounded-xl p-4 text-center bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-[var(--bunayya-border)]">
                      <div className="text-3xl font-bold text-purple-400">{ziyadah.length}</div>
                      <div className="text-sm text-[var(--fg-muted)]">Ziyadah</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Tables with Delete */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">📋 Riwayat Laporan Harian</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-48 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Hasil</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {laporanHarian.slice(0, 5).map((l, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === l.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{l.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{l.mapel}</TableCell>
                              <TableCell className="text-[var(--fg)]">{l.hasil}</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteLaporanHarian(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">🎯 Riwayat Kegiatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-48 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Kategori</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {kegiatan.slice(0, 5).map((k, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === k.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{k.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{k.kategori}</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteKegiatan(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">🎯 Riwayat Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-48 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Progress</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {target.slice(0, 5).map((t, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === t.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{t.mapel}</TableCell>
                              <TableCell className="text-[var(--fg)]">{t.progress}%</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteTarget(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">📖 Riwayat Ziyadah</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-48 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Surat</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ziyadah.slice(0, 5).map((z, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === z.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{z.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{z.surat}</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteZiyadah(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Absensi Siswa Tab */}
            <TabsContent value="absensi-siswa" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-[var(--accent-green)]" />
                    📋 Form Absensi Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selection Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Pilih Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => { setFormData({...formData, kelas: value}); setLoadedSiswaAbsensi([]); }}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar mode="single" selected={formData.tanggal} onSelect={(date) => date && setFormData({...formData, tanggal: date})} className="text-[var(--fg)]" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={loadSiswaForAbsensi} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      📋 Muat Data
                    </Button>
                    <Button onClick={saveAllAbsensiSiswa} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]" disabled={loadedSiswaAbsensi.length === 0}>
                      <Save className="w-4 h-4 mr-2" />
                      💾 Simpan Absensi
                    </Button>
                    <Button onClick={downloadAbsensiExcel} variant="outline" className="min-h-[44px] touch-manipulation border-[var(--bunayya-border)] text-[var(--fg)]" disabled={loadedSiswaAbsensi.length === 0}>
                      <Download className="w-4 h-4 mr-2" />
                      📥 Download Excel
                    </Button>
                  </div>
                  
                  {/* Loaded Students Table */}
                  {loadedSiswaAbsensi.length > 0 && (
                    <div className="border border-[var(--bunayya-border)] rounded-lg overflow-hidden">
                      <ScrollArea className="max-h-64 custom-scrollbar">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-[var(--bunayya-border)] bg-[var(--bg-light)]">
                              <TableHead className="text-[var(--fg-muted)]">No</TableHead>
                              <TableHead className="text-[var(--fg-muted)]">NIS</TableHead>
                              <TableHead className="text-[var(--fg-muted)]">Nama Siswa</TableHead>
                              <TableHead className="text-[var(--fg-muted)]">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loadedSiswaAbsensi.map((s, i) => (
                              <TableRow key={s.nis} className="border-[var(--bunayya-border)]">
                                <TableCell className="text-[var(--fg)]">{i + 1}</TableCell>
                                <TableCell className="text-[var(--fg)]">{s.nis}</TableCell>
                                <TableCell className="text-[var(--fg)]">{s.nama}</TableCell>
                                <TableCell>
                                  <Select value={s.status} onValueChange={(value) => updateSiswaStatus(s.nis, value)}>
                                    <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                                      <SelectItem value="Hadir" className="text-[var(--fg)]">✓ Hadir</SelectItem>
                                      <SelectItem value="Sakit" className="text-[var(--fg)]">🤒 Sakit</SelectItem>
                                      <SelectItem value="Izin" className="text-[var(--fg)]">📝 Izin</SelectItem>
                                      <SelectItem value="Alpha" className="text-[var(--fg)]">✗ Alpha</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  )}
                  
                  {loadedSiswaAbsensi.length === 0 && (
                    <div className="text-center py-8 text-[var(--fg-muted)]">
                      <ClipboardList className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Pilih kelas dan klik "Muat Data" untuk menampilkan siswa</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Riwayat Absensi */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Absensi Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Kelas</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Status</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Keterangan</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {absensiSiswa.map((a, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === a.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{a.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.kelas}</TableCell>
                              <TableCell>
                                <Badge className={
                                  a.status === 'Hadir' ? 'bg-green-900/50 text-green-300' :
                                  a.status === 'Sakit' ? 'bg-red-900/50 text-red-300' :
                                  a.status === 'Izin' ? 'bg-amber-900/50 text-amber-300' :
                                  'bg-gray-900/50 text-gray-300'
                                }>{a.status}</Badge>
                              </TableCell>
                              <TableCell className="text-[var(--fg-muted)]">{a.keterangan}</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteAbsensiSiswa(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Absensi Guru Tab */}
            <TabsContent value="absensi-guru" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[var(--accent-gold)]" />
                    👨‍🏫 Form Absensi Guru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nama Guru *</Label>
                      <Select value={formData.mapel} onValueChange={(value) => setFormData({...formData, mapel: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih guru" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.guru.map(g => (
                            <SelectItem key={g.nip} value={g.nip} className="text-[var(--fg)]">{g.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar mode="single" selected={formData.tanggal} onSelect={(date) => date && setFormData({...formData, tanggal: date})} className="text-[var(--fg)]" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Status *</Label>
                      <Select value={formData.hasil} onValueChange={(value) => setFormData({...formData, hasil: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="Hadir" className="text-[var(--fg)]">✓ Hadir</SelectItem>
                          <SelectItem value="Sakit" className="text-[var(--fg)]">🤒 Sakit</SelectItem>
                          <SelectItem value="Izin" className="text-[var(--fg)]">📝 Izin</SelectItem>
                          <SelectItem value="Alpha" className="text-[var(--fg)]">✗ Alpha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Keterangan</Label>
                      <Input value={formData.catatan} onChange={(e) => setFormData({...formData, catatan: e.target.value})} placeholder="Masukkan keterangan" className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]" />
                    </div>
                  </div>
                  <Button onClick={saveAbsensiGuru} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                    <Save className="w-4 h-4 mr-2" />
                    💾 Simpan Absensi
                  </Button>
                </CardContent>
              </Card>

              {/* Riwayat Absensi Guru */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Absensi Guru</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Nama Guru</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Status</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Keterangan</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {absensiGuru.map((a, i) => {
                          const guru = DATA.guru.find(g => g.nip === a.nip);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{a.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{guru?.nama}</TableCell>
                              <TableCell>
                                <Badge className={
                                  a.status === 'Hadir' ? 'bg-green-900/50 text-green-300' :
                                  a.status === 'Sakit' ? 'bg-red-900/50 text-red-300' :
                                  a.status === 'Izin' ? 'bg-amber-900/50 text-amber-300' :
                                  'bg-gray-900/50 text-gray-300'
                                }>{a.status}</Badge>
                              </TableCell>
                              <TableCell className="text-[var(--fg-muted)]">{a.keterangan}</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteAbsensiGuru(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jurnal Tab */}
            <TabsContent value="jurnal" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    📝 Form Jurnal Mengajar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Mata Pelajaran *</Label>
                      <Select value={formData.mapel} onValueChange={(value) => setFormData({...formData, mapel: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih mapel" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.mapel.map(m => (
                            <SelectItem key={m} value={m} className="text-[var(--fg)]">{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar mode="single" selected={formData.tanggal} onSelect={(date) => date && setFormData({...formData, tanggal: date})} className="text-[var(--fg)]" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Materi *</Label>
                      <Input value={formData.bahasan} onChange={(e) => setFormData({...formData, bahasan: e.target.value})} placeholder="Topik pembelajaran" className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--fg-muted)]">Keterangan</Label>
                    <Textarea value={formData.catatan} onChange={(e) => setFormData({...formData, catatan: e.target.value})} placeholder="Catatan tambahan..." className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]" />
                  </div>
                  <Button onClick={saveJurnalGuru} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                    <Save className="w-4 h-4 mr-2" />
                    💾 Simpan Jurnal
                  </Button>
                </CardContent>
              </Card>

              {/* Riwayat Jurnal */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Jurnal Mengajar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Guru</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Kelas</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Materi</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jurnal.map((j, i) => {
                          const guru = DATA.guru.find(g => g.nip === j.nip);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{j.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{guru?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{j.kelas}</TableCell>
                              <TableCell className="text-[var(--fg)]">{j.mapel}</TableCell>
                              <TableCell className="text-[var(--fg)]">{j.materi}</TableCell>
                              <TableCell>
                                <Button onClick={() => deleteJurnal(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nilai Tab */}
            <TabsContent value="nilai" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    📊 Form Input Nilai
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nama Siswa *</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Mata Pelajaran *</Label>
                      <Select value={formData.mapel} onValueChange={(value) => setFormData({...formData, mapel: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih mapel" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.mapel.map(m => (
                            <SelectItem key={m} value={m} className="text-[var(--fg)]">{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nilai (0-100) *</Label>
                      <Input type="number" value={formData.progress} onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})} placeholder="Masukkan nilai" className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar mode="single" selected={formData.tanggal} onSelect={(date) => date && setFormData({...formData, tanggal: date})} className="text-[var(--fg)]" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button onClick={saveNilaiSiswa} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                    <Save className="w-4 h-4 mr-2" />
                    💾 Simpan Nilai
                  </Button>
                </CardContent>
              </Card>

              {/* Riwayat Nilai */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Nilai Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Nilai</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Predikat</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {nilai.map((n, i) => {
                          const siswa = DATA.siswa.find(s => s.nis === n.nis);
                          return (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{n.tanggal}</TableCell>
                              <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">{n.mapel}</TableCell>
                              <TableCell className="text-[var(--fg)] font-bold">{n.nilai}</TableCell>
                              <TableCell>
                                <Badge className={
                                  n.predikat === 'Sangat Baik' ? 'bg-green-900/50 text-green-300' :
                                  n.predikat === 'Baik' ? 'bg-blue-900/50 text-blue-300' :
                                  n.predikat === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                  'bg-red-900/50 text-red-300'
                                }>{n.predikat}</Badge>
                              </TableCell>
                              <TableCell>
                                <Button onClick={() => deleteNilai(i)} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rapor Tab */}
            <TabsContent value="rapor" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <BookCopy className="w-5 h-5 text-[var(--accent-gold)]" />
                    📑 Cetak Rapor Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Pilih Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Pilih Siswa *</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Semester</Label>
                      <Select defaultValue="1">
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="1" className="text-[var(--fg)]">Semester 1 (Ganjil)</SelectItem>
                          <SelectItem value="2" className="text-[var(--fg)]">Semester 2 (Genap)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tahun Ajaran</Label>
                      <Select defaultValue="2025">
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="2025" className="text-[var(--fg)]">2025/2026</SelectItem>
                          <SelectItem value="2024" className="text-[var(--fg)]">2024/2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="min-h-[44px] touch-manipulation bg-[var(--accent-gold)] text-[var(--bg)]">
                    <Download className="w-4 h-4 mr-2" />
                    📥 Download PDF Rapor
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Guru Tab */}
            <TabsContent value="data-guru" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <User className="w-5 h-5 text-[var(--accent-gold)]" />
                    👨‍🏫 Master Data Guru
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">NIP</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Nama</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Kelas</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {DATA.guru.map((guru, i) => (
                          <TableRow key={i} className="border-[var(--bunayya-border)]">
                            <TableCell className="text-[var(--fg)]">{guru.nip}</TableCell>
                            <TableCell className="text-[var(--fg)]">{guru.nama}</TableCell>
                            <TableCell className="text-[var(--fg)]">{guru.kelas}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-900/50 text-green-300">{guru.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pintasan Tab - Pengaturan */}
            <TabsContent value="pintasan" className="space-y-4">
              {/* Pengaturan Link Cepat */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[var(--accent-green)]" />
                    🔗 Pengaturan Link Cepat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <div key={link.id} className="flex items-center gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--bunayya-border)]">
                        <span className="text-2xl">{link.icon}</span>
                        <div className="flex-1">
                          <p className="text-[var(--fg)] font-medium">{link.title}</p>
                          <p className="text-[var(--fg-muted)] text-xs truncate">{link.url}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-blue-400 hover:text-blue-300">
                          <Search className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setQuickLinks(prev => prev.filter((_, i) => i !== index))} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add New Link */}
                  <div className="border-t border-[var(--bunayya-border)] pt-4">
                    <p className="text-[var(--fg)] font-medium mb-3">Tambah Link</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <Input
                        placeholder="Icon (emoji)"
                        value={newLink.icon}
                        onChange={(e) => setNewLink({...newLink, icon: e.target.value})}
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                      <Input
                        placeholder="Judul"
                        value={newLink.title}
                        onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                      <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] md:col-span-2"
                      />
                    </div>
                    <Button 
                      onClick={() => {
                        if (newLink.title && newLink.url) {
                          setQuickLinks(prev => [...prev, { ...newLink, id: Date.now() }]);
                          setNewLink({ icon: '📝', title: '', url: '' });
                          toast({ title: 'Berhasil', description: 'Link berhasil ditambahkan' });
                        }
                      }}
                      className="mt-3 min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Banner Management */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    🎨 Banner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--fg-muted)] text-sm mb-4">Kelola 3 slide banner selamat datang</p>
                  <div className="space-y-4">
                    {banners.map((banner, index) => (
                      <div key={index} className="p-4 bg-[var(--bg-light)] rounded-lg border border-[var(--bunayya-border)]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[var(--fg)] font-medium">Slide {index + 1}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-2">
                            <Label className="text-[var(--fg-muted)]">Judul</Label>
                            <Input
                              value={banner.title}
                              onChange={(e) => {
                                const newBanners = [...banners];
                                newBanners[index] = { ...banner, title: e.target.value };
                                setBanners(newBanners);
                              }}
                              className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)] text-[var(--fg)]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[var(--fg-muted)]">Subtitle</Label>
                            <Input
                              value={banner.subtitle}
                              onChange={(e) => {
                                const newBanners = [...banners];
                                newBanners[index] = { ...banner, subtitle: e.target.value };
                                setBanners(newBanners);
                              }}
                              className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)] text-[var(--fg)]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[var(--fg-muted)]">Warna Gradient</Label>
                            <Select 
                              value={banner.gradient}
                              onValueChange={(value) => {
                                const newBanners = [...banners];
                                newBanners[index] = { ...banner, gradient: value };
                                setBanners(newBanners);
                              }}
                            >
                              <SelectTrigger className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)] text-[var(--fg)]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                                <SelectItem value="from-green-600 to-green-700" className="text-[var(--fg)]">Hijau</SelectItem>
                                <SelectItem value="from-blue-600 to-blue-700" className="text-[var(--fg)]">Biru</SelectItem>
                                <SelectItem value="from-amber-600 to-amber-700" className="text-[var(--fg)]">Kuning</SelectItem>
                                <SelectItem value="from-purple-600 to-purple-700" className="text-[var(--fg)]">Ungu</SelectItem>
                                <SelectItem value="from-red-600 to-red-700" className="text-[var(--fg)]">Merah</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {/* Preview */}
                        <div className={`mt-3 p-4 rounded-lg bg-gradient-to-r ${banner.gradient}`}>
                          <h3 className="text-white font-bold">{banner.title}</h3>
                          <p className="text-white/80 text-sm">{banner.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pengumuman Management */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-400" />
                    📢 Pengumuman
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {announcements.map((ann, index) => (
                      <div key={ann.id} className="flex items-start gap-3 p-3 bg-[var(--bg-light)] rounded-lg border border-[var(--bunayya-border)]">
                        <span className="text-2xl">{ann.icon}</span>
                        <div className="flex-1">
                          <p className="text-[var(--fg)] font-medium">{ann.title}</p>
                          <p className="text-[var(--fg-muted)] text-sm">{ann.content}</p>
                        </div>
                        <Button onClick={() => setAnnouncements(prev => prev.filter((_, i) => i !== index))} variant="ghost" size="sm" className="min-h-[44px] touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-900/20">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add New Announcement */}
                  <div className="border-t border-[var(--bunayya-border)] pt-4">
                    <p className="text-[var(--fg)] font-medium mb-3">Tambah Pengumuman</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        placeholder="Icon (emoji)"
                        value={newAnnouncement.icon}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, icon: e.target.value})}
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                      <Input
                        placeholder="Judul"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                      <Input
                        placeholder="Isi pengumuman"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                    </div>
                    <Button 
                      onClick={() => {
                        if (newAnnouncement.title && newAnnouncement.content) {
                          setAnnouncements(prev => [...prev, { ...newAnnouncement, id: Date.now() }]);
                          setNewAnnouncement({ icon: '📢', title: '', content: '' });
                          toast({ title: 'Berhasil', description: 'Pengumuman berhasil ditambahkan' });
                        }
                      }}
                      className="mt-3 min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Pengumuman
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Mapel Tab */}
            <TabsContent value="mapel" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Book className="w-5 h-5 text-[var(--accent-green)]" />
                    Mata Pelajaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {DATA.mapel.map((mapel, i) => (
                      <Card key={i} className="bg-[var(--bg-light)] border-[var(--bunayya-border)] p-4">
                        <div className="flex items-center gap-2">
                          <Book className="w-5 h-5 text-[var(--accent-green)]" />
                          <span className="text-[var(--fg)]">{mapel}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* PORTAL WALI (Parent) */}
        {(getActivePortal() === 'wali') && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <TabsList className="bg-[var(--bunayya-card)] mb-6 flex-wrap gap-1 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <LayoutDashboard className="w-4 h-4 mr-1" />Dashboard
              </TabsTrigger>
              <TabsTrigger value="nilai" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <Award className="w-4 h-4 mr-1" />Nilai
              </TabsTrigger>
              <TabsTrigger value="laporan-harian" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <FileText className="w-4 h-4 mr-1" />Laporan Harian
              </TabsTrigger>
              <TabsTrigger value="absensi" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <ClipboardList className="w-4 h-4 mr-1" />Absensi
              </TabsTrigger>
              <TabsTrigger value="ziyadah" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <BookMarked className="w-4 h-4 mr-1" />Ziyadah Hafalan
              </TabsTrigger>
              <TabsTrigger value="target" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <Target className="w-4 h-4 mr-1" />Target Pencapaian
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Wali */}
            <TabsContent value="dashboard" className="space-y-4">
              {/* Header Card - Pantau Perkembangan Anak */}
              <Card className="bg-gradient-to-br from-green-700 to-green-900 border-[var(--bunayya-border)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-white" />
                    <h2 className="text-white font-semibold">👨‍👩‍👧‍👦 Pantau Perkembangan Anak</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Pilih Kelas</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white min-h-[44px]">
                          <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Pilih Nama Siswa</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white min-h-[44px] disabled:opacity-50">
                          <SelectValue placeholder="Pilih Siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama} ({s.nis})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-[var(--accent-green)]">{getLaporanHarianByNis(user.nis || '').length}</p>
                    <p className="text-[var(--fg-muted)] text-xs">Total Laporan</p>
                  </CardContent>
                </Card>
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">{getLaporanHarianByNis(user.nis || '').filter(l => l.hasil === 'Lancar').length}</p>
                    <p className="text-[var(--fg-muted)] text-xs">Lulus</p>
                  </CardContent>
                </Card>
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-red-400">{getLaporanHarianByNis(user.nis || '').filter(l => l.hasil === 'Perlu Latihan').length}</p>
                    <p className="text-[var(--fg-muted)] text-xs">Tidak Lulus</p>
                  </CardContent>
                </Card>
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-blue-400">{getTargetByNis(user.nis || '').filter(t => t.hasil === 'Proses').length}</p>
                    <p className="text-[var(--fg-muted)] text-xs">Target Aktif</p>
                  </CardContent>
                </Card>
              </div>

              {/* Kehadiran Bulanan */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    📊 Kehadiran Bulanan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-green-900/30 rounded-lg p-3">
                      <p className="text-xl font-bold text-green-400">{getAbsensiByNis(user.nis || '').filter(a => a.status === 'Hadir').length}</p>
                      <p className="text-[var(--fg-muted)] text-xs">Hadir</p>
                    </div>
                    <div className="bg-red-900/30 rounded-lg p-3">
                      <p className="text-xl font-bold text-red-400">{getAbsensiByNis(user.nis || '').filter(a => a.status === 'Sakit').length}</p>
                      <p className="text-[var(--fg-muted)] text-xs">Sakit</p>
                    </div>
                    <div className="bg-amber-900/30 rounded-lg p-3">
                      <p className="text-xl font-bold text-amber-400">{getAbsensiByNis(user.nis || '').filter(a => a.status === 'Izin').length}</p>
                      <p className="text-[var(--fg-muted)] text-xs">Izin</p>
                    </div>
                    <div className="bg-gray-900/30 rounded-lg p-3">
                      <p className="text-xl font-bold text-gray-400">{getAbsensiByNis(user.nis || '').filter(a => a.status === 'Alpha').length}</p>
                      <p className="text-[var(--fg-muted)] text-xs">Alpa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rasio Kelulusan & Nilai per Mapel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rasio Kelulusan */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      ✅ Rasio Kelulusan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const laporan = getLaporanHarianByNis(user.nis || '');
                      const lulus = laporan.filter(l => l.hasil === 'Lancar').length;
                      const total = laporan.length;
                      const ratio = total > 0 ? Math.round((lulus / total) * 100) : 0;
                      return (
                        <div className="text-center">
                          <div className="relative w-24 h-24 mx-auto mb-2">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-[var(--bunayya-border)]" />
                              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                                className="text-green-500"
                                strokeDasharray={`${ratio * 2.51} 251`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[var(--fg)]">{ratio}%</span>
                          </div>
                          <div className="flex justify-center gap-4 text-sm">
                            <span className="text-green-400">Lulus: {lulus}</span>
                            <span className="text-red-400">Tidak: {total - lulus}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Nilai per Mapel */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-400" />
                      📈 Nilai per Mapel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getNilaiByNis(user.nis || '').slice(0, 5).map(n => ({ name: n.mapel.substring(0, 5), nilai: n.nilai }))}>
                          <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 9 }} />
                          <YAxis stroke="#a7c4bc" tick={{ fontSize: 9 }} domain={[0, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                          <Bar dataKey="nilai" fill="#4ade80" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Target */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-teal-400" />
                    🎯 Progress Target
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getTargetByNis(user.nis || '').length === 0 ? (
                    <p className="text-[var(--fg-muted)] text-center py-4">Belum ada target</p>
                  ) : (
                    <div className="space-y-3">
                      {getTargetByNis(user.nis || '').slice(0, 3).map((t, i) => (
                        <div key={i} className="bg-[var(--bg-light)] rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[var(--fg)] font-medium">{t.mapel}</span>
                            <Badge className={
                              t.hasil === 'Tercapai' ? 'bg-green-900/50 text-green-300' :
                              t.hasil === 'Proses' ? 'bg-blue-900/50 text-blue-300' :
                              'bg-amber-900/50 text-amber-300'
                            }>{t.hasil}</Badge>
                          </div>
                          <Progress value={t.progress} className="h-2" />
                          <p className="text-[var(--fg-muted)] text-xs mt-1">{t.progress}% - {t.deskripsi}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Aktivitas Mingguan & Kategori Kegiatan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Aktivitas Mingguan */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-purple-400" />
                      📅 Aktivitas Mingguan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getLaporanHarianByNis(user.nis || '').length === 0 ? (
                      <p className="text-[var(--fg-muted)] text-center py-4">Belum ada aktivitas minggu ini</p>
                    ) : (
                      <div className="h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getLaporanHarianByNis(user.nis || '').slice(0, 7).map((l, i) => ({ name: `H${i+1}`, count: 1 }))}>
                            <XAxis dataKey="name" stroke="#a7c4bc" tick={{ fontSize: 9 }} />
                            <YAxis stroke="#a7c4bc" tick={{ fontSize: 9 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                            <Line type="monotone" dataKey="count" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Kategori Kegiatan */}
                <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-pink-400" />
                      📚 Kategori Kegiatan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {kegiatan.length === 0 ? (
                      <p className="text-[var(--fg-muted)] text-center py-4">Belum ada kegiatan</p>
                    ) : (
                      <div className="h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Shalat', value: kegiatan.filter(k => k.kategori === 'Shalat Berjamaah').length, color: '#4ade80' },
                                { name: 'Kebersihan', value: kegiatan.filter(k => k.kategori === 'Kebersihan').length, color: '#fbbf24' },
                                { name: 'Hafalan', value: kegiatan.filter(k => k.kategori === 'Hafalan').length, color: '#60a5fa' },
                                { name: 'Lainnya', value: kegiatan.filter(k => !['Shalat Berjamaah', 'Kebersihan', 'Hafalan'].includes(k.kategori)).length, color: '#f472b6' },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={20}
                              outerRadius={35}
                              dataKey="value"
                            >
                              {[
                                { color: '#4ade80' },
                                { color: '#fbbf24' },
                                { color: '#60a5fa' },
                                { color: '#f472b6' },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Surat yang Dihafal */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-green-400" />
                    📖 Surat yang Dihafal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getZiyadahByNis(user.nis || '').length === 0 ? (
                    <p className="text-[var(--fg-muted)] text-center py-4">Belum ada data hafalan</p>
                  ) : (
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getZiyadahChart(user.nis || '')} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                          <XAxis type="number" domain={[0, 100]} stroke="#a7c4bc" tick={{ fontSize: 9 }} />
                          <YAxis dataKey="name" type="category" stroke="#a7c4bc" tick={{ fontSize: 9 }} width={70} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }}
                            formatter={(value: number) => [`${value}%`, 'Progress']}
                          />
                          <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
                            {getZiyadahChart(user.nis || '').map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.progress >= 100 ? '#4ade80' : entry.progress >= 75 ? '#60a5fa' : entry.progress >= 50 ? '#fbbf24' : '#f97316'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400"></span> Lancar</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400"></span> Cukup</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400"></span> Perlu Latihan</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400"></span> Belum</span>
                  </div>
                </CardContent>
              </Card>

              {/* Ringkasan Hafalan */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[var(--fg)] text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-400" />
                    📚 Ringkasan Hafalan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const ziyadahData = getZiyadahByNis(user.nis || '');
                    const total = ziyadahData.length;
                    const lancar = ziyadahData.filter(z => z.hasil === 'Lancar').length;
                    const cukup = ziyadahData.filter(z => z.hasil === 'Cukup').length;
                    const perluLatihan = ziyadahData.filter(z => z.hasil === 'Perlu Latihan').length;
                    return (
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-green-900/30 rounded-lg p-3 text-center">
                          <p className="text-xl font-bold text-green-400">{lancar}</p>
                          <p className="text-[var(--fg-muted)] text-xs">Lancar</p>
                        </div>
                        <div className="bg-blue-900/30 rounded-lg p-3 text-center">
                          <p className="text-xl font-bold text-blue-400">{cukup}</p>
                          <p className="text-[var(--fg-muted)] text-xs">Cukup</p>
                        </div>
                        <div className="bg-amber-900/30 rounded-lg p-3 text-center">
                          <p className="text-xl font-bold text-amber-400">{perluLatihan}</p>
                          <p className="text-[var(--fg-muted)] text-xs">Perlu Latihan</p>
                        </div>
                        <div className="bg-teal-900/30 rounded-lg p-3 text-center">
                          <p className="text-xl font-bold text-teal-400">{total}</p>
                          <p className="text-[var(--fg-muted)] text-xs">Total</p>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nilai Tab */}
            <TabsContent value="nilai" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    Daftar Nilai {user.nama}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Mata Pelajaran</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Nilai</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Predikat</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getNilaiByNis(user.nis || '').map((n, i) => (
                          <TableRow key={i} className="border-[var(--bunayya-border)]">
                            <TableCell className="text-[var(--fg)]">{n.mapel}</TableCell>
                            <TableCell className="text-[var(--fg)] font-bold">{n.nilai}</TableCell>
                            <TableCell>
                              <Badge className={
                                n.predikat === 'Sangat Baik' ? 'bg-green-900/50 text-green-300' :
                                n.predikat === 'Baik' ? 'bg-blue-900/50 text-blue-300' :
                                n.predikat === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                'bg-red-900/50 text-red-300'
                              }>{n.predikat}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Laporan Harian Tab */}
            <TabsContent value="laporan-harian" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    Laporan Harian {user.nama}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="space-y-3">
                      {getLaporanHarianByNis(user.nis || '').map((l, i) => (
                        <Card key={i} className="bg-[var(--bg-light)] border-[var(--bunayya-border)]">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-[var(--fg)] font-medium">{l.mapel}</p>
                                <p className="text-[var(--fg-muted)] text-sm">{l.bahasan}</p>
                              </div>
                              <Badge className={
                                l.hasil === 'Lancar' ? 'bg-green-900/50 text-green-300' :
                                l.hasil === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                'bg-red-900/50 text-red-300'
                              }>{l.hasil}</Badge>
                            </div>
                            <p className="text-[var(--fg-muted)] text-xs">{l.tanggal} - {l.halaman}</p>
                            {l.catatan && <p className="text-[var(--fg-muted)] text-sm mt-2">{l.catatan}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Absensi Tab */}
            <TabsContent value="absensi" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-purple-400" />
                    Absensi {user.nama}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[var(--bunayya-border)]">
                          <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Status</TableHead>
                          <TableHead className="text-[var(--fg-muted)]">Keterangan</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getAbsensiByNis(user.nis || '').map((a, i) => (
                          <TableRow key={i} className="border-[var(--bunayya-border)]">
                            <TableCell className="text-[var(--fg)]">{a.tanggal}</TableCell>
                            <TableCell>
                              <Badge className={
                                a.status === 'Hadir' ? 'bg-green-900/50 text-green-300' :
                                a.status === 'Sakit' ? 'bg-red-900/50 text-red-300' :
                                a.status === 'Izin' ? 'bg-amber-900/50 text-amber-300' :
                                'bg-gray-900/50 text-gray-300'
                              }>{a.status}</Badge>
                            </TableCell>
                            <TableCell className="text-[var(--fg-muted)]">{a.keterangan}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ziyadah Tab */}
            <TabsContent value="ziyadah" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-indigo-400" />
                    📖 Surat yang Dihafal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="space-y-4">
                      {getZiyadahByNis(user.nis || '').length === 0 ? (
                        <div className="text-center py-8">
                          <BookMarked className="w-12 h-12 text-[var(--fg-muted)] mx-auto mb-3 opacity-50" />
                          <p className="text-[var(--fg-muted)]">Belum ada data hafalan</p>
                        </div>
                      ) : (
                        getZiyadahByNis(user.nis || '').map((z, i) => (
                          <Card key={i} className="bg-[var(--bg-light)] border-[var(--bunayya-border)] overflow-hidden">
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="text-[var(--fg)] font-semibold text-lg">{z.surat}</h4>
                                  <p className="text-[var(--fg-muted)] text-sm">{z.juz}</p>
                                </div>
                                <Badge className={
                                  z.hasil === 'Lancar' ? 'bg-green-900/50 text-green-300' :
                                  z.hasil === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                  z.hasil === 'Perlu Latihan' ? 'bg-orange-900/50 text-orange-300' :
                                  'bg-red-900/50 text-red-300'
                                }>{z.hasil}</Badge>
                              </div>
                              <div className="mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-[var(--fg-muted)]">Progress</span>
                                  <span className="text-[var(--fg)] font-medium">{z.progress}</span>
                                </div>
                                <div className="w-full h-2 bg-[var(--bunayya-border)] rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      z.hasil === 'Lancar' ? 'bg-green-500' :
                                      z.hasil === 'Cukup' ? 'bg-amber-500' :
                                      z.hasil === 'Perlu Latihan' ? 'bg-orange-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${z.hasil === 'Lancar' ? 100 : z.hasil === 'Cukup' ? 75 : z.hasil === 'Perlu Latihan' ? 50 : 25}%` }}
                                  />
                                </div>
                              </div>
                              {z.catatan && (
                                <p className="text-[var(--fg-muted)] text-sm mt-3 bg-[var(--bunayya-card)] p-2 rounded">
                                  📝 {z.catatan}
                                </p>
                              )}
                              <p className="text-[var(--fg-muted)] text-xs mt-2">{z.tanggal}</p>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Target Tab */}
            <TabsContent value="target" className="space-y-4">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Target className="w-5 h-5 text-teal-400" />
                    Target Pencapaian {user.nama}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="space-y-3">
                      {getTargetByNis(user.nis || '').map((t, i) => (
                        <Card key={i} className="bg-[var(--bg-light)] border-[var(--bunayya-border)]">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-[var(--fg)] font-medium">{t.mapel}</p>
                                <p className="text-[var(--fg-muted)] text-sm">{t.deskripsi}</p>
                              </div>
                              <Badge className={
                                t.hasil === 'Tercapai' ? 'bg-green-900/50 text-green-300' :
                                t.hasil === 'Proses' ? 'bg-blue-900/50 text-blue-300' :
                                'bg-amber-900/50 text-amber-300'
                              }>{t.hasil}</Badge>
                            </div>
                            <Progress value={t.progress} className="mt-2" />
                            <p className="text-[var(--fg-muted)] text-xs mt-2">Deadline: {t.deadline}</p>
                            {t.catatan && <p className="text-[var(--fg-muted)] text-sm mt-2">{t.catatan}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* PORTAL SISWA (Admin & Guru can access via switcher) */}
        {(getActivePortal() === 'siswa') && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <TabsList className="bg-[var(--bunayya-card)] mb-6 flex-wrap gap-1 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <LayoutDashboard className="w-4 h-4 mr-1" />Dashboard
              </TabsTrigger>
              <TabsTrigger value="harian" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <CalendarDays className="w-4 h-4 mr-1" />Harian
              </TabsTrigger>
              <TabsTrigger value="kegiatan" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <Activity className="w-4 h-4 mr-1" />Kegiatan
              </TabsTrigger>
              <TabsTrigger value="target" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <Target className="w-4 h-4 mr-1" />Target
              </TabsTrigger>
              <TabsTrigger value="ziyadah" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <BookMarked className="w-4 h-4 mr-1" />Ziyadah
              </TabsTrigger>
              <TabsTrigger value="siswa" className="min-h-[44px] touch-manipulation data-[state=active]:bg-[var(--accent-green)] data-[state=active]:text-[var(--bg)] text-[var(--fg-muted)] transition-all duration-300 active:scale-95">
                <Users className="w-4 h-4 mr-1" />Siswa
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Siswa */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Total Siswa</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{DATA.siswa.length}</p>
                      </div>
                      <Users className="w-10 h-10 text-[var(--accent-green)]" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Total Guru</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{DATA.guru.length}</p>
                      </div>
                      <GraduationCap className="w-10 h-10 text-[var(--accent-gold)]" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Total Kelas</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{DATA.kelas.length}</p>
                      </div>
                      <School className="w-10 h-10 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-[var(--bunayya-border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--fg-muted)] text-sm">Mapel</p>
                        <p className="text-3xl font-bold text-[var(--fg)]">{DATA.mapel.length}</p>
                      </div>
                      <Book className="w-10 h-10 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Links */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={() => setActiveTab('siswa')} className="h-20 min-h-[44px] touch-manipulation flex-col bg-[var(--bg-light)] hover:bg-[var(--bunayya-card-hover)] border border-[var(--bunayya-border)]">
                      <UserCog className="w-6 h-6 mb-2 text-[var(--accent-green)]" />
                      <span className="text-[var(--fg)] text-sm">Kelola Siswa</span>
                    </Button>
                    <Button onClick={() => setActiveTab('siswa')} className="h-20 min-h-[44px] touch-manipulation flex-col bg-[var(--bg-light)] hover:bg-[var(--bunayya-card-hover)] border border-[var(--bunayya-border)]">
                      <GraduationCap className="w-6 h-6 mb-2 text-[var(--accent-gold)]" />
                      <span className="text-[var(--fg)] text-sm">Kelola Guru</span>
                    </Button>
                    <Button className="h-20 min-h-[44px] touch-manipulation flex-col bg-[var(--bg-light)] hover:bg-[var(--bunayya-card-hover)] border border-[var(--bunayya-border)]">
                      <Bell className="w-6 h-6 mb-2 text-blue-400" />
                      <span className="text-[var(--fg)] text-sm">Pengumuman</span>
                    </Button>
                    <Button className="h-20 min-h-[44px] touch-manipulation flex-col bg-[var(--bg-light)] hover:bg-[var(--bunayya-card-hover)] border border-[var(--bunayya-border)]">
                      <Book className="w-6 h-6 mb-2 text-purple-400" />
                      <span className="text-[var(--fg)] text-sm">Kelola Mapel</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[var(--accent-green)]" />
                    Statistik Siswa per Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DATA.kelas.map(k => ({
                        name: k.replace('Kelas ', ''),
                        siswa: DATA.siswa.filter(s => s.kelas === k).length
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e6b3a" />
                        <XAxis dataKey="name" stroke="#a7c4bc" />
                        <YAxis stroke="#a7c4bc" />
                        <Tooltip contentStyle={{ backgroundColor: '#0d4a26', border: '1px solid #1e6b3a', color: '#e8f5e9' }} />
                        <Bar dataKey="siswa" fill="#4ade80" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Harian Tab - Form */}
            <TabsContent value="harian" className="space-y-6">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--accent-green)]" />
                    📝 Form Laporan Harian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nama Siswa *</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar
                            mode="single"
                            selected={formData.tanggal}
                            onSelect={(date) => date && setFormData({...formData, tanggal: date})}
                            className="text-[var(--fg)]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Mata Pelajaran *</Label>
                      <Select value={formData.mapel} onValueChange={(value) => setFormData({...formData, mapel: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih mapel" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.mapel.map(m => (
                            <SelectItem key={m} value={m} className="text-[var(--fg)]">{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Bahasan *</Label>
                      <Input
                        value={formData.bahasan}
                        onChange={(e) => setFormData({...formData, bahasan: e.target.value})}
                        placeholder="Masukkan bahasan"
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Halaman</Label>
                      <Input
                        value={formData.halaman}
                        onChange={(e) => setFormData({...formData, halaman: e.target.value})}
                        placeholder="Masukkan halaman"
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Hasil *</Label>
                      <Select value={formData.hasil} onValueChange={(value) => setFormData({...formData, hasil: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="Lancar" className="text-[var(--fg)]">Lancar</SelectItem>
                          <SelectItem value="Cukup" className="text-[var(--fg)]">Cukup</SelectItem>
                          <SelectItem value="Perlu Latihan" className="text-[var(--fg)]">Perlu Latihan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--fg-muted)]">Catatan</Label>
                    <Textarea
                      value={formData.catatan}
                      onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                      placeholder="Masukkan catatan"
                      className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                    />
                  </div>
                  <Button onClick={saveLaporanHarian} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                    <Save className="w-4 h-4 mr-2" />
                    💾 Simpan Laporan
                  </Button>
                </CardContent>
              </Card>

              {/* Riwayat Laporan */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Laporan Harian</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[var(--bunayya-border)]">
                            <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Kelas</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Bahasan</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Hasil</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {laporanHarian.map((l, i) => {
                            const siswa = DATA.siswa.find(s => s.nis === l.nis);
                            return (
                              <TableRow key={i} className="border-[var(--bunayya-border)]">
                                <TableCell className="text-[var(--fg)]">{l.tanggal}</TableCell>
                                <TableCell className="text-[var(--fg)]">{l.kelas}</TableCell>
                                <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                                <TableCell className="text-[var(--fg)]">{l.mapel}</TableCell>
                                <TableCell className="text-[var(--fg)]">{l.bahasan}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    l.hasil === 'Lancar' ? 'bg-green-900/50 text-green-300' :
                                    l.hasil === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                    'bg-red-900/50 text-red-300'
                                  }>{l.hasil}</Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kegiatan Tab - Form */}
            <TabsContent value="kegiatan" className="space-y-6">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    🎯 Form Laporan Kegiatan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nama Siswa *</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar
                            mode="single"
                            selected={formData.tanggal}
                            onSelect={(date) => date && setFormData({...formData, tanggal: date})}
                            className="text-[var(--fg)]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kategori *</Label>
                      <Select value={formData.kategori} onValueChange={(value) => setFormData({...formData, kategori: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="Shalat Berjamaah" className="text-[var(--fg)]">Shalat Berjamaah</SelectItem>
                          <SelectItem value="Kebersihan" className="text-[var(--fg)]">Kebersihan</SelectItem>
                          <SelectItem value="Hafalan" className="text-[var(--fg)]">Hafalan</SelectItem>
                          <SelectItem value="Akhlak" className="text-[var(--fg)]">Akhlak</SelectItem>
                          <SelectItem value="Keterampilan" className="text-[var(--fg)]">Keterampilan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Penilaian *</Label>
                      <Select value={formData.penilaian} onValueChange={(value) => setFormData({...formData, penilaian: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="Sangat Baik" className="text-[var(--fg)]">Sangat Baik</SelectItem>
                          <SelectItem value="Baik" className="text-[var(--fg)]">Baik</SelectItem>
                          <SelectItem value="Cukup" className="text-[var(--fg)]">Cukup</SelectItem>
                          <SelectItem value="Kurang" className="text-[var(--fg)]">Kurang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--fg-muted)]">Deskripsi *</Label>
                    <Textarea
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                      placeholder="Masukkan deskripsi kegiatan"
                      className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                    />
                  </div>
                  <Button onClick={saveKegiatan} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                    <Save className="w-4 h-4 mr-2" />
                    💾 Simpan Laporan
                  </Button>
                </CardContent>
              </Card>

              {/* Riwayat Kegiatan */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Kegiatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[var(--bunayya-border)]">
                            <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Kategori</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Penilaian</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Deskripsi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {kegiatan.map((k, i) => {
                            const siswa = DATA.siswa.find(s => s.nis === k.nis);
                            return (
                              <TableRow key={i} className="border-[var(--bunayya-border)]">
                                <TableCell className="text-[var(--fg)]">{k.tanggal}</TableCell>
                                <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                                <TableCell className="text-[var(--fg)]">{k.kategori}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    k.penilaian === 'Sangat Baik' ? 'bg-green-900/50 text-green-300' :
                                    k.penilaian === 'Baik' ? 'bg-blue-900/50 text-blue-300' :
                                    k.penilaian === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                    'bg-red-900/50 text-red-300'
                                  }>{k.penilaian}</Badge>
                                </TableCell>
                                <TableCell className="text-[var(--fg-muted)]">{k.deskripsi}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Target Tab - Form */}
            <TabsContent value="target" className="space-y-6">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Target className="w-5 h-5 text-teal-400" />
                    🎯 Form Target Pencapaian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nama Siswa *</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Mata Pelajaran *</Label>
                      <Select value={formData.mapel} onValueChange={(value) => setFormData({...formData, mapel: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih mapel" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.mapel.map(m => (
                            <SelectItem key={m} value={m} className="text-[var(--fg)]">{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.deadline, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar
                            mode="single"
                            selected={formData.deadline}
                            onSelect={(date) => date && setFormData({...formData, deadline: date})}
                            className="text-[var(--fg)]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Hasil *</Label>
                      <Select value={formData.hasil} onValueChange={(value) => setFormData({...formData, hasil: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="Tercapai" className="text-[var(--fg)]">Tercapai</SelectItem>
                          <SelectItem value="Proses" className="text-[var(--fg)]">Proses</SelectItem>
                          <SelectItem value="Belum" className="text-[var(--fg)]">Belum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Deskripsi Target</Label>
                      <Input
                        value={formData.deskripsi}
                        onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                        placeholder="Masukkan deskripsi target"
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--fg-muted)]">Progress</Label>
                    <Input
                      type="text"
                      value={formData.progress}
                      onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})}
                      placeholder="Contoh: 50 (dalam persen)"
                      className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--fg-muted)]">Catatan</Label>
                    <Textarea
                      value={formData.catatan}
                      onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                      placeholder="Masukkan catatan"
                      className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                    />
                  </div>
                  <Button onClick={saveTarget} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                    <Save className="w-4 h-4 mr-2" />
                    💾 Simpan Target
                  </Button>
                </CardContent>
              </Card>

              {/* Riwayat Target */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[var(--bunayya-border)]">
                            <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Mapel</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Deskripsi</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Progress</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {target.map((t, i) => {
                            const siswa = DATA.siswa.find(s => s.nis === t.nis);
                            return (
                              <TableRow key={i} className="border-[var(--bunayya-border)]">
                                <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                                <TableCell className="text-[var(--fg)]">{t.mapel}</TableCell>
                                <TableCell className="text-[var(--fg)]">{t.deskripsi}</TableCell>
                                <TableCell className="text-[var(--fg)]">
                                  <div className="flex items-center gap-2">
                                    <Progress value={t.progress} className="w-20" />
                                    <span>{t.progress}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={
                                    t.hasil === 'Tercapai' ? 'bg-green-900/50 text-green-300' :
                                    t.hasil === 'Proses' ? 'bg-blue-900/50 text-blue-300' :
                                    'bg-amber-900/50 text-amber-300'
                                  }>{t.hasil}</Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ziyadah Tab - Form */}
            <TabsContent value="ziyadah" className="space-y-6">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-indigo-400" />
                    📖 Form Ziyadah Hafalan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Kelas *</Label>
                      <Select value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value, nis: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.kelas.map(k => (
                            <SelectItem key={k} value={k} className="text-[var(--fg)]">{k}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Nama Siswa *</Label>
                      <Select value={formData.nis} onValueChange={(value) => setFormData({...formData, nis: value})} disabled={!formData.kelas}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {getSiswaByKelas(formData.kelas).map(s => (
                            <SelectItem key={s.nis} value={s.nis} className="text-[var(--fg)]">{s.nama}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Tanggal *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full min-h-[44px] touch-manipulation bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)] justify-start">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(formData.tanggal, 'dd MMMM yyyy', { locale: id })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <Calendar
                            mode="single"
                            selected={formData.tanggal}
                            onSelect={(date) => date && setFormData({...formData, tanggal: date})}
                            className="text-[var(--fg)]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Juz *</Label>
                      <Select value={formData.juzStr} onValueChange={(value) => setFormData({...formData, juzStr: value, surat: ''})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder="Pilih juz" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          {DATA.juzList.map(j => (
                            <SelectItem key={j} value={j} className="text-[var(--fg)]">{j}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Surat *</Label>
                      <Select value={formData.surat} onValueChange={(value) => setFormData({...formData, surat: value})} disabled={!formData.juzStr}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue placeholder={!formData.juzStr ? "Pilih juz dulu" : "Pilih surat"} />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)] max-h-60">
                          {(DATA.juzData[formData.juzStr as keyof typeof DATA.juzData] || []).map(s => (
                            <SelectItem key={s.no} value={s.nama} className="text-[var(--fg)]">{s.no}. {s.nama} - {s.ayat} ayat</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Progress (Ayat)</Label>
                      <Input
                        value={formData.progressAyat}
                        onChange={(e) => setFormData({...formData, progressAyat: e.target.value})}
                        placeholder="Contoh: 9/10 atau 15/30 halaman"
                        className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--fg-muted)]">Hasil *</Label>
                      <Select value={formData.hasil} onValueChange={(value) => setFormData({...formData, hasil: value})}>
                        <SelectTrigger className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                          <SelectItem value="Lancar" className="text-[var(--fg)]">Lancar</SelectItem>
                          <SelectItem value="Cukup" className="text-[var(--fg)]">Cukup</SelectItem>
                          <SelectItem value="Perlu Latihan" className="text-[var(--fg)]">Perlu Latihan</SelectItem>
                          <SelectItem value="Belum" className="text-[var(--fg)]">Belum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--fg-muted)]">Catatan</Label>
                    <Textarea
                      value={formData.catatan}
                      onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                      placeholder="Masukkan catatan"
                      className="bg-[var(--bg-light)] border-[var(--bunayya-border)] text-[var(--fg)]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveZiyadah} className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                      <Save className="w-4 h-4 mr-2" />
                      💾 Simpan Ziyadah
                    </Button>
                    <Button variant="outline" className="min-h-[44px] touch-manipulation bg-transparent border-[var(--bunayya-border)] text-[var(--fg)]">
                      <Send className="w-4 h-4 mr-2" />
                      📱 Kirim Notifikasi WA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Riwayat Ziyadah */}
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)]">Riwayat Ziyadah Hafalan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-64 custom-scrollbar">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[var(--bunayya-border)]">
                            <TableHead className="text-[var(--fg-muted)]">Tanggal</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Siswa</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Juz</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Surat</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Progress</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Hasil</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ziyadah.map((z, i) => {
                            const siswa = DATA.siswa.find(s => s.nis === z.nis);
                            return (
                              <TableRow key={i} className="border-[var(--bunayya-border)]">
                                <TableCell className="text-[var(--fg)]">{z.tanggal}</TableCell>
                                <TableCell className="text-[var(--fg)]">{siswa?.nama}</TableCell>
                                <TableCell className="text-[var(--fg)]">{z.juz}</TableCell>
                                <TableCell className="text-[var(--fg)]">{z.surat}</TableCell>
                                <TableCell className="text-[var(--fg)]">{z.progress}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    z.hasil === 'Lancar' ? 'bg-green-900/50 text-green-300' :
                                    z.hasil === 'Cukup' ? 'bg-amber-900/50 text-amber-300' :
                                    z.hasil === 'Perlu Latihan' ? 'bg-orange-900/50 text-orange-300' :
                                    'bg-red-900/50 text-red-300'
                                  }>{z.hasil}</Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Siswa Tab - Master Data */}
            <TabsContent value="siswa" className="space-y-6">
              <Card className="bg-[var(--bunayya-card)] border-[var(--bunayya-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--fg)] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[var(--accent-green)]" />
                    🎓 Master Data Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button className="min-h-[44px] touch-manipulation bg-[var(--accent-green)] text-[var(--bg)]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload TXT
                    </Button>
                    <Button variant="outline" className="min-h-[44px] touch-manipulation bg-transparent border-[var(--bunayya-border)] text-[var(--fg)]">
                      <Download className="w-4 h-4 mr-2" />
                      Download Excel
                    </Button>
                    <Button variant="outline" className="min-h-[44px] touch-manipulation bg-transparent border-[var(--bunayya-border)] text-[var(--fg)]">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Siswa
                    </Button>
                  </div>
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[var(--bunayya-border)]">
                            <TableHead className="text-[var(--fg-muted)]">NIS</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Nama</TableHead>
                            <TableHead className="text-[var(--fg-muted)]">Kelas</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DATA.siswa.map((s, i) => (
                            <TableRow key={i} className="border-[var(--bunayya-border)]">
                              <TableCell className="text-[var(--fg)]">{s.nis}</TableCell>
                              <TableCell className="text-[var(--fg)]">{s.nama}</TableCell>
                              <TableCell className="text-[var(--fg)]">
                                <Badge className="bg-[var(--bg-light)] text-[var(--fg)]">{s.kelas}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg)] border-t border-[var(--bunayya-border)] py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[var(--fg-muted)] text-sm">
            © 2024 Bunayya Islamic School - Menuju Generasi Qur&apos;ani
          </p>
        </div>
      </footer>
    </div>
  );
}
