// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // 층 아이콘 클릭 이벤트 처리
    const floorIcons = document.querySelectorAll(".floor-icon");

    floorIcons.forEach(function(icon) {
        icon.addEventListener("click", function() {
            const floor = icon.getAttribute("data-floor");
            // 각 층별로 이동할 URL 설정 (예시로 floor에 따라 이동)
            window.location.href = `floor-${floor}.html`; // 해당 층 페이지로 이동
        });
    });
});
