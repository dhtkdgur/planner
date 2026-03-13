-- ================================================
-- Personal Planner - Supabase Schema
-- Supabase SQL Editor에 붙여넣어 실행하세요
-- ================================================

-- 할 일 테이블
CREATE TABLE todos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  date       DATE NOT NULL,
  priority   TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  completed  BOOLEAN NOT NULL DEFAULT false,
  position   INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_todos_date ON todos(date);

-- 캘린더 이벤트 테이블
CREATE TABLE events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time   TIME,
  memo       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_events_date ON events(event_date);

-- 프로젝트 테이블
CREATE TABLE projects (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT 'indigo',
  start_date DATE,
  end_date   DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 서브태스크 테이블 (프로젝트에 종속)
CREATE TABLE subtasks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  completed  BOOLEAN NOT NULL DEFAULT false,
  position   INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_subtasks_project ON subtasks(project_id);

-- ================================================
-- Row Level Security (RLS) 설정 - 현재는 비활성화
-- 인증을 추가할 경우 아래 주석을 해제하세요
-- ================================================

-- ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Allow all" ON todos FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON events FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON projects FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON subtasks FOR ALL USING (true);
