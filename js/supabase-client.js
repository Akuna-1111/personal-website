// Supabase 客户端配置
// 获取方式：Supabase Dashboard → Settings → API → Project URL & anon public key
// 替换下面的 YOUR-PROJECT 和 YOUR-ANON-KEY：

(function() {
    'use strict';

    window.SUPABASE_URL = 'https://snterhceunhceixgpqxy.supabase.co';
    window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudGVyaGNldW5oY2VpeGdwcXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3Nzg1NzEsImV4cCI6MjA5ODM1NDU3MX0.5a7aBhN_ePKQQfbkmCq9GOKtj78l-E2URCAt8RQVLJ0';

    function initClient() {
        if (typeof supabase === 'undefined') {
            setTimeout(initClient, 200);
            return;
        }
        window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClient);
    } else {
        initClient();
    }
})();
