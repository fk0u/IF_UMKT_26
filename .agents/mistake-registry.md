# Mistake Registry - INFOTIK 26

Berikut adalah daftar kesalahan teknis, bug kompilasi, dan pelajaran yang didapatkan selama pengerjaan proyek ini:

## 1. JSX Root Element Error (Syntax Error)
- **Error**: `TS1005: ')' expected`, `TS1381: Unexpected token.`
- **Penyebab**: Menempatkan beberapa elemen sibling secara langsung dalam ekspresi JSX bersyarat (misal: `{adminTab === 'wa' && (<div1 /> <div2 />)}`) tanpa pembungkus root tunggal.
- **Pencegahan**: Selalu bungkus elemen-elemen sibling di dalam React Fragment (`<>...</>`) atau elemen penampung seperti `div` jika berada di dalam satu ekspresi kondisional JSX.

## 2. Ketidakcocokan Tipe Data Hook Mutation & Service API
- **Error**: `TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'.`
- **Penyebab**: Tipe argumen `mutationFn` pada TanStack `useMutation` tidak diselaraskan setelah adanya pembaruan/refaktorisasi skema API di dalam gateway `mockApi.ts`.
- **Pencegahan**: Apabila mengubah tanda tangan metode (*method signature*) di `mockApi.ts`, pastikan untuk selalu memperbarui definisi tipe data parameter `mutationFn` di berkas `use{Feature}.ts` yang bersangkutan.

## 3. Galat Overload Node.js Crypto Decipher
- **Error**: `TS2769: No overload matches this call` pada `decipher.update(...)`.
- **Penyebab**: Memberikan buffer yang sudah diurai secara hex ke `decipher.update` namun tetap menyertakan parameter encoding `'hex'`.
- **Pencegahan**: Sesuai tanda tangan fungsi `crypto.createDecipheriv` di Node.js, jika data input berupa string heksadesimal mentah, gunakan format `decipher.update(encryptedTextHex, 'hex', 'utf8')`. Jika data input sudah dideklarasikan sebagai `Buffer`, hilangkan parameter `'hex'`.

## 4. Inferensi Tipe Implisit pada Database Mocking
- **Error**: `TS2339: Property 'X' does not exist on type '{ ... }'.`
- **Penyebab**: Array in-memory database di backend Express (`api/index.ts`) langsung diinferensikan dari data inisiasi (`INITIAL_WA_SUBMISSIONS`) yang tidak memiliki kunci opsional seperti `rejectionReason` atau `verificationToken`, sehingga TypeScript membatasi penambahan kunci baru tersebut secara dinamis.
- **Pencegahan**: Selalu ketik variabel database buatan secara eksplisit (misal: `let dbWASubmissions: WASubmission[] = [...]`) dan pastikan data inisiasi memiliki semua properti wajib (seperti `waLink` pada `WASubmission`).

## 5. Mismatch Token Styling Class CSS
- **Error**: Tampilan navigasi transparan (tanpa efek glassmorphism).
- **Penyebab**: Menggunakan class name `glass-nav` di `MobileBottomNav.tsx` sedangkan di `index.css` kelas yang didaftarkan untuk glassmorphism header/navigasi adalah `hm-nav-glass`.
- **Pencegahan**: Selalu tinjau token-token desain dan kelas kustom yang didefinisikan di `index.css` sebelum mengaplikasikannya ke dalam komponen JSX.

## 6. Paparan Endpoint Sensitif pada Komunikasi Publik (Pesan WA)
- **Error**: Kebocoran informasi struktur API backend (*information disclosure*).
- **Penyebab**: Mencantumkan tautan endpoint API backend `/api/wa-submissions/verify-token` ke dalam isi templat pesan WhatsApp yang dikirimkan ke admin.
- **Pencegahan**: Hindari menuliskan detail endpoint API internal atau detail server sensitif lainnya di dalam pesan, surel, atau antarmuka yang dapat diakses oleh publik/jaringan eksternal. Gunakan penamaan umum seperti "Panel Admin".

## 7. Degradasi Fitur pada Mode Offline (Fallback)
- **Error**: Kolom token verifikasi kosong (*undefined*) saat simulasi offline.
- **Penyebab**: Fungsi fallback `localStorage` di `mockApi.ts` tidak menyertakan penulisan token enkripsi (`verificationToken`) seperti yang dilakukan di server backend.
- **Pencegahan**: Pastikan fungsi *mocking* atau *fallback* mereplikasi secara tepat seluruh fungsionalitas dan properti data kunci dari API utama demi menjaga integritas fitur aplikasi saat beroperasi dalam mode offline.
