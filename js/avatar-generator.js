// Identicon 头像生成器 — 暗色主题几何头像
(function() {
    'use strict';

    // 配色：来自 DESIGN.md 色彩系统
    var COLORS = [
        { bg: '#000',    fg: '#00cc00' },
        { bg: '#000',    fg: '#008800' },
        { bg: '#111',    fg: '#00cc00' },
        { bg: '#0d0d0d', fg: '#e8ecf1' },
        { bg: '#000',    fg: 'rgba(0,204,0,0.7)' },
        { bg: '#111',    fg: 'rgba(0,204,0,0.6)' },
        { bg: '#0d0d0d', fg: '#00cc00' },
    ];

    function hashToNumbers(seed) {
        var nums = [];
        for (var i = 0; i < seed.length && nums.length < 25; i++) {
            var c = seed.charCodeAt(i);
            nums.push(c % 2 === 0);
            if (i % 2 === 1) nums.push(c % 3 === 0);
        }
        while (nums.length < 25) {
            nums.push(nums.length % 3 !== 0);
        }
        return nums.slice(0, 25);
    }

    function drawAvatar(seed, size) {
        size = size || 48;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');

        var colorIdx = parseInt(seed, 16) % COLORS.length;
        var palette = COLORS[colorIdx];

        ctx.fillStyle = palette.bg;
        ctx.fillRect(0, 0, size, size);

        var cells = hashToNumbers(seed);
        var cellSize = size / 5;
        var margin = cellSize * 0.12;

        for (var i = 0; i < 25; i++) {
            if (cells[i]) {
                var row = Math.floor(i / 5);
                var col = i % 5;
                ctx.fillStyle = palette.fg;
                ctx.beginPath();
                ctx.roundRect(
                    col * cellSize + margin,
                    row * cellSize + margin,
                    cellSize - margin * 2,
                    cellSize - margin * 2,
                    cellSize * 0.18
                );
                ctx.fill();
            }
        }

        // 微妙的边框
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, size - 1, size - 1, size * 0.12);
        ctx.stroke();

        return canvas.toDataURL();
    }

    window.AvatarGenerator = {
        draw: drawAvatar
    };
})();
