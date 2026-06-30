-- ===== 郑彬坤作品集 - 访客评论系统 Supabase 建表 =====
-- 在 Supabase SQL Editor 中执行此文件

-- 1. 评论表（含回复支持）
CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    project_slug TEXT NOT NULL,
    nickname TEXT NOT NULL,
    avatar_seed TEXT NOT NULL,
    content TEXT NOT NULL,
    parent_id BIGINT,
    parent_nickname TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 索引
CREATE INDEX IF NOT EXISTS idx_comments_project ON comments(project_slug, created_at DESC);

-- 3. 权限
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON TABLE public.comments TO anon;
GRANT USAGE ON SEQUENCE comments_id_seq TO anon;

-- 4. RLS 策略：匿名用户可读写
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "anon_all" ON comments
    FOR ALL TO anon
    USING (true)
    WITH CHECK (true);
