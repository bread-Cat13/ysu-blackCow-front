document.addEventListener("DOMContentLoaded", function() {
    // 네이버 지도 API 초기화
    const currClient = document.title;
    
    if (currClient === "sinchon map"){
        locationX = 37.5601;
        locationY = 126.9368;
    } else if (currClient === "songdo map"){
        locationX = 37.3812;
        locationY = 126.6688;
        alert("아직 만드는 중!");
        window.location.href = "select_region.html"
    }
    // map 객체
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(locationX, locationY), // 초기 지도 중심 설정
        mapTypes: new naver.maps.MapTypeRegistry({
            'normal': naver.maps.NaverStyleMapTypeOptions.getVectorMap()
        }),
        zoom: 18
    });

    var labelMapType = new naver.maps.NaverStyleMapTypeOptions.getNormalLabelLayer();
    var labelMapTypeRegistry = new naver.maps.MapTypeRegistry({
    'label': labelMapType
    });
    var labelLayer = new naver.maps.Layer('label', labelMapTypeRegistry);


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
                size: new naver.maps.Size(56, 87),
                scaledSize: new naver.maps.Size(20, 30),
                anchor: new naver.maps.Point(40, 10),
                url: 'image/pin.png'
            }
        });

        // 마커 클릭 시 건물 정보 표시 및 지도 이동
        naver.maps.Event.addListener(marker, 'click', function(event) {
            map.panTo(building.position); // 마커 위치로 지도 이동
            showBuildingInfo(building);
            
            // 클릭 시 이전에 등록된 외부 클릭 이벤트 리스너 제거
            document.removeEventListener('click', hideBuildingInfoOnClickOutside);
            
            // 새로운 외부 클릭 이벤트 리스너 등록
            setTimeout(function() {
                document.addEventListener('click', hideBuildingInfoOnClickOutside);
            }, 0); // setTimeout을 사용하여 이벤트 전파 후 실행되도록 설정
            
            event.stopPropagation(); // 마커 클릭 시 이벤트 전파 방지
        });
        /*
        //  마커 마우스 오버 시 건물 이름 나오게 하기; 아직 작동 안함
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
        document.addEventListener('click', hideBuildingInfoOnClickOutside);
    }

    // 지도 클릭 시 건물 정보 숨김 함수
    function hideBuildingInfoOnClickOutside(event) {
        var infoSection = document.getElementById("building-info");
    
        // 섹션 내부를 클릭한 경우는 제외
        if (!infoSection.contains(event.target)) {
            infoSection.style.display = "none"; // 정보 섹션 숨김
            document.removeEventListener('click', hideBuildingInfoOnClickOutside); // 이벤트 리스너 제거
        }
    }
    // stopPropagation
    document.getElementById("building-info").addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // 건물 이름 클릭시 해당 페이지로 이동
    var nameElement = document.getElementById("building-name");
    nameElement.addEventListener('click', function() {
        window.location.href = "building_info.html"
    })
    
});
