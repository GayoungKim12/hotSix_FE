function validateForm(email: string, password: string, passwordCheck: any, nickname: string , personality: string | any[], regionId: number | null, birth: any, introduction: any) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    alert("유효한 이메일 주소를 입력해주세요.");
    return false;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("비밀번호는 최소 8자리 이상이어야 하며, 영문자와 숫자를 포함해야 합니다.");
    return false;
  }

  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  if (nickname.length < 2) {
    alert("닉네임을 2글자 이상으로 해주세요.");
    return false;
  }

  if (personality.length === 0) {
    alert("성향을 1개 이상 골라주세요.");
    return false;
  }

  if (regionId === null) {
    alert("지역을 선택해주세요.");
    return false;
  }

  if (!birth) {
    alert("생년월일을 선택해주세요.");
    return false;
  }

  if (!introduction) {
    alert("자기소개를 입력해주세요.");
    return false;
  }

  return true;
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getYears() {
  const currentYear = getCurrentYear();
  const years = [];
  for (let i = 1970; i <= currentYear; i++) {
    years.push(i);
  }
  return years;
}

function getMonths() {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    const formattedMonth = i < 10 ? `0${i}` : `${i}`;
    months.push(formattedMonth);
  }
  return months;
}

function getDaysInMonth(year:  number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getDays(year: number, month: number) {
  const days = [];
  if (!isNaN(year) && !isNaN(month)) {
    const numDays = getDaysInMonth(year, month);
    for (let i = 1; i <= numDays; i++) {
      const formattedDay = i < 10 ? `0${i}` : `${i}`;
      days.push(formattedDay);
    }
  }
  return days;
}


export default  {validateForm, getCurrentYear ,getYears ,getMonths ,getDays}