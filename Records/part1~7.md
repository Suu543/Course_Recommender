1. 회원가입 - 이름, 이메일, 비밀번호

2. SES 서비스를 이용해 가입한 이메일에 계정 활성화 링크 보내주기
- 이떄 링크의 params 값으로 이름, 이메일, 비밀번호로 생성한 JWT Token 붙임

3. 계정 활성화 링크 Frontend, Backend 구현

4. 계정 활성화 버튼 클릭

5. JWT Token의 타당성 여부 검사 후 DB에 저장

6. DB에 저장할 때 plain password대신 hashed_password방식으로 저장하고 대신 salt 값을 같이 저장, username의 경우 shortId 모듈을 이용해 unique한 값을 생성해 저장

7. 생성된 계정으로 로그인 
- 로그인시 localStorage에 key: user value: user정보의 JSON 형태화 (name, email, role), cookie에는 key: token을 저장 

- localStroage 정보를 바탕으로 /admin or /user로 조건부 랜더링

8. Frontend Logic에서 Navbar 랜더링을 끝내고 LocalStroage의 이벤트 핸들러를 추가해 LocalStorage에 변화 발생 (로그아웃 혹은 clear storage)시 검토후 자동 로그아웃 시키도록 설계.