// 아이디체크
        function idCheck(){
            const exp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,10}$/;
            const exp1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
            const exp2 = /^(?=.*[a-z])(?=.*\d)(?=.*[-_])[a-z\d-_]{5,20}$/; 

            const id = document.getElementById('id').value;
            const idResult = document.getElementById('idResult');
            const idLength = id.length
            if (id.match(exp)) {
                console.log('유요한 형식')
                idResult.innerHTML = '좋습니다';
                idResult.style.color = 'green';

            } else if(idLength == 0) {
                idResult.innerHTML = '필수항목입니다';
                idResult.style.color = 'red';
            } else if(idLength < 5 || idLength >10) {
                console.log('유효하지않은형식.')
                idResult.innerHTML = '6~10자 내로 입력하세요';
                idResult.style.color = 'red';
            }
        }
        // 비밀번호
        function password(){
            const exp2 = /^(?=.*[a-z])(?=.*\d)(?=.*[-_!@#$%^&*()])[a-z\d-_!@#$%^&*()]{8,20}$/;
            const passwordValue = document.getElementById('pw').value;
            console.log('pw값 : ',passwordValue)
            const passwordResult = document.getElementById('passwordResult');
            console.log(passwordResult)
            const passwordRegular = document.getElementById('passwordRegular')

            console.log('입력password: ', passwordValue);
            console.log(passwordValue.length);
            
            const passwordLength = passwordValue.length

            if (passwordValue.match(exp2)) { // pw 입력값이 정규식을 만족하면
                passwordResult.innerHTML = '좋습니다';
                passwordResult.style.color = 'green';
            }else if(passwordLength == 0 ) {
                passwordResult.innerHTML = '필수항목입니다'; 
                passwordResult.style.color = 'red';
            } else {
                passwordResult.innerHTML = '영문, 숫자, 특수문자를 사용하여 8~20자 이내로 작성해 주세요';
                passwordResult.style.color = 'red';
            }
        }

        function passwordCheck() {
            const passwordValue = document.getElementById('pw').value;
            const passwordValue2 = document.getElementById('pwCheck').value;
            const passwordCheckResult = document.getElementById('passwordCheckResult');
            
             if(passwordValue == passwordValue2 ) {
                passwordCheckResult.innerHTML = '일치합니다'
                passwordCheckResult.style.color = 'green';
             } else { 
                passwordCheckResult.innerHTML = '일치하지않습니다'
                passwordCheckResult.style.color = 'red';
         }
        }

        function phoneCheck() {
            const exp = /^\d{3}-\d{4}-\d{4}$/;
            const phone = document.getElementById('phone').value;
            const result = document.getElementById('phone-check-result');

            if(phone.match(exp)) {
                result.innerHTML = "확인 되었습니다."
                result.style.color = "green";
            } else {
                result.innerHTML = "유효하지 않는 형식입니다"
                result.style.color = "red";
            }
        }

        function emailSelect() {
            const domainSelect = document.getElementById('domainSelect').value;

            const domain = document.getElementById('domain'); // 태그를 가져온다.
            // select 에서 선택한 값을 domain id를 적용한 input 태그에 출력
            // domain.value 에다가 domainSelect 를 대입한다.
            domain.value = domainSelect;
        }

// 주소
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}

// 주소 체크
function address() {
    $("#memberAddress").attr("value",$("#sample6_postcode").val() + "_" + $("#sample6_address").val() + " " + $("#sample6_detailAddress").val() + " " +$("#sample6_extraAddress").val());

    const address = $("#sample6_address").val();
    const detailAddress = $("#sample6_detailAddress").val();
    const checkResult=document.getElementById("addressOut");

    if(address.length==0 || detailAddress.length==0 ){
        checkResult.style.color = 'red';
        checkResult.innerText='필수입력 항목입니다. 주소와 상세주소를 기입해주세요';
    }
    else {
        checkResult.style.color = 'green';
        checkResult.innerText='GOOD';
    }

}