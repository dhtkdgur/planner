/**
 * 날짜를 'YYYY-MM-DD' 문자열로 변환
 */
export function toDateString(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * 'YYYY-MM-DD' 문자열을 Date 객체로 변환 (로컬 타임존)
 */
export function fromDateString(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/**
 * 두 날짜가 같은 날인지 비교
 */
export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * 월간 그리드용 42개 Date 배열 반환 (6주 × 7일)
 */
export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay() // 0=Sun
  const days = []

  // 이전 달 패딩
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i))
  }

  // 이번 달
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d))
  }

  // 다음 달 패딩 (42칸 채우기)
  let next = 1
  while (days.length < 42) {
    days.push(new Date(year, month + 1, next++))
  }

  return days
}

/**
 * 주어진 날짜가 속한 주의 7일 반환 (일~토)
 */
export function getWeekDays(date) {
  const day = date.getDay()
  const sunday = new Date(date)
  sunday.setDate(date.getDate() - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday)
    d.setDate(sunday.getDate() + i)
    return d
  })
}

/**
 * 날짜를 한국어 형식으로 포맷
 */
export function formatDate(date) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (isSameDay(date, today)) return '오늘'
  if (isSameDay(date, yesterday)) return '어제'

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

/**
 * 월 이름 반환
 */
export function formatMonth(year, month) {
  return new Date(year, month, 1).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  })
}

/**
 * 월의 시작~끝 날짜 문자열 반환 (Supabase 범위 쿼리용)
 */
export function getMonthRange(year, month) {
  const start = toDateString(new Date(year, month, 1))
  const end = toDateString(new Date(year, month + 1, 0))
  return { start, end }
}

/**
 * 주의 시작~끝 날짜 문자열 반환
 */
export function getWeekRange(date) {
  const days = getWeekDays(date)
  return {
    start: toDateString(days[0]),
    end: toDateString(days[6]),
  }
}
