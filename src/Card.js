import React, {Component} from 'react'
import './Card.css'
class Card extends Component{


  render(){
    return(
      
        <img 
          className={'Card'}
          src={this.props.image} 
          key={this.props.id} 
          alt={this.props.alt} 
        />
      
    )
  }

}

export default Card