import React, { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import PrevButton from "../components/PrevButton";
import { MoonLoader } from "react-spinners";
import { Result } from "postcss";
import { IoReturnUpBack } from "react-icons/io5";

const Chat = ({ingredientList}) => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS;

  const [value, setValue] = useState("");

  // TODO: set함수 추가하기
  const [messages, setMessages] = useState([]); // chatGPT와 사용자의 대화 메시지 배열
  const [isInfoLoading, setIsInfoLoading] = useState(true); // 최초 정보 요청시 로딩
  const [isMessageLoading, setIsMessageLoading] = useState(false); // 사용자와 메시지 주고 받을때 로딩
  const [infoMessages, setInfoMessages] = useState([]) // 초기 답변 대화 목록

  const hadleChange = (event) => {
    const { value } = event.target;
    // console.log("value==>", value);
    setValue(value);
  };

  const sendMessage = async(userMessage) =>{
    setIsMessageLoading(true);
    try {
      const response = await fetch(`${endpoint}/message`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({userMessage, messages: [...infoMessages, ...messages]})
      })

      const result =await response.json();

      //GPT 답변추가
      const {role, content} = result.data;
      const assistantMessage = { role, content }
      setMessages((prev)=>[...prev, assistantMessage])

      console.log("🚀 ~ sendMessage ~ result:", result)

    } catch (error) {

      console.error(error)

    } finally {
      //try 혹은 error 구문 실행 후 실행되는 곳
      setIsMessageLoading(false);
    }
  }

  //미션 1. 유저가 입력하는 input 초기화 위치
  // 코드상 해당 부분 찾기
  // setValue("") 함수 초기화 시키기

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("메시지 보내기");
    const userMessage = {role: "user", content: value.trim()}
    setMessages((prev)=>[...prev, userMessage]);

    //지금까지의 대화목록으로 API호출
    
    sendMessage(userMessage)

    setValue("")
  }

  //최종 정보 세팅
  const sendInfo = async() =>{
    // 로딩 스피너 On
    setIsInfoLoading(true)
    try {
      const response = await fetch(`${endpoint}/recipe`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ingredientList})
      })

      const result = await response.json()
      if(!result.data) return;
      //arr.length -1 : 배열의 마지막 요소의 index값
      const removeLastDataList = result.data.filter((_, index, arr) => arr.length-1  !== index )
      console.log("🚀 ~ sendInfo ~ removeLastDataList:", removeLastDataList);

      setInfoMessages (removeLastDataList); //초기 데이터 변경

      //chat GPT 답변 추가
      const {role, content} = result.data[result.data.length - 1]
      setMessages((prev)=>[...prev, {role, content }])
      console.log("🚀 ~ sendInfo ~ result:", result)


    } catch (error) {
      console.error(error)
    } finally {
      // 로딩 스피너 Off  
      setIsInfoLoading(false)

    }
  }


  //페이지 로드시 딱 한번 실행
  useEffect(()=>{
    // console.log("ingredientList:", ingredientList)
    // console.log("endpoint",endpoint)
    sendInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {isInfoLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MoonLoader color="#46A195" />
          </div>
        </div>
      )}

      {/* START: 로딩 스피너 */}
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* START:헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-chef-green-500">
          <span className="block text-xl text-center text-white">
            맛있는 쉐프
          </span>
        </div>
        {/* END:헤더 영역 */}
        {/* START:채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} isLoading={isMessageLoading} />
        </div>
        {/* END:채팅 영역 */}
        {/* START:메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <form
            id="sendForm"
            className="w-full px-2 h-full"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              name="message"
              value={value}
              onChange={hadleChange}
            />
          </form>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-chef-green-500 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center"
          >
            보내기
          </button>
        </div>
        {/* END:메시지 입력 영역 */}
      </div>
    </div>
  );
};

export default Chat;
