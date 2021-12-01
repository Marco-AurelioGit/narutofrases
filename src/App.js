import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Quotes from './components/quotes/quotes';
import './App.css';
import naruto from './images/naruto.png'
import { getQuote }  from './services/quotesService';
import jutsoSound from './sounds/jutso.mp3';

const audio = new Audio(jutsoSound)

export function App() {
  const isMounted = useRef(true);

  const [quoteState, setQuoteState] = useState({
    quote: 'ok', 
    speaker: 'Speaker'});

  const onUpdate = async() => {
    const quote = await getQuote();
    if(isMounted.current){
      window.HTMLMediaElement.prototype.play = () => {
        audio.play();
      }
      setQuoteState(quote)
    }

  };

  useEffect(() => {
    onUpdate();

    return () => {
      isMounted.current = false;
    };
  },[])

  return (
    <Content>
      <Quotes {...quoteState} onUpdate={onUpdate} />
      <NarutoImg src={naruto} alt="Naruto with a kunai"/>
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NarutoImg = styled.img`
max-width:50vw;
align-self: flex-end;

`

export default App;

