# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis ekosistem **React + TypeScript + Vite + TanStack Query + TanStack Table**.

## Current Status
- ✅ Transisi lengkap dari HTML static ke **React + TypeScript + Vite App**.
- ✅ Integrated **`@tanstack/react-query`**: state caching, background refetching, & mutations (Tasks, News, Forum, WA Submissions).
- ✅ Integrated **`@tanstack/react-table`**: Interactive sorting & day filtering data grid untuk Jadwal Kuliah & Tabel Verifikasi WA Admin.
- ✅ Successful production build (`npm run build`) with zero compilation errors.
- ✅ Updated Graphify Knowledge Graph (220 nodes, 361 edges, 18 communities).

## Key Files & Structure
- [src/App.tsx](file:///d:/Project/IF_UMKT_26/src/App.tsx) - Main application layout & theme controller
- [src/main.tsx](file:///d:/Project/IF_UMKT_26/src/main.tsx) - QueryClientProvider entry point
- [src/services/mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) - Simulated Async REST API service
- [src/hooks/](file:///d:/Project/IF_UMKT_26/src/hooks/) - TanStack Query & Mutation hooks
- [src/components/views/ScheduleView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ScheduleView.tsx) - TanStack Table for Schedules
- [src/components/views/AdminView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/AdminView.tsx) - TanStack Table for WA Verification Requests
