const titles = {
    image_1: "",
    image_2: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%80%E1%85%B1%E1%84%8B%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%AB+%E1%84%92%E1%85%B4%E1%86%AB%E1%84%83%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg",
    image_3: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8B%E1%85%A1%E1%84%85%E1%85%B3%E1%86%B7%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB+%E1%84%89%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A9-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_4: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%82%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B3%E1%84%85%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AB+%E1%84%89%E1%85%A9%E1%84%85%E1%85%A1-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_5: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%81%E1%85%A1%E1%86%AB%E1%84%81%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%92%E1%85%A2%E1%84%86%E1%85%A1-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_6: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%B5%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%81%E1%85%A9%E1%86%BE%E1%84%80%E1%85%A6-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_7: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%82%E1%85%A1%E1%86%AF%E1%84%80%E1%85%A9%E1%84%89%E1%85%B5%E1%87%81%E1%84%8B%E1%85%B3%E1%86%AB+%E1%84%82%E1%85%A1%E1%84%87%E1%85%B5%E1%84%86%E1%85%AE%E1%86%AF%E1%84%80%E1%85%A9%E1%84%80%E1%85%B5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg",
    image_8: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8E%E1%85%A5%E1%86%AB%E1%84%8C%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB+%E1%84%83%E1%85%A9%E1%86%AF%E1%84%80%E1%85%A9%E1%84%85%E1%85%A2-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_9: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%86%E1%85%A2%E1%84%92%E1%85%A9%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB+%E1%84%87%E1%85%AE%E1%86%AF%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_10: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%90%E1%85%AE%E1%84%86%E1%85%A7%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%92%E1%85%A2%E1%84%91%E1%85%A1%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg",
    image_11: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8B%E1%85%A3%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_12: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A9%E1%86%A8%E1%84%89%E1%85%B3%E1%84%85%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AB+%E1%84%80%E1%85%A5%E1%84%87%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%B5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_13: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%82%E1%85%AE%E1%86%AB%E1%84%87%E1%85%AE%E1%84%89%E1%85%B5%E1%86%AB+%E1%84%80%E1%85%A1%E1%84%8B%E1%85%A9%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg",
    image_14: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%83%E1%85%B3%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%87%E1%85%A5%E1%86%B7%E1%84%80%E1%85%A9%E1%84%85%E1%85%A2+-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_15: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%87%E1%85%A7%E1%86%A8%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%86%E1%85%A1%E1%86%BC%E1%84%8E%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A5-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg", 
    image_16: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9/%E1%84%8B%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%92%E1%85%A1%E1%86%AB%E1%84%92%E1%85%B4%E1%86%AB%E1%84%89%E1%85%AE%E1%84%8B%E1%85%A7%E1%86%B7%E1%84%80%E1%85%A9%E1%84%85%E1%85%A2-%E1%84%8E%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A9.svg",
};

const titleWord = {
    image_1: "꿈꾸는 아메바",
    image_2: "귀여운 흰동가리",
    image_3: "아름다운 산호", 
    image_4: "장난스러운 소라", 
    image_5: "깐깐한 해마", 
    image_6: "진지한 꽃게", 
    image_7: "날고싶은 나비물고기",
    image_8: "천재적인 돌고래", 
    image_9: "매혹적인 불가사리", 
    image_10: "투명한 해파리",
    image_11: "야생의 상어", 
    image_12: "만족스러운 거북이", 
    image_13: "눈부신 가오리",
    image_14: "듬직한 범고래", 
    image_15: "완벽한 망치상어", 
    image_16: "우아한 흰수염고래",
};

export { titles, titleWord };
