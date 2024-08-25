// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // 챗 아이콘 요소
    const chatIcon = document.getElementById("chat-icon");
    const chatOptions = document.getElementById("chat-options");
    const liItems = document.querySelectorAll('#chat-options ul li');
    const chatContainer = document.getElementById("chat-container");
    const chatPrompt = document.getElementById("chat-prompt");
    const chatOverlay = document.getElementById("chat-response-overlay");
    const chatResponse = document.getElementById("chat-response");
    const userInput = document.getElementById("user-input");
    const submitBtn = document.getElementById("submit-btn");

    // 챗봇 옵션
    // 챗 아이콘 마우스 오버 시 옵션 메뉴 표시
    let hideOptionTimeout;
    chatIcon.addEventListener("mouseover", function() {
        clearTimeout(hideOptionTimeout);
        chatOptions.style.display = "block";
    });

    // 마우스 오버가 끝났을 때 옵션 메뉴 숨김
    chatIcon.addEventListener("mouseout", function() {
        hideOptionTimeout = setTimeout(function() {
            chatOptions.style.display = "none";
        }, 200);
    });

    // 챗봇 메뉴 마우스 오버 시 옵션 메뉴 표시
    chatOptions.addEventListener("mouseover", function() {
        clearTimeout(hideOptionTimeout);
        chatOptions.style.display = "block";
    })
// 마우스 오버가 끝났을 때 옵션 메뉴 숨김
    chatOptions.addEventListener("mouseout", function() {
        chatOptions.style.display = "none";
    })
    
// 옵션 메뉴 클릭
    liItems.forEach(function(item, index) {
        if (index === 0) { // 챗봇의 이전 답변 보기
            item.addEventListener('click', function() {   
                chatOverlay.style.display ="block";
            })
        } else if(index === 1) { // Chat icon 옆으로 밀기
            item.addEventListener('click', function() {
                const currentLeft = parseInt(window.getComputedStyle(chatContainer).left);
                moveChatIcon(currentLeft);
            })
        } else if(index === 2) { // 이전 대화기록 삭제
            item.addEventListener('click', function() {
                // 수정중
            })
        }
    })

    // 메뉴 2 함수
    function moveChatIcon(coorX) {
        const windowWidth = window.innerWidth;
        if (coorX === Math.floor(windowWidth*0.5)) {
            chatContainer.style.left = "5%";
        } else {
            chatContainer.style.left = "50%";
        }
    }
    
    // 프롬프트 창
    // 챗 아이콘 클릭 시 프롬프트 입력 창 표시
    chatIcon.addEventListener("click", function(event) {
        chatPrompt.style.display = "block";
        chatOptions.style.display = "none";  // 옵션 메뉴 숨김

        document.removeEventListener('click', hidePromptOnClickOutside);
            
        // 새로운 외부 클릭 이벤트 리스너 등록
        setTimeout(function() {
            document.addEventListener('click', hidePromptOnClickOutside);
        }, 0); // setTimeout을 사용하여 이벤트 전파 후 실행되도록 설정
        
        event.stopPropagation(); // 챗본 아이콘 클릭 시 이벤트 전파 방지
    });

    function hidePromptOnClickOutside(event) {
        // 섹션 내부를 클릭한 경우는 제외
        if (!chatPrompt.contains(event.target)) {
            chatPrompt.style.display = "none"; // 정보 섹션 숨김
            document.removeEventListener('click', hidePromptOnClickOutside); // 이벤트 리스너 제거
        }
    }
    // 초기 로딩 시 섹션 외부 클릭이 발생하지 않도록 전파 방지
    chatPrompt.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    
    // 프롬프트 입력 후 전송 버튼 클릭 시
    submitBtn.addEventListener("click", submitchatbot);
    let conversationHistory = [];

   submitBtn.addEventListener("click", submitchatbot);
    let conversationHistory = [];

    async function submitchatbot() {
        const userQuery = userInput.value.trim();
        conversationHistory.push(`User: ${userQuery}`);
        const fullConversation = conversationHistory.join('\n');
        try {
            if (userQuery !== "") {
                const response = await fetch('https://g0whs12323.execute-api.ap-south-1.amazonaws.com/dev/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_input: fullConversation })
                });

                const data = await response.json();

                if (data.query_result['접근위치'] == "") {
                    p1 = "접근위치 : 없음" + data.query_result['접근위치'];
                } else {
                    p1 = "접근위치 : " + data.query_result['접근위치'];
                }
                if (data.query_result['참고사항'] == "") {
                    p2 = "참고사항 : 없음" + data.query_result['참고사항'];
                } else {
                    p2 = "참고사항 : " + data.query_result['참고사항'];
                }

                chatResponse.innerHTML = `
                <h2>${data.query_result['요약']}</h2>
                <p>${p1}</p>
                <p>${p2}</p>
                <a href="#" id="map-link">2D MAP</a>
                <div class="wrapper">
                  <div class="image-container" id="imageContainer">
                    <!-- 지도 이미지와 오버레이가 이 div에 추가됩니다 -->
                  </div>
                </div>
              `;

                const style = document.createElement('style');
                style.textContent = `
                .wrapper {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              
                .image-container {
                    position: relative;
                    width: 80vw;  /* 브라우저 너비의 80% */
                    height: 60vh; /* 브라우저 높이의 60% */
                    max-width: 1150px;
                    max-height: 850px;
                    overflow: hidden;
                }
              
                .main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;  /* 이미지가 비율을 유지하면서 컨테이너에 맞게 조정 */
                }
              
                .overlay-image {
                  position: absolute;
                  width: 32px;
                  height: 32px;
                }
              `;

                document.head.appendChild(style);

                let overlayCount = 0;
                const overlayPositions = [];

                function addOverlayAndMap() {
                    const container = document.getElementById('imageContainer');

                    // 기존 이미지 제거
                    container.innerHTML = '';

                    // 지도 이미지 동적 추가
                    const mapImage = document.createElement('img');
                    mapImage.src = '../chatbot/1.png';  // 지도 이미지 경로
                    mapImage.alt = '지도 이미지';
                    mapImage.className = 'main-image';
                    mapImage.id = 'main-map-image';

                    container.appendChild(mapImage);

                    // 이미지 로드 완료 후 오버레이 추가
                    mapImage.onload = function () {
                        // 오버레이 이미지 추가
                        const xPos = data.query_result['X_JPG'] - 16;
                        const yPos = data.query_result['Y_JPG'] - 32;

                        const overlay = document.createElement('img');
                        overlay.src = '../image/pin2.png';
                        overlay.alt = '오버레이 이미지';
                        overlay.className = 'overlay-image';
                        overlay.id = `overlay-${overlayCount}`;

                        overlayPositions.push({ id: overlay.id, x: xPos, y: yPos });
                        container.appendChild(overlay);

                        updatePosition(overlay, xPos, yPos);
                        overlayCount++;
                    };

                    container.appendChild(mapImage);
                }

                function updatePosition(overlay, xPos, yPos) {
                    const image = document.getElementById('main-map-image');
                    if (image.complete) {
                        const naturalWidth = image.naturalWidth;
                        const naturalHeight = image.naturalHeight;

                        const container = document.querySelector('.image-container');
                        const containerWidth = container.clientWidth;
                        const containerHeight = container.clientHeight;

                        // 이미지 비율 유지에 따른 크기 계산
                        const scaleX = containerWidth / naturalWidth;
                        const scaleY = containerHeight / naturalHeight;
                        const scale = Math.min(scaleX, scaleY);  // 이미지를 컨테이너에 맞추는 최소 스케일

                        // 이미지가 중앙에 위치하도록 계산
                        const offsetX = (containerWidth - naturalWidth * scale) / 2;
                        const offsetY = (containerHeight - naturalHeight * scale) / 2;

                        // 오버레이 위치 계산 및 설정
                        overlay.style.left = `${xPos * scale + offsetX}px`;
                        overlay.style.top = `${yPos * scale + offsetY}px`;

                        // 오버레이 크기 조정
                        const overlayOriginalSize = 32;
                        overlay.style.width = `${overlayOriginalSize * scale}px`;
                        overlay.style.height = `${overlayOriginalSize * scale}px`;
                    }
                }

                // 이벤트 리스너 추가
                window.addEventListener('resize', () => {
                    const container = document.querySelector('.image-container');
                    const containerRect = container.getBoundingClientRect();

                    overlayPositions.forEach(pos => {
                        const overlay = document.getElementById(pos.id);
                        updatePosition(overlay, pos.x, pos.y);
                    });
                });

                window.addEventListener('load', () => {
                    overlayPositions.forEach(pos => {
                        const overlay = document.getElementById(pos.id);
                        updatePosition(overlay, pos.x, pos.y);
                    });
                });


                // '2D MAP' 링크에 이벤트 리스너 추가
                document.getElementById('map-link').addEventListener('click', function (event) {
                    event.preventDefault();
                    addOverlayAndMap();
                });

                chatOverlay.style.display = "block";
                chatPrompt.style.display = "none";  // 입력 창 숨김
            }
        } catch (error) {
            addMessageToLog(`Error: ${error.message}`);
        }
        userInput.value = "";
    }
    // 챗봇 답변 섹션
    // 흰색 섹션 외부 클릭 시 초기 상태로 복구

});
