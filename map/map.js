// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // 네이버 지도 API 초기화
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 지도 중심 설정
        zoom: 17
    });

    // 예시 건물 목록
    var buildings = [
        {
            name: "공학관",
            position: new naver.maps.LatLng(37.5665, 126.9780),
            details: "연세대학교 공학관. 다양한 공학 강의가 진행됩니다."
        },
        {
            name: "백양관",
            position: new naver.maps.LatLng(37.5667, 126.9790),
            details: "연세대학교 백양관. 학생들이 많이 찾는 장소입니다."
        }
    ];

    // 건물 마커 및 이벤트 등록
    buildings.forEach(function(building) {
        var marker = new naver.maps.Marker({
            position: building.position,
            map: map,
            title: building.name,
            icon: {
                content: `<div class="marker">${building.name}</div>`,
                size: new naver.maps.Size(38, 58),
                anchor: new naver.maps.Point(19, 58)
            }
        });

        // 마커 클릭 시 건물 정보 표시 및 지도 이동
        naver.maps.Event.addListener(marker, 'click', function() {
            map.panTo(building.position); // 마커 위치로 지도 이동
            showBuildingInfo(building);
        });
    });

    // 건물 정보 표시 함수
    function showBuildingInfo(building) {
        var infoSection = document.getElementById("building-info");
        var nameElement = document.getElementById("building-name");
        var detailsElement = document.getElementById("building-details");

        nameElement.innerText = building.name;
        detailsElement.innerText = building.details;

        infoSection.style.display = "block";

        // 화면을 4분할 했을 때 좌상단으로 지도 이동
        map.panBy(-map.getSize().width / 4, -map.getSize().height / 4);
    }
});
