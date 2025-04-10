import React from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // logic

  const history = useNavigate();
  const handleStart = () => {
    
      history("/info");
    
    // console.log("info페이지로 이`동");
    // // //예외처리 구문
    // // try {
    // //     const response = await fetch("http://localhost:8080/test")
    // //     const result = await response.json
    // //     console.log("🚀 ~ handleStart ~ response:", response) // java 읽을수있는 객체 형태로 형식 변환
    // // } catch(error){
    // //     //api 실패시
    // //     console.error(error);
    // //message api
    // try {
    //   const response = await fetch("http://localhost:8080/message", 
    //     {method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({usermessage:"안녕하세요"})
    //     },
    //   )
    //     const result = response.json();
    //             console.log("🚀 ~ handleStart ~ result:", result)
                
      
    // } catch(error) {

    // }
  };


  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-96"></i>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/3 -z-10">
        <img src="./images/hero.svg" alt="hero" />
      </div>
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
       <Title mainTitle={"맛있는 쉐프"} subTitle={"냉장고에 있는 재료로 뭐 해먹을지 고민되시나요? 남은 재료만 넣으면            맛있는 레시피가 나옵니다!"} />

        {/* // TODO:Title 컴포넌트 */}
        {/* START:Button 영역 */}
        <Button
          text="Get started"
          color="bg-chef-green-500"
          onClick={handleStart}
        />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Home;
