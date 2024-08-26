document.addEventListener("DOMContentLoaded", function () {

    // URL에서 buildingId 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const buildingId = parseInt(urlParams.get('buildingId'), 10);
    const buildingName = urlParams.get('buildingName');

    const nameContainer = document.querySelector("#building-name");
    nameContainer.innerText = buildingName;

    const floorIconsContainer = document.getElementById("floor-icons");
    const hostIp = "13.235.63.60"; //서버 ip (ec2 ip)
    const port = "8080"; //8080에서 열리도록 설정함

    let currentImageUrl = null; // 현재 이미지 URL 저장 변수

    // 백엔드에서 층 정보를 가져오는 함수
    fetch(`http://${hostIp}:${port}/map/buildings/${buildingId}/floor-info`)
        .then(response => response.json())
        .then(data => {
            const { minFloor, maxFloor } = data;  // 서버로부터 받은 지하, 지상 층수 정보

            // 지하층 생성 (B1, B2, ...)
            for (let i = minFloor; i < 0; i++) {
                const floorIcon = document.createElement("div");
                floorIcon.className = "floor-icon";
                floorIcon.dataset.floor = `B${Math.abs(i)}`;
                floorIcon.textContent = `B${Math.abs(i)}`;
                floorIconsContainer.appendChild(floorIcon);
            }

            // 지상층 생성 (1F, 2F, ...)
            for (let i = 1; i <= maxFloor; i++) {
                const floorIcon = document.createElement("div");
                floorIcon.className = "floor-icon";
                floorIcon.dataset.floor = `${i}F`;
                floorIcon.textContent = `${i}F`;
                floorIconsContainer.appendChild(floorIcon);
            }

            // 층 아이콘에 클릭 이벤트 추가
            const floorIcons = document.querySelectorAll(".floor-icon");
            floorIcons.forEach(function (icon) {
                icon.addEventListener("click", function () {
                    const floor = icon.getAttribute("data-floor");

                    // 기존 이미지 URL 해제
                    if (currentImageUrl) {
                        URL.revokeObjectURL(currentImageUrl);
                        currentImageUrl = null;
                    }

                    // 백엔드의 /floors API 호출
                    fetch(`http://${hostIp}:${port}/map/buildings/floors?bId=${buildingId}&f=${floor}`, {
                        method: 'GET',
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.blob(); // 이미지 데이터를 바이너리 형식으로 가져옴
                        })
                        .then(imageBlob => {
                            const imageUrl = URL.createObjectURL(imageBlob); // 이미지 Blob을 URL로 변환
                            currentImageUrl = imageUrl; // 현재 이미지 URL 저장
                            const imgElement = document.getElementById('floor-image'); // 이미지를 표시할 <img> 요소 선택 또는 생성

                            if (!imgElement) {
                                const newImgElement = document.createElement('img'); // 새로운 <img> 요소 생성
                                newImgElement.id = 'floor-image';
                                newImgElement.src = imageUrl;

                                // CSS 스타일 추가
                                newImgElement.style.position = 'absolute';
                                newImgElement.style.top = '0';
                                newImgElement.style.left = '0';
                                newImgElement.style.width = '67%'; // 오버레이 왼쪽 영역에만 나오도록 설정
                                newImgElement.style.height = '100%';
                                newImgElement.style.zIndex = '2'; // 공학관 배경보다 앞에, 다른 UI 요소들보다는 뒤에 위치
                                newImgElement.style.objectFit = 'contain'; // 이미지가 영역에 맞도록 설정
                                //

                                document.body.appendChild(newImgElement); // body 또는 원하는 위치에 이미지 추가
                            } else {
                                imgElement.src = imageUrl; // 기존 <img> 요소의 이미지 갱신
                                imgElement.style.zIndex = '2'; // 기존 이미지의 z-index도 동일하게 설정
                                newImgElement.style.width = '67%'; // 오버레이 왼쪽 영역에만 나오도록 설정
                                newImgElement.style.height = '100%';
                                imgElement.style.objectFit = 'contain'; // 이미지가 영역을 가득 채우도록 설정
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        });
                });
            });
        })
        .catch(error => {
            console.error("Error fetching floor data:", error);
            // 에러 처리 (예: 사용자에게 알림)
        });
});
