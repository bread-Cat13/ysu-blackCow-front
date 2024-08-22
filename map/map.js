// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // 네이버 지도 API 초기화
    const currClient = document.title;
    
    if (currClient === "sinchon map"){
        locationX = 37.5601;
        locationY = 126.9368;
    } else if (currClient === "songdo map"){
        locationX = 37.3812;
        locationY = 126.6688;
    }

    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(locationX, locationY), // 초기 지도 중심 설정
        zoom: 18
    });

    //건물 목록
    var buildings = [
        {   
            // 예시
            name: "공학관",
            position: new naver.maps.LatLng(37.5619, 126.9364),
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
                size: new naver.maps.Size(58, 38),
                anchor: new naver.maps.Point(19, 58),
                url: 'image/pin'
            }
        });

        // 마커 클릭 시 건물 정보 표시 및 지도 이동
        naver.maps.Event.addListener(marker, 'click', function() {
            map.panTo(building.position); // 마커 위치로 지도 이동
            showBuildingInfo(building);
        });

        /*수정중
        var infoWindow = new naver.maps.InfoWindow({
            content: '<div style="padding:10px;">building.name</div>'
        });

        naver.maps.Event.addEventListener(marker, 'mouseover', function() {
            infoWindow.open(map, marker);
        
        });
        */
    });

    // 건물 정보 표시 함수
    function showBuildingInfo(building) {
        var infoSection = document.getElementById("building-info");
        var nameElement = document.getElementById("building-name");
        var detailsElement = document.getElementById("building-details");

        nameElement.innerText = building.name;
        detailsElement.innerText = building.details;

        infoSection.style.display = "block";

    }

    naver.maps.Event.addListener(maps, '')
});
