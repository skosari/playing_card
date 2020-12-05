import React, {Component} from 'react'
import axios from 'axios'
import Card from './Card'

class Cards extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      deck_id: '',
      drawn_cards: []
    }
    this.getCard = this.getCard.bind(this)
    
  }
  
  async componentDidMount(){
    const deck_API = 'https://deckofcardsapi.com/api/deck/new/shuffle'
    const deck = await axios.get(deck_API)
    const deckObj = deck.data
    this.setState({deck_id: deckObj.deck_id})
    console.log(deckObj.deck_id)
  }
  
  async getCard(){
    let deck_id = this.state.deck_id
    
    try {
      let card_API = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
      let cards = await axios.get(card_API)
      if (!cards.data.success){
        throw new Error("No Cards Remaining") &&
        console.log(this.state)
      }
      let card = await cards.data.cards[0]
      let alt = card.value + ' of ' + card.suit
      this.setState(x => ({
        drawn_cards: [
          ...x.drawn_cards, 
          {
            id: card.code,
            image: card.image, 
            alt: alt
          }
        ]
      }))     
      // console.log(cards.data.success) 
      // console.log(cards.data.remaining)  
    } catch(err){
      alert(err + 'or maybe you clicked to fast')
    }
  }

  render(){
    let draw = this.state.drawn_cards.map(x => (
      <Card image={x.image} alt={x.alt} id={x.id} />
    ))

    return(
      <div>
        <div>
          Lets play War
          <button onClick={this.getCard}>Get Card</button>
        </div><br/>
        <div>
          {draw}
        </div>
      </div>
    )
  }

}

export default Cards