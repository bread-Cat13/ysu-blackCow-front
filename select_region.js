// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // 송도캠퍼스 선택 시
    document.getElementById("left-selection").addEventListener("click", function() {
        window.location.href = "songdo.html"; // 송도 캠퍼스 페이지로 이동
    });

    // 신촌캠퍼스 선택 시
    document.getElementById("right-selection").addEventListener("click", function() {
        window.location.href = "sinchon.html"; // 신촌 캠퍼스 페이지로 이동
    });

    // 언어모델 아이콘 클릭 시 (다음 페이지로 이동 예정)
    document.getElementById("chat-icon").addEventListener("click", function() {
        // 이후 3페이지에서 설명할 기능 추가 예정
    });
});


