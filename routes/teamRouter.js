const express = require("express");
const User = require("../models/User");
const Vote = require("../models/Vote");
const router = express.Router();

//join
router.get('/:name', async (req, res) => {
    try {
      // 요청으로부터 name 파라미터 추출
      const { name } = req.params;
  
      // name 값을 저장하는 부분 추가
      const savedName = name;
  
      // 시퀄라이즈를 사용하여 Vote 테이블에 새로운 행을 생성하여 name 값을 저장
      const vote = await Vote.create({ name });
  
      res.status(201).json({ vote });
    } catch (error) {
      // 오류 처리
      console.error(error);
      res.status(500).json({ message: '투표 생성 도중 오류가 발생했습니다.' });
    }
  });    

module.exports = router;