const express = require("express");
const User = require("../models/User");
const Vote = require("../models/Vote");
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');

/**
 * paths:
 *  /join:
 *   get:
 *    tags:
 *    - user
 *    description: 참가
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        id:
 *         type: string
 *        pw:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 닉네임 조회 성공
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     401:
 *      description: 닉네임 조회 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */

router.get('/join', validateToken, async (req, res) => {
  try {
    const username = req.user.name;
    const vote = await Vote.findOne({ where: { name: username } }); // 'name'이 'username'인 항목 조회
    if (vote) {
      res.status(201).json({ message: '이미 참여했습니다.', status: 'True' });

    } else {
      res.status(200).json({ message: '참여하지 않았습니다.', status: 'False' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투표 생성 도중 오류가 발생했습니다.' });
  }
});

router.post('/join', validateToken, async (req, res) => {
  try {
    const username = req.user.name;
    // console.log(username);

    const vote = await Vote.findOne({ where: { name: username } }); // 'name'이 'username'인 항목 조회
    // console.log(vote);

    if (vote) {
      const DeleteVote = await Vote.destroy({ where: { name: username } });
      res.status(201).json({ message: '투표가 삭제되었습니다.', title: '농구하러가기' });

    } else {
      const CreateVote = await Vote.create({ name: username }); // 'name' 필드에 'username' 값을 저장
      res.status(200).json({ message: '투표가 생성되었습니다', title: '취소하기' });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투표 생성 도중 오류가 발생했습니다.' });
  }
});

//starting
router.get('/starting', validateToken, async (req, res) => {
  try {
    // Vote 테이블에서 votenum이 작은 순서대로 10개의 name을 조회
    const votes = await Vote.findAll({
      limit: 10, // 최대 10개의 결과만 가져오기
      attributes: ['name'],
      order: [['votenum', 'ASC']] // votenum을 작은 순서(오름차순)로 정렬
    });

    res.status(200).json({ votes });
  } catch (error) {
    // 오류 처리
    console.error(error);
    res.status(500).json({ message: '조회 도중 오류가 발생했습니다.' });
  }
});

//changer
router.get('/changer', validateToken, async (req, res) => {
  try {
    // Vote 테이블에서 votenum이 작은 순서대로 11번째부터 끝까지의 name을 조회
    const votes = await Vote.findAll({
      offset: 10, // 11번째부터 시작
      attributes: ['name'],
      order: [['votenum', 'ASC']] // votenum을 작은 순서(오름차순)로 정렬
    });

    res.status(200).json({ votes });
  } catch (error) {
    // 오류 처리
    console.error(error);
    res.status(500).json({ message: '조회 도중 오류가 발생했습니다.' });
  }
});

router.get('/shuffle', validateToken, async (req, res) => {
  try {
    // Vote 테이블에서 모든 레코드 조회
    const votes = await Vote.findAll({
      limit: 10, // 최대 10개의 결과만 가져오기
      attributes: ['name']
    });

    // 조회된 레코드를 랜덤하게 섞음
    const shuffledVotes = shuffleArray(votes);
    const shuffledVotesNames = shuffledVotes.map(vote => vote.name);
    // 레코드를 두 팀으로 나눔
    // const team1 = shuffledVotes.slice(0, Math.ceil(shuffledVotes.length / 2));
    // const team2 = shuffledVotes.slice(Math.ceil(shuffledVotes.length / 2));

    res.status(200).send({ message: '팀섞기를 성공했습니다.', shuffledVotes: shuffledVotesNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '조회 도중 오류가 발생했습니다.' });
  }
});

// 배열을 랜덤하게 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = router;