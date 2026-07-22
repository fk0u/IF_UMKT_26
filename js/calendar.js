/**
 * Calendar Helper for INFOTIK 26
 * Generates Google Calendar link & downloadable .ics files for lecture schedules.
 */

window.INFOTIK_CALENDAR = {
  // Helper to format date strings for ICS format (YYYYMMDDTHHMMSS)
  formatICSDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  },

  // Calculate next occurrence date for a day of the week (1: Mon, 2: Tue, 3: Wed, 6: Sat)
  getNextDayDate(dayCode, timeStr) {
    const today = new Date();
    const currentDay = today.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
    let distance = (dayCode - currentDay + 7) % 7;
    if (distance === 0) distance = 0; // Today if same day

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + distance);

    const [hours, minutes] = timeStr.split(':').map(Number);
    targetDate.setHours(hours, minutes, 0, 0);
    return targetDate;
  },

  // Generate Direct Google Calendar Template URL
  generateGoogleCalendarUrl(item) {
    const startDate = this.getNextDayDate(item.dayCode, item.startTime);
    const endDate = this.getNextDayDate(item.dayCode, item.endTime);

    // Format YYYYMMDDTHHMMSSZ (UTC or Local ISO without dashes)
    const startIso = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endIso = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent(`Kuliah TI 2026: ${item.course}`);
    const details = encodeURIComponent(
      `Mata Kuliah: ${item.course} (${item.sks} SKS)\nDosen: ${item.lecturer}\nRuang: ${item.room} (${item.building})\nJadwal Mahasiswa Teknik Informatika 2026 UMKT`
    );
    const location = encodeURIComponent(`Ruang ${item.room}, ${item.building}, Universitas Muhammadiyah Kalimantan Timur`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}&recur=RRULE:FREQ=WEEKLY;UNTIL=20261231T235959Z`;
  },

  // Download .ics File for Calendar Import
  downloadIcsFile(item) {
    const startDate = this.getNextDayDate(item.dayCode, item.startTime);
    const endDate = this.getNextDayDate(item.dayCode, item.endTime);

    const startStr = this.formatICSDate(startDate);
    const endStr = this.formatICSDate(endDate);
    const nowStr = this.formatICSDate(new Date());

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//INFOTIK 2026 UMKT//Jadwal Kuliah//ID',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:kuliah-ti-2026-${item.id}@umkt.ac.id`,
      `DTSTAMP:${nowStr}`,
      `DTSTART;TZID=Asia/Makassar:${startStr}`,
      `DTEND;TZID=Asia/Makassar:${endStr}`,
      `RRULE:FREQ=WEEKLY;UNTIL=20261231T235959Z`,
      `SUMMARY:Kuliah TI: ${item.course}`,
      `LOCATION:Ruang ${item.room}, ${item.building}, UMKT`,
      `DESCRIPTION:Mata Kuliah: ${item.course}\\nDosen: ${item.lecturer}\\nRuangan: ${item.room}\\nSKS: ${item.sks}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Jadwal_${item.course.replace(/\s+/g, '_')}_2026.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
