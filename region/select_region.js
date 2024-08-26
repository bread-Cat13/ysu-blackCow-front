// scripts.js
document.addEventListener("DOMContentLoaded", function () {
    // 송도캠퍼스 선택 시
    document.getElementById("right-selection").addEventListener("click", function () {
        alert("아직 지원하지 않는 기능입니다!");
    });

    // 신촌캠퍼스 선택 시
    document.getElementById("left-selection").addEventListener("click", function () {
        window.location.href = "../map/sinchon.html"; // 신촌 캠퍼스 페이지로 이동
    });
});


