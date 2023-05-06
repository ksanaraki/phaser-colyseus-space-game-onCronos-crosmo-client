import {
  Wrapper,
  ModalWrapper,
  Content,
  Title,
  Buttons,
}
  from '../styles/Difficulty'

const Difficulty = ({ setIsDifficulty, difficulty, setDifficulty }) => {

  return (
    <Wrapper>
      <ModalWrapper>
        <Content>
          <Title>
            CHOOSE YOUR DIFFICULTY
          </Title>
          <Buttons>
            <img className='difficulty' onClick={() => setDifficulty('easy')}
              src={`assets/images/difficulty_easy${difficulty === 'easy' ? '_active' : ''}.png`} alt="easy" />
            <img className='difficulty' onClick={() => setDifficulty('medium')}
              src={`assets/images/difficulty_medium${difficulty === 'medium' ? '_active' : ''}.png`} alt="medium" />
            <img className='difficulty' onClick={() => setDifficulty('hard')}
              src={`assets/images/difficulty_hard${difficulty === 'hard' ? '_active' : ''}.png`} alt="hard" />
            <img className='difficulty' onClick={() => setDifficulty('extreme')}
              src={`assets/images/difficulty_extreme${difficulty === 'extreme' ? '_active' : ''}.png`} alt="extreme" />
          </Buttons>
          <img className='close' src="assets/images/btn_close.png" alt="close" onClick={() => setIsDifficulty(false)} />
        </Content>
      </ModalWrapper>
    </Wrapper>
  )
}

export default Difficulty